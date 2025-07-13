import dayjs from "dayjs";

export const getNightsStay = (checkinDate: string, checkoutDate: string) => {
  if (!checkinDate || !checkoutDate) return 0;

  const checkin = dayjs(checkinDate);
  const checkout = dayjs(checkoutDate);

  const nights = checkout.diff(checkin, "day");

  return nights > 0 ? nights : 0; // Avoid negative or invalid values
};
