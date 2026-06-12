"use strict";

const ASCII = {
  H: "<HHHH",
  P: "|OOOO|",
  R: "|hThT|",
  C: "|____|",
};

function ascii(str) {
  let toUpper = str.toUpperCase();
  const lastIndex = toUpper.length - 1;

  if (typeof str !== "string") return `${str} is not a string`;

  return toUpper
    .split("")
    .map((char, index) => {
      if (index === lastIndex && char === "H") return (ASCII[char] = "HHHH>");
      return ASCII[char];
    })
    .join("::");
}

function detachEnd(str) {
  return str.slice(0, -7);
}

function detachHead(str) {
  return str.slice(7);
}

function fill(str) {
  let splitted = str.split("::");

  for (let i = 0; i < splitted.length; i++) {
    if (splitted[i] === "|____|") {
      splitted[i] = "|^^^^|";
    }
  }
  return splitted.join("::");
}

const train = ascii("HCC");
console.log(train);
const filled = fill(train);
console.log(filled);
// const detachedEnd = detachEnd(train);
// console.log(detachedEnd);
// const detachedHead = detachHead(detachedEnd);
// console.log(detachedHead);
