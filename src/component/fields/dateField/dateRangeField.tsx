import React, { useEffect, useState } from "react";
import { useForm } from "../..";
import DateField from "./dateField";

type Props = {
  width?: string;
  required?: boolean;
  showYearPicker?: boolean;
  maxDate?: Date;
};

const DateRangeField: React.FC<Props> = ({
  width,
  showYearPicker,
  required,
  maxDate,
}) => {
  const [startDate, setStartDate] = useState<any>("");
  const [finalDisabled, setFinalDisabled] = useState<boolean>(true);
  const { fields, getField } = useForm();

  useEffect(() => {
    const startDateField = getField("startDate");
    if (startDateField?.value === startDate) return;
    if (!startDateField || !startDateField.value) {
      setStartDate("");
    } else {
      const newDate = new Date(startDateField.value);
      setStartDate(newDate);
    }
  }, [fields]);

  useEffect(() => {
    if (!startDate || startDate === "") {
      setFinalDisabled(true);
      return;
    }
    setFinalDisabled(false);
  }, [startDate]);

  return (
    <div className={`col-md-${width || 6}`}>
      <div className="row">
        <DateField
          label="Início"
          name="startDate"
          width="6"
          defaultValue={""}
          dateFormat={showYearPicker ? "yyyy" : undefined}
          showYearPicker={showYearPicker}
          required={required}
          maxDate={maxDate}
        />

        <DateField
          label="Fim"
          name="finalDate"
          width="6"
          minDate={startDate}
          maxDate={maxDate}
          disabled={finalDisabled}
          required={!finalDisabled}
          dateFormat={showYearPicker ? "yyyy" : undefined}
          showYearPicker={showYearPicker}
        />
      </div>
    </div>
  );
};

export default DateRangeField;
