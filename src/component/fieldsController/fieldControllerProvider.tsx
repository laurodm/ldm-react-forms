import React, { createContext, useContext, useEffect, useState } from "react";
import { IFieldValidator, TField } from "../formComponentTypes";
import { listenerAction } from "../listeners/listenerActions";
import { requiredField } from "../validator/defaultValidations";
import { objectRemoveUndefinedValues } from "../utils/objectRemoveUndefinedValues";

type TFieldControllerContext = {
  data?: { [key: string]: any };
  fields: TField[];
  fromData: boolean;
  registerField: (field: TField) => void;
  updateField: (field: TField) => void;
  changeField: (field: TField) => void;
  resetFields: () => void;
  getField: (fieldName: string) => TField | undefined;
  getValues: () => { [key: string]: any };
  removeField: (name: string) => void;
  validateAllFields: () => any[];
};

type Props = {
  children: React.ReactNode;
  validators?: { [key: string]: IFieldValidator[] };
  listeners?: any[];
  data?: { [key: string]: any };
  onChange?: (fields: TField[]) => void;
  onSetDataFields?: (data: any) => any;
};

export const FieldControllerContext = createContext<TFieldControllerContext>(
  {} as TFieldControllerContext
);

const FieldControllerProvider: React.FC<Props> = ({
  children,
  validators,
  listeners,
  onSetDataFields,
  data,
}) => {
  const [fields, setFields] = useState([] as TField[]);
  const [fromData, setFromData] = useState<boolean>(false);

  function getField(fieldName: string): TField | undefined {
    return fields.find((f) => f.name === fieldName);
  }

  function runListeners(listenedField: TField) {
    if (!listeners) return;
    listeners.map((listener) => {
      const { prop, name, trueValue, listened } = listener;
      if (listened === listenedField.name) {
        const changedField = listenerAction({
          listener: name,
          prop,
          trueValue,
          fields,
          listenedField,
        });
        updateField(changedField());
      }
    });
  }

  function buildField(fieldProps: any): TField {
    const {
      name,
      disabled,
      defaultValue,
      value,
      validators,
      required,
      label,
      noGetValue,
    } = fieldProps;
    return {
      name,
      disabled,
      defaultValue,
      value,
      validators,
      required,
      label,
      noGetValue,
    };
  }

  function registerField(fieldProps: any) {
    const field: TField = buildField(fieldProps);
    const hasField = fields.find((fld) => fld.name === field.name);
    if (hasField) return;
    if (typeof field.value === "undefined")
      field.value = field.defaultValue || "";
    fields.push(field);
    setFields(fields);
  }

  function updateField(fieldData: TField, fronData?: boolean) {
    const field: TField = objectRemoveUndefinedValues(fieldData);
    runListeners(field);
    setFields((oldField) => {
      const newField = oldField.map((fld) => {
        if (fld.name === field.name) {
          return { ...fld, ...field };
        }
        return fld;
      });
      return newField;
    });
    setFromData(fronData || false);
  }

  function buildValidatorField(field: TField) {
    const registredField = getField(field.name);
    if (
      !registredField ||
      (!registredField.required &&
        !registredField?.validators &&
        (!validators || !validators[field.name]))
    )
      return;

    let validator: any[] = [];
    if (registredField?.validators) validator = [...registredField.validators];
    if (validators && validators[field.name])
      validator = [...validator, ...validators[field.name]];
    if (registredField.required) validator.push(requiredField);

    return validator;
  }

  function validateField(field: TField) {
    const validator = buildValidatorField(field);
    if (!validator || validator.length <= 0) return;

    let validation = { invalid: false, msg: "" };
    if (!validator || field.disabled) return validation;
    for (let itemValidation of validator) {
      const isValid = itemValidation.run(field, fields);
      if (!isValid) {
        validation.invalid = true;
        validation.msg = itemValidation.message;
      }
    }

    return validation;
  }

  function changeField(field: TField) {
    const validation = validateField(field);
    updateField({ ...field, validation });
  }

  function validateAllFields() {
    const invalidFields: any[] = [];
    fields.map((field) => {
      const validation = validateField(field);
      if (validation?.invalid) invalidFields.push(field.name);
      updateField({ ...field, validation });
    });
    return invalidFields;
  }

  function getValues() {
    const formValue: { [key: string]: any } = {};
    fields.map((f) => {
      if (f.disabled || f.noGetValue) return;
      const value = f.getFormValue ? f.getFormValue(f, fields) : f.value;
      formValue[f.name] = value;
    });
    return formValue;
  }

  function removeField(name: string) {
    setFields((old) => {
      return old.filter((field) => field.name !== name);
    });
  }

  function resetFields() {
    fields.map((field) => {
      updateField({ ...field, value: field.defaultValue });
    });
  }

  /**
   * Insere valores iniciais aos campos quando há valores em "data"
   * executa filtro antes da inserção do "data"
   */
  function setDataInFields(data: { [key: string]: any }) {
    if (Object.keys(data).length <= 0) return;
    if (onSetDataFields) {
      data = onSetDataFields(data);
    }
    Object.keys(data).map((dataName) => {
      if (!fields.find((f) => f.name === dataName)) return;
      updateField({ name: dataName, value: data[dataName] }, true);
    });
  }

  function getDataToFields() {
    if (!data || Object.keys(data).length <= 0) return {};
    return data;
  }

  useEffect(() => {
    if (!data) return;
    setDataInFields(data);
  }, [data]);

  return (
    <FieldControllerContext.Provider
      value={{
        data,
        fields,
        fromData,
        registerField,
        updateField,
        changeField,
        getField,
        resetFields,
        getValues,
        removeField,
        validateAllFields,
      }}
    >
      {children}
    </FieldControllerContext.Provider>
  );
};

export default FieldControllerProvider;

export function useFieldsController() {
  return useContext(FieldControllerContext);
}
