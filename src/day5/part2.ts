import os from "os";

interface Range {
  start: number;
  end: number;
}

function part2(input: string): number | string {
  let result = 0;

  const rows = input.split(os.EOL);

  const emptyRowIndex = rows.findIndex((row) => row === "");
  const ranges: Range[] = rows.slice(0, emptyRowIndex).map((row) => {
    const [start, end] = row.split("-").map(Number);
    return { start, end };
  });

  ranges.sort((a, b) => a.start - b.start || a.end - b.end);

  const merged: Range[] = [];
  let { start, end } = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const curr = ranges[i];

    if (curr.start <= end) {
      end = Math.max(end, curr.end);
    } else {
      merged.push({ start, end });
      start = curr.start;
      end = curr.end;
    }
  }

  merged.push({ start, end });

  result = merged.reduce((acc, curr) => {
    return acc + (curr.end - curr.start + 1);
  }, 0);

  return result;
}

export default part2;
