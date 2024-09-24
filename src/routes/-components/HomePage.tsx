import { successToast } from "@/components/toasters";

export function HomePage(){
return (
  <div className="flex h-full w-full flex-col items-center justify-center">
    <h3 className="text-2xl font-bold">Welcome Home!</h3>
    <button className="btn btn-success" onClick={() => {successToast({
      title: "Success",
      message: "This is a success toast",
    })}}>success toast</button>
  </div>
);
}
