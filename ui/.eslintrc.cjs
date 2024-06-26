module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  globals: {
    beforeAll: true,
    afterAll: true,
    assertAsyncError: true,
    expect: true,
    describe: true,
    it: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      'typescript': {}
    },
    react: {
      version: 'detect'
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'typescript'
  ],
  rules: {
    'no-console': ['error', {allow: ['warn', 'error']}],
    'no-undef': 'error',
    'semi-spacing': 'error',
    eqeqeq: 'error',
    'no-invalid-this': 'error',
    'no-return-assign': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'no-unused-vars': ['error', {argsIgnorePattern: 'req|res|next|^_', varsIgnorePattern: '^_'}],
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-constant-condition': 'warn',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', {}],
    semi: ['error', 'always'],
    'no-mixed-spaces-and-tabs': 'error',
    'space-before-blocks': 'error',
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'max-len': ['error', {code: 200}],
    'max-lines': ['error', {max: 300, skipBlankLines: true, skipComments: true}],
    'keyword-spacing': 'error',
    'no-mixed-operators': 'error',
    'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 1}],
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': 'error',
    'object-property-newline': ['error', {allowAllPropertiesOnSameLine: true}],
    'arrow-spacing': 'error',
    'arrow-parens': 'error',
    'no-confusing-arrow': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'no-var': 'error',
    'object-shorthand': 'off',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'react/jsx-filename-extension': ['warn', {'extensions': ['.tsx']}],
    '@typescript-eslint/no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-max-props-per-line': ['error', {maximum: 1, when: 'multiline'}],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'semi',
        requireLast: true
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false
      }
    }],
  },
}
