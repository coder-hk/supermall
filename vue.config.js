module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'store': '@/store'
            }
        }
    },
    devServer: {
        port: 8223 //设置端口
    },
    lintOnSave: false //取消eslint验证
};