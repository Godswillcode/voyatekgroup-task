import { useEffect, useState } from "react";

const OPENCAGE_API_KEY = "21821197a55043f296bd74bef047f351"; // Get a free API key at https://opencagedata.com/

export const useReverseGeocode = (latitude: number, longitude: number) => {
  const [address, setAddress] = useState<string>("Loading location...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchAddress = async () => {
        try {
          const res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch location");
          }

          const data = await res.json();

          if (data.results && data.results.length > 0) {
            setAddress(data.results[0].formatted);
          } else {
            setAddress("Unknown location");
          }
        } catch (err: any) {
          setError(err.message);
          setAddress("Unknown location");
        }
      };

      fetchAddress();
    }
  }, [latitude, longitude]);

  return { address, error };
};
