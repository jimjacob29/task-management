import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        plugins: { react: pluginReact, prettier: eslintPluginPrettier },
        rules: {
            // custom rule overrides (optional)
            ...js.configs.recommended.rules,
            ...pluginReact.configs.recommended.rules,
            "react/prop-types": "off",
            "prettier/prettier": "warn",
            "react/react-in-jsx-scope": "off",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        ignores: ["dist", "build", "node_modules"],
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        languageOptions: {
            globals: globals.browser,
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
]);
