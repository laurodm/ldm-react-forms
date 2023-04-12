import React, { useContext, useEffect } from "react";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { repeaterFieldRenderRowsActions } from "./hooks/repeaterFieldRenderRowsActions";
import { useForm } from "../../formComponent";
import { TFieldRow } from "./entities/repeaterFieldsEntities";
import { useRepeaterFieldContext } from "./contexts/repeaterFieldContext";
import { FieldControllerContext } from "../../fieldsController/fieldControllerProvider";
import { renderAField } from "./functions/repeaterFieldRenderFunctions";

type TProps = {
  name: string;
  children: React.ReactElement;
};

const RepeaterFieldRender: React.FC<TProps> = (props) => {
  const formContext = useForm();
  const repeaterRows = repeaterFieldRenderRowsActions();
  const repeaterContext = useRepeaterFieldContext();
  const fieldsControllerContext = useContext(FieldControllerContext);

  function renderRemoveButton(fieldRwId: number) {
    if (repeaterRows.fieldRows.length <= 1) return <></>;
    return (
      <button
        type="button"
        id={`${fieldRwId}`}
        onClick={repeaterRows.removeFieldRow}
        className="repeater-field-removerow"
        title="Remover campo"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    );
  }

  function renderFields() {
    return repeaterRows.fieldRows.map((fieldRw: TFieldRow, index) => {
      return (
        <div className="fields-row" key={index}>
          <div className="field-col">
            {renderAField(index, fieldRw, props.children)}
          </div>
          <div className="field-col">{renderRemoveButton(fieldRw.id)}</div>
        </div>
      );
    });
  }

  useEffect(() => {
    formContext.registerField({ ...props });
  }, []);

  useEffect(() => {
    if (!fieldsControllerContext.fields) return;
    repeaterContext.dataTransferUp(fieldsControllerContext.fields);
  }, [fieldsControllerContext.fields]);

  return (
    <>
      {renderFields()}
      <div className="fields-row">
        <div className="fields-col">
          <div style={{ padding: "10px 15px" }}>
            <button type="button" onClick={repeaterRows.addFieldRow}>
              <FontAwesomeIcon icon={faPlus} /> Adicionar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepeaterFieldRender;
