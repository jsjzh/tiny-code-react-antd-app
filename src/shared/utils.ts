import {
  snakeCase,
  camelCase,
  kebabCase,
  lowerCase,
  startCase,
  upperCase,
  isPlainObject,
  isArray,
} from "lodash-es";

const caseMaps = {
  snakeCase,
  camelCase,
  kebabCase,
  lowerCase,
  startCase,
  upperCase,
};

export const sleepAsync = (timer: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, timer));

export const sleepSync = (timer: number) => {
  const current = Date.now();
  while (Date.now() - current < timer) {}
};

export const anyToCase = (
  obj: any,
  type:
    | "snakeCase"
    | "camelCase"
    | "kebabCase"
    | "lowerCase"
    | "startCase"
    | "upperCase"
) => {
  if (!isArray(obj) && !isPlainObject(obj)) return obj;

  let result: any;

  if (isArray(obj)) {
    result = obj.map((item) => anyToCase(item, type));
  } else if (isPlainObject(obj)) {
    result = {};
    Object.keys(obj).forEach((key) => {
      result[caseMaps[type](key)] = anyToCase(obj[key], type);
    });
  }

  return result;
};
