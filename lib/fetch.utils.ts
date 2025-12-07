import { IEvent } from "@/database";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const getEvents = async (slug: string) => {
  let event: IEvent | null = null;
  try {
    const response = await fetch(`${BASE_URL}/api/events/${slug}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      return notFound();
    }

    const data = await response.json();
    return (event = data?.event);
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return null;
  }
};
