import { TField } from "../../../formComponentTypes";
import { TRepeaterFieldData } from "../entities/repeaterFieldsEntities";

export function dataToUpConversion(
  data: TField[] | null
): TRepeaterFieldData | null {
  if (!data) return null;
  let lastIndex: string;
  let currentObj: { [key: string]: any } = {};
  const converted: TRepeaterFieldData = [];
  data.forEach((d) => {
    const index = d.name.split("-")[1];
    const label = d.name.split("-")[0];
    if (lastIndex !== index) {
      lastIndex = index;
      currentObj = {};
      converted.push(currentObj);
    }
    currentObj[label] = d.value;
  });

  return converted;
}

export function dataToDownConversion(data: TRepeaterFieldData | null): {
  [key: string]: any;
} | null {
  if (!data) return null;
  const convertedData: { [key: string]: any } = {};
  data.forEach((d, index) => {
    Object.keys(d).forEach((key) => {
      convertedData[`${key}-${index}`] = d[key];
    });
  });
  return convertedData;
}
