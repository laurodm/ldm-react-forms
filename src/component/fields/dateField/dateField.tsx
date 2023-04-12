import React, { useEffect, useState } from 'react'
import { TFieldComponent } from '../../formComponentTypes'
import FieldComponent from '../fieldComponent'
import DatePicker, { registerLocale } from 'react-datepicker'
import ptBR from 'date-fns/locale/pt-BR'
import 'react-datepicker/dist/react-datepicker.css'
import './dateField.css'
import { useField } from '../useField'

registerLocale('pt-BR', ptBR)

type Props = TFieldComponent & {
  minDate?: Date
  maxDate?: Date
  showYearPicker?: boolean
  dateFormat?: string
}

const DateFieldB: React.FC<Props> = (props) => {

  const { name, minDate, maxDate, disabled, defaultValue, showYearPicker, dateFormat, onChange } = props
  const { fieldState, changeField } = useField(props)
  const [date, setDate] = useState<Date | null>(null)

  function handleChange(value: Date) {
    if (!value) return
    if (onChange) onChange(value)
    const isoValue = value.toISOString()

    changeField({ name, value: isoValue, disabled });
  }

  useEffect(() => {
    if (!fieldState || !fieldState.value) {
      setDate(null)
      return
    }
    setDate(new Date(fieldState.value))
  }, [fieldState])

  return (
    <FieldComponent {...props}>
      <DatePicker
        selected={date || defaultValue || null}
        onChange={handleChange}
        locale="pt-BR"
        dateFormat={dateFormat || 'dd/MM/yyyy'}
        disabled={fieldState.disabled}
        className={'form-control'}
        showYearPicker={showYearPicker}
        minDate={minDate}
        maxDate={maxDate}
      />
    </FieldComponent>
  )
}

export default DateFieldB
