import { useEffect, useState } from "react";
import { Plant } from "@prisma/client";

export function usePlantDetails(plantId: number) {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlantDetails() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/plants/${plantId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch plant: ${response.statusText}`);
        }

        const data = await response.json();
        setPlant(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching plant details:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load plant details",
        );
        setPlant(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (plantId) {
      fetchPlantDetails();
    }
  }, [plantId]);

  return { plant, isLoading, error };
}
