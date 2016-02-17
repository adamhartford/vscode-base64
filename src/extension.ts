'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Window = vscode.window;
import Range = vscode.Range;
import Selection = vscode.Selection;
import TextDocument = vscode.TextDocument;
import TextEditor = vscode.TextEditor;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-base64" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let encode = vscode.commands.registerCommand('extension.base64Encode', () => {    
        let e = Window.activeTextEditor;
		let d = e.document;
		let sel = e.selections;
        base64Encode(e, d, sel);
	});
    
    let decode = vscode.commands.registerCommand('extension.base64Decode', () => {    
        let e = Window.activeTextEditor;
		let d = e.document;
		let sel = e.selections;
        base64Decode(e, d, sel);
	});

	context.subscriptions.push(encode);
}

function base64Encode(e: TextEditor, d: TextDocument, sel: Selection[]) {
	for (var x = 0; x < sel.length; x++) {
		e.edit(function(edit) {
			let txt: string = d.getText(new Range(sel[x].start, sel[x].end));
            let b: Buffer = new Buffer(txt);
			edit.replace(sel[x], b.toString('base64'));
		});
	}
}

function base64Decode(e: TextEditor, d: TextDocument, sel: Selection[]) {
    for (var x = 0; x < sel.length; x++) {
		e.edit(function(edit) {
			let txt: string = d.getText(new Range(sel[x].start, sel[x].end));
            let b: Buffer = new Buffer(txt, 'base64');
			edit.replace(sel[x], b.toString());
		});
	}
}

// this method is called when your extension is deactivated
export function deactivate() {
}