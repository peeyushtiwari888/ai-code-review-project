"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Folder,
  GearSix,
  GithubLogo,
  House,
} from "@phosphor-icons/react";

import {
  DASHBOARD_NAV_ITEMS,
  type DashboardRoute,
} from "@/features/dashboard/lib/routes";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const NAV_ICONS = {
  "layout-dashboard": House,
  "folder-git-2": Folder,
  github: GithubLogo,
  settings: GearSix,
} as const;

function isNavActive(pathname: string, href: DashboardRoute) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {DASHBOARD_NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.icon];
            const active = isNavActive(pathname, item.href);

            return (
              <SidebarMenuItem key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active 
                      ? "bg-ai-cyan/10 text-ai-cyan" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn("size-4 shrink-0", active && "text-ai-cyan")} />
                  <span className="truncate">{item.title}</span>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
