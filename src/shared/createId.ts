let count = 9999;

const createId = () => {
  const _count = count;
  count++;
  return `@__@#${_count}`;
};

export const parseId = (key: string) => Number(key.split("#")[1]);

export default createId;
