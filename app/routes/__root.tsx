import { createRootRoute } from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import * as React from "react";
import globalsCss from "@/styles/globals.css?url";
import { QuokaDock } from "@/components/QuokaDock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Route = createRootRoute({
  staticData: {
    dock: null,
  },
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: "Quoka | The cutest data tool",
    },
  ],
  component: RootComponent,
  links: () => [
    { rel: "stylesheet", href: globalsCss },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap",
    },
  ],
});

function RootComponent() {
  const queryClient = new QueryClient();

  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <div className="w-screen h-screen">
          <Outlet />
          <QuokaDock />
        </div>
      </QueryClientProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  );
}
