import { useContext } from "react";
import { FieldControllerContext } from "../../../fieldsController/fieldControllerProvider";
import { RepeaterFieldContext } from "../contexts/repeaterFieldContext";
import { TFieldRow } from "../entities/repeaterFieldsEntities";

export type TRepeaterFieldRows = {
  fieldRows: TFieldRow[];
  addFieldRow: () => void;
  removeFieldRow: (event: any) => void;
};

export function repeaterFieldRenderRowsActions(): TRepeaterFieldRows {
  const fieldControllerContext = useContext(FieldControllerContext);
  const { fieldRowsController } = useContext(RepeaterFieldContext);

  function removeEchFieldInRow(rowId: number) {
    const fieldsToRemove = fieldControllerContext.fields.filter((field) =>
      field.name.includes(`-${rowId}`)
    );
    if (!fieldsToRemove || fieldsToRemove.length <= 0) return;
    fieldsToRemove.forEach((field) => {
      fieldControllerContext.removeField(field.name);
    });
  }

  function removeFieldRow_(event: any) {
    let targetId = event?.target?.id;
    if (!targetId) targetId = event?.target?.closest("button")?.id;
    fieldRowsController.removeFieldRow(targetId);
    removeEchFieldInRow(targetId);
  }

  return {
    addFieldRow: fieldRowsController.addFieldRow,
    removeFieldRow: removeFieldRow_,
    fieldRows: fieldRowsController.fieldRows,
  };
}
