import nfzf from "https://esm.sh/node-fzf@0.11.0";
import { globAll, globalTask } from "./task.ts";
import { exit } from "./utils.ts";
import { colorLog, toggle } from "./clikit.ts";
import { FzfOptions } from "./types.ts";

export function selectScript() {
  return selectGlobPath(globAll);
}

async function selectGlobPath(scriptList: Array<Record<string, string>>) {
  // const scriptGlob = expandGlobSync("**/.boost/*.ts");

  if (scriptList.length <= 0) {
    console.log("Notting to Tasks...💤");

    try {
      const _ = await Deno.stat(globalTask);
    } catch {
      const result = await toggle(
        `No global scripts directory. Create directory in ${globalTask} ?`,
      );

      if (result) {
        Deno.mkdir(globalTask);

        colorLog("Created✨", "#ffef5c");
      }
    }

    exit();
  }

  const result = await nfzf(option(scriptList));
  const { selected, query } = result;

  if (!selected) {
    console.log("No matches for:", query);
  } else {
    return scriptList[selected.index].path;
  }
}

const option = (list: Array<Record<string, string>>) => {
  const scriptNameList = Object.entries(list)
    .map(([_, value]) => (value.name));
  const opts: FzfOptions = {
    list: scriptNameList,

    mode: "fuzzy" || "normal",

    prefill: "",
    prelinehook: function (index) {
      return "";
    },

    postlinehook: function (index) {
      return "";
    },
  };

  return opts;
};
