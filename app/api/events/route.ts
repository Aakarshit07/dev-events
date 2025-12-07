import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    let event;

    try {
      event = Object.fromEntries(formData.entries());
      console.log("Event: ", event);
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid JSON data Format" },
        { status: 400 }
      );
    }

    const imagefile = formData.get("image") as File;
    if (!imagefile) {
      return NextResponse.json(
        { message: "Image File is Required" },
        { status: 400 }
      );
    }

    let tags = JSON.parse(formData.get("tags") as string);
    let agenda = JSON.parse(formData.get("agenda") as string);

    const arrayBuffer = await imagefile.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const uploadImageToCloudinary = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvents" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(imageBuffer);
    });

    event.image = (
      uploadImageToCloudinary as { secure_url: string }
    ).secure_url;

    const createdEvent = await Event.create({ ...event, tags, agenda });

    return NextResponse.json(
      { message: "Event Created Successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Event Creating Failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Events Fetched Successfully", events },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Event Fetching Failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
