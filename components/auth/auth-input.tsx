import { useField } from 'formik';

interface AuthInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  id: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label htmlFor={props.id} className="block text-gray-700 text-sm font-bold mb-2">
        {label} 
      </label>
      <input
        {...field}
        {...props}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${meta.touched && meta.error ? 'border-red-500' : ''}`}
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs italic">{meta.error}</p>
      ) : null}
    </div>
  );
};