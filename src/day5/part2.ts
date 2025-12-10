interface Range {
  start: number;
  end: number;
}

function part2(input: string): number | string {
  let result = 0;

  const rows = input.split("\r\n");

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

  const ids = rows.slice(emptyRowIndex + 1).map(Number);
  const map: Record<string, number> = {};
  ids.forEach((id) => {
    merged.forEach((range) => {
      if (id >= range.start && id <= range.end) {
        map[range.start + "-" + range.end] = range.end - range.start + 1;
      }
    });
  });

  console.log(map);

  result = Object.values(map).reduce((acc, curr) => acc + curr, 0);

  return result;
  // not 345544261104784 should be higher
}

export default part2;
