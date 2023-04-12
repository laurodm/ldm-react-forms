import { useContext, useEffect, useState } from "react";
import { FieldControllerContext } from "../fieldsController/fieldControllerProvider";
import { useForm } from "../formComponent";
import { TField } from "../formComponentTypes";

export type TUseField = {
  field: TField;
  fieldState: TField;
  updateField: (field: TField) => void;
  changeField: (field: TField) => void;
};

export function useField(props: any): TUseField {
  const { disabled, required, name } = props;
  const form = useForm();
  const { fields, registerField, getField, updateField, changeField } =
    useContext(FieldControllerContext);
  const [fieldState, setFieldState] = useState<TField>({} as TField);

  useEffect(() => {
    const isDisabled = disabled || form.disabled;
    registerField({ ...props, disabled: isDisabled });
  }, []);

  useEffect(() => {
    const field = getField(props.name);
    if (!field) return;
    setFieldState({ ...field, value: field.value || "" });
  }, [fields]);

  useEffect(() => {
    updateField({ name, disabled, required });
  }, [disabled, required]);

  return {
    field: getField(props.name) || ({} as TField),
    fieldState,
    updateField,
    changeField,
  };
}
