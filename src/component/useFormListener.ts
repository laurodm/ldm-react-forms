import { useEffect, useState } from "react";
import { useForm } from ".";
import { TField } from "./formComponentTypes";

type Params = {
  listener: string;
  target: string;
  runAction: (targetField: TField) => void;
};

export function useFormListener(params: Params) {
  const { target, listener, runAction } = params;
  const { fields, updateField } = useForm();
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    const listenerField = fields.find((f) => f.name === listener);
    const targetField = fields.find((f) => f.name === target);

    if (!targetField || (targetField.disabled && listenerField?.disabled)) {
      return;
    } else if (
      !listenerField?.disabled &&
      (targetField.disabled || targetField.value === "")
    ) {
      updateField({ name: listener, disabled: true, value: "", selected: "" });
      return;
    }

    if (targetField.value !== "" && targetField.value !== selected) {
      setSelected(targetField.value);
      runAction(targetField);
    }
  }, [fields]);

  function updateListener(props: any) {
    updateField({ ...props, name: listener });
  }

  return { updateListener };
}
