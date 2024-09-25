import { successToast } from "@/components/toasters";
import { useState } from "react";

export function HomePage(){
    const [toastcount, setToastcount] = useState(1)
return (
  <div className="flex h-full w-full flex-col items-center justify-center">
    <h3 className="text-2xl font-bold">Welcome Home!</h3>
    <button className="btn btn-success" onClick={() => {

    successToast({
      title: `Toast ${toastcount}`,
      message: "This is a success toast",
    })
    setToastcount(toastcount + 1)
    }}>success toast</button>
  </div>
);
}
