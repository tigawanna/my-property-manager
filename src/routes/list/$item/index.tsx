import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/list/$item/")({
  component: () => {
    const { item } = useParams({ from: "/list/$item/" });
    return (
      <div className="flex h-full min-h-screen w-full items-center justify-center text-6xl font-bold">
        item: {item}
      </div>
    );
  },

});
