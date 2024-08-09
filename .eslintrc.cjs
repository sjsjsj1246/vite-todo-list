module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  ignorePatterns: ["/*", "!/src"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "import/order": [
      "error",
      {
        groups: ["type", "builtin", "external", "internal", "parent", "sibling", "index", "unknown"],
        pathGroups: [
          {
            pattern: "react*",
            group: "external",
            position: "before",
          },
          {
            pattern: "@libs/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@components/*",
            group: "internal",
            position: "after",
          },
        ],

        pathGroupsExcludedImportTypes: ["@tanstack*"],
        alphabetize: {
          order: "asc",
        },
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: true,
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
