import { Plant } from "@prisma/client";
import FrogOnFlower from "../components/UI/svg/FrogOnFlower";
import PlantCard from "@/components/containers/Cards/PlantCard";

export default function Home() {
  const plants: Plant[] = [];

  return plants.length > 0 ? (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  ) : (
    <div className="flex h-full flex-1 items-center justify-center">
      <FrogOnFlower message="No plants found. Add some beautiful plants to your collection!" />
    </div>
  );
}
