function factory() {
  return function doSomething(a, b) {
    return a + b;
  };
}

// Function factory pattern: factory() returns a function that is then invoked with (2, 3)
const result = factory()(2, 3);
console.log(result);

// IIFE implementation of the factory function

(function add(a, b) {
  console.log(a + b);
})(2, 3);

// With arrow functions
((a, b) => console.log(a + b))(2, 3);

// setTimeout(() => {
//   console.log(`Hello from the future`);
// }, 5000);

let count = 0;

const intervalId = setInterval(() => {
  console.log(`Hello from the interval`);
  count++;
  if (count === 5) {
    clearInterval(intervalId);
  }
}, 1000);

const obj0 = { id: 0, fn: function() { console.log(this.id); } };
const obj1 = { id: 1, fn: obj0.fn };

obj1.fn();
obj0.fn();
