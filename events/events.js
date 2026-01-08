// Creating Events

// const { EventEmitter } = require("events");

// Create an instance of EventEmitter (Creating a new event emitter)
const myEmitter = new EventEmitter(); // using the new keyword to create an instance of the EventEmitter class

// Using prototypal inheritance to create an EventEmitter
// Emitting Events
/**
 * we call the emit method on the event emitter instance to * emit an event.
 * Here, "an-event" is the name of the event being emitted, * and some, args are the arguments passed to the event * * * listeners.
 */
class MyEmitter extends EventEmitter {
  constructor(opts = {}) {
    super(opts);
    this.name = opts.name;
  }
  destroy(err) {
    if (err) this.emit("error", err);
    this.emit("close");
  }
}

// Listening to Events

const emitter = new MyEmitter({ name: "My Emitter" });

// register an event listener for the event "close"
// emitter.on("close", () => console.log("close event fired")); // listen for the close event
// emitter.emit("close"); // emit the close event

// // register an event listener for the event "add"
// emitter.on("add", (a, b) => {
//   console.log(`The sum is: ${a + b}`);
// }); // listen for the add event

// emitter.emit("add", 5, 10); // emit the add event with arguments 5 and 10

// console.log("---- Demonstrating PrependListener ----");
// emitter.on("my-event", () => console.log("1st"));
// emitter.on("my-event", () => console.log("2nd"));
// emitter.prependListener("my-event", () => console.log("3rd"));

// emitter.emit("my-event"); // emit the my-event event

// console.log("---- Single User Listener (once) ----");
// emitter.once("single-use", () => console.log("This will be logged only once"));
// emitter.emit("single-use"); // This will log the message
// emitter.emit("single-use");
// emitter.emit("single-use");

// console.log("---- Removing Listeners ----");
// const listener1 = () => console.log("Listener 1");
// const listener2 = () => console.log("Listener 2");

// emitter.on("removable-event", listener1);
// emitter.on("removable-event", listener2);
// emitter.on("another-event", () => console.log("Another Event"));

// setInterval(() => {
//   emitter.emit("removable-event");
//   emitter.emit("another-event");
// }, 200);

// setTimeout(() => emitter.removeAllListeners("removable-event"), 500);
// setTimeout(() => emitter.removeAllListeners(), 1100);

// console.log("---- Error Event Handling ----");

// process.stdin.resume(); // Keep the Node.js process running

// emitter.on("error", (err)=>console.log("Error: ", err.message))

// emitter.emit("error", new Error("Something went wrong!")); // emit an error event without a listener

import { once, EventEmitter } from "events";
import { setTimeout } from "timers/promises";

const sometimesLaggy = new EventEmitter();

const ac = new AbortController();
const { signal } = ac;

setTimeout(2000 * Math.random(), null, { signal }).then(() =>
  sometimesLaggy.emit("ping")
);

setTimeout(500).then(() => ac.abort());

try {
  await once(sometimesLaggy, "ping", { signal });
  console.log("Ping!");
} catch (error) {
  if (error.code !== "ABORT_ERR") throw error;
  console.log("canceled");
}
