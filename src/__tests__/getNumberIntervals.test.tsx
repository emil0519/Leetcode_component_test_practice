import { getNumberIntervals } from "../utils/getNumberIntervals";

describe("getNumberIntervals", () => {
  test("returns correct notInclude", () => {
    const input = [
      [0, 14],
      [16, 20],
    ];
    const expectedOutput = {
      overlap: [],
      notInclude: [[15, 15]],
    };

    const result = getNumberIntervals(input);
    expect(result).toEqual(expectedOutput);
  });
  test("returns correct overlap", () => {
    const input = [
      [0, 14],
      [12, 14],
    ];
    const expectedOutput = {
      overlap: [[12, 14]],
      notInclude: [],
    };

    const result = getNumberIntervals(input);
    expect(result).toEqual(expectedOutput);
  });
});
