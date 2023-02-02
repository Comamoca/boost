import { xdgConfig } from "https://esm.sh/xdg-basedir@5.1.0";
import { expandGlobSync } from "https://deno.land/std@0.175.0/fs/mod.ts";
import { type WalkEntry } from "https://deno.land/std@0.175.0/fs/mod.ts";

export const globalTask = xdgConfig + "/boost";
export const localTask = ".boost";

export const globLocal: Array<Record<string, string>> = Object.entries(
  extractPathName(expandGlobSync("**/.boost/*.ts")),
)
  .map(([_, value]) => {
    const name = "🌏 " + value.name;
    return { name: name, path: value.path };
  });
export const globGlobal: Array<Record<string, string>> = Object.entries(
  extractPathName(expandGlobSync(globalTask + "/*.ts")),
)
  .map(([_, value]) => {
    const name = "🌌 " + value.name;
    return { name: name, path: value.path };
  });

export const globAll = Array.prototype.concat(globGlobal, globLocal);

function extractPathName(glob: IterableIterator<WalkEntry>) {
  const list: Array<Record<string, string>> = [];

  for (const { path, name } of glob) {
    // const { path, name, isFile, isDirectory, isSymlink } of scriptGlob
    // console.log(path, name);
    list.push({ name: name, path: path });
  }

  return list;
}
