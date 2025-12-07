const fs = require("fs");
const path = require("path");

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.error(`Source directory does not exist: ${srcDir}`);
    process.exit(1);
  }

  if (fs.existsSync(destDir)) {
    console.error(`Destination directory already exists: ${destDir}`);
    process.exit(1);
  }

  fs.mkdirSync(destDir, { recursive: true });

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      const contents = fs.readFileSync(srcPath, "utf8");
      const updated = contents.replace(/dayN/g, path.basename(destDir));
      fs.writeFileSync(destPath, updated, "utf8");
    }
  }
}

function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error("Usage: pnpm new-day <number>");
    process.exit(1);
  }

  const num = Number(arg);
  if (!Number.isInteger(num) || num <= 0) {
    console.error(`Invalid day number: ${arg}`);
    process.exit(1);
  }

  const dayName = `day${num}`;

  const root = process.cwd();
  const srcTemplate = path.join(root, "src", "dayN");
  const testsTemplate = path.join(root, "tests", "dayN");

  const srcDest = path.join(root, "src", dayName);
  const testsDest = path.join(root, "tests", dayName);

  copyDir(srcTemplate, srcDest);
  copyDir(testsTemplate, testsDest);

  console.log(`Created ${dayName} in src and tests.`);
}

main();


