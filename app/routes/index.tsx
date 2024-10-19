import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import { useFile } from "@/hooks/useFile";
import { useQuery } from "@tanstack/react-query";
import { useCount } from "@/hooks/useCount";

export const Route = createFileRoute("/")({
  staticData: {
    dock: {
      href: "/",
      icon: HomeIcon,
      label: "Home",
    },
  },
  component: Home,
});

function Home() {
  const router = useRouter();
  const { count, incrementByOne } = useCount();

  const state = Route.useLoaderData();
  const {
    isSupported,
    fileWithHandle,
    isLoading,
    content,
    reload,
    open,
    reset,
  } = useFile(["text/plain"]);

  return (
    <div className="flex items-center justify-center h-full flex-col gap-3">
      {count && (
        <Button
          onClick={() => {
            console.log("Clicking increment");
            incrementByOne();
          }}
        >
          Add 1 to {count}?
        </Button>
      )}

      <Button onClick={open} disabled={!isSupported}>
        Open file
      </Button>
      <Button onClick={reset} disabled={!fileWithHandle}>
        Reset file
      </Button>
      <Button onClick={reload} disabled={!fileWithHandle}>
        Reload content
      </Button>

      {fileWithHandle && <p>{fileWithHandle.name}</p>}
      {fileWithHandle &&
        (isLoading ? <p>Loading</p> : <p>{content ?? "No content"}</p>)}
    </div>
  );
}
