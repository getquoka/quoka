import * as fs from "fs";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import { supported } from "browser-fs-access";

const filePath = "count.txt";

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "0"),
  );
}

const getCount = createServerFn("GET", () => {
  return readCount();
});

const updateCount = createServerFn("POST", async (addBy: number) => {
  const count = await readCount();
  await fs.promises.writeFile(filePath, `${count + addBy}`);
});

export const Route = createFileRoute("/")({
  staticData: {
    dock: {
      href: "/",
      icon: HomeIcon,
      label: "Home",
    },
  },
  component: Home,
  loader: async () => await getCount(),
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <div className="flex items-center justify-center h-full">
      <Button
        onClick={() => {
          updateCount(1).then(() => {
            router.invalidate();
          });
        }}
      >
        Add 1 to {state}?
      </Button>

      <Button onClick={() => {}} disabled={!supported}>
        Open file
      </Button>
    </div>
  );
}
