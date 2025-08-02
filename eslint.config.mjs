import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Aplicați extensiile
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Aplicați reguli DOAR pe fișierele tale sursă
  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    rules: {
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
