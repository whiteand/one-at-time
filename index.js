const oneAtTime = action => {
  if (typeof action !== "function") {
    throw new TypeError("Action must be an async function!");
  }
  let currentWork = null;

  const asyncAction = async (...args) => {
    const res = await action(...args);
    return res;
  };

  return async function(...args) {
    if (currentWork) {
      const res = await currentWork;
      return res;
    }
    currentWork = asyncAction(...args);
    const res = await currentWork;
    currentWork = null;
    return res;
  };
};
module.exports = oneAtTime;
