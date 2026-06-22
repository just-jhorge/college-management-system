"use client";

import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  id?: string;
  readOnly?: boolean;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  className?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

export function InputField<T extends FieldValues>({
  id,
  name,
  type,
  label,
  control,
  disabled,
  className,
  inputMode,
  placeholder,
  readOnly = false,
}: InputFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id ?? name}>{label}</FieldLabel>
          <Input
            id={id ?? name}
            {...field}
            type={type}
            readOnly={readOnly}
            disabled={disabled}
            className={className}
            inputMode={inputMode}
            placeholder={placeholder}
          />

          {fieldState.invalid && (
            <div className="bg-red-300/25 flex items-center gap-1.5 border border-red-200 rounded-sm py-0.5 px-2">
              <AlertCircle className="text-destructive size-4" />
              <FieldError errors={[fieldState.error]} />
            </div>
          )}
        </Field>
      )}
    />
  );
}
