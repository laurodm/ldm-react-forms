import React, { createContext, useContext, useEffect, useRef } from "react";
import { IFieldValidator, TField } from "./formComponentTypes";
import FieldControllerProvider, {
  FieldControllerContext,
} from "./fieldsController/fieldControllerProvider";

import "./formComponent.css";

export type TFormComponentContext = {
  data: { [key: string]: any };
  fromData: boolean;
  fields: TField[];
  formRef: { current: HTMLFormElement };
  registerField: (field: TField) => void;
  updateField: (field: TField, fromData?: boolean) => void;
  changeField: (field: TField) => void;
  getField: (fieldName: string) => TField | undefined;
  getFormValues: () => { [key: string]: any };
  removeField: (name: string) => void;
  resetForm: () => void;
  disabled?: boolean;
};

const FormComponentContext = createContext<TFormComponentContext>(
  {} as TFormComponentContext
);

type Props = {
  children: React.ReactNode;
  className?: string;
  validators?: { [key: string]: IFieldValidator[] };
  listeners?: any[];
  data?: { [key: string]: any };
  disabled?: boolean;
  onFormChange?: (fields: TField[]) => void;
  onSubmit?: (values: any, fields?: TField[], resetForm?: () => void) => void;
  onSetDataFields?: (data: any) => any;
};

const Form_: React.FC<Props> = ({
  children,
  className,
  disabled,
  onFormChange,
  onSubmit,
}) => {
  const fieldController = useContext(FieldControllerContext);
  const { fields, validateAllFields, updateField } = fieldController;
  const formRef = useRef<any>();

  function validateForm() {
    const invalidFields = validateAllFields();

    return invalidFields.length > 0 ? false : true;
  }

  function getFormValues() {
    const formValue: { [key: string]: any } = {};

    fields.map((f) => {
      if (f.disabled || f.noGetValue) return;
      const value = f.getFormValue ? f.getFormValue(f, fields) : f.value;
      formValue[f.name] = value;
    });

    return formValue;
  }

  function resetForm() {
    fields.map((field) => {
      updateField({ ...field, value: field.defaultValue || "" });
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    let formIsInvalid = validateForm();

    if (formIsInvalid && onSubmit) {
      const formValues = getFormValues();

      onSubmit(formValues, fields, resetForm);
    }
  }

  useEffect(() => {
    if (onFormChange) onFormChange(fields);
  }, [fields]);

  return (
    <FormComponentContext.Provider
      value={{
        ...fieldController,
        formRef,
        resetForm,
        disabled,
        getFormValues,
      }}
    >
      <form className={className} onSubmit={handleSubmit} ref={formRef}>
        {children}
      </form>
    </FormComponentContext.Provider>
  );
};

const FormComponent: React.FC<Props> = (props) => {
  return (
    <FieldControllerProvider {...props}>
      <Form_ {...props} />
    </FieldControllerProvider>
  );
};

export default FormComponent;

// hook

export function useForm() {
  return useContext(FormComponentContext);
}
