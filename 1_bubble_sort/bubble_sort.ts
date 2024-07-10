const bubbleSort = (arr: number[], lastIndex = arr.length - 1) => {
  let tempIndex = lastIndex;

  if (tempIndex <= 0) return arr;

  let i = 0;

  while (i !== tempIndex) {
    let j = i + 1;

    if (arr[i] > arr[j]) {
      const iValue = arr[i];
      const jValue = arr[j];

      arr[i] = jValue;
      arr[j] = iValue;
    }

    i++;
  }

  return bubbleSort(arr, tempIndex - 1);
};

console.log(bubbleSort([45, 23, 150, 2, 56]));
