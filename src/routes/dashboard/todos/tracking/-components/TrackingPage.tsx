import { LoadDocument } from "./LoadDocument";

interface TrackingPageProps {

}

export function TrackingPage({}:TrackingPageProps){
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
    <h1 className='text-2xl font-bold'>Tracking Page</h1>
    <p className='text-lg'>This is the tracking page</p>
    <LoadDocument/>
 </div>
);
}
