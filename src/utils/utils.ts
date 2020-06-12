const camelCase = require("lodash/camelCase");
const kebabCase = require("lodash/kebabCase");
const capitalize = require("lodash/capitalize");
const lowerCase = require("lodash/lowerCase");
const lowerFirst = require("lodash/lowerFirst");
const upperCase = require("lodash/upperCase");
const upperFirst = require("lodash/upperFirst");
const snakeCase = require("lodash/snakeCase");

import { Glob } from "glob";
import * as path from "path";

class Utils {
  template(str: string, dataObj: any) {
    const utilObject = {
      _: {
        camelCase,
        kebabCase,
        capitalize,
        lowerCase,
        lowerFirst,
        upperCase,
        upperFirst,
        snakeCase,
        pascalCase: (str: string) => upperFirst(camelCase(str)),
      },
      ...dataObj,
    };
    const names = Object.keys(utilObject);
    const vals = Object.values(utilObject);
    return new Function(...names, `return \`${str}\`;`)(...vals);
  }

  findTemplates(templatePath: string): Promise<string[]> {
    return new Promise((res, rej) => {
      const g = new Glob(
        path.join(templatePath, "**/*.json"),
        {},
        (err, matches) => {
          if (err) {
            rej(err);
          }
          res(matches);
        }
      );
    });
  }

  getFiles(templatePath: string): Promise<string[]> {
    return new Promise((res, rej) => {
      const g = new Glob(
        path.join(templatePath, "**/*"),
        {},
        (err, matches) => {
          if (err) {
            rej(err);
          }
          res(matches);
        }
      );
    });
  }
}

export const utils = new Utils();
