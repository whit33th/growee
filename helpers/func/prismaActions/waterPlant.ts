"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export default async function waterPlant(plantId: number) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "User not authenticated" };
    }

    // Get the plant to check ownership and interval
    const plant = await prisma.plant.findUnique({
      where: { id: plantId },
    });

    if (!plant) {
      return { error: "Plant not found" };
    }

    if (plant.userId !== userId) {
      return { error: "Not authorized to water this plant" };
    }

    // Calculate new watering date based on the interval
    const nextWateringDate = new Date();
    nextWateringDate.setDate(nextWateringDate.getDate() + plant.interval);

    // Update the plant's next watering date
    await prisma.plant.update({
      where: { id: plantId },
      data: {
        nextWaterDate: nextWateringDate,
      },
    });

    // Revalidate relevant paths
    revalidatePath("/");
    revalidatePath("/plants");
    revalidatePath(`/plant/${plantId}`);

    return {
      success: true,
      message: "Plant watered successfully!",
    };
  } catch (error) {
    console.error("Failed to water plant:", error);
    return { error: "Failed to water plant" };
  }
}
