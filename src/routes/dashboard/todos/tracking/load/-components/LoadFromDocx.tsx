import { Suspense } from "react";
import { LoadedTrackingSheet } from "./LoadedTrackingSheet";

interface LoadFromDocxPageProps {

}

export function LoadFromDocxPage({}:LoadFromDocxPageProps){
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
    <h1 className='text-2xl font-bold'>Load From Docx</h1>
    <Suspense fallback={<div>Loading...</div>}>
        <LoadedTrackingSheet/>
    </Suspense>

 </div>
);
}
