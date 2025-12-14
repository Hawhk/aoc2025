import os from "os";

function part2(input: string): number {
  let result = 0;

  const lasers: Record<string, number> = {};
  const carets = new Set<string>();

  const rows = input.split(os.EOL);

  for (let y = 0; y < rows.length; y += 2) {
    for (let x = 0; x <= rows[y].length; x++) {
      if (rows[y][x] === "S") {
        lasers[`${x},${y}`] = 1;
      }
      if (rows[y][x] === "." && lasers[`${x},${y - 2}`]) {
        lasers[`${x},${y}`] =
          lasers[`${x},${y - 2}`] + (lasers[`${x},${y}`] ?? 0);
      }
      if (rows[y][x] === "^") {
        carets.add(`${x},${y}`);
        const backwards = lasers[`${x},${y - 2}`] ?? 0;
        lasers[`${x + 1},${y}`] = backwards + (lasers[`${x + 1},${y}`] ?? 0);
        lasers[`${x - 1},${y}`] = backwards + (lasers[`${x - 1},${y}`] ?? 0);
      }
    }
  }

  result = Object.entries(lasers)
    .filter(([key, _]) => key.endsWith(`,${rows.length - 2}`))
    .map(([_, value]) => value)
    .reduce((acc, curr) => acc + curr, 0);

  return result;
}

export default part2;
