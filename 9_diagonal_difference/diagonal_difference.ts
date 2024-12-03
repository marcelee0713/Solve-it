const diagonalDifference = (arr: number[][]): number => {
  let pdSum = 0;
  let sdSum = 0;

  const totalOfRowsInArr = arr.length - 1;

  for (let i = 0; i < arr.length; i++) {
    const rowArr = arr[i];

    let pdI = totalOfRowsInArr - (totalOfRowsInArr - i);
    let sdI = totalOfRowsInArr - i;
    for (let j = 0; j < rowArr.length; j++) {
      if (pdI === j) pdSum += rowArr[pdI];
      if (sdI === j) sdSum += rowArr[sdI];
    }
  }

  const difference = Math.abs(pdSum - sdSum);
  return difference;
};
