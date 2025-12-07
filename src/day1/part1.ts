function part1(input: string): number | string {
  const instructions = input.split("\r\n");

  let result = 0;
  let currentPosition = 50;

  type Direction = "L" | "R";

  for (const instruction of instructions) {
    const direction: Direction = instruction[0] as Direction;
    const stepsString = instruction.slice(1);
    const steps = parseInt(stepsString);
    if (direction === "L") {
      currentPosition -= steps;
    } else if (direction === "R") {
      currentPosition += steps;
    }

    currentPosition = (1000000 + currentPosition) % 100;

    if (currentPosition === 0) {
      result++;
    }
  }

  return result;
}

export default part1;
