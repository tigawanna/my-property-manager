

import { UseMutationResult } from "@tanstack/react-query";

interface BaseTodosFormProps<T extends Record<string, any>> {
  mutation: UseMutationResult<
    any,
    Error,
    T,
    unknown
  >;
  row: T;
  afterSave?: () => void;
}
export function BaseTodosForm<T extends Record<string, any>>(
  {}: BaseTodosFormProps<T>,
) {
  return (
    <form>
      <h1>BaseTodosForm</h1>
    </form>
  );
}
 
 