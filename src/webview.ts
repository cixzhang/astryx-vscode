/**
 * Generate webview HTML for the Astryx component preview.
 *
 * The webview reads VS Code's injected --vscode-* CSS variables via
 * getComputedStyle, extracts the raw color values, and passes them
 * to Astryx's defineTheme() to build a proper Astryx theme object
 * that derives from the active VS Code color theme.
 */
export function getWebviewContent(initialMode: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Astryx Component Preview</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="https://unpkg.com/@astryxdesign/core@0.1.2/reset.css">
  <link rel="stylesheet" href="https://unpkg.com/@astryxdesign/core@0.1.2/astryx.css">

  <script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@19.2.7",
      "react-dom": "https://esm.sh/react-dom@19.2.7",
      "react-dom/client": "https://esm.sh/react-dom@19.2.7/client",
      "react/jsx-runtime": "https://esm.sh/react@19.2.7/jsx-runtime",
      "@astryxdesign/core": "https://esm.sh/@astryxdesign/core@0.1.2?external=react,react-dom",
      "@astryxdesign/core/theme": "https://esm.sh/@astryxdesign/core@0.1.2/theme?external=react,react-dom",
      "@astryxdesign/theme-neutral": "https://esm.sh/@astryxdesign/theme-neutral@0.1.2?external=react,react-dom",
      "htm": "https://esm.sh/htm@3.1.1"
    }
  }
  </script>

  <style>
    :root {
      --font-family-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-family-heading: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-family-code: 'SF Mono', Menlo, Monaco, monospace;
    }

    body {
      background: var(--vscode-editor-background, #1b1b1b);
      color: var(--vscode-editor-foreground, #fafafa);
      font-family: var(--font-family-body);
      margin: 0;
      padding: 0;
      min-height: 100vh;
    }
  </style>
</head>
<body>
  <div id="astryx-root"></div>

  <script type="module">
    import React, { useState, useEffect, useMemo } from 'react';
    import { createRoot } from 'react-dom/client';
    import * as Astryx from '@astryxdesign/core';
    import { defineTheme } from '@astryxdesign/core/theme';
    import { neutralTheme } from '@astryxdesign/theme-neutral';

    const h = React.createElement;
    const {
      Theme, Button, Badge, Card, Text, Heading, VStack, HStack,
      Divider, Switch, Banner, Avatar, StatusDot, Spinner,
      ProgressBar, TextInput,
    } = Astryx;

    // ─── Extract raw color values from VS Code's CSS variables ───
    function readVscodeColors() {
      const styles = getComputedStyle(document.body);
      const get = (name) => styles.getPropertyValue(name).trim();
      return {
        editorBg:        get('--vscode-editor-background'),
        editorFg:        get('--vscode-editor-foreground'),
        sideBarBg:       get('--vscode-sideBar-background'),
        sideBarFg:       get('--vscode-sideBar-foreground'),
        activityBarBg:   get('--vscode-activityBar-background'),
        statusBarBg:     get('--vscode-statusBar-background'),
        buttonBg:        get('--vscode-button-background'),
        buttonFg:        get('--vscode-button-foreground'),
        buttonHover:     get('--vscode-button-hoverBackground'),
        inputBg:         get('--vscode-input-background'),
        inputFg:         get('--vscode-input-foreground'),
        inputBorder:     get('--vscode-input-border'),
        border:          get('--vscode-sideBar-border'),
        listHover:       get('--vscode-list-hoverBackground'),
        listActiveSel:   get('--vscode-list-activeSelectionBackground'),
        listActiveSelFg: get('--vscode-list-activeSelectionForeground'),
        descFg:          get('--vscode-descriptionForeground'),
        errorFg:         get('--vscode-errorForeground'),
        warningFg:       get('--vscode-editorWarning-foreground'),
        textLink:        get('--vscode-textLink-foreground'),
        indentGuide:     get('--vscode-editorIndentGuide-background'),
        widgetShadow:    get('--vscode-widget-shadow'),
        panelBorder:     get('--vscode-panel-border'),
        tabActiveBg:     get('--vscode-tab-activeBackground'),
        tabInactiveBg:   get('--vscode-tab-inactiveBackground'),
        // Semantic syntax colors
        symKeyword:      get('--vscode-symbolKeyword-foreground'),
        symString:       get('--vscode-symbolString-foreground'),
        symComment:      get('--vscode-editorComment-foreground'),
        symNumber:       get('--vscode-symbolNumeric-foreground'),
        symFunction:     get('--vscode-symbolFunction-foreground'),
        symClass:        get('--vscode-symbolClass-foreground'),
        symTag:          get('--vscode-symbolTag-foreground'),
        symAttribute:    get('--vscode-symbolAttribute-foreground'),
        symProperty:     get('--vscode-symbolProperty-foreground'),
        symConstant:     get('--vscode-symbolConstant-foreground'),
        // Git decoration colors
        gitModified:     get('--vscode-gitDecoration-modifiedResourceForeground'),
        gitUntracked:    get('--vscode-gitDecoration-untrackedResourceForeground'),
        gitDeleted:      get('--vscode-gitDecoration-deletedResourceForeground'),
      };
    }

    // ─── Build an Astryx theme from the VS Code color values ───
    function buildVscodeTheme(colors, mode) {
      const bg = colors.editorBg || (mode === 'dark' ? '#0a0a0a' : '#ffffff');
      const fg = colors.editorFg || (mode === 'dark' ? '#fafafa' : '#171717');
      const accent = colors.buttonBg || (mode === 'dark' ? '#0e639c' : '#007acc');
      const onAccent = colors.buttonFg || '#ffffff';

      return defineTheme({
        name: 'vscode-active',
        extends: neutralTheme,
        tokens: {
          // Core text colors
          '--color-text-primary':     fg,
          '--color-text-secondary':   colors.descFg || (mode === 'dark' ? '#a3a3a3' : '#737373'),
          '--color-text-accent':      colors.textLink || accent,

          // Background colors
          '--color-background-surface': bg,
          '--color-background-body':    colors.sideBarBg || colors.editorBg || bg,
          '--color-background-card':    colors.sideBarBg || bg,
          '--color-background-popover': colors.sideBarBg || bg,
          '--color-background-muted':   colors.listHover || bg,

          // Accent (maps to VS Code button)
          '--color-accent':        accent,
          '--color-accent-muted':  colors.buttonHover || accent,
          '--color-on-accent':     onAccent,

          // Borders
          '--color-border':            colors.border || 'rgba(128,128,128,0.2)',
          '--color-border-emphasized': colors.panelBorder || 'rgba(128,128,128,0.3)',

          // Semantic status
          '--color-success': colors.gitUntracked || '#73c991',
          '--color-error':   colors.errorFg || '#f48771',
          '--color-warning': colors.warningFg || '#cca700',

          // Syntax highlighting
          '--color-syntax-keyword':   colors.symKeyword || fg,
          '--color-syntax-string':    colors.symString || fg,
          '--color-syntax-comment':   colors.symComment || colors.descFg || '#a3a3a3',
          '--color-syntax-number':    colors.symNumber || fg,
          '--color-syntax-function':  colors.symFunction || fg,
          '--color-syntax-type':      colors.symClass || colors.symKeyword || fg,
          '--color-syntax-variable':  fg,
          '--color-syntax-operator':  fg,
          '--color-syntax-constant':  colors.symConstant || fg,
          '--color-syntax-tag':       colors.symTag || fg,
          '--color-syntax-attribute': colors.symAttribute || fg,
          '--color-syntax-property':  colors.symProperty || fg,
          '--color-syntax-background': bg,
          '--color-syntax-punctuation': colors.descFg || '#a3a3a3',

          // Category color families — derived from VS Code semantic colors
          '--color-text-blue':   colors.textLink || '#3794ff',
          '--color-text-green':  colors.gitUntracked || '#73c991',
          '--color-text-red':    colors.errorFg || '#f48771',
          '--color-text-yellow': colors.warningFg || '#cca700',
          '--color-text-purple': colors.symClass || '#c586c0',
          '--color-text-orange': colors.warningFg || '#cca700',
          '--color-text-teal':   colors.symProperty || '#4ec9b0',
          '--color-text-cyan':   colors.symFunction || '#4ec9b0',

          // Icon colors follow text colors
          '--color-icon-primary':   fg,
          '--color-icon-secondary': colors.descFg || '#a3a3a3',
          '--color-icon-accent':    colors.textLink || accent,

          // Overlay (list selection / hover)
          '--color-overlay-hover':    colors.listHover || 'rgba(128,128,128,0.1)',
          '--color-overlay-pressed':  colors.listActiveSel || 'rgba(128,128,128,0.2)',

          // Misc
          '--color-shadow':   colors.widgetShadow || 'rgba(0,0,0,0.3)',
          '--color-skeleton': colors.indentGuide || 'rgba(128,128,128,0.15)',
        },
      });
    }

    function ComponentShowcase({ initialMode }) {
      const [switchVal, setSwitchVal] = useState(true);
      const [inputVal, setInputVal] = useState('');
      const [mode, setMode] = useState(initialMode);
      const [colors, setColors] = useState(null);

      // Read VS Code CSS variables on mount and when theme changes
      useEffect(() => {
        const readColors = () => {
          // Slight delay to ensure VS Code has updated the CSS vars
          setTimeout(() => {
            setColors(readVscodeColors());
          }, 50);
        };
        readColors();

        const handler = (event) => {
          const msg = event.data;
          if (msg.type === 'themeChanged') {
            setMode(msg.mode);
            readColors();
          }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
      }, []);

      // Build the Astryx theme from VS Code colors
      const theme = useMemo(() => {
        if (!colors) return neutralTheme;
        try {
          return buildVscodeTheme(colors, mode);
        } catch (e) {
          console.error('Failed to build VS Code theme:', e);
          return neutralTheme;
        }
      }, [colors, mode]);

      if (!colors) {
        return h('div', { style: { padding: '32px', color: 'var(--vscode-editor-foreground, #fafafa)' } },
          'Reading VS Code theme colors...'
        );
      }

      return h(Theme, { theme, mode },
        h('div', { style: { padding: '32px', maxWidth: '800px', margin: '0 auto' } },
          h(VStack, { gap: 8 },
            // Title + debug info
            h(VStack, { gap: 2 },
              h(Heading, { level: 1 }, 'Astryx Component Preview'),
              h(Text, { type: 'supporting' }, 'Themed by your active VS Code color theme'),
              h(Text, { type: 'code' }, 'defineTheme({ name: "vscode-active", extends: neutralTheme, ... })')
            ),
            h(Divider),

            // Buttons
            h(VStack, { gap: 4 },
              h(Heading, { level: 2 }, 'Buttons'),
              h(HStack, { gap: 3, vAlign: 'center' },
                h(Button, { label: 'Primary', variant: 'primary' }),
                h(Button, { label: 'Secondary', variant: 'secondary' }),
                h(Button, { label: 'Ghost', variant: 'ghost' }),
                h(Button, { label: 'Small', variant: 'primary', size: 'sm' }),
                h(Button, { label: 'Large', variant: 'primary', size: 'lg' })
              )
            ),

            // Badges
            h(VStack, { gap: 4 },
              h(Heading, { level: 2 }, 'Badges'),
              h(HStack, { gap: 2, vAlign: 'center', wrap: 'wrap' },
                h(Badge, { variant: 'neutral', label: 'Neutral' }),
                h(Badge, { variant: 'info', label: 'Info' }),
                h(Badge, { variant: 'success', label: 'Success' }),
                h(Badge, { variant: 'warning', label: 'Warning' }),
                h(Badge, { variant: 'error', label: 'Error' }),
                h(Badge, { variant: 'blue', label: 'Blue' }),
                h(Badge, { variant: 'purple', label: 'Purple' }),
                h(Badge, { variant: 'green', label: 'Green' })
              )
            ),

            // Cards & Avatars
            h(VStack, { gap: 4 },
              h(Heading, { level: 2 }, 'Cards & Avatars'),
              h(HStack, { gap: 4, vAlign: 'start', wrap: 'wrap' },
                h(Card, { padding: 5 },
                  h(VStack, { gap: 3 },
                    h(HStack, { gap: 3, vAlign: 'center' },
                      h(Avatar, { name: 'Cindy', size: 'medium' }),
                      h(VStack, { gap: 0 },
                        h(Text, { type: 'body' }, 'Cindy Zhang'),
                        h(Text, { type: 'supporting' }, 'Design Engineer')
                      )
                    ),
                    h(Text, { type: 'body' }, 'Building Astryx — an AI-optimized design system.'),
                    h(HStack, { gap: 2 },
                      h(Badge, { variant: 'info', label: 'React' }),
                      h(Badge, { variant: 'purple', label: 'StyleX' })
                    )
                  )
                ),
                h(Card, { padding: 5 },
                  h(VStack, { gap: 3 },
                    h(HStack, { gap: 3, vAlign: 'center' },
                      h(Avatar, { name: 'Benji', size: 'medium' }),
                      h(VStack, { gap: 0 },
                        h(Text, { type: 'body' }, 'Benji Lee'),
                        h(Text, { type: 'supporting' }, 'Software Engineer')
                      )
                    ),
                    h(Text, { type: 'body' }, 'Works on developer tooling and CLI.'),
                    h(HStack, { gap: 2 },
                      h(Badge, { variant: 'success', label: 'Node' }),
                      h(Badge, { variant: 'warning', label: 'CLI' })
                    )
                  )
                )
              )
            ),

            // Interactive
            h(VStack, { gap: 4 },
              h(Heading, { level: 2 }, 'Interactive'),
              h(Card, { padding: 5 },
                h(VStack, { gap: 4 },
                  h(Switch, {
                    label: 'Enable feature',
                    value: switchVal,
                    onChange: (v) => setSwitchVal(v)
                  }),
                  h(TextInput, {
                    label: 'Search',
                    value: inputVal,
                    onChange: (e) => setInputVal(e.target.value),
                    placeholder: 'Type something...'
                  }),
                  h(HStack, { gap: 3, vAlign: 'center' },
                    h(StatusDot, { variant: 'success', label: 'Healthy' }),
                    h(StatusDot, { variant: 'warning', label: 'Degraded' }),
                    h(StatusDot, { variant: 'error', label: 'Down' }),
                    h(StatusDot, { variant: 'accent', label: 'Active', isPulsing: true })
                  )
                )
              )
            ),

            // Banners & Progress
            h(VStack, { gap: 4 },
              h(Heading, { level: 2 }, 'Banners & Progress'),
              h(VStack, { gap: 3 },
                h(Banner, { status: 'info', title: 'Information', description: 'This is an info banner from Astryx.' }),
                h(Banner, { status: 'success', title: 'Success', description: 'Operation completed successfully.' }),
                h(Banner, { status: 'warning', title: 'Warning', description: 'Something needs attention.' }),
                h(Banner, { status: 'error', title: 'Error', description: 'Something went wrong.' }),
                h(ProgressBar, { label: 'Upload progress', value: 72, max: 100 })
              )
            ),

            // Typography
            h(VStack, { gap: 4 },
              h(Heading, { level: 2 }, 'Typography'),
              h(VStack, { gap: 2 },
                h(Heading, { level: 1 }, 'Display 1 Heading'),
                h(Heading, { level: 2 }, 'Display 2 Heading'),
                h(Heading, { level: 3 }, 'Display 3 Heading'),
                h(Text, { type: 'large' }, 'Large body text'),
                h(Text, { type: 'body' }, 'Regular body text'),
                h(Text, { type: 'supporting' }, 'Supporting text — lower emphasis'),
                h(Text, { type: 'code' }, 'Code text — monospace')
              )
            ),

            // Loading States
            h(VStack, { gap: 4 },
              h(Heading, { level: 2 }, 'Loading States'),
              h(HStack, { gap: 4, vAlign: 'center' },
                h(Spinner, { size: 'sm' }),
                h(Spinner, { size: 'md' }),
                h(Spinner, { size: 'lg' }),
                h(Text, { type: 'supporting' }, 'Loading spinners')
              )
            ),

            // Raw color values (for debugging)
            h(Divider),
            h(VStack, { gap: 2 },
              h(Heading, { level: 3 }, 'Extracted VS Code Colors'),
              h(Text, { type: 'supporting' }, 'Raw values from getComputedStyle — these are what defineTheme() receives:'),
              ...Object.entries(colors).filter(([_, v]) => v).map(([key, val]) =>
                h(HStack, { gap: 2, key },
                  h('div', { style: { width: '16px', height: '16px', borderRadius: '3px', background: val, border: '1px solid rgba(128,128,128,0.3)', flexShrink: 0 } }),
                  h(Text, { type: 'code' }, key + ': ' + val)
                )
              )
            ),

            h(Divider),
            h(Text, { type: 'supporting' }, 'Astryx components themed by defineTheme() derived from your active VS Code color theme')
          )
        )
      );
    }

    const root = createRoot(document.getElementById('astryx-root'));
    root.render(h(ComponentShowcase, { initialMode: '${initialMode}' }));
  </script>
</body>
</html>`;
}
