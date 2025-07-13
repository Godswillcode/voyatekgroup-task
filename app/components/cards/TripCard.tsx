import Link from "next/link";
import React from "react";

export const TripCard = () => {
  const cardText =
    "Build, personalize, and optimize your itineraries with our trip planner.";
  return (
    <div className="text-white grid grid-cols-1 lg:grid-cols-8 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 col-span-6">
        <div className="bg-[#000031] rounded py-4 px-3">
          <h2 className="text-base font-medium pb-3">Activities</h2>
          <p className="text-[11px]">{cardText}</p>

          <Link href={"/activities"}>
            <button className="bg-primary text-xs w-full py-2 rounded mt-8">
              Add Activities
            </button>
          </Link>
        </div>
        <div className="bg-[#E7F0FF] rounded py-4 px-3">
          <h2 className="text-base font-medium pb-3 text-black">Hotels</h2>
          <p className="text-[11px] text-black">{cardText}</p>

          <Link href={"/hotels"}>
            <button className="bg-primary text-xs w-full py-2 rounded mt-8">
              Add Hotels
            </button>
          </Link>
        </div>
        <div className="bg-primary rounded py-4 px-3">
          <h2 className="text-base font-medium pb-3">Flights</h2>
          <p className="text-[11px]">{cardText}</p>

          <Link href={"/flights"}>
            <button className="bg-white text-primary text-xs w-full py-2 rounded mt-8">
              Add Flights
            </button>
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
};
