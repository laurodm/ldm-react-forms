import { createContext, useContext, useEffect, useState } from "react";
import FieldControllerProvider from "../../../fieldsController/fieldControllerProvider";
import { useForm } from "../../../formComponent";
import {
  TRepeaterFieldContext,
  TRepeaterFieldData,
} from "../entities/repeaterFieldsEntities";
import {
  dataToDownConversion,
  dataToUpConversion,
} from "../functions/repeaterFieldFunctions";
import { repeaterFieldFieldRowsController } from "../hooks/repeaterFieldFieldRowsController";
import { TField } from "../../../formComponentTypes";
import { objectsIsEqual } from "../../../utils/compareObjects";

export const RepeaterFieldContext = createContext({} as TRepeaterFieldContext);

type TProps = {
  children: React.ReactNode;
  name: string;
};

const RepeaterFieldProvider: React.FC<TProps> = (props) => {
  const formContext = useForm();
  const fieldRowsController = repeaterFieldFieldRowsController();
  const [dataForm, setDataForm] = useState<TRepeaterFieldData>();
  const [dataFields, setDataFields] = useState<{ [key: string]: any }>();

  function dataTransferDown(formValue: TRepeaterFieldData) {
    const dataConverted = dataToDownConversion(formValue);
    fieldRowsController.updateFieldRows(formValue);
    if (
      !dataFields ||
      !dataConverted ||
      objectsIsEqual(dataConverted, dataFields)
    ) {
      return;
    }
    setDataFields(dataConverted);
  }

  function dataTransferUp(data: TField[]) {
    const dataConverted = dataToUpConversion(data);
    if (!dataConverted) return;
    setDataForm(dataConverted);
  }

  // catch envent down
  useEffect(() => {
    if (!formContext.fromData) return;
    const formValue = formContext.getField(props.name)?.value;
    dataTransferDown(formValue);
  }, [formContext.fields]);

  // catch envent up
  useEffect(() => {
    if (!dataForm) return;
    formContext.updateField({ name: props.name, value: dataForm });
    return;
  }, [dataForm]);

  return (
    <RepeaterFieldContext.Provider
      value={{ fieldRowsController, dataTransferUp }}
    >
      <FieldControllerProvider data={dataFields}>
        {props.children}
      </FieldControllerProvider>
    </RepeaterFieldContext.Provider>
  );
};

export default RepeaterFieldProvider;

export function useRepeaterFieldContext() {
  return useContext(RepeaterFieldContext);
}
