import { readFile, writeFile } from "fs/promises";

/**
 * @param {string} content
 * @param {string} file
 */
export function save(content, file) {
  return writeFile(file, content);
}

/**
 * @param {string} file
 */
export function read(file) {
  return readFile(file);
}
