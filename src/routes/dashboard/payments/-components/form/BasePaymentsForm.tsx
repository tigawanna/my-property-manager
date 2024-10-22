import { PBPickRelationField } from "@/lib/pb/components/PBrelationPicker";
import {
  PropertyShopPaymentsCreate,
  PropertyShopPaymentsUpdate,
  PropertyShopsResponse,
  PropertyStaffListResponse,
} from "@/lib/pb/database";
import { FieldInfo } from "@/lib/tanstack/form/components";
import { SelectFields } from "@/lib/tanstack/form/SelectFileds";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useForm } from "@tanstack/react-form";
import { UseMutationResult } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";

type PaymentExpansion = {
  shop: PropertyShopsResponse[];
  staff: PropertyStaffListResponse[];
};

interface BasePaymentsFormProps {
  mutation: UseMutationResult<void, Error, PropertyShopPaymentsCreate|PropertyShopPaymentsUpdate, unknown>;
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
  const [expansions, setExpansions] = useState<PaymentExpansion>({
    shop: [],
    // @ts-expect-error
    staff: [viewer],
  });
  const form = useForm<Partial<PropertyShopPaymentsUpdate>>({
    defaultValues: row,
    onSubmit: async ({ value }) => {
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
      className="flex h-full w-full flex-col items-center justify-center gap-5 p-3"
    >
      <div className="flex h-full w-full flex-wrap items-center justify-center gap-5 p-5">
        {/* amount */}
        <div className="form-control w-full md:w-[40%]">
          <form.Field name="amount">
            {(field) => {
              return (
                <TextFormField<PropertyShopPaymentsUpdate>
                  field={field}
                  fieldKey="amount"
                  fieldlabel="Amount"
                  inputOptions={{
                    type: "number",
                    step: "0.01", // step of 0.01 to allow for cents in the amount
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
