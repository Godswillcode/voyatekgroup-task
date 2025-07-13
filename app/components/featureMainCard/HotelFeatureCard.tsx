"use client";

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Icon } from "@iconify/react";
import { useReverseGeocode } from "@/app/hooks/useReverseGeocode";
import { useCurrencyFormatter } from "@/app/lib/useCurrencyFormatter";
import { getNightsStay } from "@/app/lib/getNightsStay";
import { IHotelItem } from "@/app/types/hotels";
import { useHotelItinerary } from "@/app/hooks/useHotelItinerary";
import { message as antdMessage } from "antd";
interface HotelCardProps {
  hotel: IHotelItem;
}

export const HotelFeatureCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const [messageApi, contextHolder] = antdMessage.useMessage();
  const { address } = useReverseGeocode(
    hotel.property.latitude,
    hotel.property.longitude
  );

  const { formatCurrency } = useCurrencyFormatter();

  const { addHotel, removeHotel, isHotelInItinerary } = useHotelItinerary();

  const isFavorite = isHotelInItinerary(hotel.hotel_id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeHotel(hotel.hotel_id);
      messageApi.success("Hotel removed from itinerary");
    } else {
      addHotel(hotel);
      messageApi.success("Hotel added to itinerary");
    }
  };

  return (
    <>
      {contextHolder}

      <div className="flex bg-white flex-col md:flex-row border shadow-md rounded mt-5 w-full">
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
              {hotel.property.photoUrls.map((imgUrl: string, index: number) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Hotel Image ${index + 1}`}
                  className="object-cover w-full h-full md:h-[13rem]"
                />
              ))}
            </Slider>
          </div>
          <div className="flex-1 flex flex-col justify-between px-3 py-2 gap-2">
            <div className="flex flex-col md:flex-row justify-between w-full gap-2 font-medium">
              <div>
                <h3 className="font-semibold text-sm">{hotel.property.name}</h3>
                <div className="w-[22rem]">
                  <p className="text-xs pt-1 break-all">
                    {address || "Loading address..."}
                  </p>
                </div>
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
                <Icon icon="mingcute:location-line" width="17" height="17" />
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
        <div
          className={`${
            isFavorite ? "bg-red-100" : "bg-blue-100"
          }  flex justify-center py-2 items-center px-3 cursor-pointer`}
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
