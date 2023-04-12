import React from "react";
import RepeaterFieldRender from "./repeaterFieldRender";
import RepeaterFieldProvider from "./contexts/repeaterFieldContext";

type TProps = {
  children: React.ReactElement;
  name: string;
};

const RepeaterField: React.FC<TProps> = (props) => {
  return (
    <RepeaterFieldProvider {...props}>
      <RepeaterFieldRender {...props}>{props.children}</RepeaterFieldRender>
    </RepeaterFieldProvider>
  );
};

export default RepeaterField;
