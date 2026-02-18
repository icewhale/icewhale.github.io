import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"JetBrains Mono"',
          '"LXGW Neo ZhiSong"',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          '"Lilex"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      colors: {
        muted: 'var(--muted)',
        border: 'var(--border)',
        card: 'var(--card)',
        foreground: 'var(--foreground)',
        background: 'var(--background)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--foreground)',
            fontFamily: '"JetBrains Mono", "LXGW Neo ZhiSong", system-ui, sans-serif',
            a: {
              color: 'var(--foreground)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationColor: 'var(--border)',
              '&:hover': {
                textDecorationColor: 'var(--foreground)',
              },
            },
            strong: {
              color: 'var(--foreground)',
            },
            h1: { color: 'var(--foreground)' },
            h2: { color: 'var(--foreground)' },
            h3: { color: 'var(--foreground)' },
            h4: { color: 'var(--foreground)' },
            code: {
              color: 'var(--foreground)',
              fontFamily: '"Lilex", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            },
            blockquote: {
              color: 'var(--muted)',
              borderLeftColor: 'var(--border)',
            },
            hr: {
              borderColor: 'var(--border)',
            },
            'ol > li::marker': {
              color: 'var(--muted)',
            },
            'ul > li::marker': {
              color: 'var(--muted)',
            },
            thead: {
              borderBottomColor: 'var(--border)',
            },
            'tbody tr': {
              borderBottomColor: 'var(--border)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
