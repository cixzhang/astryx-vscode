# Astryx for VS Code

> **⚠️ WIP — Not yet tested inside VS Code.**
> The component preview has been verified to render in a headless browser, but it has not been tested as a running VS Code webview extension yet. The defineTheme() integration and CSS variable extraction need validation inside a real VS Code webview.

A live component preview for VS Code powered by the [Astryx](https://github.com/facebook/astryx) design system. The preview builds an Astryx theme at runtime that derives from your active VS Code color theme — no Astryx themes are installed or required.

## How It Works

### How VS Code exposes theme colors

VS Code provides theme colors to webviews in two ways:

1. **CSS variables (webview side):** VS Code injects `--vscode-*` custom properties onto the webview's `<body>`. The raw hex values can be read with `getComputedStyle`:
   ```js
   const bg = getComputedStyle(document.body).getPropertyValue('--vscode-editor-background');
   // → "#1e1e1e" (for Dark+)
   ```

2. **ColorTheme API (extension host side):** `vscode.window.activeColorTheme` gives a `ColorTheme` object, but it only exposes `kind` (Light, Dark, HighContrast, HighContrastLight). There is no stable API to read actual color values from the extension host — only the webview CSS variables give you the raw colors.

### Building an Astryx theme from VS Code colors

The webview reads 30+ `--vscode-*` variables via `getComputedStyle`, then calls Astryx's `defineTheme()` to build a proper Astryx theme object:

```ts
import { defineTheme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral';

const theme = defineTheme({
  name: 'vscode-active',
  extends: neutralTheme,  // inherit icon registry, component defaults, scale config
  tokens: {
    '--color-text-primary':       vscodeColors.editorFg,
    '--color-background-surface':  vscodeColors.editorBg,
    '--color-accent':              vscodeColors.buttonBg,
    '--color-border':              vscodeColors.border,
    '--color-syntax-keyword':      vscodeColors.symKeyword,
    // ... 50+ token mappings
  },
});

// Pass to Theme provider
<Theme theme={theme} mode={mode}>
  <Button label="Primary" variant="primary" />
</Theme>
```

This goes through Astryx's full theme pipeline — scale generation, component defaults, icon registry — rather than just overriding CSS variables. The `extends: neutralTheme` ensures all tokens not explicitly mapped fall back to Astryx's neutral defaults.

### Live theme switching

When you switch VS Code color themes (Cmd+K Cmd+T), the extension:
1. Detects the change via `vscode.window.onDidChangeActiveColorTheme`
2. Sends the new light/dark mode to the webview via `postMessage`
3. The webview re-reads `--vscode-*` variables and rebuilds the `defineTheme()` object
4. React re-renders all components with the new theme

### Extracted color reference

The preview includes a debug section showing all extracted VS Code color values with swatches:

| VS Code Variable | Astryx Token | Example (Dark+) |
|---|---|---|
| `--vscode-editor-background` | `--color-background-surface` | `#1e1e1e` |
| `--vscode-editor-foreground` | `--color-text-primary` | `#d4d4d4` |
| `--vscode-button-background` | `--color-accent` | `#0e639c` |
| `--vscode-button-foreground` | `--color-on-accent` | `#ffffff` |
| `--vscode-sideBar-background` | `--color-background-body` | `#252526` |
| `--vscode-descriptionForeground` | `--color-text-secondary` | `#858585` |
| `--vscode-errorForeground` | `--color-error` | `#f48771` |
| `--vscode-editorWarning-foreground` | `--color-warning` | `#cca700` |
| `--vscode-symbolKeyword-foreground` | `--color-syntax-keyword` | `#569cd6` |
| `--vscode-symbolString-foreground` | `--color-syntax-string` | `#ce9178` |
| `--vscode-editorComment-foreground` | `--color-syntax-comment` | `#6a9955` |
| ... | ... | 30+ total mappings |

## Getting Started

### Install from VSIX
```bash
code --install-extension astryx-vscode-0.3.0.vsix
```

### Open Component Preview
1. Open Command Palette (`Cmd+Shift+P`)
2. Run `Astryx: Show Component Preview`
3. A webview panel opens showing live Astryx components themed by your active VS Code color theme
4. Switch VS Code themes to see the preview update live

## Development

```bash
npm install
npm run compile
# Press F5 in VS Code to launch Extension Development Host
```

## License

MIT
