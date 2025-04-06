"use client";

import Input from "@/components/UI/inputs/Input";
import React, { useActionState, useState } from "react";
import FileInput from "@/components/UI/inputs/FileInput";
import { FileImage, Flower, Flower2 } from "lucide-react";
import Image from "next/image";
import Button from "@/components/UI/buttons/Button";
import addPlant from "@/helpers/func/prismaActions/addPlant";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };
  const [state, dispatch, isPending] = useActionState(addPlant, null);

  console.log("State:", state);
  return (
    <div className="flex h-full flex-col-reverse gap-4 md:flex-row">
      {/* Form Section */}
      <div className="flex max-w-lg flex-1 flex-col rounded-xl bg-white p-4 md:p-5 lg:min-w-[400px]">
        <h1 className="mb-4 text-center text-2xl font-bold text-green-800 md:text-3xl">
          Add new Plant
        </h1>

        <form action={dispatch} className="flex flex-1 flex-col gap-4">
          <Input id="title" placeholder="e.g Aloe Vera" label="Plant Name" />
          <Input
            id="interval"
            type="number"
            placeholder="3"
            label="Watering Interval (days)"
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
            <span>Add</span>
            <Flower2 size={20} />
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
