import { PBPickRelationField } from "@/lib/pb/components/PBrelationPicker";
import {
  PropertyShopPaymentsCreate,
  PropertyShopPaymentsUpdate,
  PropertyShopsResponse,
  PropertyStaffListResponse,
} from "@/lib/pb/pb-types";
import { FieldInfo } from "@/lib/tanstack/form/components";
import { SelectFields } from "@/lib/tanstack/form/SelectFileds";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useForm } from "@tanstack/react-form";
import { UseMutationResult, useSuspenseQuery } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { ClientResponseError } from "pocketbase";
import { oneStaffQueryOptions } from "@/lib/tanstack/query/query-options/staff-query-options";
type PaymentExpansion = {
  shop: PropertyShopsResponse[];
  staff: PropertyStaffListResponse[];
};

interface BasePaymentsFormProps {
  mutation: UseMutationResult<
    any,
    Error,
    PropertyShopPaymentsCreate | (PropertyShopPaymentsUpdate & { id: string }),
    unknown
  >;
  row: PropertyShopPaymentsUpdate;
  afterSave?: () => void;
}

export function BasePaymentsForm({
  mutation,
  row,
  afterSave,
}: BasePaymentsFormProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.record!;
  const staffQuery = useSuspenseQuery(
    oneStaffQueryOptions(viewer?.id)
  )
  const staff = staffQuery?.data
  const [expansions, setExpansions] = useState<PaymentExpansion>({
    shop: [],
    staff: [staff],
  });
  const form = useForm<Partial<PropertyShopPaymentsUpdate>>({
    defaultValues: {
      ...row,
      staff: staff?.id,
    },
    onSubmit: async ({ value }) => {
      // @ts-expect-error
      mutation.mutate(value);
      afterSave?.();
    },
  });

  const error = mutation?.error as ClientResponseError;
  const pbError = error?.data?.data as Record<
    string,
    { message: string; code: string }
  >;

  useEffect(() => {
    pbError &&
      Object?.entries(pbError)?.forEach(([key, value]) => {
        form.setFieldMeta(key as any, (prev) => {
          return {
            ...prev,
            errorMap: {
              onChange: value?.message,
            },
          };
        });
      });
  }, [pbError]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="p- flex h-full w-full flex-col items-center justify-center gap-5"
    >
      <div className="flex h-full w-full flex-wrap items-center justify-center gap-5">
        {/* amount */}
        <div className="form-control w-full md:w-[40%]">
          <form.Field name="amount">
            {(field) => {
              return (
                <TextFormField<PropertyShopPaymentsUpdate & { id: string }>
                  field={field}
                  fieldKey="amount"
                  fieldlabel="Amount"
                  inputOptions={{
                    onChange: (e) => {
                      field.handleChange(parseFloat(e.target.value));
                    },
                    type: "number",
                    step: "0.01", // step of 0.01 to allow for cents in the amount
                  }}
                />
              );
            }}
          </form.Field>
        </div>
        {/* reciept_number */}
        <div className="form-control w-full md:w-[40%]">
          <form.Field name="reciept_number">
            {(field) => {
              return (
                <TextFormField<PropertyShopPaymentsUpdate>
                  field={field}
                  fieldKey="reciept_number"
                  fieldlabel="Reciept number"
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
        {/* type */}
        <div className="form-control w-fit min-w-[30%] md:w-[40%]">
          <span className="label-text">Type</span>

          <form.Field name="type">
            {(field) => {
              return (
                <SelectFields<PropertyShopPaymentsUpdate, "type">
                  field={field}
                  fieldKey="type"
                  items={[
                    { value: "rent", label: "Rent" },
                    { value: "elec", label: "Elec" },
                    { value: "water", label: "water" },
                    { value: "fines", label: "fines" },
                    { value: "deposit", label: "Deposit" },
                  ]}
                  fieldlabel=""
                />
              );
            }}
          </form.Field>
        </div>
        {/* shop */}
        <div className="form-control w-fit min-w-[30%] md:w-[40%]">
          <form.Field name="shop">
            {(field) => {
              return (
                <>
                  <label htmlFor={field.name}>Shop</label>
                  <PBPickRelationField<PropertyShopsResponse>
                    dialogTrigger={
                      <span className="btn btn-outline btn-sm">
                        {expansions["shop"][0]?.shop_number ??
                          field.state.value}{" "}
                        <Edit />
                      </span>
                    }
                    selectedRows={expansions["shop"]}
                    maxSelected={1}
                    setSelectedRows={(itm: any) => {
                      if (Array.isArray(itm)) {
                        setExpansions((prev) => ({
                          ...prev,
                          shop: itm,
                        }));
                        field.handleChange((itm.at(0)?.id as any) ?? "");
                      }
                    }}
                    collectionName={"property_shops"}
                    columns={{
                      shop_number: {
                        name: "Shop Number",
                      },
                    }}
                    fieldLabel={"Shop Number"}
                    searchParamKey="ths"
                    filterBy={"shop_number"}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          </form.Field>
        </div>
        {/* staff */}
        <div className="form-control w-fit min-w-[30%] md:w-[40%]">
          <form.Field name="staff">
            {(field) => {
              console.log("==== field  ==== ", field.state.value);
              return (
                <>
                  <label htmlFor={field.name}>Staff</label>
                  <PBPickRelationField<PropertyStaffListResponse>
                    dialogTrigger={
                      <span className="btn btn-outline btn-sm">
                        {expansions["staff"][0]?.name ?? field.state.value}{" "}
                        <Edit />
                      </span>
                    }
                    selectedRows={expansions["staff"]}
                    maxSelected={1}
                    setSelectedRows={(itm: any) => {
                      if (Array.isArray(itm)) {
                        setExpansions((prev) => ({
                          ...prev,
                          staff: itm,
                        }));
                        field.handleChange((itm.at(0)?.id as any) ?? "");
                      }
                    }}
                    collectionName={"property_staff_list"}
                    columns={{
                      name: {
                        name: "Staff",
                      },
                    }}
                    fieldLabel={"Staff name"}
                    searchParamKey="ths"
                    filterBy={"name"}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          </form.Field>
        </div>
      </div>

      <MutationButton mutation={mutation} />
    </form>
  );
}
