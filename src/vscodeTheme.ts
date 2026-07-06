// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * VS Code Theme
 *
 * An Astryx theme that derives from the active VS Code color theme at runtime.
 * Token values are var(--vscode-*) CSS variable references — CSS resolves them
 * synchronously against the --vscode-* custom properties that VS Code injects
 * onto every webview's <body>.
 *
 * When the VS Code theme changes, the --vscode-* variables update and all
 * components re-paint via CSS cascade. No getComputedStyle, no defineTheme()
 * at runtime — this is a proper Astryx theme package, built ahead of time.
 *
 * Usage in a VS Code webview:
 *   <link rel="stylesheet" href="@astryxdesign/core/reset.css">
 *   <link rel="stylesheet" href="@astryxdesign/core/astryx.css">
 *   <link rel="stylesheet" href="@astryxdesign/theme-vscode/theme.css">
 *
 *   import { vscodeTheme } from '@astryxdesign/theme-vscode/built';
 *   <Theme theme={vscodeTheme} mode="dark">
 *
 * The theme extends neutralTheme for icon registry, typography, motion, radius,
 * shadows, and component-level overrides. Only color tokens are remapped to
 * VS Code variables.
 */

import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';

export const vscodeTheme = defineTheme({
  name: 'vscode',
  extends: neutralTheme,

  tokens: {
    // =========================================================================
    // Backgrounds — mapped to VS Code's surface hierarchy
    // =========================================================================
    '--color-background-surface': 'var(--vscode-editor-background, #0a0a0a)',
    '--color-background-body':    'var(--vscode-sideBar-background, #1b1b1b)',
    '--color-background-card':    'var(--vscode-sideBar-background, #1b1b1b)',
    '--color-background-popover': 'var(--vscode-sideBar-background, #1b1b1b)',
    '--color-background-muted':   'var(--vscode-sideBarSectionHeader-background, #1b1b1b)',

    // =========================================================================
    // Accent — maps to VS Code's button color
    // =========================================================================
    '--color-accent':       'var(--vscode-button-background, #0e639c)',
    '--color-accent-muted':  'var(--vscode-button-hoverBackground, #1177bb)',
    '--color-on-accent':     'var(--vscode-button-foreground, #ffffff)',

    // =========================================================================
    // Text
    // =========================================================================
    '--color-text-primary':   'var(--vscode-editor-foreground, #fafafa)',
    '--color-text-secondary': 'var(--vscode-descriptionForeground, #a3a3a3)',
    '--color-text-accent':    'var(--vscode-textLink-foreground, #3794ff)',
    '--color-text-disabled':  'var(--vscode-disabledForeground, #525252)',
    '--color-on-dark':    'var(--vscode-button-foreground, #ffffff)',
    '--color-on-light':   'var(--vscode-button-background, #0e639c)',

    // =========================================================================
    // Icon colors
    // =========================================================================
    '--color-icon-accent':    'var(--vscode-textLink-foreground, #3794ff)',
    '--color-icon-primary':   'var(--vscode-editor-foreground, #fafafa)',
    '--color-icon-secondary': 'var(--vscode-descriptionForeground, #a3a3a3)',
    '--color-icon-disabled':  'var(--vscode-disabledForeground, #525252)',

    // =========================================================================
    // Borders
    // =========================================================================
    '--color-border':            'var(--vscode-sideBar-border, rgba(128,128,128,0.15))',
    '--color-border-emphasized': 'var(--vscode-panel-border, rgba(128,128,128,0.25))',

    // =========================================================================
    // Overlay (hover/selection states)
    // =========================================================================
    '--color-overlay-hover':   'var(--vscode-list-hoverBackground, rgba(128,128,128,0.1))',
    '--color-overlay-pressed': 'var(--vscode-list-activeSelectionBackground, rgba(128,128,128,0.2))',
    '--color-neutral':  'var(--vscode-list-hoverBackground, rgba(128,128,128,0.08))',

    // =========================================================================
    // Semantic status — mapped to VS Code's testing/error/warning colors
    // =========================================================================
    '--color-success': 'var(--vscode-testing-iconPassed, #73c991)',
    '--color-error':   'var(--vscode-errorForeground, #f48771)',
    '--color-warning': 'var(--vscode-editorWarning-foreground, #cca700)',
    '--color-on-success': '#ffffff',
    '--color-on-error':   '#ffffff',
    '--color-on-warning': '#ffffff',

    // Muted variants — use the same values; Astryx uses these for banner bgs
    '--color-success-muted': 'var(--vscode-testing-iconPassed, #73c991)',
    '--color-error-muted':   'var(--vscode-errorForeground, #f48771)',
    '--color-warning-muted': 'var(--vscode-editorWarning-foreground, #cca700)',

    // =========================================================================
    // Syntax highlighting — mapped to VS Code's semantic token colors
    // =========================================================================
    '--color-syntax-keyword':   'var(--vscode-symbolKeyword-foreground, var(--vscode-editor-foreground))',
    '--color-syntax-string':    'var(--vscode-symbolString-foreground, var(--vscode-editor-foreground))',
    '--color-syntax-comment':   'var(--vscode-editorComment-foreground, var(--vscode-descriptionForeground))',
    '--color-syntax-number':    'var(--vscode-symbolNumeric-foreground, var(--vscode-editor-foreground))',
    '--color-syntax-function':  'var(--vscode-symbolFunction-foreground, var(--vscode-editor-foreground))',
    '--color-syntax-type':      'var(--vscode-symbolClass-foreground, var(--vscode-symbolKeyword-foreground, var(--vscode-editor-foreground)))',
    '--color-syntax-variable':  'var(--vscode-editor-foreground, #fafafa)',
    '--color-syntax-operator':  'var(--vscode-editor-foreground, #fafafa)',
    '--color-syntax-constant':  'var(--vscode-symbolConstant-foreground, var(--vscode-editor-foreground))',
    '--color-syntax-tag':       'var(--vscode-symbolTag-foreground, var(--vscode-editor-foreground))',
    '--color-syntax-attribute': 'var(--vscode-symbolAttribute-foreground, var(--vscode-editor-foreground))',
    '--color-syntax-property':  'var(--vscode-symbolProperty-foreground, var(--vscode-editor-foreground))',
    '--color-syntax-punctuation': 'var(--vscode-descriptionForeground, #a3a3a3)',
    '--color-syntax-background':  'var(--vscode-editor-background, #0a0a0a)',

    // =========================================================================
    // Categorical colors — derived from VS Code's semantic colors
    // These map to the closest VS Code equivalent for each hue.
    // Background variants use color-mix to create tinted surfaces.
    // =========================================================================

    // Blue — text link foreground
    '--color-text-blue':   'var(--vscode-textLink-foreground, #3794ff)',
    '--color-icon-blue':   'var(--vscode-textLink-foreground, #3794ff)',
    '--color-border-blue': 'var(--vscode-textLink-foreground, #3794ff)',
    '--color-background-blue': 'color-mix(in srgb, var(--vscode-textLink-foreground, #3794ff) 15%, var(--vscode-editor-background, #0a0a0a))',

    // Green — testing passed
    '--color-text-green':  'var(--vscode-testing-iconPassed, #73c991)',
    '--color-icon-green':  'var(--vscode-testing-iconPassed, #73c991)',
    '--color-border-green': 'var(--vscode-testing-iconPassed, #73c991)',
    '--color-background-green': 'color-mix(in srgb, var(--vscode-testing-iconPassed, #73c991) 15%, var(--vscode-editor-background, #0a0a0a))',

    // Red — error foreground
    '--color-text-red':    'var(--vscode-errorForeground, #f48771)',
    '--color-icon-red':    'var(--vscode-errorForeground, #f48771)',
    '--color-border-red':  'var(--vscode-errorForeground, #f48771)',
    '--color-background-red': 'color-mix(in srgb, var(--vscode-errorForeground, #f48771) 15%, var(--vscode-editor-background, #0a0a0a))',

    // Yellow — editor warning
    '--color-text-yellow': 'var(--vscode-editorWarning-foreground, #cca700)',
    '--color-icon-yellow': 'var(--vscode-editorWarning-foreground, #cca700)',
    '--color-border-yellow': 'var(--vscode-editorWarning-foreground, #cca700)',
    '--color-background-yellow': 'color-mix(in srgb, var(--vscode-editorWarning-foreground, #cca700) 15%, var(--vscode-editor-background, #0a0a0a))',

    // Orange — maps to warning (VS Code doesn't have a separate orange)
    '--color-text-orange': 'var(--vscode-editorWarning-foreground, #cca700)',
    '--color-icon-orange': 'var(--vscode-editorWarning-foreground, #cca700)',
    '--color-border-orange': 'var(--vscode-editorWarning-foreground, #cca700)',
    '--color-background-orange': 'color-mix(in srgb, var(--vscode-editorWarning-foreground, #cca700) 15%, var(--vscode-editor-background, #0a0a0a))',

    // Purple — symbol class
    '--color-text-purple': 'var(--vscode-symbolClass-foreground, #c586c0)',
    '--color-icon-purple': 'var(--vscode-symbolClass-foreground, #c586c0)',
    '--color-border-purple': 'var(--vscode-symbolClass-foreground, #c586c0)',
    '--color-background-purple': 'color-mix(in srgb, var(--vscode-symbolClass-foreground, #c586c0) 15%, var(--vscode-editor-background, #0a0a0a))',

    // Pink — symbol tag
    '--color-text-pink': 'var(--vscode-symbolTag-foreground, #f48771)',
    '--color-icon-pink': 'var(--vscode-symbolTag-foreground, #f48771)',
    '--color-border-pink': 'var(--vscode-symbolTag-foreground, #f48771)',
    '--color-background-pink': 'color-mix(in srgb, var(--vscode-symbolTag-foreground, #f48771) 15%, var(--vscode-editor-background, #0a0a0a))',

    // Teal — symbol property
    '--color-text-teal': 'var(--vscode-symbolProperty-foreground, #4ec9b0)',
    '--color-icon-teal': 'var(--vscode-symbolProperty-foreground, #4ec9b0)',
    '--color-border-teal': 'var(--vscode-symbolProperty-foreground, #4ec9b0)',
    '--color-background-teal': 'color-mix(in srgb, var(--vscode-symbolProperty-foreground, #4ec9b0) 15%, var(--vscode-editor-background, #0a0a0a))',

    // Cyan — symbol function
    '--color-text-cyan': 'var(--vscode-symbolFunction-foreground, #4ec9b0)',
    '--color-icon-cyan': 'var(--vscode-symbolFunction-foreground, #4ec9b0)',
    '--color-border-cyan': 'var(--vscode-symbolFunction-foreground, #4ec9b0)',
    '--color-background-cyan': 'color-mix(in srgb, var(--vscode-symbolFunction-foreground, #4ec9b0) 15%, var(--vscode-editor-background, #0a0a0a))',

    // Gray — description foreground
    '--color-text-gray': 'var(--vscode-descriptionForeground, #a3a3a3)',
    '--color-icon-gray': 'var(--vscode-descriptionForeground, #a3a3a3)',
    '--color-border-gray': 'var(--vscode-sideBar-border, rgba(128,128,128,0.15))',
    '--color-background-gray': 'var(--vscode-sideBarSectionHeader-background, #1b1b1b)',

    // =========================================================================
    // Misc
    // =========================================================================
    '--color-skeleton': 'var(--vscode-editorIndentGuide-background, rgba(128,128,128,0.15))',
    '--color-shadow':   'var(--vscode-widget-shadow, rgba(0,0,0,0.3))',
    '--color-tint-hover': 'var(--vscode-list-hoverBackground, rgba(128,128,128,0.1))',
  },
});
