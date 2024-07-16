const mergeSort = (
  arr: number[],
  start: number = 0,
  end: number = arr.length - 1
): number[] => {
  const middle = Math.floor((start + end) / 2);

  if (start === end) {
    const newArr = [arr[middle]];
    return newArr;
  }

  const left = mergeSort(arr, start, middle);
  const right = mergeSort(arr, middle + 1, end);

  return merge(left, right);
};

const merge = (left: number[], right: number[]): number[] => {
  const mergedArray: number[] = [];
  const length = left.length + right.length;

  let i = 0;
  let j = 0;
  let k = 0;

  while (k < length) {
    if (left.length === i) {
      mergedArray[k] = right[j];
      j++;
      k++;
      continue;
    }

    if (right.length === j) {
      mergedArray[k] = left[i];
      i++;
      k++;
      continue;
    }

    if (right[j] < left[i]) {
      mergedArray.push(right[j]);
      j++;
    } else {
      mergedArray.push(left[i]);
      i++;
    }

    k++;
  }

  console.log(mergedArray);

  return mergedArray;
};

console.log(mergeSort([45, 23, 150, 2, 56]));
