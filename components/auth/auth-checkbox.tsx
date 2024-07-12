import React from "react";
import { useField } from "formik";

interface AuthCheckboxProps {
  name: string;
  children: React.ReactNode;
}

export const AuthCheckbox: React.FC<AuthCheckboxProps> = ({ children, name, ...props }) => {
  const [field, meta, helpers] = useField({ ...props, type: 'checkbox', name });

  const handleChange = () => {
    helpers.setValue(!field.value);
  };

  return (
    <div>
      <label className="checkbox-input">
        <input
          type="checkbox"
          {...field}
          checked={field.value}
          onChange={handleChange}
        />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs italic">{meta.error}</div>
      ) : null}
    </div>
  );
};