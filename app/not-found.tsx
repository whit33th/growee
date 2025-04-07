import React from "react";
import NotFoundFrog from "@/components/UI/svg/NotFoundFrog";
import Button from "@/components/UI/buttons/Button";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mb-4">
        <NotFoundFrog />
      </div>

      <h1 className="mb-4 text-4xl font-bold text-green-50">Page Not Found</h1>
      <p className="mb-6 text-green-100">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>

      <Button link href="/" className="w-fit">
        Go Home
      </Button>
    </div>
  );
}
