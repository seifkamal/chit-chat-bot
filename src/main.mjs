import { ask, reset, log, load, info } from "./ai.mjs";
import { input, print, clear, exit } from "./ci.mjs";
import { read, save } from "./file.mjs";
import { write } from "./typewriter.mjs";

const saveFile = "conversation.json";
const commands = {
  help() {
    print(Object.keys(commands).join("\n"));
    exchange();
  },
  debug() {
    print(log());
    exchange();
  },
  info() {
    print(info());
    exchange();
  },
  async save() {
    await save(log(), saveFile);
    print(`Saved to ${saveFile}.`);
    exchange();
  },
  clear() {
    clear();
    reset();
    exchange();
  },
  exit() {
    exit();
  },
};

async function start() {
  try {
    const buffer = await read(saveFile);
    const saved = JSON.parse(String(buffer));
    load(saved);

    print(`Loaded from ${saveFile}.`);
  } catch (err) {}

  print("Start chatting, or run `help` to see available commands.");

  return exchange();
}

async function exchange() {
  const prompt = await input();
  if (prompt in commands) {
    return commands[prompt]();
  }

  const response = await ask(prompt);
  await write(response);

  return exchange();
}

start();
