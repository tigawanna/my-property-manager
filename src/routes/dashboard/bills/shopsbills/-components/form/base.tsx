

import { UseMutationResult } from "@tanstack/react-query";

interface BaseShopsbillsFormProps<T extends Record<string, any>> {
  mutation: UseMutationResult<any,Error,T,unknown>;
  row: T;
  afterSave?: () => void;
}
export function BaseShopsbillsForm<T extends Record<string, any>>(
  {}: BaseShopsbillsFormProps<T>,
) {
  return (
    <form>
      <h1>BaseShopsbillsForm</h1>
    </form>
  );
}
 
 