const selectionSort = (arr: number[], lastIndex: number = 0) => {
  if (lastIndex === arr.length - 1) return arr;

  let currentMin = arr[lastIndex];

  let currentMinIndex = lastIndex;

  for (let i = lastIndex; i < arr.length; i++) {
    if (arr[i] < currentMin) {
      currentMin = arr[i];
      currentMinIndex = i;
    }
  }

  arr[currentMinIndex] = arr[lastIndex];

  arr[lastIndex] = currentMin;

  return selectionSort(arr, lastIndex + 1);
};

console.log(selectionSort([45, 23, 150, 2, 56]));
