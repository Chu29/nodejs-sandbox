function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    // ensure integer middle index
    const mid = Math.floor(left + (right - left) / 2);

    // formatted output showing the current window and middle
    console.log(`Window: [${left} .. ${right}]  mid=${mid}  value=${arr[mid]}`);

    if (arr[mid] === target) {
      return `Found ${target} at index ${mid}`;
    } else if (arr[mid] < target) {
      console.log(`${arr[mid]} < ${target} — searching right half`);
      left = mid + 1; // target is in right half
    } else {
      console.log(`${arr[mid]} > ${target} — searching left half`);
      right = mid - 1; // target is in left half
    }
  }
  return `${target} not found`;
}

const arr = [5, 26, 33, 45, 50];
console.log(binarySearch(arr, 50)); // → 5
