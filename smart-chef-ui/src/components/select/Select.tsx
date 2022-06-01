import {
  ChangeEvent,
  ChangeEventHandler,
  SelectHTMLAttributes,
  useState,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import "./Select.css";

function SCSelect(props: SelectProps) {
  const { options, onChange, value, placeholder, disabled, register } = props;
  const [valueState, setValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <select
      // value={valueState ?? "placeholder"}
      disabled={disabled}
      {...register}
      // only set onChange and value if register is not set
      onChange={register ? undefined : handleChange}
      value={register ? undefined : valueState}
      className="sc-select"
    >
      {placeholder && (
        <option value="placeholder" disabled>
          {placeholder}
        </option>
      )}

      {/* Map options */}
      {options &&
        options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
}
export default SCSelect;

export type SCSelectOption = {
  value: string;
  label: string;
};

export class SelectProps implements SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  value?: string;
  options?: SCSelectOption[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
}
