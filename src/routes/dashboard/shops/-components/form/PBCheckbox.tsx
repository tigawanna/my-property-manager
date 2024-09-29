import { Checkbox } from "@/components/shadcn/ui/checkbox";

interface PBCheckboxProps<T extends Record<string, any>> {
  fieldKey: string;
  fieldLabel: string;
  input: T;
  setInput: React.Dispatch<React.SetStateAction<T>>;
}

export function PBCheckbox<T extends Record<string, any>>({
  fieldLabel,
  fieldKey,
  input,
  setInput,
}: PBCheckboxProps<T>) {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2">
      <Checkbox
        id={fieldKey}
        value={input[fieldKey]}
        onCheckedChange={() => {
          setInput((prev) => ({ ...prev, [fieldKey]: !input[fieldKey] }));
        }}
      />
      <label
        htmlFor={fieldKey}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {fieldLabel}
      </label>
    </div>
  );
}
