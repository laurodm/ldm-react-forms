import React from "react";
import { TFieldComponent } from "../../formComponentTypes";
import FieldComponent from "../fieldComponent";
import { useField } from "../useField";
import "./radioOptionsField.css";

type TProps = TFieldComponent & {
  options: { label: string; value: string }[];
};

const RadioOptionsField: React.FC<TProps> = (props) => {
  const { name, options, onChange } = props;
  const { fieldState, changeField } = useField(props);

  function isChecked(optionValue: string): boolean {
    return fieldState.value === optionValue;
  }

  function renderOptions() {
    if (!options || options.length <= 0) return <></>;
    return options.map((o, index) => {
      return (
        <div
          key={index}
          className={`option ${isChecked(o.value) ? "checked" : ""}`}
        >
          <input
            id={`${name}_${o.value}`}
            name={name}
            value={o.value}
            type={"radio"}
            onChange={handleChange}
            disabled={fieldState.disabled}
            checked={isChecked(o.value)}
          />
          <label htmlFor={`${name}_${o.value}`}>{o.label}</label>
        </div>
      );
    });
  }

  function handleChange(event: any) {
    let fieldValue = event.target.value;
    if (onChange) onChange(fieldValue);
    changeField({ name, value: fieldValue });
  }

  return (
    <FieldComponent {...props}>
      <div className="radio-options options">{renderOptions()}</div>
    </FieldComponent>
  );
};

export default RadioOptionsField;
