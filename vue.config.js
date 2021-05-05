module.exports = {
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
            nodeIntegration: true
        }
    },
    transpileDependencies: ['quasar']
}
