function part2(input: string): number | string {
  let result = 0;

  const lines = input.split("\r\n");

  for (const line of lines) {
    const numbers = line.split("").map(Number);
    const batteryJolts = Array.from({ length: 12 }, () => 0);
    for (let i = 0; i < numbers.length; i++) {
      let found = false;
      batteryJolts.forEach((jolt, index) => {
        if (found) {
          batteryJolts[index] = 0;
          return;
        }
        if (
          jolt < numbers[i] &&
          batteryJolts.length - index <= numbers.length - i
        ) {
          batteryJolts[index] = numbers[i];
          found = true;
        }
      });
    }
    const jolt = batteryJolts.reduce(
      (acc, curr, index) =>
        acc + Math.pow(10, batteryJolts.length - index - 1) * curr,
      0
    );
    result += jolt;
  }

  return result;
}

export default part2;
