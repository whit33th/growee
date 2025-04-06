"use client";
import getTimeRemaining from "@/helpers/func/getTimeRemaining";
import { Plant } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PlantCard({ plant }: { plant: Plant }) {
  const [timer, setTimer] = useState(
    getTimeRemaining(plant.nextWaterDate.toISOString()),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer(getTimeRemaining(plant.nextWaterDate.toISOString()));
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

  return (
    <Link href={`/plant/${plant.id}`}>
      <div className="relative h-96 overflow-hidden rounded-lg shadow outline-green-200 hover:outline-2">
        {plant.img ? (
          <Image
            height={400}
            width={400}
            src={plant.img}
            alt={plant.name}
            className="h-full w-full rounded-lg object-cover object-center"
          />
        ) : (
          <div
            className={`h-full w-full bg-gradient-to-br ${getGradientByPlantId(
              plant.id,
            )}`}
          ></div>
        )}
        <div className="absolute top-2 right-2 rounded-4xl bg-green-900/50 px-2 py-1 text-center text-xs/[1] font-semibold backdrop-blur-lg">
          {timer}
        </div>
        <div className="absolute right-0 bottom-0 left-0 rounded-b-lg bg-green-600/30 p-4 text-center font-semibold backdrop-blur-lg">
          {plant.name}
        </div>
      </div>
    </Link>
  );
}
