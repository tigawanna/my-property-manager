import { FormLabel } from "@/components/park/ui/form-label";
import { Input } from "@/components/park/ui/input";
import { FormFieldProps, FieldInfo } from "./components";
import { Textarea } from "@/components/park/ui/textarea";
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
    className
  );

  return (
    <div className="w-full">
      <FormLabel htmlFor={fieldKey} className="capitalize">
        {fieldlabel || fieldKey}
      </FormLabel>
      <Input
        id={fieldKey}
        name={fieldKey}
        placeholder={fieldlabel ? `enter ${fieldlabel}` : `enter ${fieldKey}`}
        {...inputOptions}
        className={inputClassname}
        // @ts-expect-error
        value={field.state.value}
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
      ? "min-h-[100px] p-1 rounded-lg border-error-content"
      : "min-h-[100px] p-1 rounded-lg",
    className
  );
  return (
    <div className="w-full">
      <FormLabel htmlFor={fieldKey} className="capitalize">
        {fieldlabel || fieldKey}
      </FormLabel>
      <Textarea
        id={fieldKey}
        name={fieldKey}
        placeholder={fieldlabel ? `enter ${fieldlabel}` : `enter ${fieldKey}`}
        {...inputOptions}
        className={inputClassname}
        // @ts-expect-error
        value={field.state.value}
        onBlur={field.handleBlur}
        //   @ts-expect-error
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldInfo field={field} />
    </div>
  );
}
export function ResizeTextAreaFormField<T>({
  field,
  fieldKey,
  fieldlabel,
  inputOptions,
  className,
}: TextAreaFormFieldProps<T>) {
  const inputClassname = twMerge(
    field.state.meta.errors
      ? "min-h-[100px] p-1 rounded-lg border-error-content"
      : "min-h-[100px] p-1 rounded-lg",
    className
  );
  return (
    <div className="w-full flex flex-col gap-1">
      <FormLabel htmlFor={fieldKey} className="capitalize">
        {fieldlabel || fieldKey}
      </FormLabel>
      <ReactTextareaAutosize
        id={fieldKey}
        name={fieldKey}
        placeholder={fieldlabel ? `enter ${fieldlabel}` : `enter ${fieldKey}`}
        {...inputOptions}
        className={inputClassname}
        // @ts-expect-error
        value={field.state.value}
        onBlur={field.handleBlur}
        //   @ts-expect-error
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldInfo field={field} />
    </div>
  );
}

export interface ImageURLInputFieldProps<T> extends FormFieldProps<T> {
  inputOptions?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function ImageURLInputField<T>({
  field,
  fieldKey,
  fieldlabel,
  inputOptions,
  className,
}: ImageURLInputFieldProps<T>) {
  const inputClassname = twMerge(
    field.state.meta.errors.length > 0 ? "border-error-content" : "",
    className
  );
  const value = field.state.value as string;
  return (
    <div className="w-full">
      <FormLabel htmlFor={fieldKey} className="capitalize">
        {fieldlabel || fieldKey}
      </FormLabel>
      <img src={value ?? ""} key={value} />
      <Input
        id={fieldKey}
        name={fieldKey}
        placeholder={fieldlabel ? `enter ${fieldlabel}` : `enter ${fieldKey}`}
        {...inputOptions}
        size="md"
        className={inputClassname}
        value={value}
      />
      <FieldInfo field={field} />
    </div>
  );
}
