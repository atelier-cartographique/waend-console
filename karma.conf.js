
const webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: ['test/index.ts'],
        preprocessors: {
            'test/**/*.ts': ['webpack']
        },
        reporters: ['progress'],
        browsers: ['PhantomJS'],

        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        }
    });
};