import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/list/")({
  component: () => {
    return (
      <div className="flex h-full min-h-screen w-full items-center justify-center gap-2">
        <ul className="flex justify-center items-center flex-wrap gap-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <Link 
            className=" w-[30%] flex-grow bg-base-300 text-primary hover:brightness-110 p-5 rounded-lg" 
            to="/list/$item/item-modal" 
            params={{ item: `${i}` }}>
              item {i}
            </Link>
          ))}
          <li></li>
        </ul>
      </div>
    );
  },
});
