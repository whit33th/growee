"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function updatePlant(prevState: any, formData: FormData) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "User not authenticated" };
    }

    const plantId = parseInt(formData.get("id") as string);
    const title = formData.get("title") as string;
    const interval = parseInt(formData.get("interval") as string);

    // Validate inputs
    if (!plantId || isNaN(plantId)) {
      return { error: "Invalid plant ID" };
    }

    if (!title || title.length < 3) {
      return { error: "Plant name must be at least 3 characters" };
    }

    if (!interval || isNaN(interval) || interval <= 0) {
      return { error: "Please provide a valid watering interval" };
    }

    // Check if the plant exists and belongs to the user
    const existingPlant = await prisma.plant.findUnique({
      where: { id: plantId },
    });

    if (!existingPlant) {
      return { error: "Plant not found" };
    }

    if (existingPlant.userId !== userId) {
      return { error: "You are not authorized to edit this plant" };
    }

    // Handle image upload if a new image is provided
    const image = formData.get("image") as File | null;
    let imageURL = existingPlant.img;

    if (image && image.size > 0) {
      try {
        const response = await axios.post(
          `${process.env.DOMAIN || "http://localhost:3000"}/api/images`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        imageURL = response.data || existingPlant.img;
      } catch (error) {
        console.error("Image upload failed:", error);
        // Continue with the update even if image upload fails
      }
    }

    // Update the plant
    await prisma.plant.update({
      where: { id: plantId },
      data: {
        name: title,
        interval,
        img: imageURL,
      },
    });

    // Revalidate relevant paths
    revalidatePath("/");
    revalidatePath("/plants");
    revalidatePath(`/plant/${plantId}`);
    revalidatePath(`/edit/${plantId}`);

    return {
      success: true,
      redirect: true,
    };
  } catch (error) {
    console.error("Failed to update plant:", error);
    return { error: "Failed to update plant" };
  }
}
