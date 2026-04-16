import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  DefaultValues,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";

interface FormProps<T extends FieldValues> {
  /** Input and output types match form values (typical for object schemas without transforms). */
  schema: ZodType<T, T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
}

export function Form<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
}: FormProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}
