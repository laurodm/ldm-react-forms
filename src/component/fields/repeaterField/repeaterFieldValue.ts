import { useContext, useEffect, useState } from "react";
import { FieldControllerContext } from "../../fieldsController/fieldControllerProvider";
import { TField } from "../../formComponentTypes";

export type TFieldValue = { [key: string]: any }[];

export type TRepeaterFieldValue = {
  value: TFieldValue;
  updateValue: (fields: TField[]) => void;
};

export function repeaterFieldValue(): TRepeaterFieldValue {
  const { fields } = useContext(FieldControllerContext);
  const [value, setValue] = useState<TFieldValue>({} as TFieldValue);

  function updateValue(fields: TField[]) {
    let fieldValue = [] as TFieldValue;
    fields.forEach((field) => {
      const nameAndIndex = field.name.split("-");
      const name = nameAndIndex[0];
      const index = parseInt(nameAndIndex[1]);
      fieldValue[index] = { ...fieldValue[index], ...{ [name]: field.value } };
      const cleanedFieldValue = fieldValue.filter((field) => field);
      fieldValue = cleanedFieldValue;
    });
    setValue(fieldValue);
  }

  useEffect(() => {
    if (!fields || fields.length <= 0) return;
    updateValue(fields);
  }, [fields]);

  return { value, updateValue };
}
