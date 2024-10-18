import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QuokaDockItem } from "./components/QuokaDock";

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }

  interface StaticDataRouteOption {
    dock: QuokaDockItem | null;
  }
}
