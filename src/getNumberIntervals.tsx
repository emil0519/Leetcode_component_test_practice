export const getNumberIntervals = (
  numberArray: number[][]
): { overlap: number[][]; notInclude: number[][] } => {
  const overlap = [];
  const notInclude = [];
  let gapStart = 0;
  const sortedArray = numberArray.sort((a, b) => a[0] - b[0]); //  to sort the array base on the first number
  for (let i = 0; i < sortedArray.length - 1; i++) {
    const currentArray = sortedArray[i];
    const nextArray = sortedArray[i + 1];
    if (
      nextArray[0] <= currentArray[1] &&
      nextArray[0] !== nextArray[1] &&
      currentArray[0] !== currentArray[1]
    ) {
      //  Since arrays are sorted, we can then check if the first number of next array is smaller or equals to the end of current array
      //  If so, it indicates overlap exists, 2nd and 3rd condition avoids same number in the same array as it wouldn't be consider as overlapping
      const startOverlap = Math.max(nextArray[0], currentArray[0]);
      const endOverlap = Math.min(nextArray[1], currentArray[1]);
      overlap.push([startOverlap, endOverlap]);
    }
    // check for gaps
    if (currentArray[0] > gapStart) {
      notInclude.push([gapStart, currentArray[0] - 1]);
      gapStart = Math.max(gapStart, currentArray[1] + 1);
    }
    if (currentArray[1] > gapStart) {
      gapStart = Math.max(gapStart, currentArray[1] + 1);
    }
  }
  return { overlap, notInclude };
};
