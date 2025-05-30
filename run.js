const vscode = require('vscode');
const os = require('os');
const path = require('path');
const cp = require('child_process');

function activate(context) {
  let disposable = vscode.commands.registerCommand('orchid.runScript', () => {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
      vscode.window.showErrorMessage("No active Orchid file open.");
      return;
    }

    const scriptPath = activeEditor.document.fileName;
    let command;

    if (os.platform() === 'win32') {
      command = `"C:\\Program Files (x86)\\Orchid\\orchid.exe" "${scriptPath}"`;
    } else {
      command = `/usr/local/bin/orchid "${scriptPath}"`;
    }

    const terminal = vscode.window.createTerminal("Orchid Runner");
    terminal.show();
    terminal.sendText(command);
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
