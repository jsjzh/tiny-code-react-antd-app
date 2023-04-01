export const sleepAsync = (timer: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, timer));

export const sleepSync = (timer: number) => {
  const current = Date.now();
  while (Date.now() - current < timer) {}
};

export const realType = (
  obj: any,
):
  | "Number"
  | "String"
  | "Boolean"
  | "Object"
  | "Null"
  | "Undefined"
  | "Array"
  | "Function"
  | "Symbol"
  | "Date"
  | "BigInt"
  | "Map"
  | "Set"
  | "WeakMap"
  | "WeakSet"
  | "Promise"
  | "AsyncFunction"
  | string => {
  const matched = /^\[object (\w+)\]$/.exec(
    Object.prototype.toString.call(obj),
  );
  return matched ? matched[1] : "unknown";
};

realType.isNumber = (x: any) => realType(x) === "Number";
realType.isString = (x: any) => realType(x) === "String";
realType.isBoolean = (x: any) => realType(x) === "Boolean";
realType.isObject = (x: any) => realType(x) === "Object";
realType.isNull = (x: any) => realType(x) === "Null";
realType.isUndefined = (x: any) => realType(x) === "Undefined";
realType.isArray = (x: any) => realType(x) === "Array";
realType.isFunction = (x: any) => realType(x) === "Function";
realType.isSymbol = (x: any) => realType(x) === "Symbol";
realType.isDate = (x: any) => realType(x) === "Date";
realType.isBigInt = (x: any) => realType(x) === "BigInt";
realType.isMap = (x: any) => realType(x) === "Map";
realType.isSet = (x: any) => realType(x) === "Set";
realType.isWeakMap = (x: any) => realType(x) === "WeakMap";
realType.isWeakSet = (x: any) => realType(x) === "WeakSet";
realType.isPromise = (x: any) => realType(x) === "Promise";
realType.isAsyncFunction = (x: any) => realType(x) === "AsyncFunction";
