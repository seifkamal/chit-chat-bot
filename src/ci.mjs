import { createInterface } from "readline/promises";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function input() {
  return rl.question("> ");
}

/**
 * @param {any} message
 */
export function print(message) {
  console.log("\n" + message + "\n");
}

export function clear() {
  console.clear();
}

export function exit() {
  process.exit(0);
}
