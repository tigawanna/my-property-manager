import { makeHotToast } from "@/components/toasters";
import { RealTimeClock } from "./RealTimeClock";

export function HomePage() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
      <RealTimeClock />
    </div>
  );
}
