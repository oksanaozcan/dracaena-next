import React from "react";
import { useField } from "formik";

interface AuthCheckboxProps {
  name: string;
  children: React.ReactNode;
}

export const AuthCheckbox: React.FC<AuthCheckboxProps> = ({ children, name, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox', name });

  return (
    <div>
      <label className="checkbox-input">
        <input
          type="checkbox"
          {...field}
          {...props}
          checked={field.value}
        />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};





