import React, { Suspense } from "react";
import EventsDetailsWrapper from "@/components/EventsDetailsWrapper";

type EventsDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

const EventsDetailsPage: React.FC<EventsDetailsPageProps> = async ({
  params,
}) => {
  return (
    <section id="event">
      <Suspense>
        <EventsDetailsWrapper params={params} />
      </Suspense>
    </section>
  );
};

export default EventsDetailsPage;
