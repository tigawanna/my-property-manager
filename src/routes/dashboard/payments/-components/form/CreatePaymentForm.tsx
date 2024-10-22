import { pb } from "@/lib/pb/client";
import { PBPickRelationField } from "@/lib/pb/components/PBrelationPicker";
import {
  PropertyShopPaymentsCreate,
  PropertyShopsResponse,
  PropertyStaffListResponse,
} from "@/lib/pb/database";
import { FieldInfo } from "@/lib/tanstack/form/components";
import { SelectFields } from "@/lib/tanstack/form/SelectFileds";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";

interface CreatePaymentFormProps {
  row: PropertyShopPaymentsCreate;
  afterSave?: () => void;
}

type PaymentExpansion = {
  shop: PropertyShopsResponse[];
  staff: PropertyStaffListResponse[];
};
export function CreatePaymentForm({ row, afterSave }: CreatePaymentFormProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.record!;
  const [expansions, setExpansions] = useState<PaymentExpansion>({
    shop: [],
    // @ts-expect-error
    staff: [viewer],
  });
  const form = useForm<PropertyShopPaymentsCreate>({
    defaultValues: {
      ...row,
      amount: 5000,
      type: "rent",
      staff: viewer.id,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
      afterSave?.();
    },
  });
  const mutation = useMutation({
    mutationFn: async (value: PropertyShopPaymentsCreate) => {
      pb.from("property_shop_payments").create(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex h-full w-fit flex-col items-center justify-center"
    >
      <div className="flex h-full w-full flex-wrap items-center gap-5 overflow-scroll justify-center">
        {/* amount */}
        <div className="form-control w-full md:w-[40%]">
          <form.Field name="amount">
            {(field) => {
              return (
                <TextFormField<PropertyShopPaymentsCreate>
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
                <SelectFields<PropertyShopPaymentsCreate, "type">
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
