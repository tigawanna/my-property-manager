import { makeHotToast, successToast } from "@/components/toasters";
import { useState } from "react";

export function HomePage(){
const [toastcount, setToastcount] = useState(1)
return (
  <div className="flex h-full w-full flex-col items-center justify-center">
    <h3 className="text-2xl font-bold">Welcome Home!</h3>
    <button className="btn btn-success" onClick={() => {
      makeHotToast({title:"success toast",message:"success toast",variant:"success"})
    }}>success toast</button>

    <button className="btn btn-info" onClick={() => {
      makeHotToast({title:"info toast",message:"info toast",variant:"info"})
    }}>success toast</button>

    <button className="btn btn-error" onClick={() => {
      makeHotToast({title:"error toast",message:"error toast",variant:"error"})
    }}>success toast</button>
    <button className="btn btn-warning" onClick={() => {
      makeHotToast({title:"warning toast",message:"warning toast",variant:"warning"})
    }}>success toast</button>
  </div>
);
}
