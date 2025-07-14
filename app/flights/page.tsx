"use client";

import React, { useState } from "react";
import { DatePicker, Form, Input, InputNumber, Segmented, Select } from "antd";
import { FormFlightDestinationInput } from "../components/form/FormFlightDestinationInput";
import {
  childrenAgeValidationRule,
  dateMustBeTodayOrFutureRule,
  generalValidationRules,
} from "../lib/validations";
import { useGetFlights } from "../hooks/flights/useGetFlights";
import { usePagination } from "../hooks/utils/usePagination";

const FlightPage = () => {
  const [tripType, setTripType] = useState<"One Way" | "Round Trip">("One Way");
  const form = Form.useFormInstance();
 const [searchParams, setSearchParams] = useState<any>(null);
  const {data, error, isLoading} = useGetFlights(searchParams, !!searchParams)
  
console.log("data", data?.data.flightOffers);

  const onFinish = (values: any) => {
    const return_date = values?.returnDate?.format("YYYY-MM-DD");
    const departure_date = values?.departDate.format("YYYY-MM-DD");

    const params = {
      fromId: values.fromId,
      toId: values.toId,
      cabinClass: values.cabinClass,
      departDate: departure_date,
      returnDate: tripType === "Round Trip" ? return_date : undefined,
      adults: values.adults,
      children_age: values.children_age || "",
    };

    setSearchParams(params);
  };

  return (
    <div>
      <Segmented<string>
        options={["One Way", "Round Trip"]}
        defaultValue="One Way"
        onChange={(value) => setTripType(value as "One Way" | "Round Trip")}
        className="mb-4"
      />

      <div className="border rounded-md p-3">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
            <FormFlightDestinationInput
              Form={Form}
              control={{ label: "Departing", name: "fromId" }}
            />
            <Form.Item
              name="toId"
              label=""
              dependencies={["fromId"]}
              rules={[
                {
                  required: true,
                  message: "Please select an arrival destination",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("fromId") !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Arrival destination cannot be the same as departure"
                      )
                    );
                  },
                }),
              ]}
            >
              <FormFlightDestinationInput
                Form={Form}
                control={{ label: "Arriving", name: "toId" }}
              />
            </Form.Item>

            <Form.Item
              name="departDate"
              label="Departure Date"
              className="w-full"
              rules={[dateMustBeTodayOrFutureRule]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${
              tripType === "Round Trip" ? "lg:grid-cols-4" : "lg:grid-cols-3"
            } gap-x-4`}
          >
            {tripType === "Round Trip" && (
              <Form.Item
                name="returnDate"
                label="Return Date"
                className="w-full"
                rules={[dateMustBeTodayOrFutureRule]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            )}

            <Form.Item
              name="adults"
              rules={generalValidationRules}
              label="Adults"
            >
              <InputNumber className="w-full" min={1} placeholder="1" />
            </Form.Item>

            <Form.Item
              name="children"
              label="Children"
              tooltip="Age of children (if any)"
              rules={childrenAgeValidationRule}
            >
              <Input className="w-full" placeholder="0,17" />
            </Form.Item>

            <Form.Item name="cabinClass" label="Cabin Class">
              <Select
                options={[
                  { value: "ECONOMY", label: "ECONOMY" },
                  { value: "PREMIUM_ECONOMY", label: "PREMIUM ECONOMY" },
                  { value: "BUSINESS", label: "BUSINESS" },
                  { value: "FIRST", label: "FIRST" },
                ]}
                placeholder="Select"
                allowClear
              />
            </Form.Item>
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="w-[10rem] bg-primary text-white px-4 pt-1 pb-2 rounded"
            >
              Search
            </button>
          </div>
        </Form>
      </div>
      <div className="mt-6">
        {isLoading && <p>Loading flight...</p>}
        {error && <p className="text-red-500">Failed to fetch flights</p>}
      </div>
    </div>
  );
};

export default FlightPage;
