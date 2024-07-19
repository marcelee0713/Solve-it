const quickSort = (
  arr: number[],
  start: number = 0,
  end: number = arr.length - 1
): number[] => {
  if (start >= end) return [arr[start]];

  const pivot = getPivot(arr, start, end);

  quickSort(arr, start, pivot - 1);
  quickSort(arr, pivot + 1, end);

  return arr;
};

const getPivot = (arr: number[], start: number, end: number): number => {
  let j = start;
  let i = j - 1;
  let pivot = end;
  let temp: number | null = null;

  while (j < end) {
    if (arr[j] >= arr[pivot]) {
      if (j !== pivot) j++;
    } else {
      i++;
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      temp = 0;
      j++;
    }

    if (j === pivot) {
      i++;
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      temp = 0;
      pivot = i;
    }
  }

  return pivot;
};

console.log(quickSort([45, 23, 150, 2, 56]));
