import {
  ChangeEvent,
  ChangeEventHandler,
  SelectHTMLAttributes,
  useState,
} from "react";
import "./Select.css";

function SCSelect(props: SelectProps) {
  const { options, onChange, value, placeholder, disabled } = props;
  const [valueState, setValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <select
      onChange={(value) => handleChange(value)}
      value={valueState ?? "placeholder"}
      disabled={disabled}
      className="sc-select"
    >
      {placeholder && (
        <option value="placeholder" disabled>
          {placeholder}
        </option>
      )}

      {/* Map options */}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
export default SCSelect;

type SCSelectOption = {
  value: string;
  label: string;
};

export class SelectProps implements SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  value?: string;
  options: SCSelectOption[] = [];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
}
