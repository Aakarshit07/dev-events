"use server";
import { Booking } from "@/database";
import connectDB from "../mongodb";

type createBookingProps = {
  eventId: string;
  slug: string;
  email: string;
};

export const createBooking = async ({
  eventId,
  slug,
  email,
}: createBookingProps) => {
  try {
    await connectDB();
    await Booking.create({ eventId, slug, email });

    return { success: true };
  } catch (error) {
    console.log("Create booking failed", error);
    return { success: false };
  }
};
