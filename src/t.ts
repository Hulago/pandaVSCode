import { utils } from "./utils/utils";
import * as path from "path";
import { DebugConsoleMode } from "vscode";
const fs = require("fs-extra");

async function readTemplates() {
  const templates = await utils.findTemplates(path.resolve("./templates"));

  console.log(templates);

  const t = require(templates[0]);

  console.log(t);

  const files = await utils.getFiles(path.resolve("./templates"));

  console.log(files.filter((i) => i.match("template.json") === null));

  files.forEach(async (file) => {
    console.log("FILE", file);
    if (fs.existsSync(file) && fs.lstatSync(file).isDirectory()) {
      console.log("DIR");
    } else {
      console.log("READING FILE", file);
      let content = await fs.readFile(file, { encoding: "utf8" });
      console.log(utils.template(content, { name: "SomeModel" }));
    }
  });
}

readTemplates();
