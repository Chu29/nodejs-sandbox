// Creating Events

const { EventEmitter } = require("events");

// Create an instance of EventEmitter (Creating a new event emitter)
const myEmitter = new EventEmitter(); // using the new keyword to create an instance of the EventEmitter class

// Using prototypal inheritance to create an EventEmitter
class MyEmitter extends EventEmitter {
  constructor(opts = {}) {
    super(opts);
    this.name = opts.name;
  }
}


/**
 * Emitting Events
 */

// we call the emit method on the event emitter instance to emit an event
