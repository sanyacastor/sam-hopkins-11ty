import globals from "globals";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
        globals: {
            ...globals.browser
        }
    }
  },
  {
    ignores: [
      ".eleventy.js",
      "src/_data/*.js",
      "public/*.js",
      "public/**/*.js",
      "src/admin/**/*.js",
    ],
  },
];
