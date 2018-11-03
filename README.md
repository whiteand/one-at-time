# one-at-time
Returns action that will be run only one at time.

# Example for usage

```javascript
const oneAtTime = require("one-at-time");
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
    // This is hardActionOneAtTime called 10 times, but hardAction - will be executed only 2 times.
    // Because while executing it blocks another executing.
    const res = await hardActionOneAtTime(); 
    // It returns the same result for all calls that was produced while hardAction call executes.
    return res;
  };
  const results = await Promise.all(
    Array.from({ length: 10 }, (e, i) => needHardWorkAction(i))
  );
  console.log(results);
}
test();
// OUTPUT:
// start 0
// end 0
// start 1
// end 1
// [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1 ]
```
