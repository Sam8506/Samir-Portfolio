import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Exclude these paths completely from linting
  {
    ignores: [
      ".next/**/*", // Next.js build output
      "node_modules/**/*", // Dependencies
      "dist/**/*", // Optional: your own build output
      "out/**/*", // Optional: Next export output
      "src/components/ui/**/*", // ShadCN UI components
    ],
  },

  // Extend Next.js + TypeScript recommended rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/ban-ts-ignore": "off",
      "@typescript-eslint/camelcase": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-shadow": ["off"],
      "@typescript-eslint/no-unsafe-argument": ["warn"],
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-use-before-define": ["error"],
      "@typescript-eslint/no-useless-constructor": "error",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/unbound-method": "warn",
      camelcase: ["error", { ignoreImports: true }],
      "default-param-last": "warn",
      "dot-notation": "off",
      "import/extensions": "off",
      "import/first": "error",
      "import/no-cycle": "warn",
      "import/no-duplicates": "error",
      "import/no-extraneous-dependencies": "off",
      "import/no-named-as-default": "off",
      "import/no-unresolved": "error",
      "import/order": ["error"],
      "import/prefer-default-export": "off",
      "jsx-a11y/anchor-is-valid": [
        "warn",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
      "linebreak-style": ["off"],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-promise-executor-return": "warn",
      "no-prototype-builtins": "off",
      "no-restricted-exports": "off",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "lodash",
              message:
                "import [module] from lodash/[module] instead to maintain treeshaking",
            },
            {
              name: "@cni/enums",
              message:
                "Deprecated. import { gqlDesiredEnum } from @minecraft.graphql-types",
            },

            {
              name: "@sentry/react",
              importNames: ["Sentry"],
              message:
                "import {module} from @sentry/react instead to maintain treeshaking",
            },
          ],
        },
      ],
      "no-shadow": "off",
      "no-unsafe-optional-chaining": "warn",
      "no-unused-expressions": ["error", { allowShortCircuit: true }],
      "no-unused-vars": "off",
      "no-useless-constructor": "off",
      "playwright/missing-playwright-await": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react/default-props-match-prop-types": [
        "error",
        { allowRequiredDefaults: true },
      ],
      "react/destructuring-assignment": "off",
      "react/function-component-definition": [
        "off",
        { namedComponents: "arrow-function" },
      ], // waaaay too complex, will start to reduce gradually
      "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
      "react/jsx-handler-names": "warn",
      "react/jsx-no-constructed-context-values": "warn",
      "react/jsx-no-useless-fragment": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-wrap-multilines": "off",
      "react/no-did-mount-set-state": "off",
      "react/no-unstable-nested-components": ["warn", { allowAsProps: true }],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/require-default-props": [
        "warn",
        { forbidDefaultForRequired: false, ignoreFunctionalComponents: true },
      ],
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
      "react/sort-comp": [
        "error",
        {
          order: [
            "static-variables",
            "static-methods",
            "lifecycle",
            "everything-else",
            "render",
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
