import React from "react";
import ReactSelect from "react-select";
import { TFieldComponent } from "../../formComponentTypes";
import FieldComponent from "../fieldComponent";
import { useField } from "../useField";

export type TSelectValue = { value: string; label: string };

export type TSelectField = TFieldComponent & {
  options?: TSelectValue[];
  multiple?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  onInputChange?: (inputValue: string) => void;
};

const SelectField: React.FC<TSelectField> = (props) => {
  const {
    name,
    options,
    multiple,
    onChange,
    onInputChange,
    isClearable,
    placeholder,
  } = props;
  const { fieldState, changeField } = useField(props);

  function selectProps(objectList: any[], param: string) {
    const valuesList: any[] = [];
    objectList.map((o) => valuesList.push(o[param]));
    return valuesList;
  }

  function selectValueByValue(): any {
    const optionValue = fieldState.value || "";
    if (fieldState.disabled || !optionValue) return null;
    if (Array.isArray(optionValue))
      return options?.filter((o) => optionValue.includes(o.value));
    return options?.find((o) => o.value === optionValue);
  }

  function handleChange(selectValue: TSelectValue | TSelectValue[]) {
    let selected: any;
    let value: any;
    if (!selectValue) {
      selected = "";
      value = "";
    } else {
      value = !Array.isArray(selectValue)
        ? selectValue.value
        : selectProps(selectValue, "value");
      selected = !Array.isArray(selectValue)
        ? selectValue.label
        : selectProps(selectValue, "label");
    }
    if (onChange) onChange(value);
    changeField({ name, value, selected });
  }

  return (
    <FieldComponent {...props}>
      <ReactSelect
        options={options}
        isMulti={multiple}
        placeholder={placeholder || "selecione..."}
        onChange={handleChange}
        value={selectValueByValue()}
        isDisabled={fieldState?.disabled}
        onInputChange={onInputChange}
        isClearable={isClearable}
      />
    </FieldComponent>
  );
};

export default SelectField;
