import prompts from "https://esm.sh/prompts@2.4.2";
import nfzf from "npm:node-fzf";
import { rgb24 } from "https://deno.land/std@0.175.0/fmt/colors.ts";
import { FzfOptions } from "./types.ts";

export async function text(message: string) {
  const opt: prompts.PromptObject = {
    type: "text",
    name: "value",
    message: message,
  };

  return runPrompt(opt);
}

export async function confirm(messge: string) {
  const opt: prompts.PromptObject = {
    type: "confirm",
    name: "value",
    message: messge,
    initial: true,
  };

  return runPrompt(opt);
}

export async function toggle(messge: string) {
  const opt: prompts.PromptObject = {
    type: "toggle",
    name: "value",
    message: messge,
    initial: true,
    active: "yes",
    inactive: "no",
  };

  return Boolean(await runPrompt(opt));
}

async function runPrompt(
  opt: prompts.PromptObject,
) {
  const result = await prompts(opt);

  return result.value;
}

export async function fuzzy(list: Array<string>) {
  const opts: FzfOptions = {
    list: list,

    mode: "fuzzy" || "normal",

    prefill: "",
    prelinehook: () => "",
    postlinehook: () => "",
  };

  const result = await nfzf(opts);
  const { selected, query } = result;

  if (!selected) {
    console.log("No matches for:", query);
  } else {
    return list[selected.index];
  }
}

function colorcodeToHex(code: string) {
  const raw = "0x" + code.substr(1);
  return Number(raw);
}

export function colorLog(text: string, colorCode: string) {
  console.log(rgb24(text, colorcodeToHex(colorCode)));
}
