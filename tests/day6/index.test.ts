import * as fs from "fs";
import * as path from "path";
import part1 from "../../src/day6/part1";
import part2 from "../../src/day6/part2";

describe("day6", () => {
  const inputPath = path.join(__dirname, "data.txt");
  const input = fs.readFileSync(inputPath, "utf8");

  test("part1", () => {
    expect(part1(input)).toBe(4277556);
  });
  test("part2", () => {
    expect(part2(input)).toBe(3263827);
  });
});
