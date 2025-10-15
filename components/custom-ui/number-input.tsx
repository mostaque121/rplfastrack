"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "type"
  > {
  value?: number;
  onChange?: (value: number) => void;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState("");
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
      if (!isFocused) {
        if (value === undefined || value === 0) {
          setInputValue("");
        } else {
          setInputValue(String(value));
        }
      }
    }, [value, isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newInputValue = e.target.value;
      setInputValue(newInputValue);

      if (newInputValue === "") {
        onChange?.(0);
        return;
      }

      // Parse the input value
      const numericValue = Number.parseFloat(newInputValue);

      // Only update if it's a valid number
      if (!isNaN(numericValue)) {
        onChange?.(numericValue);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      // Remove leading zeros on blur (except for "0" itself)
      if (value !== undefined) {
        const cleanValue = Number.parseFloat(String(value));
        if (!isNaN(cleanValue) && cleanValue !== value) {
          onChange?.(cleanValue);
        }
      }
      props.onBlur?.(e);
    };

    return (
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*\.?[0-9]*"
        ref={ref}
        className={cn(className)}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
