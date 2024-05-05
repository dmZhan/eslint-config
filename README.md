# @dmzj/eslint-config

---

> [!IMPORTANT]
> This repository is a layer of encapsulation of @antfu/eslint-config. It is essentially the same as the original repository but includes some configurations that are better suited to my needs.

- Global
  - Always use `error` instead of `warn`
- Vue
  - Enforce the maximum number of attributes per line
- JS/TS
  - Enforce consistent brace style for all control statements

For more eslint configuration rules, see [`@antfu/eslint-config`](hhttps://github.com/antfu/eslint-config/blob/main/README.md).

## Usage

### Install

```bash
pnpm i -D eslint @dmzj/eslint-config
```

### Create config file

With [`"type": "module"`](https://nodejs.org/api/packages.html#type) in `package.json` (recommended):

```js
// eslint.config.js
import dmzj from '@dmzj/eslint-config'

export default dmzj()
```

With CJS:

```js
// eslint.config.js
const dmzj = require('@dmzj/eslint-config').default

module.exports = dmzj()
```

> Note that `.eslintignore` no longer works in Flat config, see [customization](#customization) for more details.

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## VS Code support (auto fix)

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`:

```jsonc
{
  // Enable the ESlint flat config support
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml"
  ]
}
```

## Customization

You only need to import the `dmzj` preset:

```js
// eslint.config.js
import dmzj from '@dmzj/eslint-config'

export default dmzj()
```

And that's it! Or you can configure each integration individually, for example:

```js
// eslint.config.js
import dmzj from '@dmzj/eslint-config'

export default dmzj({
  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  typescript: true,
  vue: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    './fixtures',
    // ...globs
  ]
})
```

The `dmzj` factory function also accepts any number of arbitrary custom config overrides:

```js
// eslint.config.js
import dmzj from '@dmzj/eslint-config'

export default dmzj(
  {
    // Configures for dmzj's config
  },

  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    rules: {},
  },
)
```

Going more advanced, you can also import fine-grained configs and compose them as you wish:

<details>
<summary>Advanced Example</summary>

We don't recommend using this style in general usages, as there are shared options between configs and might need extra care to make them consistent.

```js
// eslint.config.js
import {
  comments,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  node,
  sortPackageJson,
  sortTsconfig,
  stylistic,
  typescript,
  unicorn,
  vue,
  yaml,
} from '@dmzj/eslint-config'

export default [
  ...ignores(),
  ...javascript(/* Options */),
  ...comments(),
  ...node(),
  ...jsdoc(),
  ...imports(),
  ...unicorn(),
  ...typescript(/* Options */),
  ...stylistic(),
  ...vue(),
  ...jsonc(),
  ...yaml(),
  ...markdown(),
]
```

</details>

### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

and then

```bash
npm i -D lint-staged simple-git-hooks
```

## License

[MIT](./LICENSE)
