"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Cloud,
  LayoutGrid,
  Folder,
  Users,
  History,
  Star,
  Archive,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutGrid, path: "/" },
  { name: "Files", icon: Folder, path: "/files" },
  { name: "Team", icon: Users, path: "/team" },
  { name: "Recent", icon: History, path: "/recent" },
  { name: "Favorites", icon: Star, path: "/favorites" },
  { name: "Archive", icon: Archive, path: "/archive" },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-24 bg-white border-r border-zinc-100 flex flex-col items-center py-8">
      <div className="mb-10">
        <div className="bg-blue-50 p-2.5 rounded-2xl">
          <Cloud size={22} className="text-blue-500" />
        </div>
      </div>

      <ul className="flex flex-col gap-4 items-center w-full">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`group flex items-center justify-center rounded-2xl transition-all
                  ${
                    isActive
                      ? "bg-blue-500 text-white p-3 shadow-sm shadow-blue-200/60"
                      : "text-zinc-400 hover:text-blue-500 hover:bg-blue-50 p-2.5"
                  }`}
              >
                <item.icon
                  size={20}
                  className="transition-transform group-hover:scale-110"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
