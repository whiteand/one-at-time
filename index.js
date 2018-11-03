const oneAtTime = action => {
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
