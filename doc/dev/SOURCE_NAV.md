# Source Code Navigation

## Directories Meaning

  - `dev`: Development version of assets.
  - `prod`: Production version of assets.
- `dist`: Root folder for bundled code.
  - `dev`: Code for testing and debugging.
  - `prod`: Production code.
- `doc`: Root folder for documentation.
  - `dev`: Contributors' documentation.
  - `user`: User documentation mainly written to help on conceptualization.
- `images`: Images that will be used globally and will remain mostly untouched.
- `src`: Source code.
  - `assets`: Static files related to the client-side that can also be consumed by the server.
  - `pages`: Root folder for webpages. Every child folder containing a `template.html` is supposed to be a new webpage.
    - `{pageName}`: Root folder for its respective webpage assets.

## Files Meaning

- `.babelrc.json`: Babel configuration for its respective webpack loader.
- `.browserslistrc`: Browserslist queries used by Babel to get ecmascript version to which compile.
- `webpack.config.js`: Webpack configuration.
- `dev.env`: Environment variables to use during development.
- `prod.env`: Environment variables to use in production.