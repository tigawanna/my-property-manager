import { PropertyUserCreate } from "@/lib/pb/pb-types";
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
import { Link, useNavigate, useSearch } from "@tanstack/react-router";

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
    const { returnTo } = useSearch({
      from: "/auth/signup",
    });
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
    <div className="flex h-full w-full items-center justify-evenly gap-2 p-5">
      <img
        src="/site.svg"
        alt="logo"
        className="hidden w-[30%] object-cover md:flex"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="rounded-lh flex h-full w-[90%] flex-col items-center justify-center gap-6 bg-base-300/20 p-[2%] md:w-[70%] lg:w-[40%]"
      >
        <div className="flex flex-col items-center justify-center gap- w-full h-full">
          <h1 className="text-4xl font-bold">Sign up</h1>
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
          <div className="w-full p-5">
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
        </div>
        <MutationButton className="btn-primary" mutation={mutation} />
        <div className="flex gap-2">
          Already have an account?
          <Link to="/auth" search={{ returnTo }} className="text-primary">
            Sign in
          </Link>
          instead
        </div>
      </form>
    </div>
  );
}
