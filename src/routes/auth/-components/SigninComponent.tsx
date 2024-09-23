import { useNavigate } from "@tanstack/react-router";
import { Route } from "../index";
import { formOptions, useForm } from "@tanstack/react-form";
import { FormLabel } from "@/components/park/ui/form-label";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "@/lib/pb/client";
import { toaster } from "@/components/navigation/ParkuiToast";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { Checkbox } from "@/components/park/ui/checkbox";
import { useState } from "react";
import { viewerqueryOptions } from "@/lib/tanstack/query/use-viewer";

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
      return pb.from("property_user").authWithPassword(data.emailOrUsername, data.password);
    },
    onSuccess(data) {
      toaster.create({
        title: "signed in",
        description: `Welcome ${data.record.username}`,
        type: "success",
        duration: 2000,
      });
      qc.invalidateQueries(viewerqueryOptions);
      // @ts-expect-error
      navigate({ to: returnTo || "/" });
      // if (typeof window !== "undefined") {
      //   location.reload();
      // }
    },
    onError(error) {
      console.log(error.name);
      toaster.create({
        title: "Something went wrong",
        description: `${error.message}`,
        type: "error",
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
    <div className="w-full  h-full flex flex-col items-center justify-center   ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="w-[90%] md:w-[60%] lg:w-[50%] h-full flex flex-col items-center justify-center p-[2%] bg-bg-muted rounded-md gap-3 ">
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
          <div className="w-full flex gap-3">
            <div className=""></div>
            <FormLabel htmlFor="showPassword">Show password</FormLabel>
            <Checkbox
              id="showPassword"
              name="showPassword"
              className="border-2 border-accent-default"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        <MutationButton mutation={mutation} />
      </form>
    </div>
  );
}
