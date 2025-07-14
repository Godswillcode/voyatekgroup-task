import { create } from "zustand";
import { IAttractionItem } from "@/app/types/attractions";

const LOCAL_STORAGE_KEY = "activity-itinerary";

interface ActivityItineraryStore {
  itinerary: IAttractionItem[];
  addActivity: (activity: IAttractionItem) => void;
  removeActivity: (activityId: string) => void;
  isActivityInItinerary: (activityId: string) => boolean;
  loadFromStorage: () => void;
}

export const useActivityItinerary = create<ActivityItineraryStore>((set, get) => ({
  itinerary: [],

  loadFromStorage: () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      set({ itinerary: JSON.parse(stored) });
    }
  },

  addActivity: (activity) => {
    const updated = [...get().itinerary, activity];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    set({ itinerary: updated });
  },

  removeActivity: (activityId) => {
    const updated = get().itinerary.filter((a) => a.id !== activityId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    set({ itinerary: updated });
  },

  isActivityInItinerary: (activityId) => {
    return get().itinerary.some((a) => a.id === activityId);
  },
}));
