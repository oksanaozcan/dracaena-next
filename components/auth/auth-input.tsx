import { useField, FieldHookConfig } from 'formik';
import { cn } from "@/lib/utils";
import React, { InputHTMLAttributes } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  obligatory?: boolean;
  label: string;
}

export const AuthInput: React.FC<AuthInputProps & FieldHookConfig<string>> = ({ obligatory = false, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label htmlFor={props.id || props.name}>
        {label} {obligatory && '*'}
      </label>
      <input
        className={cn(
          "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
          meta.error && meta.touched ? "border-2 border-rose-500" : "border"
        )}
        {...field}
        {...(props as InputHTMLAttributes<HTMLInputElement>)}
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs italic pt-1">{meta.error}</p>
      ) : null}
    </div>
  );
};
