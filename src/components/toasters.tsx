import { CheckCircle2 } from 'lucide-react';
import toast,{ToastOptions} from 'react-hot-toast';

interface ToasterProps extends ToastOptions {
  title:string;
  message: string;
  duration?: number;
}
export function successToast({title,message,...props}: ToasterProps) {
return toast.custom((t) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex w-full max-w-md rounded-lg bg-success-content  text-success shadow-lg shadow-success ring-1 ring-success ring-opacity-5 dark:shadow-sm`}
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex justify-center items-center ">
          <div className="h-full flex-shrink-0 items-center justify-center pt-0.5">
            <CheckCircle2 className="aspect-square h-full text-success" />
          </div>
          <div className="ml-3 flex-1">
            <p className="font-medium">{title}</p>
            <p className="mt-1 text-sm">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-success">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="btn btn-ghost h-full w-full"
        >
          Close
        </button>
      </div>
    </div>
  );},{...props,position:"bottom-left"})
};
