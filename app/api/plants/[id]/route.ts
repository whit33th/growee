import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const { id } = await params;

    if (isNaN(id)) {
      return new NextResponse(JSON.stringify({ error: "Invalid plant ID" }), {
        status: 400,
      });
    }

    const plant = await prisma.plant.findUnique({
      where: { id },
    });

    if (!plant) {
      return new NextResponse(JSON.stringify({ error: "Plant not found" }), {
        status: 404,
      });
    }

    if (plant.userId !== userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    return NextResponse.json(plant);
  } catch (error) {
    console.error("Error fetching plant:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      },
    );
  }
}
