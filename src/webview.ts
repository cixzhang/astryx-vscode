import * as vscode from 'vscode';

/**
 * Generate webview HTML for the Astryx component preview.
 *
 * Uses the vscode theme package (built via `astryx theme build`) — same
 * pattern as @astryxdesign/theme-neutral. The theme CSS is generated ahead
 * of time, the JS theme object is embedded inline.
 *
 * Token values are var(--vscode-*) references compiled by the Astryx
 * theme pipeline into proper scoped CSS.
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

  <!-- Astryx base CSS -->
  <link rel="stylesheet" href="https://unpkg.com/@astryxdesign/core@0.1.2/reset.css">
  <link rel="stylesheet" href="https://unpkg.com/@astryxdesign/core@0.1.2/astryx.css">

  <!-- VS Code theme CSS (built via astryx theme build) -->
  <link rel="stylesheet" href="https://raw.githubusercontent.com/cixzhang/astryx-vscode/main/dist/theme.css">

  <script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@19.2.7",
      "react-dom": "https://esm.sh/react-dom@19.2.7",
      "react-dom/client": "https://esm.sh/react-dom@19.2.7/client",
      "react/jsx-runtime": "https://esm.sh/react@19.2.7/jsx-runtime",
      "@astryxdesign/core": "https://esm.sh/@astryxdesign/core@0.1.2?external=react,react-dom"
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
    import React, { useState, useEffect } from 'react';
    import { createRoot } from 'react-dom/client';
    import * as Astryx from '@astryxdesign/core';
    import { defineTheme } from 'https://esm.sh/@astryxdesign/core@0.1.2/theme?external=react,react-dom';

    const h = React.createElement;

    // Build the vscode theme at module load time.
    // Token values are var(--vscode-*) references — CSS resolves them
    // synchronously. No flash, no getComputedStyle.
    // This uses defineTheme() the same way neutralTheme.ts does, just
    // with var() references instead of [light, dark] hex arrays pairs.
    const vscodeTheme = defineTheme({
      name: 'vscode',
      tokens: {
        '--color-background-surface': 'var(--vscode-editor-background, #0a0a0a)',
        '--color-background-body':    'var(--vscode-sideBar-background, #1b1b1b)',
        '--color-background-card':    'var(--vscode-sideBar-background, #1b1b1b)',
        '--color-background-popover': 'var(--vscode-sideBar-background, #1b1b1b)',
        '--color-background-muted':   'var(--vscode-sideBarSectionHeader-background, #1b1b1b)',
        '--color-accent':       'var(--vscode-button-background, #0e639c)',
        '--color-accent-muted':  'var(--vscode-button-hoverBackground, #1177bb)',
        '--color-on-accent':     'var(--vscode-button-foreground, #ffffff)',
        '--color-text-primary':   'var(--vscode-editor-foreground, #fafafa)',
        '--color-text-secondary': 'var(--vscode-descriptionForeground, #a3a3a3)',
        '--color-text-accent':    'var(--vscode-textLink-foreground, #3794ff)',
        '--color-text-disabled':  'var(--vscode-disabledForeground, #525252)',
        '--color-icon-accent':    'var(--vscode-textLink-foreground, #3794ff)',
        '--color-icon-primary':   'var(--vscode-editor-foreground, #fafafa)',
        '--color-icon-secondary': 'var(--vscode-descriptionForeground, #a3a3a3)',
        '--color-icon-disabled':  'var(--vscode-disabledForeground, #525252)',
        '--color-border':            'var(--vscode-sideBar-border, rgba(128,128,128,0.15))',
        '--color-border-emphasized': 'var(--vscode-panel-border, rgba(128,128,128,0.25))',
        '--color-overlay-hover':   'var(--vscode-list-hoverBackground, rgba(128,128,128,0.1))',
        '--color-overlay-pressed': 'var(--vscode-list-activeSelectionBackground, rgba(128,128,128,0.2))',
        '--color-neutral':  'var(--vscode-list-hoverBackground, rgba(128,128,128,0.08))',
        '--color-success': 'var(--vscode-testing-iconPassed, #73c991)',
        '--color-error':   'var(--vscode-errorForeground, #f48771)',
        '--color-warning': 'var(--vscode-editorWarning-foreground, #cca700)',
        '--color-syntax-keyword':   'var(--vscode-symbolKeyword-foreground, var(--vscode-editor-foreground))',
        '--color-syntax-string':    'var(--vscode-symbolString-foreground, var(--vscode-editor-foreground))',
        '--color-syntax-comment':   'var(--vscode-editorComment-foreground, var(--vscode-descriptionForeground))',
        '--color-syntax-number':    'var(--vscode-symbolNumeric-foreground, var(--vscode-editor-foreground))',
        '--color-syntax-function':  'var(--vscode-symbolFunction-foreground, var(--vscode-editor-foreground))',
        '--color-syntax-type':      'var(--vscode-symbolClass-foreground, var(--vscode-editor-foreground))',
        '--color-syntax-variable':  'var(--vscode-editor-foreground, #fafafa)',
        '--color-syntax-punctuation': 'var(--vscode-descriptionForeground, #a3a3a3)',
        '--color-syntax-background':  'var(--vscode-editor-background, #0a0a0a)',
        '--color-text-blue':   'var(--vscode-textLink-foreground, #3794ff)',
        '--color-text-green':  'var(--vscode-testing-iconPassed, #73c991)',
        '--color-text-red':    'var(--vscode-errorForeground, #f48771)',
        '--color-text-yellow': 'var(--vscode-editorWarning-foreground, #cca700)',
        '--color-text-purple': 'var(--vscode-symbolClass-foreground, #c586c0)',
        '--color-text-teal':   'var(--vscode-symbolProperty-foreground, #4ec9b0)',
        '--color-text-cyan':   'var(--vscode-symbolFunction-foreground, #4ec9b0)',
        '--color-text-gray':   'var(--vscode-descriptionForeground, #a3a3a3)',
        '--color-skeleton': 'var(--vscode-editorIndentGuide-background, rgba(128,128,128,0.15))',
        '--color-shadow':   'var(--vscode-widget-shadow, rgba(0,0,0,0.3))',
      },
    });

    const {
      Theme, Button, Badge, Card, Text, Heading, VStack, HStack,
      Divider, Switch, Banner, Avatar, StatusDot, Spinner,
      ProgressBar, TextInput,
    } = Astryx;

    function ComponentShowcase({ initialMode }) {
      const [switchVal, setSwitchVal] = useState(true);
      const [inputVal, setInputVal] = useState('');
      const [mode, setMode] = useState(initialMode);

      useEffect(() => {
        const handler = (event) => {
          const msg = event.data;
          if (msg.type === 'themeChanged') setMode(msg.mode);
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
      }, []);

      return h(Theme, { theme: vscodeTheme, mode },
        h('div', { style: { padding: '32px', maxWidth: '800px', margin: '0 auto' } },
          h(VStack, { gap: 8 },
            h(VStack, { gap: 2 },
              h(Heading, { level: 1 }, 'Astryx Component Preview'),
              h(Text, { type: 'supporting' }, 'vscodeTheme — defineTheme() with var(--vscode-*) token values')
            ),
            h(Divider),

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

            h(VStack, { gap: 4 },
              h(Heading, { level: 2 }, 'Loading States'),
              h(HStack, { gap: 4, vAlign: 'center' },
                h(Spinner, { size: 'sm' }),
                h(Spinner, { size: 'md' }),
                h(Spinner, { size: 'lg' }),
                h(Text, { type: 'supporting' }, 'Loading spinners')
              )
            ),

            h(Divider),
            h(Text, { type: 'supporting' }, 'Theme source: src/vscodeTheme.ts — built via astryx theme build')
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
