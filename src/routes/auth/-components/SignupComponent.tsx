import { PropertyUserCreate } from "@/lib/pb/database";
import { formOptions, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "@/lib/pb/client";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { useState } from "react";
import { viewerqueryOptions } from "@/lib/tanstack/query/query-options/viewer-query-options";
import { makeHotToast } from "@/components/toasters";
import { useNavigate } from "@tanstack/react-router";

interface SignupComponentProps {}

const formOpts = formOptions<PropertyUserCreate>({
  defaultValues: {
    username: "",
    email: "",
    emailVisibility: true,
    password: "",
    passwordConfirm: "",
    role: "user",
    verification_status: "initial",
    pnone: "",
    avatarUrl: "",
  },
});

export function SignupComponent({}: SignupComponentProps) {
  const [showPassword, setShowPassword] = useState(false);
  const qc = useQueryClient();
  const navigate = useNavigate({ from: "/auth/signup" });
  const mutation = useMutation({
    mutationFn: (data: PropertyUserCreate) => {
      return pb.from("property_user").create(data);
    },
    onSuccess(data) {
      makeHotToast({
        title: "signed up",
        description: `Welcome ${data.username}`,
        duration: 2000,
        variant: "success",
      });
      qc.invalidateQueries(viewerqueryOptions);
      // qc.setQueryData(["viewer"], () => data);
      navigate({ to: "/auth", search: { returnTo: "/profile" } });
      // if (typeof window !== "undefined") {
      //   location.reload();
      // }
    },
    onError(error) {
      console.log(error.name);
      makeHotToast({
        title: "Something went wrong",
        description: `${error.message}`,
        duration: 20000,
        variant: "error",
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
        className="bg-bg-muted flex h-full w-[90%] flex-col items-center justify-center gap-3 rounded-md p-[2%] md:w-[60%] lg:w-[50%]"
      >
        <h1 className="text-4xl">Sign up</h1>
        <form.Field
          name="username"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string(),
          }}
          children={(field) => {
            return (
              <TextFormField<PropertyUserCreate>
                field={field}
                fieldKey="username"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />
        <form.Field
          name="email"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().email(),
          }}
          children={(field) => {
            return (
              <TextFormField<PropertyUserCreate>
                field={field}
                fieldKey="email"
                inputOptions={{
                  autoComplete: "email",
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
              <TextFormField<PropertyUserCreate>
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
        <form.Field
          name="passwordConfirm"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().min(8),
          }}
          children={(field) => {
            return (
              <TextFormField<PropertyUserCreate>
                field={field}
                fieldKey="passwordConfirm"
                fieldlabel="Confirm password"
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
