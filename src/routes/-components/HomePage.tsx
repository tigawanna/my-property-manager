import { makeHotToast } from "@/components/toasters";
import { RealTimeClock } from "./RealTimeClock";

export function HomePage() {
  return (
    <div className="flex min-h-screen h-full w-full flex-col items-center justify-center">
      <RealTimeClock/>
    </div>
  );
}
