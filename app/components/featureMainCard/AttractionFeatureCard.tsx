"use client";

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify/react";
import { useCurrencyFormatter } from "@/app/lib/useCurrencyFormatter";
import { message as antdMessage, Button, Tooltip } from "antd";
import { IAttractionItem } from "@/app/types/attractions";
import { useActivityItinerary } from "@/app/hooks/useActivityItinerary";

interface ActivityCardProps {
  data: IAttractionItem;
}

export const AttractionFeatureCard: React.FC<ActivityCardProps> = ({
  data,
}) => {
  const [messageApi, contextHolder] = antdMessage.useMessage();

  const { formatCurrency } = useCurrencyFormatter();

  const { addActivity, removeActivity, isActivityInItinerary } =
    useActivityItinerary();

  const isFavorite = isActivityInItinerary(data.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeActivity(data.id);
      messageApi.success("Activity removed from itinerary");
    } else {
      addActivity(data);
      messageApi.success("Activity added to itinerary");
    }
  };

  return (
    <>
      {contextHolder}

      <div className="flex bg-white flex-col md:flex-row border shadow-md rounded mt-5 w-full">
        <div className="rounded flex flex-col md:flex-row justify-between w-full flex-1 p-3">
          <div className="md:w-[10rem] w-full">
            <img
              src={data.primaryPhoto.small}
              alt={`Activity Image ${data.name}`}
              className="object-cover w-full h-full md:h-[11rem]"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between px-3 pt-2 gap-2">
            <div className="flex flex-col md:flex-row justify-between w-full gap-2 font-medium">
              <div>
                <h3 className="font-semibold text-sm">{data.name}</h3>
                <div className="">
                  <p className="text-xs pt-1">{data.ufiDetails.bCityName}</p>
                </div>
              </div>
              <div className="text-xs">
                <h3 className="font-semibold text-lg">
                  {formatCurrency(
                    data.representativePrice.publicAmount,
                    data.representativePrice.currency
                  )}
                </h3>
                <p>10:30 AM on Mar 19</p>
              </div>
            </div>
            <div className="text-xs flex md:mt-4 mt-0 items-center gap-3 text-accent border-b pb-3">
              <div className="text-primary cursor-pointer flex items-center gap-1">
                <Icon icon="mingcute:location-line" width="17" height="17" />
                <span className="">Direction</span>
              </div>

              <div className="flex items-center gap-1">
                <Icon
                  icon="material-symbols:star-rate-rounded"
                  width="18"
                  color="#F4B93E"
                  height="18"
                />
                <span>{data.reviewsStats.combinedNumericStats.average}</span>
                <span>({data.reviewsStats.combinedNumericStats.total})</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon icon="formkit:time" width="15" height="15" />
                <span>1 Hour</span>
              </div>
            </div>
            <div className="flex gap-y-2 md:items-center justify-between flex-col md:flex-row text-xs mt-1 border-b pb-3 text-accent">
              <div className="flex md:items-center flex-col md:flex-row gap-2">
                <span>What's Included:</span>
                <span className="w-[13rem] truncate">
                  {data.shortDescription}
                </span>
                <Tooltip title={data.shortDescription}>
                  <span className="text-primary cursor-pointer">See more</span>
                </Tooltip>
              </div>
              <div className="flex items-center gap-2">
                <Button>Day 1</Button>
                <div className="flex items-center flex-col">
                  <Icon
                    icon="material-symbols-light:arrow-circle-down-outline"
                    height="20"
                    width="20"
                  />
                  <Icon
                    icon="material-symbols-light:arrow-circle-up-outline"
                    height="20"
                    width="20"
                  />
                </div>
              </div>
            </div>
            <div className="text-xs mt-1 flex items-center text-primary justify-between">
              <div className="flex items-center gap-2">
                <span>Activity details</span> <span>Price details</span>
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
