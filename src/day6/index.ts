import * as fs from "fs";
import * as path from "path";
import part1 from "./part1";
import part2 from "./part2";

export default function main(part?: 1 | 2) {
  const projectRoot = path.resolve(__dirname, "..", "..");
  const day6ame = path.basename(__dirname);
  const inputPath = path.join(projectRoot, "src", day6ame, "data.txt");
  const input = fs.readFileSync(inputPath, "utf8");

  if (part === 1) {
    console.log("Part 1:", part1(input));
  } else if (part === 2) {
    console.log("Part 2:", part2(input));
  } else {
    console.log("Part 1:", part1(input));
    console.log("Part 2:", part2(input));
  }
}
