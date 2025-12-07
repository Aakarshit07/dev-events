import { EventFormData } from "@/lib/types/event.types";

interface CreateEventResponse {
  success: boolean;
  message: string;
  event?: unknown;
}

export const createEvent = async (
  formData: EventFormData,
  filteredAgenda: string[],
  filteredTags: string[]
): Promise<CreateEventResponse> => {
  const formDataToSend = new FormData();

  // Append text fields
  formDataToSend.append("title", formData.title);
  formDataToSend.append("description", formData.description);
  formDataToSend.append("overview", formData.overview);
  formDataToSend.append("venue", formData.venue);
  formDataToSend.append("location", formData.location);
  formDataToSend.append("date", formData.date);
  formDataToSend.append("time", formData.time);
  formDataToSend.append("mode", formData.mode);
  formDataToSend.append("audience", formData.audience);
  formDataToSend.append("organizer", formData.organizer);

  // Append arrays as JSON strings
  formDataToSend.append("agenda", JSON.stringify(filteredAgenda));
  formDataToSend.append("tags", JSON.stringify(filteredTags));

  // Append image file
  if (formData.image) {
    formDataToSend.append("image", formData.image);
  }

  const response = await fetch("/api/events", {
    method: "POST",
    body: formDataToSend,
  });

  const result = await response.json();

  if (response.ok) {
    return {
      success: true,
      message: "Event created successfully!",
      event: result.event,
    };
  }

  return {
    success: false,
    message: result.message || "Failed to create event",
  };
};
