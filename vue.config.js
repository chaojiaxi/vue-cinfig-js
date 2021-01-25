/*  
 * vue.config.js 是一个可选的配置文件，如果项目的(和 package.json 同级的)根目录中存在这个文件，
 *那么它会被 @vue/cli-service 自动加载,
 *记得改完配置文件，要重启项目，才生效
 */
const path = require('path');
module.exports = {
    // 基本路径 生产环境
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    // 输出文件目录 打包环境
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    /** vue3.0内置了webpack所有东西，
     * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
     **/
    chainWebpack: (config) => {
        //配置svg文件
        const svgRule = config.module.rule("svg");     
        svgRule.uses.clear();     
        svgRule
        .use("svg-sprite-loader")
        .loader("svg-sprite-loader")
        .options({ 
            symbolId: "icon-[name]",
            include: ["./src/icons"] 
        });
    },
    configureWebpack: (config) => {
        config.resolve = { // 配置解析别名
            extensions: ['.js', '.json', '.vue'],  // 自动添加文件名后缀
            alias: {
                'vue': 'vue/dist/vue.js',
                '@': path.resolve(__dirname, './src'),
                '@c': path.resolve(__dirname, './src/components')
            }
        }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            // 给 sass-loader 传递选项
            scss: { 
                prependData: `@import "./src/styles/main.scss";`
            },
            // sass: {
            //     // @/ 是 src/ 的别名
            //     // 所以这里假设你有 `src/variables.sass` 这个文件
            //     // 注意：在 sass-loader v7 中，这个选项名是 "data"
            //     prependData: `@import "~@/variables.sass"`
            // },
            // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
            // 因为 `scss` 语法在内部也是由 sass-loader 处理的
            // 但是在配置 `data` 选项的时候
            // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
            // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
            // 给 less-loader 传递 Less.js 相关选项
            // less:{
            //     // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
            //     // `primary` is global variables fields name
            //     globalVars: {
            //     primary: '#fff'
            //     }
            // }
        },
        // requireModuleExtension: false
        // 启用 CSS modules for all css / pre-processor files.
        // modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    //PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: true, // 编译完成是否打开网页
        host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
        port: 8080, // 访问端口
        https: false, // 编译失败时刷新页面
        hot: true, // 开启热加载
        hotOnly: false,
        // 设置代理（以接口 https://www.easy-mock.com/mock/5ce2a7854c85c12abefbae0b/api 说明）
        proxy: {
            '/devApi': {
                target: "http://www.web-jshtml.cn/productapi/token", //API服务器的地址  http://www.web-jshtml.cn/api
                changeOrigin: true, // 是否改变域名
                pathRewrite: {
                    '^/devApi': ''
                }
            },
            // 下边这个， 如果你是本地自己mock 的话用after这个属性，线上环境一定要干掉
            // after: require("./mock/mock-server.js"),
        },
        overlay: { // 全屏模式下是否显示脚本错误
            warnings: true,
            errors: true
        },
        before: app => {
        }
    },
    /**
     * 第三方插件配置
     */
    pluginOptions: {}
}
