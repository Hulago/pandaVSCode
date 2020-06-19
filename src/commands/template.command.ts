import * as vscode from 'vscode';
import { DebugConsoleMode } from 'vscode';
import * as path from 'path';
const fs = require('fs-extra');

import { utils } from '../utils/utils';

function validateTemplatesPath(templatePath: string) {
  if (fs.existsSync(path.resolve(templatePath))) {
    console.log(path.resolve(templatePath));
    return path.resolve(templatePath);
  }

  if (fs.existsSync(path.resolve(path.join(__dirname, templatePath)))) {
    console.log(path.resolve(path.join(__dirname, templatePath)));
    return path.resolve(path.join(__dirname, templatePath));
  }

  return null;
}

async function readTemplates(templatePath: string) {
  const templates = await utils.findTemplates(path.resolve(templatePath));

  console.log(templates);

  const t = require(templates[0]);

  console.log(t);

  const files = await utils.getFiles(path.resolve(templatePath));

  console.log(files.filter((i) => i.match('template.json') === null));

  files.forEach(async (file) => {
    console.log('FILE', file);
    if (fs.existsSync(file) && fs.lstatSync(file).isDirectory()) {
      console.log('DIR');
    } else {
      console.log('READING FILE', file);
      let content = await fs.readFile(file, { encoding: 'utf8' });
      console.log(utils.template(content, { name: 'SomeModel' }));
    }
  });
}

export const templateCommand = async (uri: vscode.Uri) => {
  const conf = vscode.workspace.getConfiguration('hrextension');
  console.log(conf);

  const templatesPath = (conf.get('templatesPath') as string[])
    .map((p) => validateTemplatesPath(p))
    .filter((p) => p !== null);

  (templatesPath as string[]).forEach(async (p) => await readTemplates(p));

  console.log(templatesPath);

  console.log(__dirname);

  let directoryPath =
    uri && uri.fsPath ? uri.fsPath : vscode.workspace.rootPath;

  // if (!(await fs.stat(directoryPath)).isDirectory()) {
  //   directoryPath = path.dirname(directoryPath);
  // }

  console.log(directoryPath);

  vscode.window.showInformationMessage('Hello');

  const select = vscode.window.createQuickPick<vscode.QuickPickItem>();
  select.items = [
    {
      label: 'label',
      description: 'description',
      detail: 'Some Details',
      picked: false,
    },
    {
      label: 'label2',
      description: 'description2',
      detail: 'Some Details2',
      picked: false,
    },
  ];
  select.title = 'Select';
  select.step = 1;
  select.ignoreFocusOut = true;

  select.show();

  // const input = vscode.window.createInputBox();
  // input.title = 'Title Name';
  // input.step = 2;
  // input.ignoreFocusOut = true;
  // input.value = '';
  // input.prompt = 'Cenas a fazer';
  // input.show();
};
