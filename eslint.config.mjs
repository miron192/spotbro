import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // ignoră toate directoarele și fișierele specificate
  {
    ignores: [
      ".next",
      "node_modules",
      "dist",
      "build",
      "prisma/generated",
      "**/*.d.ts",
      "lib/generated/",
      "prisma/migrations",
      "lib/generated/prisma/wasm.js",
      "lib/generated/prisma/**",
      "lib/generated/prisma/runtime/**",
    ],
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["src/**/*.{ts,tsx,js,jsx}"], // codul tău
    rules: {
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-explicit-any": "off",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];
