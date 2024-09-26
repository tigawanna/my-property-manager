import { concatErrors } from "@/utils/concaterrors";




interface ErrorOutputProps {
  error: {
    name: string;
    message: string;
  };
}

export function ErrorOutput({ error }: ErrorOutputProps) {
  // console.log("error ", error);
  return (
    <div className="w-[90%] h-full flex items-center justify-center m-1 p-2 ">
    <div className="w-full h-full flex items-center justify-center m-1 p-2 bg-error/5  rounded-lg">
      <p className="text-center  p-[5%] text-error text-lg">
        {concatErrors(error.message)}
        {/* {JSON.stringify(concatErrors(error))} */}
      </p>
    </div>
    </div>
  );
}
