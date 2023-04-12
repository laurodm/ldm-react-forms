export function objectRemoveUndefinedValues(object: {
  [key: string]: any;
}): any {
  Object.keys(object).forEach((key) => {
    if (object[key] === undefined) {
      delete object[key];
    }
  });

  return object;
}
