import os from "os";

function part1(input: string): number | string {
  let result = 0;

  const lines = input.split(os.EOL);

  for (const line of lines) {
    const numbers = line.split("").map(Number);
    let highest = 0;
    let nextHighest = 0;
    for (let i = 0; i < numbers.length; i++) {
      if (
        numbers[i] > highest &&
        numbers[i] !== nextHighest &&
        i !== numbers.length - 1
      ) {
        highest = numbers[i];
        nextHighest = 0;
      } else if (numbers[i] > nextHighest) {
        nextHighest = numbers[i];
      }
    }
    const jolt = highest * 10 + nextHighest;
    result += jolt;
  }

  return result;
}

export default part1;
