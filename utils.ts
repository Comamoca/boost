import { exec } from "https://deno.land/x/execute@v1.1.0/mod.ts";
import { rgb24 } from "https://deno.land/std@0.173.0/fmt/colors.ts";

// colors
export const colorCodeToHex = (code: string) => {
  return Number("0x" + code.slice(1));
};

export const yellow = (msg: string) => rgb24(msg, colorCodeToHex("#fabd2f"));

// exit wrapper
export const exit = () => Deno.exit(0);

export const hasSpace = (input: string) => {
  if (input.includes(" ") || input.includes("　")) {
    return true;
  } else {
    return false;
  }
};

// check if the string is empty
export function isEmptyString(str: string) {
  if (str.length <= 0) {
    return true;
  } else {
    return false;
  }
}

export async function execDeno(
  path: string,
  denoOption?: string,
  scriptOption?: string,
) {
  if (typeof denoOption != "string") {
    denoOption = "";
  }

  if (typeof scriptOption != "string") {
    scriptOption = "";
  }

  console.log(yellow("Script start✨"));
  console.log(
    rgb24(
      `Run script ==> ${path}`,
      colorCodeToHex("#b8bb26"),
    ),
  );

  await import(path);

  console.log(yellow("Script done...Happy Hacking✨"));
}
