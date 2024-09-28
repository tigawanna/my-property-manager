import type { ClientResponseError } from "pocketbase";

interface ReturnedUseQueryErorProps {
  error: ClientResponseError|Error|null;
}

export function PBReturnedUseQueryError({ error}: ReturnedUseQueryErorProps) {
  return (
    <div className="h-full flex items-center justify-center border p-[2%] text-sm rounded-lg bg-error-content">
      {error && (
        <div className="rounded-lg  p-2 text-error">{error.message}</div>
      )}
    </div>
  );
}
