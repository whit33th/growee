import { ImageIcon } from "lucide-react";
import React from "react";

interface IFileInput {
  className?: string;
  label: string;
  id: string;
  accept?: string;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInput({
  className = "",
  label,
  id,
  accept = "image/*",
  helperText = "PNG, JPG, GIF up to 10MB",
  onChange,
}: IFileInput) {
  return (
    <div className={`flex w-full flex-col gap-1 ${className}`}>
      <label
        htmlFor={id}
        className="text-sm font-semibold text-green-800 2xl:text-base"
      >
        {label}
      </label>
      <div className="relative w-full flex-1 cursor-pointer rounded-xl border-2 border-green-300 bg-white transition-colors focus-within:border-green-400 hover:bg-green-50">
        <input
          type="file"
          id={id}
          name={id}
          accept={accept}
          className="sr-only"
          onChange={onChange}
        />
        <label
          htmlFor={id}
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center px-4 py-6"
        >
          <ImageIcon className="mb-2 h-10 w-10 text-green-400" />
          <p className="text-sm text-green-700">
            Click to upload {label.toLowerCase()}
          </p>
          <p className="mt-1 text-xs text-green-500">{helperText}</p>
        </label>
      </div>
    </div>
  );
}
