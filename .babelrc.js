const process = require("process");

module.exports = {
  presets: [
    [ // preset-env
      "@babel/preset-env",
      { // options for preset-env
        modules: "auto",
        useBuiltIns: "entry",
        corejs: {
          version: "3.23",
          proposals: false
        },
        forceAllTransforms: false
      }
    ],
    [ // preset-react
      "@babel/preset-react",
      { // options for preset-react
        runtime: "automatic",
        development: !(process.env.NODE_ENV === "production")
      }
    ]
  ],
};