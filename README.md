# Astryx for VS Code

> **⚠️ WIP — Not yet tested inside VS Code.**
> The component preview renders in a headless browser, but has not been tested as a running VS Code webview extension yet.

A live component preview for VS Code powered by the [Astryx](https://github.com/facebook/astryx) design system. The preview matches your active VS Code color theme — no Astryx themes installed, no `defineTheme()` at runtime.

## The Reusable Artifact: `astryx-vscode-theme.css`

The core of this extension is a single CSS file: [`media/astryx-vscode-theme.css`](media/astryx-vscode-theme.css). It maps VS Code's `--vscode-*` CSS variables to Astryx's `--color-*` design tokens using `var()` references — pure CSS, no JavaScript.

Any VS Code webview extension that renders Astryx components can use it:

```html
<link rel="stylesheet" href="https://unpkg.com/@astryxdesign/core@0.1.2/reset.css">
<link rel="stylesheet" href="https://unpkg.com/@astryxdesign/core@0.1.2/astryx.css">
<link rel="stylesheet" href="https://unpkg.com/@astryxdesign/theme-neutral@0.1.2/theme.css">
<link rel="stylesheet" href="https://raw.githubusercontent.com/cixzhang/astryx-vscode/main/media/astryx-vscode-theme.css">
```

Then use `<Theme theme={neutralTheme}>` — the CSS overrides apply via cascade. When VS Code switches themes, `--vscode-*` vars update and everything repaints. No `defineTheme()`, no `getComputedStyle`, no flash.

### How it works

VS Code injects `--vscode-*` CSS custom properties onto every webview's `<body>`. The CSS file maps these to Astryx tokens:

```css
[data-astryx-theme] {
  --color-text-primary:       var(--vscode-editor-foreground, #fafafa);
  --color-background-surface:  var(--vscode-editor-background, #0a0a0a);
  --color-accent:              var(--vscode-button-background, #0e639c);
  --color-syntax-keyword:      var(--vscode-symbolKeyword-foreground, ...);
  /* ... 50+ mappings */
}
```

The `[data-astryx-theme]` selector matches the scope that Astryx's `<Theme>` provider sets on its root div, so overrides apply exactly where Astryx expects them.

### Token mapping reference

| VS Code Variable | Astryx Token | Fallback |
|---|---|---|
| `--vscode-editor-background` | `--color-background-surface` | `#0a0a0a` |
| `--vscode-editor-foreground` | `--color-text-primary` | `#fafafa` |
| `--vscode-button-background` | `--color-accent` | `#0e639c` |
| `--vscode-button-foreground` | `--color-on-accent` | `#ffffff` |
| `--vscode-sideBar-background` | `--color-background-body` | `#1b1b1b` |
| `--vscode-descriptionForeground` | `--color-text-secondary` | `#a3a3a3` |
| `--vscode-errorForeground` | `--color-error` | `#f48771` |
| `--vscode-editorWarning-foreground` | `--color-warning` | `#cca700` |
| `--vscode-symbolKeyword-foreground` | `--color-syntax-keyword` | editor fg |
| `--vscode-symbolString-foreground` | `--color-syntax-string` | editor fg |
| `--vscode-editorComment-foreground` | `--color-syntax-comment` | desc fg |
| `--vscode-list-hoverBackground` | `--color-overlay-hover` | rgba |
| `--vscode-widget-shadow` | `--color-shadow` | rgba |
| ... | ... | 50+ total |

### Limitations

- **Canvas/chart components** can't read CSS variables — if you need charts, you'd need to extract values via `getComputedStyle` and pass them to the charting library. Not handled here.
- **`defineTheme()` not used** — the CSS approach overrides tokens at the CSS level. If you need Astryx's scale generation or component-level theming from `defineTheme()`, use the JS approach instead. For standard component rendering, CSS is sufficient.

## Extension: Component Preview

The extension provides a command that opens a webview showing live Astryx components:

1. Open Command Palette (`Cmd+Shift+P`)
2. Run `Astryx: Show Component Preview`
3. A panel opens with buttons, badges, cards, avatars, banners, progress bars, typography, and more — all themed by your active VS Code color

The extension also listens for `onDidChangeActiveColorTheme` to toggle the light/dark mode on Astryx's `<Theme>` provider.

## Getting Started

```bash
code --install-extension astryx-vscode-0.3.0.vsix
```

## Development

```bash
npm install
npm run compile
# Press F5 in VS Code to launch Extension Development Host
```

## License

MIT
