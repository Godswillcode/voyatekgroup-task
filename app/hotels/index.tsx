"use client";

import { DatePicker, Form, Input, InputNumber, Pagination } from "antd";
import React, { useState } from "react";
import {
  childrenAgeValidationRule,
  dateRangeHasToBeGreaterThanOrEqualToCurrentDayRule,
  generalValidationRules,
} from "../lib/validations";
import { useGetHotels } from "../hooks/useGetHotels";
import { Icon } from "@iconify/react";
import { usePagination } from "../hooks/usePagination";
import { useCurrencyFormatter } from "../lib/useCurrencyFormatter";
import { getNightsStay } from "../lib/getNightsStay";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useReverseGeocode } from "../hooks/useReverseGeocode";

export default function HotelPage() {
  const [searchParams, setSearchParams] = useState<any>(null);
  const { formatCurrency } = useCurrencyFormatter();
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
      page: 1,
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-4">
            <Form.Item
              name="date"
              label="Select Date"
              rules={[dateRangeHasToBeGreaterThanOrEqualToCurrentDayRule]}
              className="lg:col-span-3 w-full"
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

      <div className="mt-6">
        {isLoading && <p>Loading hotels...</p>}
        {error && <p className="text-red-500">Failed to fetch hotels</p>}
      </div>

      {/* Data display */}
      {paginatedData.length > 0 ? (
        <div className="mt-4">
          {paginatedData.map((hotel) => (
            <div
              key={hotel.hotel_id}
              className="flex flex-col md:flex-row border shadow-md rounded mt-5 w-full"
            >
              <div className="rounded flex flex-col md:flex-row justify-between w-full flex-1 p-3">
                <div className="md:w-[10rem] w-full">
                  <Slider
                    dots={false}
                    infinite={true}
                    speed={500}
                    autoplay={true}
                    slidesToShow={1}
                    slidesToScroll={1}
                    className="md:w-[10rem] w-full h-full rounded border overflow-hidden"
                  >
                    {hotel.property.photoUrls.map(
                      (imgUrl: string, index: number) => (
                        <img
                          key={index}
                          src={imgUrl}
                          alt={`Hotel Image ${index + 1}`}
                          className="object-cover w-full h-full md:h-[13rem]"
                        />
                      )
                    )}
                  </Slider>
                </div>
                <div className="flex-1 flex flex-col justify-between px-3 py-2 gap-2">
                  <div className="flex flex-col md:flex-row justify-between w-full gap-2 font-medium">
                    <div>
                      <h3 className="font-semibold text-sm">
                        {hotel.property.name}
                      </h3>
                      <p className="text-xs pt-1">Address or Location</p>
                    </div>
                    <div className="text-xs">
                      <h3 className="font-semibold text-lg">
                        {formatCurrency(
                          hotel.property.priceBreakdown.excludedPrice.value,
                          hotel.property.priceBreakdown.excludedPrice.currency
                        )}
                      </h3>
                      <p>
                        Total Price: &nbsp;
                        {formatCurrency(
                          hotel.property.priceBreakdown.grossPrice.value,
                          hotel.property.priceBreakdown.grossPrice.currency
                        )}
                      </p>
                      <p>
                        1 room x{" "}
                        {getNightsStay(
                          hotel.property.checkinDate,
                          hotel.property.checkoutDate
                        )}{" "}
                        nights incl. taxes
                      </p>
                    </div>
                  </div>
                  <div className="text-xs flex md:mt-4 mt-0 items-center gap-3 text-accent border-b pb-3">
                    <div className="text-primary cursor-pointer flex items-center gap-1">
                      <Icon
                        icon="mingcute:location-line"
                        width="17"
                        height="17"
                      />
                      <span className=""> show in map</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Icon
                        icon="material-symbols:star-rate-rounded"
                        width="18"
                        color="#F4B93E"
                        height="18"
                      />
                      <span>{hotel.property.reviewScore}</span>
                      <span>({hotel.property.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon icon="fa6-solid:bed" width="15" height="15" />
                      <span>King size room</span>
                    </div>
                  </div>
                  <div className="flex gap-y-2 md:items-center justify-between flex-col md:flex-row text-xs mt-1 border-b pb-3 text-accent">
                    <div className="flex md:items-center flex-col md:flex-row gap-2">
                      <span>Facilities:</span>
                      <Icon
                        icon="streamline-plump:pool-ladder-solid"
                        width="13"
                        height="13"
                      />
                      <span>Pool</span>
                      <Icon
                        icon="material-symbols-light:wine-bar-outline"
                        width="18"
                        height="18"
                      />
                      <span>Bar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:calendar" width="14" height="14" />
                      <span className="mr-2">
                        Check In: {hotel.property.checkinDate}
                      </span>
                      <Icon icon="lucide:calendar" width="14" height="14" />
                      <span>Check Out: {hotel.property.checkoutDate}</span>
                    </div>
                  </div>
                  <div className="text-xs mt-1 flex items-center text-primary justify-between">
                    <div className="flex items-center gap-2">
                      <span>Hotel details</span> <span>Price details</span>
                    </div>
                    <span>Edit details</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-100 flex justify-center py-2 items-center px-3">
                <Icon icon="mdi:favourite-border" width="24" height="24" />
              </div>
            </div>
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
}
