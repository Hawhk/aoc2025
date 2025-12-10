import os from "os";

function part1(input: string): number | string {
  let result = 0;

  const rows = input.split(os.EOL);

  const emptyRowIndex = rows.findIndex((row) => row === "");
  const ranges = rows.slice(0, emptyRowIndex);
  const ids = rows.slice(emptyRowIndex + 1).map(Number);

  ids.forEach((id) => {
    let found = false;
    ranges.forEach((range) => {
      const [start, end] = range.split("-").map(Number);

      if (found) {
        return;
      }

      if (id >= start && id <= end) {
        result++;
        found = true;
      }
    });
    if (found) {
      return;
    }
  });

  return result;
}

export default part1;
