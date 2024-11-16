

import { UseMutationResult } from "@tanstack/react-query";

interface BaseTrackingFormProps<T extends Record<string, any>> {
  mutation: UseMutationResult<
    any,
    Error,
    T,
    unknown
  >;
  row: T;
  afterSave?: () => void;
}
export function BaseTrackingForm<T extends Record<string, any>>(
  {}: BaseTrackingFormProps<T>,
) {
  return (
    <form>
      <h1>BaseTrackingForm</h1>
    </form>
  );
}
 
 