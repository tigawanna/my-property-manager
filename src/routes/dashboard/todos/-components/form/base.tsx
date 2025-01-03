import { PBPickRelationField } from "@/lib/pb/components/PBrelationPicker";
import { PropertyTodosUpdate, PropertyUserResponse } from "@/lib/pb/pb-types";
import { FieldInfo } from "@/lib/tanstack/form/components";
import {
  TextAreaFormField,
  TextFormField,
} from "@/lib/tanstack/form/TextFields";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useForm } from "@tanstack/react-form";
import { UseMutationResult } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";

type PropertyTodosUpdatePartial = Partial<PropertyTodosUpdate>;
interface BaseTodosFormProps<T extends Record<string, any>> {
  mutation: UseMutationResult<any, Error, T, unknown>;
  row?: T;
  afterSave?: () => void;
}
type TodosExpansion = {
  participants: PropertyUserResponse[];
  author: PropertyUserResponse[];
};

export function BaseTodosForm<T extends Record<string, any>>({
  row,
  mutation,
  afterSave,
}: BaseTodosFormProps<T>) {
  const { viewer } = useViewer();
  const [expansions, setExpansions] = useState<TodosExpansion>({
    participants: [],
    author: [viewer as PropertyUserResponse],
  });
  const form = useForm<PropertyTodosUpdatePartial>({
    defaultValues: {
      title: row?.title ?? "",
      description: row?.description ?? "",
      participants: row?.participants ?? [],
      author: row?.author ?? viewer?.id ?? "",
    },
    onSubmit: async ({ value }) => {
      // @ts-expect-error
      mutation.mutate(value);
      afterSave?.();
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex h-full w-full flex-col items-center justify-center gap-5"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-5">
        {/* amount */}
        <div className="form-control w-full">
          <form.Field name="title">
            {(field) => {
              return (
                <input
                  type="text"
                  placeholder="Enter title"
                  className="w-full border-none bg-transparent text-2xl outline-none"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
              );
            }}
          </form.Field>
        </div>
        <div className="form-control w-full">
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
        {/* <div className="form-control w-full">
          <form.Field name="author">
            {(field) => {
              return (
                <div className="flex gap-1">
                  <label htmlFor={field.name}>Owner</label>
                  <PBPickRelationField<PropertyUserResponse>
                    dialogTrigger={
                      <span className="btn btn-outline btn-sm">
                        {expansions["author"]?.at(0)?.username}
                        <Edit className="size-4" />
                      </span>
                    }
                    selectedRows={expansions["author"]}
                    maxSelected={1}
                    setSelectedRows={(itm: any) => {
                      if (Array.isArray(itm)) {
                        setExpansions((prev) => ({
                          ...prev,
                          author: itm,
                        }));
                        field.handleChange((itm.at(0)?.id as any) ?? "");
                      }
                    }}
                    collectionName={"property_user"}
                    columns={{
                      username: {
                        name: "Username",
                      },
                    }}
                    fieldLabel={"Username"}
                    searchParamKey="ths"
                    filterBy={"username"}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>
        </div> */}
        <div className="form-control w-full">
          <form.Field name="participants">
            {(field) => {
              return (
                <div className="flex flex-col gap-2">
                  <>
                    <PBPickRelationField<PropertyUserResponse>
                      dialogTrigger={
                        <span className="btn btn-outline btn-sm">
                          <label htmlFor={field.name}>Participants</label>
                          <Edit className="size-4" />
                        </span>
                      }
                      selectedRows={expansions["participants"]}
                      maxSelected={10}
                      setSelectedRows={(itm: any) => {
                        if (Array.isArray(itm)) {
                          setExpansions((prev) => ({
                            ...prev,
                            participants: itm,
                          }));
                          field.handleChange((itm.at(0)?.id as any) ?? "");
                        }
                      }}
                      collectionName={"property_user"}
                      columns={{
                        username: {
                          name: "Username",
                        },
                      }}
                      fieldLabel={"Username"}
                      searchParamKey="ths"
                      filterBy={"username"}
                    />
                    <FieldInfo field={field} />
                  </>
                </div>
              );
            }}
          </form.Field>
        </div>
      </div>
      <MutationButton mutation={mutation} />
    </form>
  );
}
