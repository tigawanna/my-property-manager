import { twMerge } from "tailwind-merge";

interface CardsListSuspenseFallbackProps {
  cards?: number;
  cardClassName?: string;
}

export function CardsListSuspenseFallback({
  cardClassName,
  cards = 12,
}: CardsListSuspenseFallbackProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <div className="w-[90%] flex items-center justify-between gap-3">
        <div className="h-8 w-[10%] skeleton bg-base-300 p-2 rounded-lg" />
        <div className="h-8 w-[20%] skeleton bg-base-300 p-2 rounded-lg" />
      </div>
      <ul className="w-full h-[80%]  flex flex-wrap justify-center gap-4">
        {Array.from({ length: cards }).map((_, i) => (
          <li
            key={i}
            className={twMerge("h-56 w-[95%] md:w-[40%] lg:w-[30%] flex flex-col bg-base-300/70 skeleton p-2 gap-2 rounded-lg",cardClassName)}
          />
        ))}
      </ul>
    </div>
  );
}
