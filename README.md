# Astryx for VS Code

VS Code themes and a live component preview powered by the [Astryx](https://github.com/facebook/astryx) design system.

## Features

### Themes
- **Astryx Neutral Dark** — monochrome dark theme derived from Astryx's `theme-neutral` design tokens
- **Astryx Neutral Light** — matching light variant

All 87 UI colors and 23 syntax token rules are mapped from Astryx's CSS custom properties (`--color-*` tokens) to VS Code's theme color API.

### Component Preview Panel
Run `Astryx: Show Component Preview` to open a webview panel that renders real Astryx components (Button, Badge, Card, Avatar, Switch, Banner, ProgressBar, and more) using the CDN ESM consumption pattern.

Switch between all 7 Astryx themes (neutral, stone, matcha, y2k, chocolate, butter, gothic) and light/dark mode via VS Code settings.

## Getting Started

### Install from VSIX
```bash
code --install-extension astryx-vscode-0.1.0.vsix
```

### Select Theme
1. Open Command Palette (`Cmd+Shift+P`)
2. Search for `Color Theme`
3. Select `Astryx Neutral Dark` or `Astryx Neutral Light`

### Open Component Preview
1. Open Command Palette
2. Run `Astryx: Show Component Preview`
3. A webview panel opens showing live Astryx components

### Configure Preview
In VS Code Settings:
- `astryx.preview.themeName` — which Astryx theme to use (neutral, stone, matcha, y2k, chocolate, butter, gothic)
- `astryx.preview.colorMode` — light or dark

Or run `Astryx: Select Astryx Theme` for a quick picker.

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
- `htm` for JSX-like syntax without compilation
- Theme CSS + JS from unpkg
- All 7 Astryx themes supported

## Development

```bash
npm install
npm run compile
# Press F5 in VS Code to launch Extension Development Host
```

## License

MIT
