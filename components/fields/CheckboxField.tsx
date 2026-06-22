"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, FieldValues, Path, Control } from "react-hook-form";

type CheckboxFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  id?: string;
  disabled?: boolean;
  className?: string;
};

export function CheckboxField<T extends FieldValues>({
  name,
  control,
  label,
  id,
  disabled,
  className,
}: CheckboxFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation="horizontal" data-invalid={fieldState.invalid}>
          <Checkbox
            id={id ?? name}
            name={field.name}
            checked={field.value ?? false}
            onCheckedChange={field.onChange}
            disabled={disabled}
            className={className}
          />
          <FieldLabel htmlFor={id ?? name}>{label}</FieldLabel>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
