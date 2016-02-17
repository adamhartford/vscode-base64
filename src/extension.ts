'use strict';

import * as vscode from 'vscode';
import Window = vscode.window;
import Range = vscode.Range;
import Selection = vscode.Selection;
import TextDocument = vscode.TextDocument;
import TextEditor = vscode.TextEditor;

export function activate(context: vscode.ExtensionContext) {

	console.log('vscode-base64" is now active');

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

export function deactivate() {
}