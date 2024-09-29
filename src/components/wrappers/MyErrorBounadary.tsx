import { concatErrors } from "@/utils/concaterrors";
import { RotateCcw } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

interface MyErrorBounadaryProps {
    children?: React.ReactNode;
}

export function MyErrorBounadary({children}: MyErrorBounadaryProps) {
  return (
    <ErrorBoundary
    
      FallbackComponent={({ error, resetErrorBoundary }) => {
        return (
          <div className="m-1 flex h-full w-[90%] items-center justify-center p-2">
            <div className="m-1 flex h-full w-full items-center justify-center rounded-lg bg-error/5 p-2">
              <p className="p-[5%] text-center text-lg text-error">
                {concatErrors(error.message)}
              </p>
            </div>
            <button onClick={resetErrorBoundary} className="bnt-sm btn">
              <RotateCcw className="size-4" />
            </button>
          </div>
        );
      }}>
      {children}
    </ErrorBoundary>
  );
}
