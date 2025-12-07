function part2(input: string): number | string {
  const instructions = input.split("\r\n");

  let result = 0;
  let currentPosition = 50;

  type Direction = "L" | "R";

  for (const instruction of instructions) {
    const oldPosition = currentPosition;
    const direction: Direction = instruction[0] as Direction;
    const stepsString = instruction.slice(1);
    const steps = parseInt(stepsString);
    if (direction === "L") {
      currentPosition -= steps;
    } else if (direction === "R") {
      currentPosition += steps;
    }

    const newPosition = Math.abs(1000000 + currentPosition) % 100;

    const turns = (steps - (steps % 100)) / 100;
    let toAdd = turns;

    currentPosition = newPosition;

    if (newPosition === 0 && oldPosition !== 0) {
      toAdd++;
    } else if (
      direction === "L" &&
      newPosition > oldPosition &&
      oldPosition !== 0
    ) {
      toAdd++;
    } else if (
      direction === "R" &&
      newPosition < oldPosition &&
      oldPosition !== 0
    ) {
      toAdd++;
    }

    if (toAdd > 0) {
      result += toAdd;
    }
  }

  return result;
}

export default part2;
