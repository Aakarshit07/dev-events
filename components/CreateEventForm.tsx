"use client";
import React, { useState, useCallback } from "react";
import {
  FormInput,
  FormTextarea,
  FormSelect,
  FormSection,
  ArrayField,
  ImageUpload,
  SubmitButton,
  StatusMessage,
} from "@/components/ui";
import { useArrayField, useFormStatus } from "@/lib/hooks";
import {
  EventFormData,
  initialEventFormData,
  EVENT_MODE_OPTIONS,
  EventMode,
} from "@/lib/types/event.types";
import { createEvent } from "@/lib/services/event.service";

const CreateEventForm = () => {
  const [formData, setFormData] = useState<EventFormData>(initialEventFormData);

  const agenda = useArrayField([""]);
  const tags = useArrayField([""]);
  const { isSubmitting, status, startSubmitting, setSuccess, setError } =
    useFormStatus();

  // Generic handler for text inputs
  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Handler for image upload
  const handleImageChange = useCallback((file: File | null) => {
    setFormData((prev) => ({ ...prev, image: file }));
  }, []);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(initialEventFormData);
    agenda.reset([""]);
    tags.reset([""]);
  }, [agenda, tags]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startSubmitting();

    try {
      const result = await createEvent(
        formData,
        agenda.getFilteredItems(),
        tags.getFilteredItems()
      );

      if (result.success) {
        setSuccess(result.message);
        resetForm();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An error occurred while creating the event");
    }
  };

  return (
    <div id="create-event">
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <FormSection title="Basic Information">
          <FormInput
            id="title"
            name="title"
            label="Event Title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter event title"
            required
            maxLength={100}
          />

          <FormTextarea
            id="description"
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Brief description of the event"
            required
            maxLength={1000}
            rows={3}
          />

          <FormTextarea
            id="overview"
            name="overview"
            label="Overview"
            value={formData.overview}
            onChange={handleInputChange}
            placeholder="Detailed overview of the event"
            required
            maxLength={500}
            rows={4}
          />
        </FormSection>

        {/* Location & Time */}
        <FormSection title="Location & Time">
          <div className="form-row">
            <FormInput
              id="venue"
              name="venue"
              label="Venue"
              value={formData.venue}
              onChange={handleInputChange}
              placeholder="e.g., Moscone Center"
              required
            />

            <FormInput
              id="location"
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., San Francisco, CA"
              required
            />
          </div>

          <div className="form-row">
            <FormInput
              id="date"
              name="date"
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />

            <FormInput
              id="time"
              name="time"
              label="Time"
              type="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />

            <FormSelect
              id="mode"
              name="mode"
              label="Mode"
              value={formData.mode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  mode: e.target.value as EventMode,
                }))
              }
              options={EVENT_MODE_OPTIONS}
              required
            />
          </div>
        </FormSection>

        {/* Audience & Organizer */}
        <FormSection title="Audience & Organizer">
          <FormInput
            id="audience"
            name="audience"
            label="Target Audience"
            value={formData.audience}
            onChange={handleInputChange}
            placeholder="e.g., Cloud engineers, DevOps, enterprise leaders"
            required
          />

          <FormTextarea
            id="organizer"
            name="organizer"
            label="About the Organizer"
            value={formData.organizer}
            onChange={handleInputChange}
            placeholder="Tell attendees about the organizing team"
            required
            rows={3}
          />
        </FormSection>

        {/* Event Agenda */}
        <FormSection title="Event Agenda">
          <ArrayField
            label=""
            hint='Add agenda items (e.g., "09:00 AM - 10:00 AM | Keynote Speech")'
            items={agenda.items}
            onItemChange={agenda.handleItemChange}
            onAddItem={agenda.addItem}
            onRemoveItem={agenda.removeItem}
            placeholder="e.g., 09:00 AM - 10:00 AM | Opening Keynote"
            addButtonText="+ Add Agenda Item"
          />
        </FormSection>

        {/* Tags */}
        <FormSection title="Tags">
          <ArrayField
            label=""
            hint="Add relevant tags for your event"
            items={tags.items}
            onItemChange={tags.handleItemChange}
            onAddItem={tags.addItem}
            onRemoveItem={tags.removeItem}
            placeholder="e.g., Cloud"
            addButtonText="+ Add Tag"
            isCompact
          />
        </FormSection>

        {/* Event Image */}
        <FormSection title="Event Image">
          <ImageUpload id="image" label="" onImageChange={handleImageChange} />
        </FormSection>

        {/* Status Message */}
        <StatusMessage type={status.type} message={status.message} />

        {/* Submit Button */}
        <SubmitButton
          isSubmitting={isSubmitting}
          submittingText="Creating Event..."
          defaultText="Create Event"
        />
      </form>
    </div>
  );
};

export default CreateEventForm;
