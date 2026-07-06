# Astryx for VS Code

> **⚠️ WIP — Not yet tested inside VS Code.**
> The component preview has been verified to render in a headless browser, but it has not been tested as a running VS Code webview extension yet. CSS variable resolution may need adjustment after real testing.

A live component preview for VS Code powered by the [Astryx](https://github.com/facebook/astryx) design system. The preview matches your active VS Code color theme — no Astryx themes are installed or required.

## Features

### Component Preview Panel
Run `Astryx: Show Component Preview` to open a webview panel that renders real Astryx components (Button, Badge, Card, Avatar, Switch, Banner, ProgressBar, and more) using the CDN ESM consumption pattern.

The preview automatically matches whatever VS Code color theme you have active. It reads VS Code's injected `--vscode-*` CSS variables and maps them to Astryx's `--color-*` tokens at runtime. When you switch VS Code themes, the preview updates live.

## Getting Started

### Install from VSIX
```bash
code --install-extension astryx-vscode-0.2.0.vsix
```

### Open Component Preview
1. Open Command Palette (`Cmd+Shift+P`)
2. Run `Astryx: Show Component Preview`
3. A webview panel opens showing live Astryx components themed by your active VS Code color theme

## How It Works

The webview reads VS Code's own `--vscode-*` CSS variables (which VS Code injects into every webview based on the active color theme) and maps them to Astryx's `--color-*` design tokens:

| VS Code Variable | Astryx Token |
|---|---|
| `--vscode-editor-background` | `--color-background-surface` |
| `--vscode-editor-foreground` | `--color-text-primary` |
| `--vscode-button-background` | `--color-accent` |
| `--vscode-sideBar-background` | `--color-background-body` |
| `--vscode-errorForeground` | `--color-error`, `--color-text-red` |
| `--vscode-descriptionForeground` | `--color-text-secondary` |
| ... | 50+ mappings |

The extension also detects light vs dark mode from `vscode.window.activeColorTheme.kind` and passes it to Astryx's `<Theme>` provider. When you switch themes, `onDidChangeActiveColorTheme` notifies the webview to re-render.

### Component Preview Architecture
- React 19 from esm.sh
- `@astryxdesign/core` from esm.sh with `?external=react,react-dom`
- `@astryxdesign/theme-neutral` from esm.sh (for Theme provider + icon registry only — CSS tokens are overridden by VS Code variables)
- Components rendered via `React.createElement` (not htm — avoids template literal collisions in the TS template string)

## Development

```bash
npm install
npm run compile
# Press F5 in VS Code to launch Extension Development Host
```

## License

MIT
