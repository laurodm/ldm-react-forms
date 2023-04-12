import React from 'react'
import './formButtons.css'

type Button = {
  id?: string
  text: string
  type?: 'submit' | 'button'
  onClick?: () => void
  size?: 'sm' | 'lg' | 'xs' | 'md'
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
}

type Props = {
  buttons: Button[]
  className?: string
}

const FormButtons: React.FC<Props> = ({ buttons, className }) => {

  className = className || ''

  function makeButton(button: Button, index: number): JSX.Element {
    let { id, onClick, size, color, text, type } = button

    color = color || 'default'
    type = type || 'button'
    size = size || 'md'

    const buttonProps = { id, type, onClick }

    return <button key={index} {...buttonProps} className={`btn btn-${color} btn-${size}`}>{text}</button>
  }

  function makeButtons(buttons: Button[]) {
    return buttons.map((btn, index) => makeButton(btn, index))
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className={`form-buttons ${className}`}>
          {makeButtons(buttons)}
        </div>
      </div>
    </div>
  )
}

export default FormButtons
