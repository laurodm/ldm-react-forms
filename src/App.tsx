import React from "react";
import { FormComponent, InputField, RepeaterField } from "./component";

const App: React.FC = ({}) => {
  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <>
      <h3>ldm-react-forms</h3>
      <FormComponent onSubmit={onSubmit}>
        <RepeaterField name="names">
          <InputField name="nome" label="Nome" />
        </RepeaterField>
        <button type="submit">enviar</button>
      </FormComponent>
    </>
  );
};

export default App;
