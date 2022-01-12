module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "ignorePatterns": ["*.js"],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.base.json"
    },
    "plugins": ["@typescript-eslint", "opencircuits"],
    "rules": {
        "quotes": ["warn", "double"],
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/ban-types": "error",
        "camelcase": "off",
        //"@typescript-eslint/camelcase": "error",

        //"@typescript-eslint/class-name-casing": "error",
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "no-console": "off",
        "@typescript-eslint/explicit-member-accessibility": "error",
        "indent": "off",
        "@typescript-eslint/indent": ["error", 4, {
            "ImportDeclaration": "first",
            "ArrayExpression": "first",
            "MemberExpression": 2,
            "FunctionDeclaration": { "parameters": "first" },
            "FunctionExpression": { "parameters": "first" },
            "CallExpression": { "arguments": "first" },
            "ignoredNodes": ["ConditionalExpression"]
        }],
        // "@typescript-eslint/interface-name-prefix": "error",
        // "@typescript-eslint/naming-convention": [
        //     "error",
        //     {
        //       "selector": "interface",
        //       "format": ["PascalCase"],
        //       "custom": {
        //         "regex": "^I[A-Z]",
        //         "match": true
        //       }
        //     }
        //   ],
        "@typescript-eslint/member-delimiter-style": ["error", {
            "multiline": {
                "delimiter": "semi",
                "requireLast": true
            },
            "singleline": {
                "delimiter": "comma",
                "requireLast": false
            }
        }],
        "comma-dangle": "off",
        "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
        "@typescript-eslint/no-angle-bracket-type-assertion": "off",
        "no-array-constructor": "off",
        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        //"@typescript-eslint/no-object-literal-type-assertion": "error",
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/no-parameter-properties": "error",
        //"@typescript-eslint/no-triple-slash-reference": "error",
        "@typescript-eslint/triple-slash-reference": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn", {
            "argsIgnorePattern": "_",
            "args": "after-used",
            "ignoreRestSiblings": false
        }],
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["off"],
        "@typescript-eslint/no-var-requires": "error",
        //"@typescript-eslint/prefer-interface": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/type-annotation-spacing": ["error", {
            "before": false,
            "after": true,
            "overrides": {
                "arrow": {
                    "before": true,
                    "after": true
                }
            }
        }],
        "object-curly-spacing": ["off"],
        "opencircuits/object-curly-spacing": ["error", "always"]
    }
}
