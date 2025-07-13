// hooks/useHotelItinerary.ts
import { create } from "zustand";
import { IHotelItem } from "@/app/types/hotels";

const LOCAL_STORAGE_KEY = "hotel-itinerary";

interface HotelItineraryStore {
  itinerary: IHotelItem[];
  addHotel: (hotel: IHotelItem) => void;
  removeHotel: (hotelId: number) => void;
  isHotelInItinerary: (hotelId: number) => boolean;
  loadFromStorage: () => void;
}

export const useHotelItinerary = create<HotelItineraryStore>((set, get) => ({
  itinerary: [],

  loadFromStorage: () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      set({ itinerary: JSON.parse(stored) });
    }
  },

  addHotel: (hotel) => {
    const updated = [...get().itinerary, hotel];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    set({ itinerary: updated });
  },

  removeHotel: (hotelId) => {
    const updated = get().itinerary.filter((h) => h.hotel_id !== hotelId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    set({ itinerary: updated });
  },

  isHotelInItinerary: (hotelId) => {
    return get().itinerary.some((h) => h.hotel_id === hotelId);
  },
}));
