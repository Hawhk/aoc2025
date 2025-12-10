import os from "os";

function part1(input: string): number | string {
  let result = 0;

  const grid = input.split(os.EOL).map((line) => line.split(""));

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (
        grid[i][j] === "@" &&
        getAdjecentCells(grid, i, j).filter((cell) => cell === "@").length < 4
      ) {
        result++;
      }
    }
  }
  return result;
}

const getAdjecentCells = (grid: string[][], i: number, j: number) => {
  const cells = [];
  if (i > 0) cells.push(grid[i - 1][j]);
  if (i < grid.length - 1) cells.push(grid[i + 1][j]);
  if (j > 0) cells.push(grid[i][j - 1]);
  if (j < grid[i].length - 1) cells.push(grid[i][j + 1]);
  if (i > 0 && j > 0) cells.push(grid[i - 1][j - 1]);
  if (i > 0 && j < grid[i].length - 1) cells.push(grid[i - 1][j + 1]);
  if (i < grid.length - 1 && j > 0) cells.push(grid[i + 1][j - 1]);
  if (i < grid.length - 1 && j < grid[i].length - 1)
    cells.push(grid[i + 1][j + 1]);
  return cells;
};

export default part1;
