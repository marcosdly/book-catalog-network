"use strict";
// @ts-check

const path = require("path");
const process = require("process");

// Set environment
if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: path.resolve(__dirname, "prod.env") });
} else {
  require("dotenv").config({ path: path.resolve(__dirname, "dev.env") });
}

require("core-js")
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/**
 * @typedef {Object} webpackEntryPointMap
 * @property {string} import
 * @property {string} filename
 */

/**
 * @typedef {Object} webpageAssetsConfigurationObj
 * @property {Array<HtmlWebpackPlugin>} pluginInstances
 * @property {webpackEntryPointMap} scripts
 */

/**
 * Generate array filled with HtmlWebpackPlugin instances (as one can only
 * generate one page per instance), and object filles with paths for respective scripts.
 * @function webpagesGenerator
 * @returns {webpageAssetsConfigurationObj}
 */
const webpagesGenerator = () => {
  const webpagesMap = [];
  const scriptsPath = {};
  const whitelistedJSFiles4Bundling = [
    "script.js",
  ];
  let envConfig;

  if (process.env.NODE_ENV === "production") {
    // Production environment configuration
    envConfig = {
      minify: true,
    }
  } else {
    // Development environment configuration
    envConfig = {
      minify: false,
    }
  }

  const webpagesSourceDir = path.join(__dirname, "src", "pages");
  const webpagesSourceDirIterable = fs.readdirSync(webpagesSourceDir, { withFileTypes: true });

  for (const srcFolderElement of webpagesSourceDirIterable) {

    /**
     * If element inside 'src/pages' is a folder, check if it has a 'template.html'.
     * If yes, create a instance of 'HtmlWebpackPlugin' with its path and check for
     * specific js files to be added to the bundling queue.
     */
    if (srcFolderElement.isDirectory()) {
      const subDir = path.resolve(webpagesSourceDir, srcFolderElement.name);
      const subFolderIterable = fs.readdirSync(subDir, { withFileTypes: true });

      for (const webFile of subFolderIterable) {
        if (webFile.isFile() && webFile.name === "template.html") {

          webpagesMap.push(new HtmlWebpackPlugin({
            template: path.resolve(subDir, "template.html"),
            filename: `pages/${srcFolderElement.name}/index.html`,
            scriptLoading: "defer",
            base: process.env.BASE_URL === "false" ? false : process.env.BASE_URL,
            favicon: path.resolve(__dirname, "images", "icon.png"),
            cache: true,
            hash: false,
            showErrors: true,
            ...envConfig
          }));

        } else if (webFile.isFile() && whitelistedJSFiles4Bundling.includes(webFile.name)) {

          scriptsPath[`${srcFolderElement.name}-${path.parse(webFile.name).name}`] = {
            import: path.resolve(subDir, webFile.name),
            filename: `pages/${srcFolderElement.name}/${path.parse(webFile.name).name}.bundle.[contenthash].js`,
          };

        }
      };
    }
  };

  return {
    pluginInstances: webpagesMap,
    scripts: scriptsPath
  };
}

const webAssets = webpagesGenerator();

const configTemplate = {
  entry: { ...webAssets.scripts },
  target: ["web", "es5"],

  plugins: [
    ...webAssets.pluginInstances,
    new CopyWebpackPlugin({
      patterns: [
        { // copy assets folder to build folder
          from: path.resolve(__dirname, "src", "assets"),
          to: path.resolve(__dirname, "dist",
            process.env.NODE_ENV === "production" ? "prod" : "dev", "assets")
        }
      ]
    })
  ],

  module: {
    rules: [
      { // babel-loader
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",

          // loader-specific options
          options: {
            cacheDirectory: true,
            // Benefits of cache compression grows exponentially as more source files are created
            cacheCompression: true
          }
        }
      }
    ]
  }
};

module.exports = (env, argv) => {
  if (process.env.NODE_ENV === "production") {
    return {
      ...configTemplate,
      devtool: "source-map",
      output: {
        path: path.resolve(__dirname, "dist", "prod"),
        charset: true,
        clean: true,
        compareBeforeEmit: true,
        sourceMapFilename: "[file].map"
      },
    };
  } else {
    return {
      ...configTemplate,
      devtool: "eval",
      output: {
        path: path.resolve(__dirname, "dist", "dev"),
        charset: true,
        clean: true,
        compareBeforeEmit: true,
        sourceMapFilename: "[file].map"
      },
    };
  }
};