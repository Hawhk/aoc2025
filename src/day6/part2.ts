import os from "os";

type Line = {
  operator: "+" | "*";
  nums: string[];
  len: number;
};

function part2(input: string): number | string {
  let result = 0;

  const rows = input.split(os.EOL);
  const endLine = rows[rows.length - 1];

  const lengths = endLine.split(/[+*]/).filter((l) => l !== "");

  let index = 0;
  const l: Line[] = endLine
    .trim()
    .split(" ")
    .map((m) => m.trim())
    .filter((m) => m !== "")
    .map((m) => {
      const isLast = index === lengths.length - 1;
      const len = lengths[index++].length + (isLast ? 1 : 0);
      return {
        operator: m as "+" | "*",
        nums: [],
        len,
      };
    });

  for (let i = 0; i < rows.length - 1; i++) {
    const line = rows[i];

    let goneThrough = 0;

    l.forEach((current) => {
      const num = line.slice(goneThrough, goneThrough + current.len);

      goneThrough += current.len + 1;

      const nums = num.split("");

      nums.forEach((num, index2) => {
        if (num === " ") {
          return;
        }
        current.nums[index2] = (current.nums[index2] || "") + num;
      });
    });
  }

  result = l
    .map((l) => calculateTotal(l.nums, l.operator))
    .reduce((acc, curr) => acc + curr);
  return result;
}

const calculateTotal = (nums: string[], operator: "+" | "*"): number => {
  const res = nums.map(Number).reduce((acc, curr) => {
    if (operator === "+") {
      return acc + curr;
    } else {
      return acc * curr;
    }
  });
  return res;
};

export default part2;
