import { TField } from "../../../formComponentTypes";
import { TRepeaterFieldUseFieldRows } from "../hooks/repeaterFieldFieldRowsController";

export type TRepeaterFieldData = { [key: string]: any }[];

export type TRepeaterFieldDirection = "up" | "down";

export type TRepeaterFieldContext = {
  fieldRowsController: TRepeaterFieldUseFieldRows;
  dataTransferUp: (data: TField[]) => void;
};

export type TFieldRow = {
  id: number;
  value: any;
};

export type TFormValueType = { [key: string]: any }[];
