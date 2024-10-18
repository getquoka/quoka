import React from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@tanstack/react-router";
import { Dock, DockIcon } from "./ui/dock";
import { cn } from "@/lib/utils";
import { routeTree } from "@/routeTree.gen";

export type QuokaDockItem = {
  href: string;
  icon: React.ElementType;
  label: string;
};

export const QuokaDock = () => {
  if (!routeTree.children) return null;

  const items = Object.keys(routeTree.children)
    .map((routeKey: keyof typeof routeTree.children) => {
      const dock = routeTree.children![routeKey].options.staticData?.dock;
      if (dock) {
        return dock;
      }
    })
    .filter((item): item is QuokaDockItem => !!item);

  return (
    <TooltipProvider>
      <Dock
        direction="middle"
        className="absolute bottom-8 mx-auto left-0 right-0"
      >
        {items.map((item) => (
          <DockIcon key={item.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  aria-label={item.label}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full",
                  )}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </TooltipProvider>
  );
};
