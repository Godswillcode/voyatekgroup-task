import React from "react";
import { CardWrapper } from "./CardWrapper";
import { OnEmpty } from "../Empty";
import flightsEmpty from "../../images/FlightE.png";
import { FlightFeatureCard } from "../featureMainCard/FlightFeatureCard";
import { useFlightItinerary } from "@/app/hooks/utils/useFlightItinerary";

export const FlightCard = () => {
  const { itinerary, loadFromStorage } = useFlightItinerary();
  return (
    <CardWrapper
      bgColor="var(--background)"
      title="Flights"
      icon="mdi:flight"
      titleColor="#000"
      link="/flights"
    >
      {itinerary.length === 0 ? (
        <OnEmpty title="Flights" image={flightsEmpty.src} linkPath="/flights" />
      ) : (
        itinerary.map((item) => (
          <FlightFeatureCard key={item.token} data={item} />
        ))
      )}
    </CardWrapper>
  );
};
