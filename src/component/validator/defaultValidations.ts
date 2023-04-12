import { IFieldValidator } from "../formComponentTypes";

export const requiredField: IFieldValidator = {
  run: function (field) {
    const value = field.value;
    if (!value || value === "" || value === null) {
      return false;
    }
    return true;
  },

  message: "Campo obrigatório. Não pode ser vazio.",
};

export const isEmail: IFieldValidator = {
  run: function isEmail(field) {
    const value = field.value;
    const rgx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return rgx.test(value);
  },

  message: "Este não é um e-mail válido.",
};

export const confirmEmail: IFieldValidator = {
  run: function (field, formFields) {
    const value = field.value;
    const emailFieldValue = formFields.find((f) => f.name === "email")?.value;
    return value !== emailFieldValue ? false : true;
  },

  message: "E-mails diferentes.",
};
