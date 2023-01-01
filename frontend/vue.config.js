module.exports = {
    outputDir: '../backend/wwwroot',

    css: {
        loaderOptions: {
            sass: {
                sassOptions: {
                    additionalData: `@import 'src/style/global.scss';`,
                },
            },
        },
    },
}
