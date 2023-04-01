import { selectScript } from "./selector.ts";
import { Command } from "https://deno.land/x/cliffy@v0.19.2/command/mod.ts";
import { execDeno, exit } from "./utils.ts";
import { addTask } from "./cmds/add.ts";

const get = new Command()
  .arguments("<string>")
  .description("🚧 [WIP] Get tasks on internet☁")
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
    "<string>",
  )
  .description("🚧 [WIP] Edit your tasks✏")
  .action(() => {
    console.log(
      "I'm sorry. This command is currently under development...🚧",
    );
    exit();
  });

const add = new Command()
  .arguments("<string>")
  .description("🚧 [WIP] Add your task⚡")
  .action(async () => {
    await addTask();
    exit();
    exit();
  });

const net = new Command()
  .arguments("<string>")
  .description("Run remote task🌐")
  .arguments("<url:string>")
  .action(async (opts: Record<string, string>, url: string) => {
    console.log(opts, url);
    import.meta.url = Deno.cwd();
    await execDeno(url);
    exit();
  });

new Command()
  .name("boost")
  .description("Boost your project fledgling💨")
  .version("0.0.1")
  .command("get", get)
  .command("edit ", edit)
  .command("add", add)
  .command("net", net)
  .parse();

const path = await selectScript();
if (typeof path == "undefined") {
  console.log("🚨 An error has occurred");
  exit();
} else {
  import.meta.url = Deno.cwd();
  await execDeno(path);
}
