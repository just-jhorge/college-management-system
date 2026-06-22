"use client";

import { useState } from "react";
import { Controller, FieldValues, Path, Control } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type PasswordFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function PasswordField<T extends FieldValues>({
  name,
  control,
  label,
  id,
  placeholder,
  disabled,
  className,
}: PasswordFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id ?? name}>{label}</FieldLabel>
          <div className="h-9 relative flex items-center">
            <Input
              id={id ?? name}
              {...field}
              value={field.value ?? ""}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              disabled={disabled}
              className={className}
            />
            <Button
              size="icon"
              type="button"
              variant="ghost"
              disabled={disabled}
              onClick={togglePasswordVisibility}
              className="absolute right-1"
            >
              {showPassword ? (
                <EyeOffIcon className="size-4 text-muted-foreground" />
              ) : (
                <EyeIcon className="size-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
