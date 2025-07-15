"use client";

import { DatePicker, Form, Input, InputNumber, Pagination } from "antd";
import React, { useState } from "react";
import {
  childrenAgeValidationRule,
  dateRangeHasToBeGreaterThanOrEqualToCurrentDayRule,
  generalValidationRules,
} from "../lib/validations";
import { useGetHotels } from "../hooks/hotel/useGetHotels";
import { usePagination } from "../hooks/utils/usePagination";
import { HotelFeatureCard } from "../components/featureMainCard/HotelFeatureCard";
import { FormHotelDestinationInput } from "../components/form/FormHotelDestinationInput";

export default function HotelPage() {
  const [searchParams, setSearchParams] = useState<any>(null);
  const { data, error, isLoading } = useGetHotels(searchParams, !!searchParams);

  const hotels = data?.data?.hotels || [];

  const { currentPage, paginatedData, changePage, totalItems } = usePagination(
    hotels,
    5
  );

  const onFinish = (values: any) => {
    const arrival_date = values?.date?.[0]?.format("YYYY-MM-DD");
    const departure_date = values?.date?.[1]?.format("YYYY-MM-DD");

    const params = {
      dest_id: values.dest_id,
      arrival_date,
      departure_date,
      adults: values.adults,
      room_qty: values.room_qty,
      children_age: values.children_age || "",
    };

    setSearchParams(params);
  };

  return (
    <div>
      <div className="border rounded-md p-3">
        <Form onFinish={onFinish} layout="vertical" requiredMark={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
            <FormHotelDestinationInput Form={Form}/>
            <Form.Item
              name="date"
              label="Select Date"
              rules={[dateRangeHasToBeGreaterThanOrEqualToCurrentDayRule]}
            >
              <DatePicker.RangePicker
                placeholder={["Arrival", "Departure"]}
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              name="adults"
              rules={generalValidationRules}
              label="Guests"
              tooltip="Number of guests"
            >
              <InputNumber className="w-full" min={1} placeholder="1" />
            </Form.Item>
            <Form.Item
              name="room_qty"
              rules={generalValidationRules}
              label="Room"
              tooltip="Number of rooms"
            >
              <InputNumber className="w-full" min={1} placeholder="1" />
            </Form.Item>
            <Form.Item
              name="children_age"
              label="Children Age"
              tooltip="Age of children (if any)"
              rules={childrenAgeValidationRule}
            >
              <Input className="w-full" placeholder="0,17" />
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
        {isLoading && <p>Loading hotels...</p>}
        {error && <p className="text-red-500">Failed to fetch hotels</p>}
      </div>

      {/* Data display */}
      {paginatedData.length > 0 ? (
        <div className="mt-4">
          {paginatedData.map((hotel) => (
             <HotelFeatureCard key={hotel.hotel_id} hotel={hotel} />
          ))}

          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              total={totalItems}
              pageSize={10}
              onChange={changePage}
            />
          </div>
        </div>
      ) : (
        !isLoading && <div>No data</div>
      )}
    </div>
  );
}
