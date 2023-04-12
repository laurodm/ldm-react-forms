import React from "react";
import { TFieldComponent } from "../formComponentTypes";
import FieldComponent from "./fieldComponent";
import { useField } from "./useField";

export type TInput = TFieldComponent & {
  type?: string;
  maxLength?: string;
  setMask?: (value: string) => string;
  placeholder?: string;
};

const Input: React.FC<TInput> = (props) => {
  const {
    name,
    type,
    disabled,
    maxLength,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    setMask,
  } = props;
  const { field, fieldState, changeField } = useField(props);

  function handleChange(event: any) {
    let fieldValue = event.target.value;
    if (setMask) fieldValue = setMask(fieldValue);
    if (onChange) onChange(fieldValue);
    changeField({ name, value: fieldValue, disabled });
  }

  function handleBlur(event: any) {
    let fieldValue = event.target.value;
    if (onBlur) onBlur(fieldValue, field);
  }

  function setMaxLength(): number | undefined {
    return maxLength ? parseInt(maxLength) : undefined;
  }

  return (
    <FieldComponent {...props}>
      <input
        name={name}
        value={fieldState.value || ""}
        type={type}
        onChange={handleChange}
        disabled={disabled || fieldState.disabled}
        className={"form-control"}
        maxLength={setMaxLength()}
        placeholder={placeholder}
        onBlur={handleBlur}
        onFocus={onFocus}
      />
    </FieldComponent>
  );
};

export default Input;
