import { selectScript } from "./selector.ts";
import { Command } from "https://deno.land/x/cliffy@v0.19.2/command/mod.ts";
import { execDeno, exit } from "./utils.ts";

const get = new Command()
  .arguments("<string>")
  .description("🚧[WIP] Get tasks on internet☁")
  .action(
    () => {
      console.log(
        "I'm sorry. This command is currently under development...🚧",
      );
      exit();
    },
  );

const edit = new Command()
  .arguments(
    "<string> [destination:string]",
  )
  .description("🚧[WIP] Edit your tasks✏")
  .action(() => {
    console.log(
      "I'm sorry. This command is currently under development...🚧",
    );
    exit();
  });

const add = new Command()
  .arguments("<string> [destination:string]")
  .description("🚧[WIP] Add your task⚡")
  .action(() => {
    console.log(
      "I'm sorry. This command is currently under development...🚧",
    );
    exit();
  });

const run = new Command()
  .arguments("<string>")
  .description("🚧[WIP] Add your task⚡")
  .action(() => {
    console.log("I'm sorry. This command is currently under development...🚧");
    exit();
  });

new Command()
  .name("boost")
  .description("Boost your project fledgling💨")
  .version("0.0.1")
  .command("get", get)
  .command("edit ", edit)
  .command("add", add)
  .command("run", run)
  .parse();

const path = await selectScript();
if (typeof path == "undefined") {
  console.log("An error has occurred🚨");
  exit();
} else {
  await execDeno(path, "-A");
}
