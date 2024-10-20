import { pb } from "@/lib/pb/client";
import { PBPickRelationField } from "@/lib/pb/components/PBrelationPicker";
import {
  PropertyShopPaymentsUpdate,
  PropertyShopsResponse,
  PropertyStaffListResponse,
} from "@/lib/pb/database";
import { FieldInfo } from "@/lib/tanstack/form/components";
import { SelectFields } from "@/lib/tanstack/form/SelectFileds";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface UpdatePaymentFormProps {
  row: PropertyShopPaymentsUpdate;
  afterSave?: () => void;
}

type PaymentExpansion = {
  shop: PropertyShopsResponse[];
  staff: PropertyStaffListResponse[];
};
export function UpdatePaymentForm({ row, afterSave }: UpdatePaymentFormProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.record!;
  const [expansions, setExpansions] = useState<PaymentExpansion>({
    shop: [],
    // @ts-expect-error
    staff: [viewer],
  });
  const form = useForm<PropertyShopPaymentsUpdate>({
    defaultValues: row,
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
      afterSave?.();
    },
  });
  const mutation = useMutation({
    mutationFn: async (value: PropertyShopPaymentsUpdate) => {
      pb.from("property_shop_payments").update(
        // @ts-expect-error
        row?.id,
        value,
      );
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
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

        <div className="form-control w-full max-w-xs">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Shop</span>
            </label>
            <form.Field name="shop">
              {(field) => {
                return (
                  <>
                    <label htmlFor={field.name}>Shop</label>
                    <PBPickRelationField<PropertyShopsResponse>
                      dialogTrigger={
                        <span className="btn btn-outline btn-sm">
                          {field.state.value}
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
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Amount</span>
            </label>
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
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Staff</span>
          </label>
          <form.Field name="staff">
            {(field) => {
              return (
                <>
                  <label htmlFor={field.name}>Staff</label>
                  <PBPickRelationField<PropertyStaffListResponse>
                    dialogTrigger={
                      <span className="btn btn-outline btn-sm">
                        {field.state.value}
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
                    collectionName={"property_shops"}
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
      </form>
    </div>
  );
}
