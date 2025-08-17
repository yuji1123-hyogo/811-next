"use client";

import { useState, useCallback } from "react";
import { ZodSchema } from "zod";
import { debounce } from "@/lib/form-utils";

export function useFormValidation(schema: ZodSchema) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback(
    (field: string, value: string) => {
      try {
        // スキーマから特定フィールドを取得してバリデーション
        const fieldSchema = (schema as any).shape[field];
        if (fieldSchema) {
          fieldSchema.parse(value);
          setErrors((prev) => ({ ...prev, [field]: "" }));
        }
      } catch (error: any) {
        if (error.errors?.[0]?.message) {
          setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
        }
      }
    },
    [schema]
  );

  const debouncedValidate = useCallback(debounce(validateField, 300), [
    validateField,
  ]);

  const setFieldTouched = useCallback((field: string, isTouched: boolean) => {
    setTouched((prev) => ({ ...prev, [field]: isTouched }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validateField,
    debouncedValidate,
    setFieldTouched,
    clearErrors,
  };
}
