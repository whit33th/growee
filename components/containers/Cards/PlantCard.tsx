"use client";
import getTimeRemaining from "@/helpers/func/getTimeRemaining";
import waterPlant from "@/helpers/func/prismaActions/waterPlant";
import type { Plant } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShowerHead } from "lucide-react";
import { toast } from "sonner";

export default function PlantCard({ plant }: { plant: Plant }) {
  const [timeRemaining, setTimer] = useState(
    getTimeRemaining(plant.nextWaterDate.toISOString()),
  );
  const [isWatering, setIsWatering] = useState(false);

  useEffect(() => {
    if (getTimeRemaining(plant.nextWaterDate.toISOString()) === "00:00:00") {
      setTimer("00:00:00");
      return;
    }

    const timer = setInterval(() => {
      const remaining = getTimeRemaining(plant.nextWaterDate.toISOString());
      setTimer(remaining);

      if (remaining === "00:00:00") {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [plant.nextWaterDate]);

  const getGradientByPlantId = (id: number) => {
    const colors = [
      "from-green-300 to-blue-400",
      "from-purple-300 to-pink-400",
      "from-yellow-300 to-red-400",
      "from-blue-300 to-purple-400",
      "from-green-300 to-yellow-400",
      "from-pink-300 to-orange-400",
      "from-indigo-300 to-cyan-400",
      "from-teal-300 to-emerald-400",
      "from-rose-300 to-fuchsia-400",
      "from-amber-300 to-orange-400",
    ];
    // Get index based on modulo 10 of plant ID
    const index = id % 10;
    return colors[index];
  };

  const handleWaterPlant = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the water button
    setIsWatering(true);

    try {
      const result = await waterPlant(plant.id);

      if (result.success) {
        toast.success(result.message || "Plant watered successfully!");
        // Update the timer immediately
        setTimer(
          getTimeRemaining(
            new Date(
              Date.now() + plant.interval * 24 * 60 * 60 * 1000,
            ).toISOString(),
          ),
        );
      } else {
        toast.error(result.error || "Failed to water plant");
      }
    } catch (e) {
      toast.error("Something went wrong" + " " + e);
    } finally {
      setIsWatering(false);
    }
  };

  return (
    <Link href={`/edit/${plant.id}`}>
      <div className="relative h-96 overflow-hidden rounded-lg shadow outline-green-200 hover:outline-2">
        {plant.img ? (
          <Image
            height={400}
            width={400}
            src={plant.img}
            alt={plant.name}
            loader={({ src, width }) =>
              `${src}?img-format=webp&img-width=${width}`
            }
            className="h-full w-full rounded-lg object-cover object-center"
          />
        ) : (
          <div
            className={`h-full w-full bg-gradient-to-br ${getGradientByPlantId(
              plant.id,
            )}`}
          ></div>
        )}
        <div
          className={`${
            timeRemaining === "00:00:00"
              ? "animate-pulse bg-red-700/75"
              : "bg-green-900/50"
          } absolute top-2 right-2 rounded-4xl px-2 py-1 text-center text-xs/[1] font-semibold backdrop-blur-lg transition-colors`}
        >
          {timeRemaining}
        </div>
        <button
          onClick={handleWaterPlant}
          disabled={isWatering}
          className={`absolute top-2 left-2 cursor-pointer rounded-full p-2 text-white transition-all ${
            isWatering
              ? "cursor-wait bg-green-400/60"
              : "bg-gradient-to-br from-green-400/80 to-blue-400/80 shadow-md hover:from-green-400/90 hover:to-blue-400/90 hover:shadow-lg active:scale-95"
          } border border-white/20 backdrop-blur-md`}
          title="Water this plant"
        >
          <span className={`relative ${isWatering ? "animate-pulse" : ""}`}>
            <ShowerHead className="h-5 w-5" />
            {!isWatering && (
              <span className="absolute -top-1 -right-1 h-2 w-2 animate-ping rounded-full bg-blue-400 opacity-75"></span>
            )}
          </span>
        </button>

        <div className="absolute right-0 bottom-0 left-0 rounded-b-lg bg-green-600/30 p-4 text-center font-semibold backdrop-blur-lg">
          {plant.name}
        </div>
      </div>
    </Link>
  );
}
