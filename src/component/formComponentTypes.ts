export type TField = {
  name: string;
  value?: any;
  label?: string;
  defaultValue?: any;
  disabled?: boolean;
  validation?: {
    invalid: boolean;
    msg: string;
  };
  validators?: IFieldValidator[];
  selected?: string | any[];
  required?: boolean;
  noGetValue?: boolean;
  getFormValue?: (field: TField, fields: TField[]) => void;
};

export type TFieldComponent = {
  name: string;
  label?: string;
  value?: any;
  disabled?: boolean;
  width?: string;
  defaultValue?: any;
  onChange?: (fieldValue: any) => void;
  onBlur?: (fieldValue: any, field?: TField) => void;
  onFocus?: (fieldValue: any, field?: TField) => void;
  required?: boolean;
};

export interface IFieldValidator {
  run: (field: TField, formFields: TField[]) => boolean;
  message: string;
}
