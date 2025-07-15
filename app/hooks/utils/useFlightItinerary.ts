import { create } from "zustand";
import { FlightOfferResponse } from "@/app/types/flight";

const FLIGHT_ITINERARY_STORAGE_KEY = "flight-itinerary";

interface FlightItineraryStore {
  itinerary: FlightOfferResponse[];
  addFlight: (flight: FlightOfferResponse) => void;
  removeFlight: (token: string) => void;
  isFlightInItinerary: (token: string) => boolean;
  loadFromStorage: () => void;
}

export const useFlightItinerary = create<FlightItineraryStore>((set, get) => ({
  itinerary: [],

  loadFromStorage: () => {
    const stored = localStorage.getItem(FLIGHT_ITINERARY_STORAGE_KEY);
    if (stored) {
      set({ itinerary: JSON.parse(stored) });
    }
  },

  addFlight: (flight) => {
    const updated = [...get().itinerary, flight];
    localStorage.setItem(FLIGHT_ITINERARY_STORAGE_KEY, JSON.stringify(updated));
    set({ itinerary: updated });
  },

  removeFlight: (token) => {
    const updated = get().itinerary.filter((f) => f.token !== token);
    localStorage.setItem(FLIGHT_ITINERARY_STORAGE_KEY, JSON.stringify(updated));
    set({ itinerary: updated });
  },

  isFlightInItinerary: (token) => {
    return get().itinerary.some((f) => f.token === token);
  },
}));
