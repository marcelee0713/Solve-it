const binarySearch = (
  arr: number[],
  target: number,
  start: number = 0,
  end: number = arr.length - 1
): number | null => {
  if (start > end) return null;

  const midIndex = Math.floor((start + end) / 2);

  if (target === arr[midIndex]) {
    return arr[midIndex];
  }

  if (target < arr[midIndex]) {
    return binarySearch(arr, target, start, midIndex - 1);
  } else {
    return binarySearch(arr, target, midIndex + 1, end);
  }
};

console.log(binarySearch([2, 3, 16, 40, 55, 150, 200], 200));
