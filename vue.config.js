/* eslint-disable no-param-reassign */
const path = require("path");
const webpack = require("webpack");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const isProd = process.env.NODE_ENV === "production";

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: "Vue",
    "vue-router": "VueRouter",
    vuex: "Vuex",
    axios: "axios",
  },
  css: [],
  js: [
    "//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js",
    "//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js",
    "//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js",
    "//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js",
  ],
};

// vue.config.js
const vueConfig = {
  assetsDir: "assets",
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale/, /(en|zh-cn)\.js/),
    ],
  },

  chainWebpack(config) {
    config.resolve.alias.set("@", resolve("src"));

    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .oneOf("inline")
      .resourceQuery(/inline/)
      .use("vue-svg-icon-loader")
      .loader("vue-svg-icon-loader")
      .end()
      .end()
      .oneOf("external")
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[hash:8].[ext]",
      });

    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin("html").tap(args => {
        args[0].cdn = assetsCDN;
        return args;
      });
    }
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // 全局引入less变量 https://cli.vuejs.org/zh/guide/css.html#%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/global-variables.less")],
    },
  },
  devServer: {
    // development server port 8000
    port: 8000,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      "^/user": {
        target: "http://lol-user.aixuexi.com",
        ws: false,
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: {
          "^/user": "/user",
        },
      },
      "^/lol": {
        target: "http://lol-bi.aixuexi.com",
        // target: "http://bizx.aixuexi.com",
        ws: false,
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
  productionSourceMap: false,
  lintOnSave: false,
  transpileDependencies: ["vue-echarts", "resize-detector"],
};

module.exports = vueConfig;
