import { pinata } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 },
      );
    }
    console.log("Pinata client initialized:", !!pinata);

    try {
      const { cid } = await pinata.upload.public.file(imageFile);
      const url = await pinata.gateways.public.convert(cid);

      return NextResponse.json(url, { status: 200 });
    } catch (pinataError) {
      console.error("Pinata API error:", pinataError);
      return NextResponse.json(
        { error: "Failed to upload to Pinata", details: pinataError },
        { status: 502 },
      );
    }
  } catch (e) {
    console.error("Image upload error:", e);
    return NextResponse.json(
      { error: "Internal Server Error", details: e },
      { status: 500 },
    );
  }
}
