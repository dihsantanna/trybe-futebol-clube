const camelizator = (str: string) => str
  .replace(/_(.)/g, (_m: string, l: string) => l.toUpperCase());

const camelizeKeys = (arr: object[]) => arr.map((obj) => {
  let newObj: unknown;
  Object.entries(obj)
    .map((entry) => [camelizator(entry[0]), entry[1]])
    .forEach((values) => {
      newObj = {
        ...newObj as object,
        [values[0]]: values[1],
      };
    });
  return newObj as object;
});

export default camelizeKeys;
