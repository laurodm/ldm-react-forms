import { TRepeaterFieldData } from "../entities/repeaterFieldsEntities";
import {
  dataToDownConversion,
  dataToUpConversion,
} from "./repeaterFieldFunctions";

describe("repeaterField - dataToUpConversion", () => {
  test("dataToUpConversion ok", () => {
    const data = [
      { name: "cpf-0", value: "0" },
      { name: "id-0", value: "0" },
      { name: "name-0", value: "Nome 1" },
      { name: "cpf-1", value: "1" },
      { name: "id-1", value: "1" },
      { name: "name-1", value: "Nome 2" },
    ];

    const value: TRepeaterFieldData = dataToUpConversion(data) || [];

    expect(value).toBeInstanceOf(Array);
    expect(value.length).toBe(2);
    expect(value[0]["cpf"]).toBe("0");
    expect(value[1]["name"]).toBe("Nome 2");
  });

  test("dataToUpConversion NULL", () => {
    const data = null;

    const value = dataToUpConversion(data);

    expect(value).toBeNull;
  });
});

describe("repeaterField - dataToDownConversion", () => {
  test("dataToDownConversion ok", () => {
    const data = [
      { cpf: "0", id: "0", name: "Name 0" },
      { cpf: "1", id: "1", name: "Name 1" },
    ];

    const value = dataToDownConversion(data) || [];

    expect(value).not.toBeInstanceOf(Array);
    expect(value).toBeInstanceOf(Object);
    expect(Object.keys(value).length).toBe(6);
    expect(value["cpf-0"]).toBe("0");
    expect(value["name-1"]).toBe("Name 1");
  });

  test("dataToDownConversion NULL", () => {
    const data = null;

    const value = dataToDownConversion(data);

    expect(value).toBeNull;
  });
});
