import { Input } from "@/components/shadcn/ui/input";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { FormFieldProps, FieldInfo } from "./components";
import { twMerge } from "tailwind-merge";

export interface TextFormFieldProps<T> extends FormFieldProps<T> {
  inputOptions?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function TextFormField<T>({
  field,
  fieldKey,
  fieldlabel,
  inputOptions,
  className,
}: TextFormFieldProps<T>) {
  const inputClassname = twMerge(
    field.state.meta.errors.length > 0 ? "border-error-content" : "",
    className,
  );

  return (
    <div className="w-full">
      <label htmlFor={fieldKey} className="text-sm capitalize">
        {fieldlabel || fieldKey}
      </label>
      <Input
        id={fieldKey}
        name={fieldKey}
        placeholder={fieldlabel ? `enter ${fieldlabel}` : `enter ${fieldKey}`}
        {...inputOptions}
        className={inputClassname}
        value={field.state.value as string}
      />
      <FieldInfo field={field} />
    </div>
  );
}
export interface TextAreaFormFieldProps<T> extends FormFieldProps<T> {
  inputOptions?: React.InputHTMLAttributes<HTMLTextAreaElement>;
}

export function TextAreaFormField<T>({
  field,
  fieldKey,
  fieldlabel,
  inputOptions,
  className,
}: TextAreaFormFieldProps<T>) {
  const inputClassname = twMerge(
    field.state.meta.errors
      ? "bg-bg-default border-error-content"
      : "bg-bg-default",
    className,
  );
  return (
    <div className="w-full">
      <label htmlFor={fieldKey} className="text-sm capitalize">
        {fieldlabel || fieldKey}
      </label>
      <Textarea
        id={fieldKey}
        name={fieldKey}
        placeholder={fieldlabel ? `enter ${fieldlabel}` : `enter ${fieldKey}`}
        {...inputOptions}
        className={inputClassname}
        value={field.state.value as string}
        onBlur={field.handleBlur}
        // @ts-expect-error
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldInfo field={field} />
    </div>
  );
}
