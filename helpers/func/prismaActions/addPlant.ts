"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function addPlant(prevState: any, formData: FormData) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "User not found" };
    }

    const title = formData.get("title") as string;
    const interval = parseInt(formData.get("interval") as string);

    const response = await axios.post(
      `${process.env.DOMAIN || "http://localhost:3000"}/api/images`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    const imageURL = response.data;

    if (!title || title.length < 3) {
      return { error: "Plant name must be at least 3 characters" };
    }

    if (!interval || isNaN(interval) || interval <= 0) {
      return { error: "Please provide a valid watering interval" };
    }

    const nextWateringDate = new Date();
    nextWateringDate.setDate(nextWateringDate.getDate() + interval);

    // Create new plant in database
    const newPlant = await prisma.plant.create({
      data: {
        name: title,
        interval,
        nextWaterDate: nextWateringDate,
        userId,
        img: imageURL,
      },
    });

    // Revalidate relevant paths
    revalidatePath("/");
    revalidatePath("/plants");

    return {
      success: true,
      plantId: newPlant.id,
    };
  } catch (error) {
    console.error("Failed to add plant:", error);
    return { error: "Failed to add plant" };
  }
}
