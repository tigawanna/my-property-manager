import { PropertyShopPaymentsCreate } from "@/lib/pb/database";
import { FieldApi, useForm } from "@tanstack/react-form";

interface CreatePaymentFormProps {
row:PropertyShopPaymentsCreate;
afterSave:() => void
}

import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { useForm, Form, Field, FieldApi } from '@tanstack/react-form'

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

export function CreatePaymentForm({row,afterSave}:CreatePaymentFormProps){
  const form = useForm<PropertyShopPaymentsCreate>({
    defaultValues:row,
    onSubmit: async (values) => {
      // Do something with form data
      console.log(values)
      afterSave()
    },
  })

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <Form form={form}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <Field
            name="amount"
            type="number"
            placeholder="amount"
            className="input input-bordered w-full max-w-xs"
          >
            {(field) => {
              return (
                <>
                  <input
                    {...field.props}
                  />
                  <FieldInfo field={field} />
                </>
              )
            }}
          </Field>

        </div>

      </Form>
    </div>
  );
}


function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}
          <option value="">Select a Payment Type</option>
          <option value="rent">Rent</option>
          <option value="electricity">Electricity</option>
          <option value="water">Water</option>
          <option value="gas">Gas</option>
          <option value="internet">Internet</option>
          <option value="other">Other</option>
        </select>
        {get("type")?.errors?.map((error,idx)=>(
          <div key={idx}>{error}</div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Amount</label>
        <input type="number" {...register("amount")} className="w-full p-2 rounded-md border-2 border-gray-300"/>
        {get("amount")?.errors?.map((error,idx)=>(
          <div key={idx}>{error}</div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Receipt Number</label>
        <input type="text" {...register("reciept_number")} className="w-full p-2 rounded-md border-2 border-gray-300"/>
        {get("reciept_number")?.errors?.map((error,idx)=>(
          <div key={idx}>{error}</div>
        ))}
      </div>
      <button type="submit" className="w-full p-2 rounded-md bg-blue-500 text-white">Save</button>
