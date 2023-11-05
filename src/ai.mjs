import { join } from "path";

const config = {
  host: "https://api-inference.huggingface.co/models",
  model: "facebook/blenderbot-400M-distill",
};

/**
 * @typedef {{
 *   past_user_inputs?: string[];
 *   generated_responses?: string[];
 * }} Conversation
 *
 * @type {Conversation}
 */
let conversation = {};

export function info() {
  return Object.entries(config)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

/**
 *
 * @param {Conversation} data
 */
export function load(data) {
  conversation = data;
}

export function reset() {
  conversation = {};
}

export function log() {
  return JSON.stringify(conversation, null, 2);
}

/**
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function ask(prompt) {
  const res = await fetch(join(config.host, config.model), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: {
        ...conversation,
        text: prompt,
      },
    }),
  });

  const data = await res.json();
  const text = data.generated_text;
  conversation = data.conversation;

  return text;
}
