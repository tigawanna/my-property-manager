interface OneTenantPageProps {
tenant:string
}

export function OneTenantPage({tenant}:OneTenantPageProps){
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
 <div className='text-4xl'>
    {tenant}
 </div>
 </div>
);
}
