import { parseYesOrNo } from "./parsing";

const parseYesOrNoTests: [string, boolean | undefined][] = [
  ["yup", true],
  ["y", true],
  ["YEAH", true],
  ["n", false],
  ["nah", false],
  ["z", undefined],
];

parseYesOrNoTests.forEach(([input, expectedResult]) => {
  test(`parseYesOrNo('${input}') returns ${expectedResult}`, () => {
    expect(parseYesOrNo(input)).toBe(expectedResult);
  });
});
