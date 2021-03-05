const removeConsolePlugin = [];
if (process.env.NODE_ENV === 'production') {
    removeConsolePlugin.push('transform-remove-console');
}
module.exports = {
    presets: [
        ['@babel/preset-env', {loose: true}]
    ],
    plugins: [
        // import
        '@babel/plugin-syntax-dynamic-import',
        // transform
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-modules-commonjs',
        // vue jsx语法
        '@babel/plugin-syntax-jsx',
        'jsx-v-model',
        'transform-vue-jsx',
        'lodash',
        ...removeConsolePlugin
    ]
};

