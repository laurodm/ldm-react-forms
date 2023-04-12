import { useEffect, useState } from "react";
import { TFieldRow, TFormValueType } from "../entities/repeaterFieldsEntities";

export type TRepeaterFieldUseFieldRows = {
  fieldRows: TFieldRow[];
  updateFieldRows: (formValue: TFormValueType) => void;
  addFieldRow: () => void;
  removeFieldRow: (fieldRowId: string) => void;
};

export function repeaterFieldFieldRowsController(): TRepeaterFieldUseFieldRows {
  const [rowId, setRowId] = useState<number>(0);
  const [fieldRows, setFieldRows] = useState<TFieldRow[]>([] as TFieldRow[]);

  function updateFieldRows(formValue: TFormValueType) {
    let rows = [{ id: 0, value: {} }];
    if (formValue && formValue.length > 0) {
      rows = formValue.map((value, index) => {
        setRowId(index);
        return { id: index, value };
      });
    }
    setFieldRows(rows);
  }

  function addFieldRow() {
    const newId = rowId + 1;
    setFieldRows((old) => {
      return [...old, { id: newId, value: "" }];
    });
    setRowId(newId);
  }

  function removeFieldRow(fieldRowId: string) {
    setFieldRows((old) => {
      return old.filter((fieldRw) => fieldRw.id.toString() !== fieldRowId);
    });
  }

  function startFirstEmptyRow() {
    if (fieldRows.length > 0) return;
    setFieldRows([{ id: 0, value: {} }]);
  }

  useEffect(() => {
    startFirstEmptyRow();
  }, []);

  return {
    fieldRows,
    updateFieldRows,
    addFieldRow,
    removeFieldRow,
  };
}
