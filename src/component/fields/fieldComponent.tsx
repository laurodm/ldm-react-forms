import React, { useContext } from "react";
import { FieldControllerContext } from "../fieldsController/fieldControllerProvider";

export interface TFieldsProps {
  children: React.ReactNode;
  name: string;
  width?: string;
  label?: string;
  required?: boolean;
  invalid?: {
    value: boolean;
    msg: string;
  };
}

const FieldComponent: React.FC<TFieldsProps> = ({
  name,
  label,
  children,
  width,
  required,
}) => {
  const { getField } = useContext(FieldControllerContext);
  const field = getField(name);

  width = width || "12";

  const fieldWidths: { [key: string]: string } = {
    2: "col-md-2",
    3: "col-md-3",
    4: "col-md-4",
    6: "col-md-6",
    8: "col-md-8",
    9: "col-md-9",
    12: "col-md-12",
  };

  function isInvalid() {
    if (field?.validation?.invalid && !field.disabled) {
      return true;
    }
    return false;
  }

  function markRequired() {
    if (!required) return "";
    return <span className="required-point">*</span>;
  }

  return (
    <div
      className={`field-wrapper form-group ${fieldWidths[width]} ${
        isInvalid() ? "invalid" : ""
      }`}
    >
      {label ? (
        <label htmlFor={name}>
          {label} {markRequired()}
        </label>
      ) : (
        ""
      )}
      <div className="border-alert">{children}</div>
      <div className="error-msg">
        {isInvalid() ? field?.validation?.msg : ""}
      </div>
    </div>
  );
};

export default FieldComponent;
