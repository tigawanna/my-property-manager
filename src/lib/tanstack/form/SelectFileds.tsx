import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { FormFieldProps } from "./components";
import * as Select from "@/components/park/ui/select";
export interface SelectFieldsProps<T, K extends keyof T> extends FormFieldProps<T> {
  inputOptions?: React.InputHTMLAttributes<HTMLTextAreaElement>;
  items: {
    label: string;
    value: T[K] extends string ? T[K] : string;
  }[];
}

export function SelectFields<T, K extends keyof T>({
  items,
  field,
  fieldKey,
  fieldlabel,
  inputOptions,
}: SelectFieldsProps<T, K>) {

  return (
    <Select.Root
      name={fieldKey}
      value={[field.state.value as string]}
      positioning={{ sameWidth: true }}
      items={items}
      onValueChange={({ value }) => {
        if (field) {
          field.handleChange(value[0] as any);
        }
      }}>
      <Select.Label>{fieldlabel}</Select.Label>
      {/* @ts-expect-error */}
      <Select.HiddenSelect {...inputOptions} />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={`Select ${fieldlabel}`} />
          <ChevronsUpDownIcon />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup>
            <Select.ItemGroupLabel>{fieldlabel}</Select.ItemGroupLabel>
            {items.map((item) => (
              <Select.Item key={item.value} item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}
