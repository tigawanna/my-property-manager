

import {  PropertyTodosUpdate } from "@/lib/pb/pb-types";
import { TextAreaFormField, TextFormField } from "@/lib/tanstack/form/TextFields";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useForm } from "@tanstack/react-form";
import { UseMutationResult } from "@tanstack/react-query";

type PropertyTodosUpdatePartial = Partial<PropertyTodosUpdate>;
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
  const {viewer} = useViewer()
  const form = useForm<PropertyTodosUpdatePartial>({
    defaultValues: {
      title: "",
      description: "",
      participants: "",
      author: viewer?.id??"",
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex h-full w-full flex-col  items-center justify-center gap-5"
    >
            <div className="flex h-full w-full flex-col items-center justify-center gap-5">
              {/* amount */}
              <div className="form-control w-full ">
                <form.Field name="title">
                  {(field) => {
                    return (
                      <input
                        type="text"
                        placeholder="Enter title"
                        className="w-full bg-transparent border-none outline-none text-2xl"
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                      />
                    );
                  }}
                </form.Field>
              </div>
              <div className="form-control w-full ">
                <form.Field name="description">
                  {(field) => {
                    return (
                      <TextAreaFormField<PropertyTodosUpdatePartial>
                        field={field}
                        fieldKey="description"
                        fieldlabel="Description"
                        inputOptions={{
                          onChange: (e) => {
                            field.handleChange(e.target.value);
                          },
  
                        }}
                      />
                    );
                  }}
                </form.Field>
              </div>
              <div className="form-control w-full">
                <div className="badge badge-secondary badge-outline">{viewer?.username}</div>
                <form.Field name="participants">
                  {(field) => {
                    return (
                      <TextAreaFormField<PropertyTodosUpdatePartial>
                        field={field}
                        fieldKey="participants"
                        fieldlabel="Participants"
                        inputOptions={{
                          onChange: (e) => {
                            field.handleChange(e.target.value);
                          },
  
                        }}
                      />
                    );
                  }}
                </form.Field>
              </div>
            </div>
    </form>
  );
}
 
 