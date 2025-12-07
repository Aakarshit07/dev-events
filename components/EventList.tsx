import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function getEvents() {
  "use cache";
  cacheLife("seconds");
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();
  return events;
}

const EventList = async () => {
  const events = await getEvents();

  return (
    <>
      <ul className="events">
        {events &&
          events.length > 0 &&
          events?.map((event: IEvent) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default EventList;
