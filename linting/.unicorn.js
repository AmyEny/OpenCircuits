module.exports = {
    "plugins": [
        "unicorn",
    ],
    "extends": [
        "plugin:unicorn/recommended",
    ],
    "rules": {
        "unicorn/catch-error-name": ["error", {"name": "e"}],
        "unicorn/consistent-destructuring": "off",
        "unicorn/consistent-function-scoping": "off",
        "unicorn/custom-error-definition": "error",
        "unicorn/expiring-todo-comments": "off",
        "unicorn/filename-case": ["error", {
            "cases": {
                "camelCase": true,
                "pascalCase": true,
            },
            "ignore": [
                // Ignore things with words like IC, ID, etc. (i.e. ICViewer)
                /(.*?)(IC|ID|IO|BCD|LED|JK|SR|AND|BUF|OR|XOR|SR|WASM|ASCII)(.*)/,
            ],
        }],
        "unicorn/no-array-reduce": "off",
        "unicorn/no-array-for-each": "off",
        "unicorn/no-for-loop": "warn",
        "unicorn/no-nested-ternary": "off",
        "unicorn/no-new-array": "off",
        "unicorn/no-object-as-default-parameter": "off",
        "unicorn/no-unsafe-regex": "error",
        "unicorn/no-unused-properties": "error",
        "unicorn/no-useless-undefined": ["error", {
            "checkArguments": false,
        }],
        "unicorn/prefer-at": "error",
        "unicorn/prefer-math-trunc": "off",
        "unicorn/prefer-number-properties": "off",
        "unicorn/prefer-query-selector": "off",
        "unicorn/prefer-string-replace-all": "error",
        "unicorn/prefer-ternary": ["error", "only-single-line"],
        "unicorn/prevent-abbreviations": "off",
        "unicorn/no-array-callback-reference": "off",
    },
}