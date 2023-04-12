export function arraysIsEqual(arrayA: any[], arrayB: any[]): boolean {
  //size
  if (arrayA.length !== arrayB.length) return false;

  for (let index in arrayA) {
    //types
    if (typeof arrayA[index] !== typeof arrayB[index]) return false;
    //values
    if (Array.isArray(arrayA[index])) {
      return arraysIsEqual(arrayA[index], arrayB[index]);
    }
    if (typeof arrayA[index] === "object") {
      return objectsIsEqual(arrayA[index], arrayB[index]);
    }
    if (arrayA[index] !== arrayB[index]) return false;
  }

  return true;
}

export function objectsIsEqual(
  objA: { [key: string]: any },
  objB: { [key: string]: any }
): boolean {
  //is object
  if (typeof objA !== "object" || typeof objB !== "object") return false;
  //size
  if (Object.keys(objA).length !== Object.keys(objB).length) return false;

  for (let key of Object.keys(objA)) {
    // keys
    if (!Object.keys(objB).includes(key)) return false;
    //value type
    if (typeof objB[key] !== typeof objA[key]) return false;
    //values
    if (Array.isArray(objA[key])) {
      return arraysIsEqual(objA[key], objB[key]);
    }
    if (typeof objA[key] === "object") {
      return objectsIsEqual(objA[key], objB[key]);
    }
    if (objB[key] !== objA[key]) return false;
  }

  return true;
}
