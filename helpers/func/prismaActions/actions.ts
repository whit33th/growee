"use server";

import { INameTagSchema } from "@/helpers/constants/interfaces/riot";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

export async function getUser() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "User not found" };
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    return { user };
  } catch (e) {
    return { e: "Failed to get user" };
  }
}
export async function addUserId(prevState: any, formData: FormData) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "User not found" };
    }

    const name = formData.get("name") as string;
    const tag = formData.get("tag") as string;
    const platform = formData.get("platform") as string;

    try {
      INameTagSchema.parse({ name, tag });
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return {
          error: validationError.errors[0].message,
        };
      }
      return { error: "Validation error" };
    }

    if (name.length < 3 || tag.length < 3) {
      return { error: "Name and tag must be at least 3 characters" };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { name, tag, platform },
    });

    try {
      const baseUrl =
        // process.env.NEXT_PUBLIC_BASE_URL ||
        "http://localhost:3000";

      const res = await axios.get(
        `${baseUrl}/api/riot/account/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
      );
      const puuid = res.data.puuid;

      await prisma.user.update({
        where: { id: userId },
        data: { puuid },
      });

      console.log("Riot API updated successfully");
    } catch (e) {
      return { error: "No summoner found" };
    }
    revalidatePath(`/profile/${name}/${tag}/${platform}`);
    return {
      success: true,
      redirectUrl: `/profile/${name}/${tag}/${platform}`,
    };
  } catch (e) {
    return { e: "Failed to update user" };
  }
}
