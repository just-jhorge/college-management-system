"use client";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

import { AlertCircle } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  id?: string;
  placeholder?: string;
  options: Option[];
  disabled?: boolean;
  className?: string;
};

export function SelectField<T extends FieldValues>({
  name,
  control,
  label,
  id,
  placeholder,
  options,
  disabled,
  className,
}: SelectFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id ?? name}>{label}</FieldLabel>
          <Select
            value={field.value ?? ""}
            disabled={disabled}
            onValueChange={field.onChange}
          >
            <SelectTrigger id={id ?? name} className={className}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
