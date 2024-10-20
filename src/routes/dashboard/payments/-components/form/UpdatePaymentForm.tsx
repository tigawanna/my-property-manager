import { PBPickRelationField } from "@/lib/pb/components/PBrelationPicker";
import {
  PropertyShopPaymentsCreate,
  PropertyShopsResponse,
  PropertyStaffListResponse,
} from "@/lib/pb/database";
import { FieldInfo } from "@/lib/tanstack/form/components";
import { FieldApi, useForm } from "@tanstack/react-form";
import { useState } from "react";

interface CreatePaymentFormProps {
  row: PropertyShopPaymentsCreate;
  afterSave: () => void;
}



type PaymentExpansion = {
  shop: PropertyShopsResponse[];
  staff: PropertyStaffListResponse[];
};
export function CreatePaymentForm({ row, afterSave }: CreatePaymentFormProps) {
  const [expansions, setExpansions] = useState<PaymentExpansion>({
    shop: [],
    staff: [],
  });
  const form = useForm<PropertyShopPaymentsCreate>({
    defaultValues: row,
    onSubmit: async (values) => {
      // Do something with form data
      console.log(values);
      afterSave();
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
            <span className="label-text">Amount</span>
          </label>
          <form.Field name="amount">
            {(field) => {
              return (
                <>
                  <label htmlFor={field.name}>Amount</label>
                  <input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(+e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          </form.Field>
        </div>
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
                        // setInput((prev) => ({
                        //   ...prev,
                        //   [relationKey]: (itm.at(0)?.id as any) ?? "",
                        // }));
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
            <span className="label-text">Staff</span>
          </label>
          <form.Field name="shop">
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
                        // setInput((prev) => ({
                        //   ...prev,
                        //   [relationKey]: (itm.at(0)?.id as any) ?? "",
                        // }));
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
                    // @ts-expect-error
                    selectedRows={expansions[column.accessor]}
                    maxSelected={1}
                    setSelectedRows={(itm: any) => {
                      if (Array.isArray(itm)) {
                        setExpansions((prev) => ({
                          ...prev,
                          shop: itm,
                        }));
                        // setInput((prev) => ({
                        //   ...prev,
                        //   [relationKey]: (itm.at(0)?.id as any) ?? "",
                        // }));
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
            <span className="label-text">Shop</span>
          </label>
          <form.Field name="amount">
            {(field) => {
              return (
                <>
                  <label htmlFor={field.name}>Amount</label>
                  <input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(+e.target.value)}
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
