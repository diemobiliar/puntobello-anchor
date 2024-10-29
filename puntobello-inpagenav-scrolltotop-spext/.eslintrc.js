require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
    extends: ['@microsoft/eslint-config-spfx/lib/profiles/react'],
    parserOptions: { tsconfigRootDir: __dirname },
    rules: {
        '@typescript-eslint/no-var-requires': 0,
        "@typescript-eslint/no-explicit-any": ["off"]
    }
};