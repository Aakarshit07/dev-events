export type EventMode = "online" | "offline" | "hybrid";

export interface EventFormData {
  title: string;
  description: string;
  overview: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: EventMode;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  image: File | null;
}

export const initialEventFormData: EventFormData = {
  title: "",
  description: "",
  overview: "",
  venue: "",
  location: "",
  date: "",
  time: "",
  mode: "offline",
  audience: "",
  agenda: [""],
  organizer: "",
  tags: [""],
  image: null,
};

export const EVENT_MODE_OPTIONS = [
  { value: "offline", label: "Offline" },
  { value: "online", label: "Online" },
  { value: "hybrid", label: "Hybrid" },
];
