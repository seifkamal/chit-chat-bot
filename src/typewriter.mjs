/**
 * @param {string} message
 * @param {NodeJS.WriteStream} stream
 */
export async function write(message, stream = process.stdout) {
  if (!message.length) {
    return;
  }
  stream.write("\n");
  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    stream.write(char);

    const delay = getCharDelay(char);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  stream.write("\n");
}

/**
 * @param {string} char
 */
function getCharDelay(char) {
  switch (char) {
    case ".":
    case "?":
      return 300;
    case ",":
    case ";":
    case ":":
      return 200;
    default:
      return 80;
  }
}
