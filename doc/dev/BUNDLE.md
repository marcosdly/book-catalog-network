# Information regarding bundling

## Building

Running the building scripts for each environment will create a respective folder with all the content of `src`. Some of it straight up copied (e.g. `src/assets/`), and some processed trough webpack or other framework/lib (e.g. `src/pages/` for webpages with html, js and css files).

## Webpack configuration

### Modes

As of webpack 5.73.0, `argv` and `env` parameters passed to `webpack.config.js`'s callback function are undefined (idk why), making not possible to define mode-related configurations within the generic configuration file. To surpass this we pass the mode information trough the `--node-env` option with `--node-env development`. Inside the file we check for the mode with `process.env.NODE_ENV`.