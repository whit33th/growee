"use client";

import Input from "@/components/UI/inputs/Input";
import React, { useActionState, useEffect, useState } from "react";
import FileInput from "@/components/UI/inputs/FileInput";
import { FileImage, Flower, Flower2, Trash2 } from "lucide-react";
import Image from "next/image";
import Button from "@/components/UI/buttons/Button";
import updatePlant from "@/helpers/func/prismaActions/updatePlant";
import deletePlant from "@/helpers/func/prismaActions/deletePlant";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePlantDetails } from "@/hooks/usePlantDetails";

export default function EditPlantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params with React.use()
  const resolvedParams = React.use(params);
  const plantId = parseInt(resolvedParams.id);

  const { plant, isLoading, error } = usePlantDetails(plantId);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (plant?.img) {
      setSelectedImage(plant.img);
    }
  }, [plant]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const [state, dispatch, isPending] = useActionState(updatePlant, null);

  useEffect(() => {
    if (state?.redirect) {
      toast.success("Plant updated successfully!");
      router.push("/");
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router, plantId]);

  const handleDeletePlant = async () => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      try {
        const result = await deletePlant(plantId);
        if (result.success) {
          toast.success("Plant deleted successfully!");
          router.push("/");
        } else {
          toast.error(result.error || "Failed to delete plant");
        }
      } catch (e) {
        toast.error("An error occurred while deleting the plant");
        console.error("Error deleting plant:", e);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-100 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !plant) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-green-100">
          Failed to load plant details
        </h1>
        <p className="text-green-100">{error || "Plant not found"}</p>
        <Button className="bg-green-200" onClick={() => router.push("/")}>
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col-reverse gap-4 md:flex-row">
      {/* Form Section */}
      <div className="flex max-w-lg flex-1 flex-col rounded-xl bg-white p-4 md:p-5 lg:min-w-[400px]">
        <h1 className="mb-4 text-center text-2xl font-bold text-green-800 md:text-3xl">
          Edit Plant
        </h1>

        <form action={dispatch} className="flex flex-1 flex-col gap-4">
          <input type="hidden" name="id" value={plant.id} />
          <Input
            id="title"
            placeholder="e.g Aloe Vera"
            label="Plant Name"
            defaultValue={plant.name}
          />
          <Input
            id="interval"
            type="number"
            placeholder="3"
            label="Watering Interval (days)"
            defaultValue={plant.interval.toString()}
          />
          <FileInput
            id="image"
            label="Image (optional)"
            className="flex-1"
            onChange={handleImageChange}
          />
          <Button
            disabled={isPending}
            className="bg-green-200 py-1.5"
            type="submit"
          >
            <Flower size={20} />
            <span>Save Changes</span>
            <Flower2 size={20} />
          </Button>
          <Button
            onClick={() => {
              handleDeletePlant();
            }}
            disabled={isPending}
            className="!bg-red-200 py-1.5 !text-red-800"
            type="button"
          >
            <Trash2 size={20} />
            <span>Delete</span>
          </Button>
        </form>
      </div>

      {/* Image Preview Section */}
      <div
        className={`flex h-[250px] items-center justify-center rounded-xl bg-white md:h-auto md:flex-1 ${
          selectedImage ? "border-2 border-green-300" : ""
        }`}
      >
        {selectedImage ? (
          <div className="h-full w-full overflow-hidden">
            <Image
              src={selectedImage}
              alt="Selected plant"
              width={500}
              height={500}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-4">
            <div className="mb-2 rounded-full bg-green-100 p-4 md:mb-4 md:p-6">
              <FileImage className="h-10 w-10 text-green-500 md:h-12 md:w-12" />
            </div>
            <p className="text-center text-base font-semibold text-green-700 md:text-lg">
              Plant image will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
