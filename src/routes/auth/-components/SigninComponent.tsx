import { useNavigate } from "@tanstack/react-router";
import { Route } from "../index";
import { formOptions, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "@/lib/pb/client";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { useState } from "react";
import { makeHotToast } from "@/components/toasters";

interface SigninComponentProps {}

interface PropertyUserLogn {
  emailOrUsername: string;
  password: string;
}

const formOpts = formOptions<PropertyUserLogn>({
  defaultValues: {
    emailOrUsername: "",
    password: "",
  },
});
export function SigninComponent({}: SigninComponentProps) {
  const [showPassword, setShowPassword] = useState(false);
  const qc = useQueryClient();
  const { returnTo } = Route.useSearch();
  const navigate = useNavigate({ from: "/auth" });
  const mutation = useMutation({
    mutationFn: (data: PropertyUserLogn) => {
      return pb
        .from("property_user")
        .authWithPassword(data.emailOrUsername, data.password);
    },
    onSuccess(data) {
      makeHotToast({
        title: "signed in",
        description: `Welcome ${data.record.username}`,
        variant: "success",
        duration: 2000,
      });

      // qc.invalidateQueries(viewerqueryOptions);
      qc.setQueryData(["viewer"], () => data);
      // @ts-expect-error
      navigate({ to: returnTo || "/" });
      if (typeof window !== "undefined") {
        location.reload();
      }
    },
    onError(error) {
      console.log(error.name);
      makeHotToast({
        title: "Something went wrong",
        description: `${error.message}`,
        variant: "error",
        duration: 20000,
      });
    },
  });
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      await mutation.mutate(value);
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
        className="rounded-lh flex h-full w-[90%] flex-col items-center justify-center gap-3 bg-base-300 p-[2%] md:w-[60%] lg:w-[50%]"
      >
        <h1 className="text-4xl">Sign in</h1>
        <form.Field
          name="emailOrUsername"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string(),
          }}
          children={(field) => {
            return (
              <TextFormField<PropertyUserLogn>
                field={field}
                fieldKey="emailOrUsername"
                fieldlabel="email or username"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />

        <form.Field
          name="password"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().min(8),
          }}
          children={(field) => {
            return (
              <TextFormField<PropertyUserLogn>
                field={field}
                fieldKey="password"
                inputOptions={{
                  type: showPassword ? "text" : "password",
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />

        <div className="w-full">
          <div className="flex w-full items-center justify-center gap-3">
            <label htmlFor="showPassword" className="text-sm">
              Show password
            </label>
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
              className="checkbox-primary checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        <MutationButton className="btn-primary" mutation={mutation} />
      </form>
    </div>
  );
}
