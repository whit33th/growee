import Image from "next/image";
import Link from "next/link";
import FrogOnFlower from "../components/UI/svg/FrogOnFlower";

export default function Home() {
  interface Plant {
    id: number;
    name: string;
    img?: string;
  }

  const plants: Plant[] = [
    // { id: 1, name: "Rose" },
    // { id: 2, name: "Tulip" },
    // { id: 3, name: "Sunflower", img: "/img/plants/2.png" },
    // { id: 4, name: "Lily", img: "/img/plants/1.png" },
    // { id: 5, name: "Orchid" },
    // { id: 6, name: "Daisy" },
    // { id: 7, name: "Cactus" },
    // { id: 8, name: "Fern" },
    // { id: 9, name: "Bamboo" },
    { id: 10, name: "Aloe Vera" },
  ];

  // Function to get gradient based on plant ID
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
    <div className="flex h-full">
      {plants.length > 0 ? (
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
          {plants.map((plant) => (
            <Link key={plant.id} href={`/plant/${plant.id}`}>
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
                  3:21:21
                </div>
                <div className="absolute right-0 bottom-0 left-0 rounded-b-lg bg-green-600/30 p-4 text-center font-semibold backdrop-blur-lg">
                  {plant.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <FrogOnFlower message="No plants found. Add some beautiful plants to your collection!" />
        </div>
      )}
    </div>
  );
}
