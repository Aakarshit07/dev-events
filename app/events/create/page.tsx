import CreateEventForm from "@/components/CreateEventForm";

const CreateEventPage = () => {
  return (
    <section id="create-event-page">
      <div className="page-header">
        <h1>Create New Event</h1>
        <p>Fill in the details below to create a new event</p>
      </div>
      <CreateEventForm />
    </section>
  );
};

export default CreateEventPage;
