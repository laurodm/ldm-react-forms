import {
  Children,
  cloneElement,
  JSXElementConstructor,
  ReactElement,
} from "react";
import { TFieldRow } from "../entities/repeaterFieldsEntities";

export function renderAField(
  index: number,
  fieldRw: TFieldRow,
  children: ReactElement
) {
  return Children.map(
    children,
    (child: ReactElement<any, string | JSXElementConstructor<any>>) => {
      const childName = child.props.name || child.props.id;
      return cloneElement(child, {
        key: index,
        name: `${childName}-${fieldRw.id}`,
        id: `${childName}-${fieldRw.id}`,
      });
    }
  );
}
