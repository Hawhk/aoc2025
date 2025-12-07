function part2(input: string): number | string {
  let result = 0;

  input.split(",").forEach((range) => {
    const [start, end] = range.split("-").map(Number);

    for (let i = start; i <= end; i++) {
      let id = i.toString();

      for (let j = 1; j <= Math.floor(id.length / 2); j++) {
        const pattern = id.slice(0, j);
        let found = true;
        for (let k = j; k < id.length; k += j) {
          if (id.slice(k, k + j) !== pattern) {
            found = false;
            break;
          }
        }
        if (found) {
          result += i;
          break;
        }
      }
    }
  });

  return result;
}

export default part2;
