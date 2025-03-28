import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@next/next/no-img-element": "off", // Disable warnings for using <img>
      "react-hooks/exhaustive-deps": "off", // Disable missing dependencies in useEffect()
      "@typescript-eslint/no-unused-vars": "off", // Disable unused variable errors
      "@typescript-eslint/no-explicit-any": "off", // Disable 'any' type errors
      "no-var": "off", // Allow using 'var' (not recommended)
      "no-undef": "off", // Allow using 'undefined' (not recommended)
      "no-unused-vars": "off", // Disable unused variable errors
      "exhaustive-deps": "off", // Disable missing dependencies in useEffect()
      "@next/next/no-img-element": "error",
      "react/no-unescaped-entities": ["error", { forbid: [">", "}", '"'] }],
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unescaped-entities": "warn",
    },
  },
];

export default eslintConfig;
