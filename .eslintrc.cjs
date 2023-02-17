module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    'prettier',
    'plugin:storybook/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  plugins: ['react', '@typescript-eslint', 'import', 'jsx-a11y', 'react-hooks', 'prettier'],
  settings: {
    react: {
      // Nói eslint-plugin-react tự động biết version của React.
      version: 'detect'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    // Tắt rule yêu cầu import React trong file jsx
    'react/react-in-jsx-scope': 'off',
    // Cảnh báo khi thẻ <a target="_blank"> mà không có rel="noreferrer"
    'react/jsx-no-target-blank': 'warn',
    // Cảnh báo khi sử dụng chưa đúng các hooks trong react
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false
      }
    ],
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        bracketSameLine: false,
        bracketSpacing: true,
        embeddedLanguageFormatting: 'auto',
        endOfLine: 'auto',
        htmlWhitespaceSensitivity: 'css',
        insertPragma: false,
        jsxSingleQuote: true,
        printWidth: 120,
        proseWrap: 'preserve',
        quoteProps: 'as-needed',
        requirePragma: false,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none',
        useTabs: false,
        vueIndentScriptAndStyle: false
      }
    ]
  }
};
