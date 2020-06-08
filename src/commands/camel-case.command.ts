import * as vscode from 'vscode';
const camelCase = require('lodash/camelCase');

function getSelectedText(
  selection: vscode.Selection,
  document: vscode.TextDocument
): { text: string | undefined; range: vscode.Range } {
  let range: vscode.Range | undefined;

  if (isCursorPosition(selection)) {
    range =
      document.getWordRangeAtPosition(selection.start) ||
      new vscode.Range(selection.start, selection.end);
  } else {
    range = new vscode.Range(selection.start, selection.end);
  }

  return {
    text: range ? document.getText(range) : undefined,
    range,
  };
}

function isCursorPosition(range: vscode.Range): boolean {
  return (
    range.start.line === range.end.line &&
    range.start.character === range.end.character
  );
}

export const camelCaseCommand = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const selections = editor.selections;
  const document = editor.document;

  editor.edit((editBuilder) => {
    selections.forEach((selection) => {
      const { text, range } = getSelectedText(selection, document);

      let replacement = camelCase(text);
      editBuilder.replace(range, replacement);
    });
  });
};

//   const selectionText = editor.document.getText(selection);
//   const getParamReg = /\(([^)]*)\)/;
//   const m = selectionText.match(getParamReg);
//   if (!m) {
//     return;
//   }
//   const paramList = m[1]
//     .replace(/[\t\s\r]/g, '')
//     .split(',')
//     .filter((s) => s !== '');

//   editor.edit((editBuilder) => {
//     const selectionLine = editor.document.lineAt(selection.start.line);
//     const insertPosition = selectionLine.range.start;
//     let text = '/**\r';
//     text += `* Function explanation \r`;
//     const configuration = vscode.workspace.getConfiguration('jsdoc');
//     const author: string = configuration.get('author') || '';
//     author && (text += `* @author ${author}\r`);
//     // text += `* @date ${getFormatDate('YYYY-MM-DD', new Date())}\r`;
//     text += paramList
//       .map((paramName) => `* @param {any} ${paramName}\r`)
//       .join('');
//     text += `* @returns {any}\r`;
//     text += `*/\r`;

//     const whitespace = selectionLine.firstNonWhitespaceCharacterIndex;
//     const padSpaceStr = ' '.repeat(whitespace);
//     text = text.replace(/\r/g, `\r${padSpaceStr} `);
//     text = `${padSpaceStr}${text}`;
//     text = text.slice(0, text.length - whitespace - 1);

//     editBuilder.insert(insertPosition, text);
//   });
// };
