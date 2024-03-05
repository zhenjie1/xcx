const uni = require('@uni-helper/eslint-config')
const unocss = require('@unocss/eslint-plugin')

module.exports = uni(
  {
    overrides: {
      uni: {
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      },
    },
    rules: {
      'antfu/top-level-function': 'off',
      'antfu/if-newline': 'off',
      'curly': 'off',
    },
  },
  unocss.configs.flat,
)
