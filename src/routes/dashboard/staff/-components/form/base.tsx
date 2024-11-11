import { UseMutationResult } from "@tanstack/react-query";

interface BaseStaffFormProps<T extends Record<string, any>> {
   mutation: UseMutationResult<
    any,
    Error,
    T,
    unknown
  >;
  row: T;
  afterSave?: () => void;
}
export function BaseStaffForm<T extends Record<string, any>>({}: BaseStaffFormProps<T>) {
  return (
    <form>
      <h1>BaseStaffForm</h1>
    </form>
  );
}


