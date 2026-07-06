import * as vscode from 'vscode';
import { getWebviewContent } from './webview';

export function activate(context: vscode.ExtensionContext) {
  const showPreview = vscode.commands.registerCommand('astryx.showPreview', () => {
    const panel = vscode.window.createWebviewPanel(
      'astryxPreview',
      'Astryx Component Preview',
      vscode.ViewColumn.Two,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [],
      }
    );

    const getMode = () => {
      const kind = vscode.window.activeColorTheme.kind;
      if (kind === vscode.ColorThemeKind.Light || kind === vscode.ColorThemeKind.HighContrastLight) {
        return 'light';
      }
      return 'dark';
    };

    panel.webview.html = getWebviewContent(getMode());

    // Listen for VS Code theme changes — notify webview to re-read CSS vars
    context.subscriptions.push(
      vscode.window.onDidChangeActiveColorTheme((theme) => {
        let mode = 'dark';
        if (theme.kind === vscode.ColorThemeKind.Light || theme.kind === vscode.ColorThemeKind.HighContrastLight) {
          mode = 'light';
        }
        panel.webview.postMessage({ type: 'themeChanged', mode });
      })
    );
  });

  context.subscriptions.push(showPreview);
}

export function deactivate() {}
