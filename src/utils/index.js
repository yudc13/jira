export const clearObject = (object) => {
  let result = {};
  Object.keys(object).forEach((key) => {
    let value = object[key];
    if (value) {
      result[key] = value;
    }
  });
  return result;
};

export const debounce = (fn, delay) => {
  let timer;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};
