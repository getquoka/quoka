/// <reference types="vinxi/types/client" />
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/start";
import { createRouter } from "./router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

posthog.init(import.meta.env.VITE_POSTHOG_API_TOKEN!, {
  api_host: import.meta.env.VITE_POSTHOG_API_HOST,
  autocapture: true,
});

const router = createRouter();

hydrateRoot(
  document.getElementById("root")!,
  <PostHogProvider client={posthog}>
    <StartClient router={router} />
  </PostHogProvider>,
);
