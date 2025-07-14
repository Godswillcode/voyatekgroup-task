"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import banner from "../app/images/banner.png";
import user from "../app/images/one.png";
import { TripCard } from "./components/cards/TripCard";
import { ActivitiesCard } from "./components/cards/ActivitiesCard";
import { HotelsCard } from "./components/cards/HotelsCard";
import { FlightCard } from "./components/cards/FlightCard";

export default function Home() {
  return (
    <div className="relative">
      <div className="bg-background rounded-md p-[6px] inline-block absolute z-10 top-3 left-3 cursor-pointer hover:bg-primary hover:text-white transition-all duration-300">
        <Icon icon="prime:arrow-left" width="18" height="18" />
      </div>
      <Image
        src={banner}
        alt="trip-banner"
        className="w-full h-[7rem] lg:h-[10rem]"
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
        <div className="text-[12px]">
          <div className="flex">
            <div className="bg-[#FEF4E6] flex px-2 items-center gap-2 rounded py-[4px]">
              <Icon icon="uil:calendar" width="18" height="18" />
              <span>21 March 2024</span>
              <Icon icon="prime:arrow-right" width="18" height="18" />
              <span>21 April 2024</span>
            </div>
          </div>
          <h4 className="text-base font-semibold py-[6px]">
            Bahamas Family Trip
          </h4>
          <p className="text-accent">
            New York, United States of America | Solo Trip
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <button className="w-[8rem] flex justify-center rounded text-primary py-[6px] bg-[#E7F0FF]">
              <Icon icon="ri:user-add-line" width="17" height="17" />
            </button>{" "}
            <Icon icon="weui:more-filled" width="24" height="24" />
          </div>

          <div className="mt-6 flex md:justify-center">
            <Image
              src={user}
              alt="user"
              className="lg:ml-6"
              width={75}
              height={75}
            />
          </div>
        </div>
      </div>

      {/* cards */}
      <TripCard />

      <div className="mt-16 mb-5">
        <h3 className="text-[#1D2433] font-semibold text-lg">
          Trip itineraries
        </h3>

        <p className="text-accent pt-1 text-[12px]">
          Your trip itineraries are placed here
        </p>
      </div>
      <FlightCard />
      <HotelsCard />
      <ActivitiesCard />
    </div>
  );
}
