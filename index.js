const oneAtTime = action => {
  let currentWork = null;

  const asyncAction = async () => {
    const res = await action();
    return res;
  };

  return async function() {
    if (currentWork) {
      const res = await currentWork;
      return res;
    }
    currentWork = asyncAction();
    const res = await currentWork;
    currentWork = null;
    return res;
  };
};
module.exports = oneAtTime;
