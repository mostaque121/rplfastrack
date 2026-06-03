"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

export interface NumberInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "type"
> {
  value?: number;
  onChange?: (value: number) => void;
}

const NumberInputDefault = React.forwardRef<HTMLInputElement, NumberInputProps>(
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

      // ── The Absolute Guard Filter ──────────────────────────────────────────
      // This regex allows completely empty inputs, raw integers, and floating decimals.
      // If a user typed an illegal character (like 'a', 'b', '$', etc.), it fails and breaks immediately.
      if (newInputValue !== "" && !/^[0-9]*\.?[0-9]*$/.test(newInputValue)) {
        return;
      }

      setInputValue(newInputValue);

      if (newInputValue === "" || newInputValue === ".") {
        onChange?.(0);
        return;
      }

      // Parse the input value safely
      const numericValue = Number.parseFloat(newInputValue);

      // Only fire onChange if it's a completely legitimate float value
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

      // Handle cleanup if they left a trailing decimal period like "45."
      if (inputValue.endsWith(".")) {
        setInputValue(inputValue.slice(0, -1));
      }

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
      <input
        type="text"
        inputMode="decimal"
        ref={ref}
        className={cn(className)}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  },
);
NumberInputDefault.displayName = "NumberInputDefault";

export { NumberInputDefault };
