"use client";

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify/react";
import { useCurrencyFormatter } from "@/app/lib/useCurrencyFormatter";
import { message as antdMessage, Button, Progress } from "antd";
import { FlightOfferResponse } from "@/app/types/flight";
import dayjs from "dayjs";
import { formatDuration } from "@/app/lib";
import { useFlightItinerary } from "@/app/hooks/utils/useFlightItinerary";

interface FlightCardProps {
  data: FlightOfferResponse;
}

export const FlightFeatureCard: React.FC<FlightCardProps> = ({ data }) => {
  const [messageApi, contextHolder] = antdMessage.useMessage();

  const { formatCurrency } = useCurrencyFormatter();

  const { addFlight, removeFlight, isFlightInItinerary, loadFromStorage } =
    useFlightItinerary();

  const isFavorite = isFlightInItinerary(data.token);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFlight(data.token);
      messageApi.success("Activity removed from itinerary");
    } else {
      addFlight(data);
      messageApi.success("Activity added to itinerary");
    }
  };

  return (
    <>
      {contextHolder}

      <div className="flex bg-white flex-col md:flex-row border shadow-md rounded mt-5 w-full">
        <div className="p-3 flex justify-between w-full flex-1 rounded">
          <div className="flex-1 flex flex-col justify-between px-3 pt-2 gap-2">
            <div>
              <div className="flex flex-col lg:flex-row justify-between w-full gap-2 font-medium">
                {data?.segments?.length > 0 &&
                  data?.segments[0].legs.length > 0 && (
                    <div className="flex items-center mb-3 lg:mb-0 gap-3">
                      <div>
                        <img
                          src={data.segments[0].legs[0].carriersData[0]?.logo}
                          alt={data.segments[0].legs[0].carriersData[0]?.name}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">
                          {data.segments[0].legs[0].carriersData[0]?.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-xs pt-1">
                            {data.segments[0].legs[0].carriersData[0]?.code}-
                            {data.segments[0].legs[0].flightInfo.flightNumber}
                          </p>

                          <button className="bg-[#0A369D] lowercase text-white px-2 pt-1 pb-[5px] text-xs rounded">
                            {data.segments[0].legs[0].cabinClass}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                {/* details */}
              <div>
              {data.segments.map((segment, index) => (
                  <div key={index} className="mb-5">
                    <div className="flex items-center justify-between gap-10 text-xs text-accent">
                      <div>
                        <h3 className="font-semibold text-black text-lg">
                          {dayjs(segment.departureTime).format("HH:mm")}
                        </h3>
                        <p>
                          {dayjs(segment.departureTime).format("ddd, DD, MMM")}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-5 md:gap-10 lg:gap-18">
                          <Icon
                            icon="mingcute:flight-takeoff-line"
                            width="18"
                            height="18"
                          
                          />
                          <span>
                            Duration: {formatDuration(segment.totalTime)}
                          </span>
                          <Icon
                            icon="mingcute:flight-takeoff-line"
                            width="18"
                            height="18"
                          />
                        </div>
                        <Progress
                          className="my-1"
                          showInfo={false}
                          percent={73}
                          success={{ percent: 30, strokeColor: "#F0F0F0" }}
                        />
                        <div className="flex items-center justify-between gap-5">
                          <span>{segment.departureAirport.code}</span>
                          <span>Direct</span>
                          <span>{segment.arrivalAirport.code}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-black text-lg">
                          {dayjs(segment.arrivalTime).format("HH:mm")}
                        </h3>
                        <p>
                          {dayjs(segment.arrivalTime).format("ddd, DD, MMM")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
                <div className="text-xs">
                  <h3 className="font-semibold text-lg">
                    {formatCurrency(
                      data.priceBreakdown.total.units,
                      data.priceBreakdown.total.currencyCode
                    )}
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex border-t pt-3 gap-y-2 md:items-center justify-between flex-col md:flex-row text-xs mt-1 border-b pb-3 text-accent">
              <div className="flex md:items-center flex-col md:flex-row gap-2">
                <span>Facilities:</span>
                <div className="flex items-center gap-2">
                  <Icon
                    icon="material-symbols:luggage-outline-rounded"
                    width="18"
                    height="18"
                  />
                  <span>
                    Baggage:{" "}
                    {
                      data.segments[0]?.travellerCheckedLuggage[0]
                        ?.luggageAllowance.maxWeightPerPiece | 0
                        
                    }
                    kg, Cabin Baggage:{" "}
                    {
                      data.segments[0]?.travellerCabinLuggage[0]
                        ?.luggageAllowance.maxWeightPerPiece | 0
                    }
                    kg
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    icon="fluent-mdl2:my-movies-t-v"
                    width="18"
                    height="18"
                  />
                  <span>In flight entertainment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    icon="material-symbols-light:no-meals"
                    width="18"
                    height="18"
                  />
                  <span>In flight meal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="clarity:usb-solid" width="18" height="18" />
                  <span>USB Port</span>
                </div>
              </div>
            </div>
            <div className="text-xs mt-1 flex items-center text-primary justify-between">
              <div className="flex items-center gap-2">
                <span>Flight details</span> <span>Price details</span>
              </div>
              <span>Edit details</span>
            </div>
          </div>
        </div>
        <div
          className={`${
            isFavorite ? "bg-red-100" : "bg-blue-100"
          }  flex justify-center py-2 items-center w-full md:w-[3.5rem] cursor-pointer`}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? (
            <Icon icon="humbleicons:times" width="24" height="24" color="red" />
          ) : (
            <Icon icon="mdi:favourite-border" width="24" height="24" />
          )}
        </div>
      </div>
    </>
  );
};
