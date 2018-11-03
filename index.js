const oneAtTime = function(action) {
  if (typeof action !== "function") {
    throw new TypeError("Action must be an async function!");
  }
  let currentWork = null;

  return async function(...args) {
    if (currentWork) {
      const res = await currentWork;
      return res;
    }
    currentWork = (async () => {
      const res = action.bind(this)(...args);
      return res;
    })();
    const res = await currentWork;
    currentWork = null;
    return res;
  };
};
module.exports = oneAtTime;
