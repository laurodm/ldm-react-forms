import { TField } from "../formComponentTypes";

type TSettings = {
  prop: string;
  listener: string;
  trueValue: any;
  listenedField: TField;
  fields: TField[];
};

export function listenerAction(settings: TSettings) {
  const { listener, trueValue, listenedField, fields, prop } = settings;

  const listenerChangeProp: { [key: string]: any } = {
    disabled: () => {
      const dependentField = fields.find((f) => f.name === listener);
      let disabled = false;
      if (listenedField.value === trueValue) {
        disabled = true;
      } else {
        disabled = false;
      }
      return { ...dependentField, disabled };
    },
  };

  return listenerChangeProp[prop];
}

export function maskeListenerToDisable(
  name: string,
  listened: string,
  trueValue: any
) {
  return { name, listened, trueValue, prop: "disabled" };
}
