const oneAtTime = require("./index");
const wait = ms => new Promise(res => setTimeout(res, ms));
let i = 0;
const hardAction = async () => {
  console.log(`start ${i}`);
  await wait(2000);
  console.log(`end ${i}`);
  return i++;
};

const hardActionOneAtTime = oneAtTime(hardAction);

async function test() {
  const needHardWorkAction = async i => {
    await wait(i * 500);
    const res = await hardActionOneAtTime();
    return res;
  };
  const results = await Promise.all(
    Array.from({ length: 10 }, (e, i) => needHardWorkAction(i))
  );
  console.log(results);
}
test();
