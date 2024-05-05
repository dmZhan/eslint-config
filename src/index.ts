import antfu, { GLOB_SRC, GLOB_VUE } from '@antfu/eslint-config'
import type { ConfigNames, TypedFlatConfigItem } from '@antfu/eslint-config'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'

const dmzjRules: TypedFlatConfigItem[] = [
  {
    files: [GLOB_VUE],
    name: 'dmzj:vue',
    rules: {
      'vue/max-attributes-per-line': ['error', {
        multiline: {
          max: 1,
        },
      }],
    },
  },
  {
    files: [GLOB_SRC, GLOB_VUE],
    name: 'dmzj:src',
    rules: {
      'curly': ['error', 'multi-line'],
      'import/no-mutable-exports': 'off',
      'style/brace-style': ['error', 'stroustrup', { allowSingleLine: false }],
    },
  },
]

export default function (...params: Parameters<typeof antfu>): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  if (params.length === 0) {
    return antfu({}, dmzjRules)
  }

  return antfu(...params, dmzjRules)
}
