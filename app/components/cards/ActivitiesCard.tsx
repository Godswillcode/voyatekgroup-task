import React, { useEffect } from "react";
import { OnEmpty } from "../Empty";
import emptyActivities from "../../images/emptyActivity.png";
import { CardWrapper } from "./CardWrapper";
import { AttractionFeatureCard } from "../featureMainCard/AttractionFeatureCard";
import { useActivityItinerary } from "@/app/hooks/useActivityItinerary";

export const ActivitiesCard = () => {
  const {
    itinerary,
    loadFromStorage,
  } = useActivityItinerary();
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
    <CardWrapper
      bgColor="var(--primary)"
      title="Activities"
      icon="ph:road-horizon"
      link="/activities"
    >
      {itinerary.length === 0 ? (
        <OnEmpty
          title="Activities"
          image={emptyActivities.src}
          linkPath="/activities"
        />
      ) : (
        itinerary.map((activity, index) => (
          <AttractionFeatureCard
            key={activity.id}
            index={index}
            data={activity}
          />
        ))
      )}
    </CardWrapper>
  );
};
