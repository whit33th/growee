import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/containers/Sidebar/Sidebar";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${robotoSans.variable} antialiased`}>
          <ClerkLoaded>
            <div className="bg-background m-2 rounded-xl outline-2 outline-green-300">
              <Sidebar>{children}</Sidebar>
            </div>
            <Toaster richColors />
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
