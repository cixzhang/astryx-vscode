import * as vscode from 'vscode';

// Theme CSS and JS URLs from unpkg CDN
const THEME_INFO: Record<string, { css: string; js: string; font: string }> = {
  neutral: { css: 'https://unpkg.com/@astryxdesign/theme-neutral@0.1.2/theme.css', js: 'https://unpkg.com/@astryxdesign/theme-neutral@0.1.2/built/index.js', font: 'Inter' },
  stone: { css: 'https://unpkg.com/@astryxdesign/theme-stone@0.1.2/theme.css', js: 'https://unpkg.com/@astryxdesign/theme-stone@0.1.2/built/index.js', font: 'Inter' },
  matcha: { css: 'https://unpkg.com/@astryxdesign/theme-matcha@0.1.2/theme.css', js: 'https://unpkg.com/@astryxdesign/theme-matcha@0.1.2/built/index.js', font: 'Inter' },
  y2k: { css: 'https://unpkg.com/@astryxdesign/theme-y2k@0.1.2/theme.css', js: 'https://unpkg.com/@astryxdesign/theme-y2k@0.1.2/built/index.js', font: 'Inter' },
  chocolate: { css: 'https://unpkg.com/@astryxdesign/theme-chocolate@0.1.2/theme.css', js: 'https://unpkg.com/@astryxdesign/theme-chocolate@0.1.2/built/index.js', font: 'Inter' },
  butter: { css: 'https://unpkg.com/@astryxdesign/theme-butter@0.1.2/theme.css', js: 'https://unpkg.com/@astryxdesign/theme-butter@0.1.2/built/index.js', font: 'Inter' },
  gothic: { css: 'https://unpkg.com/@astryxdesign/theme-gothic@0.1.2/theme.css', js: 'https://unpkg.com/@astryxdesign/theme-gothic@0.1.2/built/index.js', font: 'Inter' },
};

export function getWebviewContent(themeName: string, colorMode: string): string {
  const info = THEME_INFO[themeName] || THEME_INFO['neutral'];
  const mode = colorMode === 'light' ? 'light' : 'dark';

  return `<!DOCTYPE html>
<html lang="en" data-astryx-theme="${themeName}" data-astryx-mode="${mode}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Astryx Component Preview</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="https://unpkg.com/@astryxdesign/core@0.1.2/reset.css">
  <link rel="stylesheet" href="https://unpkg.com/@astryxdesign/core@0.1.2/astryx.css">
  <link rel="stylesheet" href="${info.css}">

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
    html, body {
      margin: 0;
      padding: 0;
      background: var(--color-background-body, #1b1b1b);
      color: var(--color-text-primary, #fafafa);
      font-family: var(--font-family-body, 'Inter', sans-serif);
      min-height: 100vh;
    }

    [data-astryx-mode="light"] {
      color-scheme: light;
    }
    [data-astryx-mode="dark"] {
      color-scheme: dark;
    }

    /* Override light-dark() CSS — force the mode the user selected */
    [data-astryx-mode="light"] {
      --color-syntax-keyword: #700084;
      --color-syntax-string: #005600;
      --color-syntax-comment: #737373;
      --color-syntax-number: #6e3500;
      --color-syntax-function: #00458c;
      --color-syntax-type: #700084;
      --color-syntax-variable: #171717;
      --color-syntax-operator: #737373;
      --color-syntax-constant: #6e3500;
      --color-syntax-tag: #89001a;
      --color-syntax-attribute: #584400;
      --color-syntax-property: #005348;
      --color-syntax-punctuation: #a3a3a3;
      --color-syntax-background: #fafafa;
      --color-background-surface: #ffffff;
      --color-background-body: #f1f1f1;
      --color-background-card: #ffffff;
      --color-background-popover: #ffffff;
      --color-background-muted: #f1f1f1;
      --color-accent: #262626;
      --color-accent-muted: #f1f1f1;
      --color-text-primary: #171717;
      --color-text-secondary: #737373;
      --color-text-disabled: #a3a3a3;
      --color-text-accent: #262626;
      --color-border: #ebebeb;
      --color-border-emphasized: #d4d4d4;
      --color-success: #007004;
      --color-error: #a50c25;
      --color-warning: #745b00;
    }
    [data-astryx-mode="dark"] {
      --color-syntax-keyword: #efa8ff;
      --color-syntax-string: #a6d2a2;
      --color-syntax-comment: #a3a3a3;
      --color-syntax-number: #ffb37f;
      --color-syntax-function: #a0caff;
      --color-syntax-type: #efa8ff;
      --color-syntax-variable: #e5e5e5;
      --color-syntax-operator: #a3a3a3;
      --color-syntax-constant: #ffb37f;
      --color-syntax-tag: #ffaeaa;
      --color-syntax-attribute: #eec12f;
      --color-syntax-property: #83dac9;
      --color-syntax-punctuation: #525252;
      --color-syntax-background: #0a0a0a;
      --color-background-surface: #262626;
      --color-background-body: #1b1b1b;
      --color-background-card: #1b1b1b;
      --color-background-popover: #1b1b1b;
      --color-background-muted: #1b1b1b;
      --color-accent: #ebebeb;
      --color-accent-muted: #262626;
      --color-text-primary: #fafafa;
      --color-text-secondary: #a3a3a3;
      --color-text-disabled: #525252;
      --color-text-accent: #ebebeb;
      --color-border: #FFFFFF1A;
      --color-border-emphasized: #525252;
      --color-success: #9fe59b;
      --color-error: #ffc6c1;
      --color-warning: #fdcf4f;
    }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="module">
    import React, { useState } from 'react';
    import { createRoot } from 'react-dom/client';
    import htm from 'htm';
    import * as Astryx from '@astryxdesign/core';

    const html = htm.bind(React.createElement);
    const { Theme, Button, Badge, Card, Text, Heading, VStack, HStack, Section, Divider, Switch, Banner, Avatar, StatusDot, Spinner, ProgressBar, TextInput } = Astryx;

    // Load theme JS
    const themeJsUrl = '${info.js}';
    const themeModule = await import(/* @vite-ignore */ themeJsUrl);
    const themeKey = '${themeName}' + 'Theme';
    const theme = themeModule[themeKey];

    function ComponentShowcase() {
      const [switchVal, setSwitchVal] = React.useState(true);
      const [inputVal, setInputVal] = React.useState('');

      return html\`
        <\${Theme} theme=\${theme} mode="${mode}">
          <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
            <\${VStack} gap={8}>
              <\${VStack} gap={2}>
                <\${Heading} level={1}>Astryx Component Preview</\${Heading}>
                <\${Text} type="supporting">Theme: ${themeName} · Mode: ${mode}</\${Text}>
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
                <\${HStack} gap={2} vAlign="center">
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
                    </\${VStack}
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
                      <\${Text} type="body">Works on developer tooling and CLI.</\${Text}
                      >
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
              </\${VStack}

              >
              <\${Divider} />
              <\${Text} type="supporting}>Powered by @astryxdesign/core@0.1.2 from unpkg CDN</\${Text}>
            </\${VStack}>
          </div>
        </\${Theme}>
      \`;
    }

    const root = createRoot(document.getElementById('root'));
    root.render(React.createElement(ComponentShowcase));
  </script>
</body>
</html>`;
}
