import {
  camelCase,
  kebabCase,
  capitalize,
  lowerCase,
  lowerFirst,
  upperCase,
  upperFirst,
  snakeCase,
} from 'lodash-es';

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
      },
      ...dataObj,
    };
    const names = Object.keys(utilObject);
    const vals = Object.values(utilObject);
    return new Function(...names, `return \`${str}\`;`)(...vals);
  }
}

export const utils = new Utils();
