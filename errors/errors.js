const doTask = (amount) => {
  return new Promise((resolve, reject) => {
    if (typeof amount !== "number") {
      reject(new TypeError("Amount must be a number"));
      return;
    }
    if (amount <= 0) {
      reject(new RangeError("Amount must be greater than zero"));
      return;
    }
    if (amount % 2) {
      reject(new OddError("amount"));
      return;
    }
    resolve(amount / 2);
  });
};

class OddError extends Error {
  constructor(varName = "") {
    super(`${varName} must be an even number`);
    this.code = "ERR_AMOUNT_MUST_BE_EVEN";
  }
  get name() {
    return "OddError " + [this.code];
  }
}

doTask(4)
  .then((result) => {
    throw Error("spanner in the works");
    // console.log("Result", result);
  })
  .catch((err) => {
    if (err.code === "ERR_AMOUNT_MUST_BE_NUMBER") {
      console.error("Expected a number");
    } else if (err.code === "ERR_AMOUNT_MUST_EXCEED_ZERO") {
      console.error("Number must be non-negative");
    } else if (err.code === "ERR_AMOUNT_MUST_BE_EVEN") {
      console.error("Number must be even");
    } else {
      console.error("unknown error: ", err);
    }
  });

// try {
//   const result = doTask(4);
//   result();
//   console.log(" Result: ", result);
// } catch (err) {
//   if (err.code === "ERR_AMOUNT_MUST_BE_NUMBER") {
//     console.error("Expected a number");
//   } else if (err.code === "ERR_AMOUNT_MUST_EXCEED_ZERO") {
//     console.error("Number must be non-negative");
//   } else if (err.code === "ERR_AMOUNT_MUST_BE_EVEN") {
//     console.error("Number must be even");
//   } else {
//     console.error("unknown error: ", err);
//   }
// }

// function codify(err, code) {
//   err.code = code;
//   return err;
// }
