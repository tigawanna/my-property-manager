import { Suspense } from "react";
import { LoadedTrackingSheet } from "./LoadedTrackingSheet";
import { GeneriicTableSkeleton } from "@/components/wrappers/GeneriicTableSkeleton";
import { LoadFromDocxModal } from "./LoadDocument";

interface LoadFromDocxPageProps {

}

export function LoadFromDocxPage({}:LoadFromDocxPageProps){
return (
  <div className="flex h-full w-full flex-col items-center justify-center gap-3">
    <div className="flex w-[90%] items-center justify-between">
    <h1 className="text-2xl font-bold">Load From Docx</h1>
      <LoadFromDocxModal />
    </div>
    <Suspense fallback={<GeneriicTableSkeleton />}>
      <LoadedTrackingSheet />
    </Suspense>
  </div>
);
}
