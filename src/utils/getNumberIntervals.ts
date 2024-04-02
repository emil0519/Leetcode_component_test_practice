export const getNumberIntervals = (
  numberArray: number[][]
): { overlap: number[][]; notInclude: number[][] } => {
  const overlap: number[][] = [];
  const notInclude: number[][] = [];
  let gapStart = 0;

  if (numberArray.length === 1) {
    const [start, end] = numberArray[0];
    if (start !== 0) {
      notInclude.push([0, start - 1]);
    }
    if (end !== 20) {
      notInclude.push([end + 1, 20]);
    }
    return { overlap, notInclude };
  }
//  to sort the array base on the first number
  const sortedArray = numberArray.sort((a, b) => a[0] - b[0]); 
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
    // [[0,14],[16,17]] => 14 > 0(gapStart) && 16-14 =2, it satisfy this conditon
    // while this condition blocks [[0,14]],[[15,20]] as 15-14 = 1, meaning neither 14 nor 15 is excluded
    if (currentArray[1] > gapStart && nextArray[0] - currentArray[0] >= 2) {
      gapStart = currentArray[1] + 1;
      if (gapStart <= nextArray[0] - 1) notInclude.push([gapStart, nextArray[0] - 1]);
    }
    // If one of the array is [0,20], it means every range is included, so clear notInclude
    if (currentArray[0] === 0 && currentArray[1] === 20) notInclude.length = 0;
  }
  return { overlap, notInclude };
};
