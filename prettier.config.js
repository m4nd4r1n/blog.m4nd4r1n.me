module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  semi: false,
  arrowParens: 'avoid',
  printWidth: 100,
  importOrder: [
    '^(react/(.*)$)|^(react$)|^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '^(@/(.*)$)',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss']
}
