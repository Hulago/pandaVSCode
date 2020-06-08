import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export const templateCommand = async (uri: vscode.Uri) => {
  const conf = vscode.workspace.getConfiguration('hrextension');
  console.log(conf);

  const templatesPath = conf.get('templatesPath');

  console.log(templatesPath);

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
