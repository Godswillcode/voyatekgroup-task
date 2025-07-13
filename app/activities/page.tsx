"use client";

import { DatePicker, Form, InputNumber, Select } from "antd";
import React, { useState } from "react";

const ActivitiesPage = () => {
  const [searchParams, setSearchParams] = useState<any>(null);
  const onFinish = (values: any) => {
    const start_date = values?.date?.[0]?.format("YYYY-MM-DD");
    const end_date = values?.date?.[1]?.format("YYYY-MM-DD");

    const params = {
      page: 1,
      start_date,
      end_date,
      sort_by: values.sortBy,
      price_filters: values.priceFilters,
    };

    setSearchParams(params);
  };
  return (
    <div>
      <div className="border rounded-md p-3">
        <Form onFinish={onFinish} layout="vertical" requiredMark={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
            <Form.Item name="date" label="Select Date" className="w-full">
              <DatePicker.RangePicker
                placeholder={["Start Date", "End Date"]}
                className="w-full"
              />
            </Form.Item>
            <Form.Item name="sortBy" label="Sort By">
              <Select
                options={[
                  { value: "trending", label: "Trending" },
                  { value: "attr_book_score", label: "Attr Book Score" },
                  { value: "lowest_price", label: "Lowest Price" },
                ]}
                placeholder="Select"
                allowClear
              />
            </Form.Item>
            <Form.Item name="priceFilters" label="Price Filter">
              <InputNumber className="w-full" min={1} placeholder="1" />
            </Form.Item>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="w-[10rem] bg-primary text-white px-4 pt-1 pb-2 rounded"
            >
              Search
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ActivitiesPage;
