import Button from "@/components/UI/buttons/Button";
import Logo from "@/components/UI/svg/Logo";
import { Flower2, Plus, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Sidebar({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const nav = [
    { name: "Dashboard", href: "/", icon: <Flower2 size={18} /> },
    { name: "Settings", href: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex h-[calc(100vh-16px)] w-full overflow-hidden">
      <aside className="flex w-56 flex-col justify-between rounded-l-xl bg-green-200 text-green-900">
        <div>
          <div className="flex flex-col items-center justify-center rounded-tl-xl border-b-2 border-b-green-300 bg-green-100 text-base/[1] font-semibold text-green-900">
            <Logo />
            <span className="pb-2">Groowee</span>
          </div>
          <section className="p-2">
            <Button className="">
              <Plus size={20} />
              <span className="font-semibold">Plant</span>
            </Button>

            <ul className="mt-2 flex flex-col gap-2 rounded-lg bg-green-100 p-2">
              {nav.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-green-200"
                  >
                    {item.icon}
                    <span className="text-sm font-semibold">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="flex items-center gap-3 rounded-bl-xl bg-green-100 p-3">
          <Image
            src="/img/grey.png"
            width={36}
            height={36}
            className="rounded-full"
            alt="profile"
          />
          <p>Daniil</p>
        </div>
      </aside>
      <main className="h-full w-full flex-1 overflow-y-auto p-4 text-green-50">
        {children}
      </main>
    </div>
  );
}
