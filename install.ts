import $ from "https://deno.land/x/dax@0.24.1/mod.ts";

try {
  await $`git clone https://github.com/Comamoca/boost`;
  await $`cd ./boost/`;
  await $`deno install -f -A boost.ts`;
  await $`cd ..`;
} finally {
  await Deno.remove("./boost/", { recursive: true });
}
