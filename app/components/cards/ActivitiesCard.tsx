import React from "react";
import { OnEmpty } from "../Empty";
import emptyActivities from "../../images/emptyActivity.png";
import { CardWrapper } from "./CardWrapper";

export const ActivitiesCard = () => {
  return (
    <CardWrapper
      bgColor="var(--primary)"
      title="Activities"
      icon="ph:road-horizon"
      link="/activities"
    >
      <OnEmpty
        title="Activities"
        image={emptyActivities.src}
        linkPath="/activities"
      />
    </CardWrapper>
  );
};
