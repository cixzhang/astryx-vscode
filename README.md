# Astryx for VS Code

> **⚠️ WIP — Not yet tested inside VS Code.**
> The component preview has been verified to render in a headless browser, but it has not been tested as a running VS Code webview extension yet. Theme color mappings and CSS variable resolution may need adjustment after real testing.

VS Code themes and a live component preview powered by the [Astryx](https://github.com/facebook/astryx) design system.

## Features

### Themes
- **Astryx Neutral Dark** — monochrome dark theme derived from Astryx's `theme-neutral` design tokens
- **Astryx Neutral Light** — matching light variant

All 87 UI colors and 23 syntax token rules are mapped from Astryx's CSS custom properties (`--color-*` tokens) to VS Code's theme color API.

### Component Preview Panel
Run `Astryx: Show Component Preview` to open a webview panel that renders real Astryx components (Button, Badge, Card, Avatar, Switch, Banner, ProgressBar, and more) using the CDN ESM consumption pattern.

The preview automatically matches your active VS Code color theme. It reads VS Code's injected `--vscode-*` CSS variables and maps them to Astryx's `--color-*` tokens at runtime. When you switch VS Code themes, the preview updates live.

## Getting Started

### Install from VSIX
```bash
code --install-extension astryx-vscode-0.2.0.vsix
```

### Select Theme
1. Open Command Palette (`Cmd+Shift+P`)
2. Search for `Color Theme`
3. Select `Astryx Neutral Dark` or `Astryx Neutral Light`

### Open Component Preview
1. Open Command Palette
2. Run `Astryx: Show Component Preview`
3. A webview panel opens showing live Astryx components themed by your active VS Code color

## How It Works

### Theme Mapping
The VS Code theme JSON files are generated from Astryx's `theme-neutral` CSS tokens. Each `--color-*` custom property is mapped to VS Code's theme color keys:

| Astryx Token | VS Code Color |
|---|---|
| `--color-syntax-background` | `editor.background` |
| `--color-text-primary` | `editor.foreground` |
| `--color-syntax-keyword` | tokenColors: keyword |
| `--color-background-body` | `sideBar.background`, `activityBar.background` |
| `--color-accent` | `button.background`, `badge.background` |
| ... | 87 total mappings |

### Component Preview
The webview uses the CDN ESM consumption pattern from Astryx v0.1.2:
- React 19 from esm.sh
- `@astryxdesign/core` from esm.sh with `?external=react,react-dom`
- `@astryxdesign/theme-neutral` from esm.sh (for Theme provider + icon registry)
- Components rendered via `React.createElement` (not htm — avoids template literal collisions)
- VS Code's `--vscode-*` CSS variables mapped to Astryx `--color-*` tokens via CSS custom property overrides
- `onDidChangeActiveColorTheme` listener pushes light/dark mode changes to the webview

## Development

```bash
npm install
npm run compile
# Press F5 in VS Code to launch Extension Development Host
```

## License

MIT
