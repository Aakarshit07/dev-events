import { notFound } from "next/navigation";
import React from "react";

type EventsDetailsPageProps = {
  params: { slug: string };
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventsDetailsPage: React.FC<EventsDetailsPageProps> = async ({
  params,
}) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const { event } = await request.json();

  if (!event) {
    return notFound();
  }

  return <section id="event">Events - SLUG: {slug}</section>;
};

export default EventsDetailsPage;
