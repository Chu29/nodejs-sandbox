function isPalindrome(str) {
  let word = str.toLowerCase().trim().toString();
  // let toString = word.toString();

  let clockwise = [];
  let anticlockwise = [];

  for (const char of word) {
    clockwise.push(char);
    anticlockwise.unshift(char);
  }

  for (let index = 0; index < clockwise.length; index++) {
    if (clockwise[index] === anticlockwise[index]) {
      continue;
    } else {
      return `${str} is not a palindrome`;
    }
  }

  return `${str} is a palindrome`;
}

const ans = isPalindrome("racecar");
console.log(ans);

console.log(isPalindrome("1221"));
