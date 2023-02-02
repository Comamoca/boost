import prompts from "npm:prompts";
import { appendText, hasSpace, isEmptyString, shine } from "../utils.ts";
import { stringify } from "https://deno.land/std@0.72.0/encoding/toml.ts";
import { GROBAL_CONFIG, LOCAL_CONFIG } from "../config.ts";

// promptsの起動
const task = await prompts(
  {
    type: "text",
    name: "name",
    message: "Your Task name",
    validate: (value) => {
      if (hasSpace(value)) {
        return "Taks name is not includes spaces";
      } else if (isEmptyString(value)) {
        return "Please enter string";
      } else {
        return true;
      }
    },
  },
);

const cmdList = [];
let isFirst = true;

while (true) {
  let exit = {
    isexit: false,
  };

  if (!isFirst) {
    exit = await prompts(
      {
        type: "toggle",
        name: "isexit",
        message: "Can you confirm?",
        initial: true,
        active: "yes",
        inactive: "no",
      },
    );
  } else {
    isFirst = false;
  }

  if (exit.isexit) {
    break;
  }

  const cmd = await prompts(
    {
      type: "text",
      name: "command",
      message: "Add command",
      validate: (value) => {
        if (isEmptyString(value)) {
          return "Please enter string";
        } else {
          return true;
        }
      },
    },
  );

  cmdList.push(cmd.command);
}

console.log(task.name);
console.log(cmdList);

const tsk = {
  Task: {
    name: task.name,
    command: cmdList,
  },
};

console.log(tsk);
console.log(stringify(tsk));

const saveFlag = await prompts(
  {
    type: "toggle",
    name: "isSaveGrobal",
    message: "Save grobal?",
    initial: true,
    active: "yes",
    inactive: "no",
  },
);

console.log(saveFlag.isSaveGrobal);
const toml = stringify(tsk);
if (saveFlag.isSaveGrobal) {
  console.log(shine("save to grobal✨"));
  appendText(GROBAL_CONFIG, toml);
} else {
  console.log(shine("save to local✨"));
  appendText(LOCAL_CONFIG, toml);
}
