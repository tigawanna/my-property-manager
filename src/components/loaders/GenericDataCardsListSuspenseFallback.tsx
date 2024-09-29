import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

interface CardsListSuspenseFallbackProps {
  cards?: number;
  cardClassName?: string;
  containerClassName?: string;
}

export function CardsListSuspenseFallback({
  cardClassName,
  containerClassName,
  cards = 12,
}: CardsListSuspenseFallbackProps) {
  // const colsVariants = cva(
  //   "h-[80%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full  justify-center gap-4 ",
  //   {
  //     variants: {
  //       variant: {
  //         default:
  //           "h-56 hover:via-secondary/30 hover:scale-95 hover:duration-300 hover:ease-in-out hover:text-primary w-[95%] sm:w-[45%] lg:w-[30%] rounded-xl to-base-200",
  //         wide: "w-full ",
  //         disabled:
  //           " hover:via-secondary/30 hover:text-primary w-[95%] sm:w-[45%] lg:w-[30%] rounded-xl to-primary",
  //       },
  //     },
  //     defaultVariants: {
  //       variant: "default",
  //     },
  //   },
  // );
  return (
    <ul
      className={twMerge(
        "grid h-[80%] w-full grid-cols-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-4",
        containerClassName,
      )}
    >
      {Array.from({ length: cards }).map((_, i) => (
        <li
          key={i}
          className={twMerge(
            "skeleton flex h-56 w-full flex-col gap-2 rounded-lg bg-base-300/70 p-2",
            cardClassName,
          )}
        />
      ))}
    </ul>
  );
}
