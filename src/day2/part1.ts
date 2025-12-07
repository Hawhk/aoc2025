function part1(input: string): number | string {
  let result = 0;

  input.split(",").forEach((range) => {
    const [start, end] = range.split("-").map(Number);

    for (let i = start; i <= end; i++) {
      let id = i.toString();
      const firstHalf = id.slice(0, id.length / 2);
      const secondHalf = id.slice(id.length / 2);
      if (firstHalf === secondHalf) {
        result += i;
      }
    }
  });

  return result;
}

export default part1;
