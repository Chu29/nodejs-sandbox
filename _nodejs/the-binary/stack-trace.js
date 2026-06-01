function f(n) {
  console.log(`f(${n})`);
  if (n === 0) throw Error();
  f(n - 1);
}

// try {
//   f(5);
// } catch (err) {
//   console.error(err.stack);
// }
f(5)