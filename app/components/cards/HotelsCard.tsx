import React, { useEffect } from "react";
import { CardWrapper } from "./CardWrapper";
import { OnEmpty } from "../Empty";
import hotelsEmpty from "../../images/HotelE.png";
import { useHotelItinerary } from "@/app/hooks/utils/useHotelItinerary";
import { HotelFeatureCard } from "../featureMainCard/HotelFeatureCard";

export const HotelsCard = () => {
  const { itinerary, loadFromStorage } = useHotelItinerary();

  useEffect(() => {
    loadFromStorage();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "hotel-itinerary") {
        loadFromStorage();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [loadFromStorage]);

  return (
    <CardWrapper link="/hotels" buttonTextColor="#1D2433" bgColor="#344054" title="Hotels" icon="ri:hotel-line">
      {itinerary.length === 0 ? (
        <OnEmpty title="Hotels" image={hotelsEmpty.src} linkPath="/hotels" />
      ) : (
        itinerary.map((hotel) => (
          <HotelFeatureCard key={hotel.hotel_id} hotel={hotel} />
        ))
      )}
    </CardWrapper>
  );
};
