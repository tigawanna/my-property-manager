import type { UseMutationResult } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface MutationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: React.ReactNode;
  mutation: UseMutationResult<any, any, any, any>;
  className?: string;
  loaderClassname?: string;
}

export function MutationButton({
  mutation,
  label,
  className,
  loaderClassname,
  ...props
}: MutationButtonProps) {
  return (
    <button
      className={twMerge(
        "btn btn-sm btn-wide  flex gap-2 justify-center items-center",
        className
      )}
      disabled={mutation.isPending}
      {...props}>
      {label || <div> Submit</div>}
      {mutation.isPending && <Loader className={twMerge("animate-spin", loaderClassname)} />}
    </button>
  );
}
