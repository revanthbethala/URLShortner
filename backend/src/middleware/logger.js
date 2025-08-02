const options = {
  stack: ["backend"],
  package: [
    "auth",
    "config",
    "middleware",
    "utils",
    "cache",
    "controller",
    "cron_job",
    "db",
    "domain",
    "handler",
    "repository",
    "route",
    "service",
    "page",
  ],
  level: ["debug", "info", "warn", "error", "fatal"],
};

export function Log(stack, level, pkg, message) {
  if (!options.stack.includes(stack))
    throw new Error("Stack is invalid or missing");
  if (!options.package.includes(pkg))
    throw new Error("Package is invalid or missing");
  if (!options.level.includes(level))
    throw new Error("Level is invalid or missing");
  console.log(`${stack} ${pkg}`, `${level} ${message}`);
}
