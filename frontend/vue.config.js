module.exports = {
    outputDir: '../backend/wwwroot',

    css: {
        loaderOptions: {
            sass: {
                prependData: `@import 'src/style/global.scss';`,
            },
        },
    },
}
