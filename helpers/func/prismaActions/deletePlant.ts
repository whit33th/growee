"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deletePlant(plantId: number) {
  try {
    await prisma.plant.delete({
      where: {
        id: plantId,
      },
    });

    revalidatePath("/");
    return { success: true, redirect: true };
  } catch (error) {
    console.error("Error deleting plant:", error);
    return { error: "Failed to delete plant", success: false };
  }
}
