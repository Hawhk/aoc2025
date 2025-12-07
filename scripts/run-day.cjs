const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

function main() {
  const dayArg = process.argv[2];
  const partArg = process.argv[3];

  if (!dayArg) {
    console.error("Usage: pnpm run-day <day> [part]");
    process.exit(1);
  }

  const num = Number(dayArg);
  if (!Number.isInteger(num) || num <= 0) {
    console.error(`Invalid day number: ${dayArg}`);
    process.exit(1);
  }

  let partFilter = undefined;
  if (partArg !== undefined) {
    if (partArg === "1" || partArg === "2") {
      partFilter = Number(partArg);
    } else {
      console.error(`Invalid part: ${partArg}. Expected "1" or "2".`);
      process.exit(1);
    }
  }

  const dayName = `day${num}`;
  const root = process.cwd();
  const dayDir = path.join(root, "src", dayName);
  const srcEntry = path.join(dayDir, "index.ts");

  if (!fs.existsSync(srcEntry)) {
    console.error(`Entry file not found for ${dayName}: ${srcEntry}`);
    process.exit(1);
  }

  // Compile TypeScript to JavaScript (uses local TypeScript)
  const tscBin = require.resolve("typescript/bin/tsc");
  const compile = spawnSync(process.execPath, [tscBin], { stdio: "inherit" });

  if (compile.status !== 0) {
    console.error("TypeScript compilation failed.");
    process.exit(compile.status ?? 1);
  }

  const distEntry = path.join(root, "dist", dayName, "index.js");

  if (!fs.existsSync(distEntry)) {
    console.error(`Built entry file not found for ${dayName}: ${distEntry}`);
    process.exit(1);
  }

  const mod = require(distEntry);
  const runner = mod.default || mod.main || mod[dayName] || mod;

  if (typeof runner !== "function") {
    console.error(
      `No runnable function exported from ${distEntry}. Expected a default export or 'main'.`,
    );
    process.exit(1);
  }

  const result = partFilter ? runner(partFilter) : runner();
  if (result !== undefined) {
    console.log(`Result for ${dayName}:`, result);
  }
}

main();


