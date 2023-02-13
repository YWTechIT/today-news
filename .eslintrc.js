const createConfig = require('@titicaca/eslint-config-triple/create-config')

const { extends: extendConfig, overrides } = createConfig({
  type: 'node',
  project: './tsconfig.json',
  enableTypeCheck: true,
})

const ALLOWED_NAMES = []

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [...extendConfig],
  overrides: [
    ...overrides,
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'typeProperty',
            format: ['strictCamelCase', 'StrictPascalCase'],
            filter: createFilter({ allowedNames: ALLOWED_NAMES }),
          },
        ],
      },
    },
  ],
}

function createFilter({ allowedNames: customAllowedNames }) {
  const predefined = ['__html', 'Provider', 'Consumer', 'Component']
  const allowedNames = [...predefined, ...customAllowedNames]

  const regex = `^(${allowedNames.join('|')})$`

  return {
    regex,
    match: false,
  }
}
