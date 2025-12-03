import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Event } from "@/database";
import { IEvent } from "@/database";

// Type for route parameters
type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Extract and validate slug from params
    const { slug } = await params;

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { error: "Slug parameter is required and must be a string" },
        { status: 400 }
      );
    }

    // Validate slug format (alphanumeric and hyphens only)
    const slugPattern = /^[a-z0-9-]+$/;
    if (!slugPattern.test(slug)) {
      return NextResponse.json(
        {
          error:
            "Invalid slug format. Only lowercase letters, numbers, and hyphens are allowed",
        },
        { status: 400 }
      );
    }

    // Validate slug length (reasonable limits)
    if (slug.length < 1 || slug.length > 200) {
      return NextResponse.json(
        { error: "Slug length must be between 1 and 200 characters" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Query event by slug
    const event: IEvent | null = await Event.findOne({ slug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { error: `Event with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error("Error fetching event by slug:", error);

    // Handle specific mongoose/database errors
    if (error instanceof Error) {
      // Database connection errors
      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          { error: "Database configuration error" },
          { status: 500 }
        );
      }

      // Other known errors
      return NextResponse.json(
        {
          error: "An unexpected error occurred while fetching the event",
        },
        { status: 500 }
      );
    }

    // Fallback for unknown error types
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
