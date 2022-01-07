export const clearObject = (object: Record<string, any>) => {
  let result: Record<string, any> = {};
  Object.keys(object).forEach((key) => {
    let value = object[key];
    if (value) {
      result[key] = value;
    }
  });
  return result;
};

export const debounce = (fn: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};
