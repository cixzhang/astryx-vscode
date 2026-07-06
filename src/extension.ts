import * as vscode from 'vscode';
import { getWebviewContent } from './webview';

export function activate(context: vscode.ExtensionContext) {
  // Command: Show Component Preview
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

    const config = vscode.workspace.getConfiguration('astryx.preview');
    const themeName = config.get<string>('themeName') || 'neutral';
    const colorMode = config.get<string>('colorMode') || 'dark';

    panel.webview.html = getWebviewContent(themeName, colorMode);

    // Handle config changes
    panel.onDidChangeViewState(() => {
      const cfg = vscode.workspace.getConfiguration('astryx.preview');
      const tn = cfg.get<string>('themeName') || 'neutral';
      const cm = cfg.get<string>('colorMode') || 'dark';
      panel.webview.html = getWebviewContent(tn, cm);
    });

    // Listen for config changes from settings
    context.subscriptions.push(
      vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('astryx.preview')) {
          const cfg = vscode.workspace.getConfiguration('astryx.preview');
          const tn = cfg.get<string>('themeName') || 'neutral';
          const cm = cfg.get<string>('colorMode') || 'dark';
          panel.webview.html = getWebviewContent(tn, cm);
        }
      })
    );
  });

  // Command: Select Astryx Theme
  const selectTheme = vscode.commands.registerCommand('astryx.selectTheme', async () => {
    const themes = [
      { label: 'Astryx Neutral Dark', id: 'neutral', mode: 'dark' },
      { label: 'Astryx Neutral Light', id: 'neutral', mode: 'light' },
      { label: 'Astryx Stone Dark', id: 'stone', mode: 'dark' },
      { label: 'Astryx Stone Light', id: 'stone', mode: 'light' },
      { label: 'Astryx Matcha Dark', id: 'matcha', mode: 'dark' },
      { label: 'Astryx Matcha Light', id: 'matcha', mode: 'light' },
      { label: 'Astryx Y2K Dark', id: 'y2k', mode: 'dark' },
      { label: 'Astryx Chocolate Dark', id: 'chocolate', mode: 'dark' },
      { label: 'Astryx Butter Light', id: 'butter', mode: 'light' },
      { label: 'Astryx Gothic Dark', id: 'gothic', mode: 'dark' },
    ];

    const pick = await vscode.window.showQuickPick(themes, {
      placeHolder: 'Select an Astryx theme for the preview panel',
    });

    if (pick) {
      const config = vscode.workspace.getConfiguration('astryx.preview');
      config.update('themeName', pick.id, vscode.ConfigurationTarget.Global);
      config.update('colorMode', pick.mode, vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage(`Astryx preview set to ${pick.label}`);
    }
  });

  context.subscriptions.push(showPreview, selectTheme);
}

export function deactivate() {}
