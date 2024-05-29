"use client"

import { Separator } from '@/components/ui/separator'
import clsx from 'clsx'
import {
  BookA,
  BookCheck,
  Globe,
  Home,
  NetworkIcon,
  Pen,
  Settings,
  Table
} from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: "/cms", label: "Dashboard", icon: Home },
  { href: "/cms/documents", label: "My Documents", icon: BookCheck },
  { href: "/cms/publish", label: "Publish Article", icon: BookA },
  { href: "/cms/author", label: "Create Author", icon: Pen },
  { href: "/cms/category", label: "Create Category", icon: Table },
  { href: "/cms/sites", label: "Site(s)", icon: Globe, },
  { href: "/cms/api", label: "API", icon: NetworkIcon },
  { href: "/cms/settings", label: "Settings", icon: Settings },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="lg:block hidden border-r h-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[55px] items-center justify-between border-b px-3 w-full">
          <Link className="flex items-center gap-2 font-semibold ml-1" href="/">
            <span className="text-md">tsafi</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navItems.map(({ href, label, icon: Icon }, index: number) => (
              <div key={href}>
                <Link

                  className={clsx(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    {
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50": pathname === href || (href !== "/cms" && pathname.startsWith(href))
                    }
                  )}
                  href={href}
                >
                  <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                    <Icon className="h-3 w-3" />
                  </div>
                  {label}
                </Link>
               {index === 4 && <Separator className="my-[0.75rem]" />}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
