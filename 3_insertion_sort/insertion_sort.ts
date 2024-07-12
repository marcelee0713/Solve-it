const insertionSort = (arr: number[]) => {
  let i = 0;
  let j = i - 1;
  let lastIndex = i;
  let onBackTrack = false;

  while (lastIndex !== arr.length) {
    if (arr[i] < arr[j]) {
      if (!onBackTrack) onBackTrack = true;

      const iValue = arr[i];
      const jValue = arr[j];
      arr[i] = jValue;
      arr[j] = iValue;

      i--;
      j--;

      continue;
    }

    if (!onBackTrack) {
      i++;
      j++;
      lastIndex++;

      continue;
    }

    onBackTrack = false;
    lastIndex++;
    i = lastIndex;
    j = i - 1;
  }

  return arr;
};

console.log(insertionSort([45, 23, 150, 2, 56, 4, 15, 8, 100]));
