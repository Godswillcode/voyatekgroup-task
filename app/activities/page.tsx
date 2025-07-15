"use client";

import { DatePicker, Form, InputNumber, Pagination, Select } from "antd";
import React, { useState } from "react";
import { useGetAttractions } from "../hooks/activities/useGetAttractions";
import { usePagination } from "../hooks/utils/usePagination";
import { AttractionFeatureCard } from "../components/featureMainCard/AttractionFeatureCard";
import { FormAttractionDestinationInput } from "../components/form/FormAttractionDestinationInput";

const ActivitiesPage = () => {
  const [searchParams, setSearchParams] = useState<any>(null);
  const { data, isLoading, error } = useGetAttractions(searchParams, !!searchParams);

  const activities = data?.data?.products || [];

  const { currentPage, paginatedData, changePage, totalItems } = usePagination(
    activities,
    5
  );

  const onFinish = (values: any) => {
    const start_date = values?.date?.[0]?.format("YYYY-MM-DD");
    const end_date = values?.date?.[1]?.format("YYYY-MM-DD");

    const params = {
      start_date,
      end_date,
      sort_by: values.sortBy,
      price_filters: values.priceFilters,
      id: values.locationId,
    };

    setSearchParams(params);
  };

  return (
    <div>
      <div className="border rounded-md p-3">
        <Form onFinish={onFinish} layout="vertical" requiredMark={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
            <FormAttractionDestinationInput Form={Form}/>
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
        {isLoading && <p>Loading activities...</p>}
        {error && <p className="text-red-500">Failed to fetch activities</p>}
      </div>

      {/* Data display */}
      {paginatedData.length > 0 ? (
        <div className="mt-4">
          {paginatedData.map((activity, index) => (
            <AttractionFeatureCard index={index} key={activity.id} data={activity} />
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
        !isLoading && <div></div>
      )}
    </div>
  );
};

export default ActivitiesPage;
