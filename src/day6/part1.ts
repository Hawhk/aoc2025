import os from "os";

type Line = {
  m: string;
  total: number;
};

function part1(input: string): number | string {
  let result = 0;

  const rows = input.split(os.EOL);

  const l: Line[] = rows[rows.length - 1]
    .trim()
    .split(" ")
    .map((m) => m.trim())
    .filter((m) => m !== "")
    .map((m) => {
      const total = m === "+" ? 0 : 1;
      return { m, total };
    });

  for (let i = 0; i < rows.length - 1; i++) {
    const line = rows[i];
    line
      .trim()
      .split(" ")
      .map((n) => n.trim())
      .filter((n) => n !== "")
      .forEach((n, index) => {
        const num = parseInt(n);
        const current = l[index];
        if (current.m === "*") {
          l[index].total = num * l[index].total;
        } else {
          l[index].total = num + l[index].total;
        }
      });
  }

  result = l.map((l) => l.total).reduce((acc, curr) => acc + curr, 0);

  return result;
}

export default part1;
