const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",
    entry: {
      common: "./assets/js/common.js",
      home: "./assets/js/pages/home.js",
      single: "./assets/js/pages/single.js",
      page: "./assets/js/pages/page.js",
      archive: "./assets/js/pages/archive.js",
      search: "./assets/js/pages/search.js",
    },
    output: {
      path: path.resolve(__dirname, isProd ? "dist/prod/js" : "dist/dev/js"),
      filename: "[name].min.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "> 0.25%, not dead",
                    useBuiltIns: "usage",
                    corejs: false,
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProd,
              drop_debugger: isProd,
              pure_funcs: isProd ? ["console.log"] : [],
              passes: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              comments: false,
              beautify: false,
            },
          },
          extractComments: false,
        }),
      ],
      splitChunks: false,
    },
    devtool: isProd ? false : "source-map",
    watchOptions: {
      ignored: /node_modules/,
    },
    performance: isProd
      ? { hints: "warning", maxEntrypointSize: 512000, maxAssetSize: 512000 }
      : false,
  };
};
