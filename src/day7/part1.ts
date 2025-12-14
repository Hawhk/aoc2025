import os from "os";

function part1(input: string): number {
  let result = 0;

  const lasers: Record<string, boolean> = {};
  const rows = input.split(os.EOL);

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] === "S") {
        lasers[`${j},${i}`] = true;
      } else if (rows[i][j] === "." && lasers[`${j},${i - 1}`]) {
        delete lasers[`${j},${i - 1}`];
        lasers[`${j},${i}`] = true;
      } else if (rows[i][j] === "^" && lasers[`${j},${i - 1}`]) {
        result++;
        delete lasers[`${j},${i - 1}`];
        lasers[`${j + 1},${i}`] = true;
        lasers[`${j - 1},${i}`] = true;
      }
    }
  }

  return result;
}

export default part1;
