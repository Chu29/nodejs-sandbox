// Functional Inheritance (Object.create)

const wolf = {
  howl: function () {
    console.log(this.name + ": awooooooo");
  },
};

const dog = Object.create(wolf, {
  woof: {
    value: function () {
      console.log(this.name + ": woof!");
    },
  },
});

function createDog(name) {
  return Object.create(dog, {
    name: {
      value: name + " the dog",
    },
  });
}

const rufus = createDog("Rufus");
rufus.howl();
rufus.woof();

console.log(Object.getPrototypeOf(rufus) === dog);

// Constructor Functions

console.log("\n\n-------- Constructor Functions Inheritance---------");

function Wolf(name) {
  this.name = name + " the wolf";
}

Wolf.prototype.howl = function () {
  console.log(this.name + ": awooooooo");
};

function Dog(name) {
  Wolf.call(this, name + " the dog");
}

function inherit(proto) {
  function ProtoLink() {}
  ProtoLink.prototype = proto;
  return new ProtoLink();
}

Dog.prototype = inherit(Wolf.prototype);
Dog.prototype.woof = function () {
  console.log(this.name + ": woof!");
};

const denver = new Dog("Denver");
denver.howl();
denver.woof();

console.log("\n\n--------- Class-Syntax Constructor Inheritance ---------");

class Wolf {
  constructor(name) {
    this.name = name + " the wolf";
  }

  howl() {
    console.log(this.name + ": awooooooo");
  }
}

class Dog extends Wolf {
  constructor(name) {
    super(name);
  }

  woof() {
    console.log(this.name + ": woof!");
  }
}

const max = new Dog("Max");
max.howl();
max.woof();
