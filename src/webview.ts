/**
 * Generate webview HTML for the Astryx component preview.
 * The webview reads VS Code's injected CSS variables (--vscode-*)
 * and maps them to Astryx's --color-* tokens so components
 * match whatever theme is currently active in VS Code.
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
  <link rel="stylesheet" href="https://unpkg.com/@astryxdesign/theme-neutral@0.1.2/theme.css">

  <script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@19.2.7",
      "react-dom": "https://esm.sh/react-dom@19.2.7",
      "react-dom/client": "https://esm.sh/react-dom@19.2.7/client",
      "react/jsx-runtime": "https://esm.sh/react@19.2.7/jsx-runtime",
      "@astryxdesign/core": "https://esm.sh/@astryxdesign/core@0.1.2?external=react,react-dom",
      "htm": "https://esm.sh/htm@3.1.1"
    }
  }
  </script>

  <style>
    /* VS Code injects these CSS variables into the webview body.
       We map them to Astryx tokens so components match the active theme. */
    :root {
      --font-family-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-family-heading: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-family-code: 'SF Mono', Menlo, Monaco, monospace;
    }

    body {
      background: var(--vscode-editor-background);
      color: var(--vscode-editor-foreground);
      font-family: var(--font-family-body);
      margin: 0;
      padding: 0;
      min-height: 100vh;
    }

    /* The root wrapper gets data-astryx-theme so Astryx CSS scope rules apply.
       We then override every --color-* token with the VS Code equivalents. */
    #astryx-root {
      --color-text-primary: var(--vscode-editor-foreground);
      --color-text-secondary: var(--vscode-descriptionForeground);
      --color-text-disabled: var(--vscode-disabledForeground);
      --color-text-accent: var(--vscode-textLink-foreground);
      --color-icon-primary: var(--vscode-editor-foreground);
      --color-icon-secondary: var(--vscode-descriptionForeground);
      --color-icon-accent: var(--vscode-textLink-foreground);
      --color-icon-disabled: var(--vscode-disabledForeground);

      --color-background-body: var(--vscode-sideBar-background);
      --color-background-surface: var(--vscode-editor-background);
      --color-background-card: var(--vscode-sideBar-background);
      --color-background-popover: var(--vscode-sideBar-background);
      --color-background-muted: var(--vscode-sideBarSectionHeader-background);

      --color-border: var(--vscode-sideBar-border, var(--vscode-contrastBorder, transparent));
      --color-border-emphasized: var(--vscode-panel-border, var(--vscode-contrastBorder, transparent));
      --color-skeleton: var(--vscode-editorIndentGuide-background);
      --color-shadow: var(--vscode-widget-shadow, rgba(0,0,0,0.2));

      --color-overlay: rgba(0, 0, 0, 0.5);
      --color-overlay-hover: var(--vscode-list-hoverBackground);
      --color-overlay-pressed: var(--vscode-list-activeSelectionBackground);

      --color-neutral: var(--vscode-list-hoverBackground);

      /* Accent — the primary action color */
      --color-accent: var(--vscode-button-background);
      --color-accent-muted: var(--vscode-button-hoverBackground);
      --color-on-accent: var(--vscode-button-foreground);
      --color-on-dark: var(--vscode-button-foreground);
      --color-on-light: var(--vscode-button-background);

      /* Semantic status colors */
      --color-success: var(--vscode-testing-iconPassed, #73c991);
      --color-error: var(--vscode-errorForeground, #f48771);
      --color-warning: var(--vscode-editorWarning-foreground, #cca700);
      --color-on-success: #ffffff;
      --color-on-error: #ffffff;
      --color-on-warning: #ffffff;

      --color-success-muted: var(--color-success);
      --color-error-muted: var(--color-error);
      --color-warning-muted: var(--color-warning);

      /* Syntax highlighting tokens (used by Astryx code/text components) */
      --color-syntax-keyword: var(--vscode-symbolKeyword-foreground, var(--vscode-editor-foreground));
      --color-syntax-string: var(--vscode-symbolString-foreground, var(--vscode-editor-foreground));
      --color-syntax-comment: var(--vscode-editorComment-foreground, var(--color-text-secondary));
      --color-syntax-number: var(--vscode-symbolNumeric-foreground, var(--vscode-editor-foreground));
      --color-syntax-function: var(--vscode-symbolFunction-foreground, var(--vscode-editor-foreground));
      --color-syntax-type: var(--vscode-symbolClass-foreground, var(--vscode-editor-foreground));
      --color-syntax-variable: var(--vscode-editor-foreground);
      --color-syntax-operator: var(--vscode-editor-foreground);
      --color-syntax-constant: var(--vscode-symbolConstant-foreground, var(--vscode-editor-foreground));
      --color-syntax-tag: var(--vscode-symbolTag-foreground, var(--vscode-editor-foreground));
      --color-syntax-attribute: var(--vscode-symbolAttribute-foreground, var(--vscode-editor-foreground));
      --color-syntax-property: var(--vscode-symbolProperty-foreground, var(--vscode-editor-foreground));
      --color-syntax-punctuation: var(--color-text-secondary);
      --color-syntax-background: var(--vscode-editor-background);

      /* Category colors — map to VS Code semantic colors where possible */
      --color-text-red: var(--vscode-errorForeground, #f48771);
      --color-text-green: var(--vscode-testing-iconPassed, #73c991);
      --color-text-blue: var(--vscode-textLink-foreground, #3794ff);
      --color-text-yellow: var(--vscode-editorWarning-foreground, #cca700);
      --color-text-orange: var(--vscode-editorWarning-foreground, #cca700);
      --color-text-purple: var(--vscode-symbolClass-foreground, #c586c0);
      --color-text-pink: var(--vscode-symbolTag-foreground, #f48771);
      --color-text-teal: var(--vscode-symbolProperty-foreground, #4ec9b0);
      --color-text-cyan: var(--vscode-symbolFunction-foreground, #4ec9b0);
      --color-text-gray: var(--color-text-secondary);

      --color-icon-red: var(--color-text-red);
      --color-icon-green: var(--color-text-green);
      --color-icon-blue: var(--color-text-blue);
      --color-icon-yellow: var(--color-text-yellow);
      --color-icon-orange: var(--color-text-orange);
      --color-icon-purple: var(--color-text-purple);
      --color-icon-pink: var(--color-text-pink);
      --color-icon-teal: var(--color-text-teal);
      --color-icon-cyan: var(--color-text-cyan);

      --color-border-red: var(--color-text-red);
      --color-border-green: var(--color-text-green);
      --color-border-blue: var(--color-text-blue);
      --color-border-yellow: var(--color-text-yellow);
      --color-border-orange: var(--color-text-orange);
      --color-border-purple: var(--color-text-purple);
      --color-border-pink: var(--color-text-pink);
      --color-border-teal: var(--color-text-teal);
      --color-border-cyan: var(--color-text-cyan);
      --color-border-gray: var(--color-border);

      --color-background-red: color-mix(in srgb, var(--color-text-red) 15%, var(--color-background-surface));
      --color-background-green: color-mix(in srgb, var(--color-text-green) 15%, var(--color-background-surface));
      --color-background-blue: color-mix(in srgb, var(--color-text-blue) 15%, var(--color-background-surface));
      --color-background-yellow: color-mix(in srgb, var(--color-text-yellow) 15%, var(--color-background-surface));
      --color-background-orange: color-mix(in srgb, var(--color-text-orange) 15%, var(--color-background-surface));
      --color-background-purple: color-mix(in srgb, var(--color-text-purple) 15%, var(--color-background-surface));
      --color-background-pink: color-mix(in srgb, var(--color-text-pink) 15%, var(--color-background-surface));
      --color-background-teal: color-mix(in srgb, var(--color-text-teal) 15%, var(--color-background-surface));
      --color-background-cyan: color-mix(in srgb, var(--color-text-cyan) 15%, var(--color-background-surface));
      --color-background-gray: var(--color-background-muted);

      --color-tint-hover: var(--color-overlay-hover);
    }
  </style>
</head>
<body>
  <div id="astryx-root" data-astryx-theme="neutral"></div>

  <script type="module">
    const initialMode = '${initialMode}';

    import React, { useState } from 'react';
    import { createRoot } from 'react-dom/client';
    import htm from 'htm';
    import * as Astryx from '@astryxdesign/core';

    const html = htm.bind(React.createElement);

    // Import the neutral theme object — we only need it for the Theme provider
    // (it provides icon sets and component defaults). The CSS tokens are overridden
    // by the VS Code variables we injected above.
    const themeModule = await import('https://unpkg.com/@astryxdesign/theme-neutral@0.1.2/built/index.js');
    const neutralTheme = themeModule.neutralTheme;

    const {
      Theme, Button, Badge, Card, Text, Heading, VStack, HStack,
      Section, Divider, Switch, Banner, Avatar, StatusDot, Spinner,
      ProgressBar, TextInput,
    } = Astryx;

    function ComponentShowcase() {
      const [switchVal, setSwitchVal] = React.useState(true);
      const [inputVal, setInputVal] = React.useState('');
      const [mode, setMode] = React.useState(initialMode);

      React.useEffect(() => {
        window.addEventListener('message', (event) => {
          const msg = event.data;
          if (msg.type === 'themeChanged') {
            setMode(msg.mode);
          }
        });
      }, []);

      return html\`
        <\${Theme} theme=\${neutralTheme} mode=\${mode}>
          <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
            <\${VStack} gap={8}>
              <\${VStack} gap={2}>
                <\${Heading} level={1}>Astryx Component Preview</\${Heading}>
                <\${Text} type="supporting">Matching your active VS Code theme</\${Text}>
              </\${VStack}>

              <\${Divider} />

              <\${VStack} gap={4}>
                <\${Heading} level={2}>Buttons</\${Heading}>
                <\${HStack} gap={3} vAlign="center">
                  <\${Button} label="Primary" variant="primary" />
                  <\${Button} label="Secondary" variant="secondary" />
                  <\${Button} label="Ghost" variant="ghost" />
                  <\${Button} label="Small" variant="primary" size="sm" />
                  <\${Button} label="Large" variant="primary" size="lg" />
                </\${HStack}>
              </\${VStack}>

              <\${VStack} gap={4}>
                <\${Heading} level={2}>Badges</\${Heading}>
                <\${HStack} gap={2} vAlign="center" wrap="wrap">
                  <\${Badge} variant="neutral" label="Neutral" />
                  <\${Badge} variant="info" label="Info" />
                  <\${Badge} variant="success" label="Success" />
                  <\${Badge} variant="warning" label="Warning" />
                  <\${Badge} variant="error" label="Error" />
                  <\${Badge} variant="blue" label="Blue" />
                  <\${Badge} variant="purple" label="Purple" />
                  <\${Badge} variant="green" label="Green" />
                </\${HStack}>
              </\${VStack}>

              <\${VStack} gap={4}>
                <\${Heading} level={2}>Cards & Avatars</\${Heading}>
                <\${HStack} gap={4} vAlign="start" wrap="wrap">
                  <\${Card} padding={5}>
                    <\${VStack} gap={3}>
                      <\${HStack} gap={3} vAlign="center">
                        <\${Avatar} name="Cindy" size="medium" />
                        <\${VStack} gap={0}>
                          <\${Text} type="body">Cindy Zhang</\${Text}>
                          <\${Text} type="supporting">Design Engineer</\${Text}>
                        </\${VStack}>
                      </\${HStack}>
                      <\${Text} type="body">Building Astryx — an AI-optimized design system.</\${Text}>
                      <\${HStack} gap={2}>
                        <\${Badge} variant="info" label="React" />
                        <\${Badge} variant="purple" label="StyleX" />
                      </\${HStack}>
                    </\${VStack}>
                  </\${Card}>
                  <\${Card} padding={5}>
                    <\${VStack} gap={3}>
                      <\${HStack} gap={3} vAlign="center">
                        <\${Avatar} name="Benji" size="medium" />
                        <\${VStack} gap={0}>
                          <\${Text} type="body">Benji Lee</\${Text}>
                          <\${Text} type="supporting">Software Engineer</\${Text}>
                        </\${VStack}>
                      </\${HStack}>
                      <\${Text} type="body">Works on developer tooling and CLI.</\${Text}>
                      <\${HStack} gap={2}>
                        <\${Badge} variant="success" label="Node" />
                        <\${Badge} variant="warning" label="CLI" />
                      </\${HStack}>
                    </\${VStack}>
                  </\${Card}>
                </\${HStack}>
              </\${VStack}>

              <\${VStack} gap={4}>
                <\${Heading} level={2}>Interactive</\${Heading}>
                <\${Card} padding={5}>
                  <\${VStack} gap={4}>
                    <\${Switch}
                      label="Enable feature"
                      value=\${switchVal}
                      onChange=\${(v) => setSwitchVal(v)}
                    />
                    <\${TextInput}
                      label="Search"
                      value=\${inputVal}
                      onChange=\${(e) => setInputVal(e.target.value)}
                      placeholder="Type something..."
                    />
                    <\${HStack} gap={3} vAlign="center">
                      <\${StatusDot} variant="success" label="Healthy" />
                      <\${StatusDot} variant="warning" label="Degraded" />
                      <\${StatusDot} variant="error" label="Down" />
                      <\${StatusDot} variant="accent" label="Active" isPulsing />
                    </\${HStack}>
                  </\${VStack}>
                </\${Card}>
              </\${VStack}>

              <\${VStack} gap={4}>
                <\${Heading} level={2}>Banners & Progress</\${Heading}>
                <\${VStack} gap={3}>
                  <\${Banner} status="info" title="Information" description="This is an info banner from Astryx." />
                  <\${Banner} status="success" title="Success" description="Operation completed successfully." />
                  <\${Banner} status="warning" title="Warning" description="Something needs attention." />
                  <\${Banner} status="error" title="Error" description="Something went wrong." />
                  <\${ProgressBar} label="Upload progress" value={72} max={100} />
                </\${VStack}>
              </\${VStack}>

              <\${VStack} gap={4}>
                <\${Heading} level={2}>Typography</\${Heading}>
                <\${VStack} gap={2}>
                  <\${Heading} level={1}>Display 1 Heading</\${Heading}>
                  <\${Heading} level={2}>Display 2 Heading</\${Heading}>
                  <\${Heading} level={3}>Display 3 Heading</\${Heading}>
                  <\${Text} type="large">Large body text</\${Text}>
                  <\${Text} type="body">Regular body text</\${Text}>
                  <\${Text} type="supporting">Supporting text — lower emphasis</\${Text}>
                  <\${Text} type="code">Code text — monospace</\${Text}>
                </\${VStack}>
              </\${VStack}>

              <\${VStack} gap={4}>
                <\${Heading} level={2}>Loading States</\${Heading}>
                <\${HStack} gap={4} vAlign="center">
                  <\${Spinner} size="sm" />
                  <\${Spinner} size="md" />
                  <\${Spinner} size="lg" />
                  <\${Text} type="supporting">Loading spinners</\${Text}>
                </\${HStack}>
              </\${VStack}>

              <\${Divider} />
              <\${Text} type="supporting">Astryx components themed by your active VS Code color theme</\${Text}>
            </\${VStack}>
          </div>
        </\${Theme}>
      \`;
    }

    const root = createRoot(document.getElementById('astryx-root'));
    root.render(React.createElement(ComponentShowcase));
  </script>
</body>
</html>`;
}
