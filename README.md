## Contribute

### Dependencies

- `node >= 16.15.1`

### Setting up the environment

To setup the project just run the following script using `npm` (the only package manager tested until now), which will run `npm install` and the `init` script under the `bin` directory.

```
npm run proj:init
```

### Live building

To have webpack building your files right after a change, and watch them on a browser, run this command:

```
npx run watch -- page=myPage port=8080 
```

- This npm script runs webpack in development mode, which is the only option available.

- The `port` parameter is optional. If absent it will be `8080`.

- Only one page can be specified.

- Webpages are hosted in `https://localhost:{port}/pages/{page}`, and not specifying the `pages/{page}` part will lead you to the content of the `public` directory, which will trigger a http error if absent, but that doesn't prevent you from accessing the URL where the compiled page is hosted.

- `--` is an option for npm to know that the further text is composed of parameters for the `watch` script. This parameter will be passed to webpack's `--env` parameter, so they need to be written like `identifier=value`, as passing a plain word (e.g. `value`) will be translated to a boolean variable in code.

  The identifier chosen to pass a webpage to be watched is `page`, while `myPage` is a example of webpage. Note that, in code, webpages are directories (named in lower case) inside `src/pages` that contain a `template.html` file. Scripts compiled and used with these html files are `.js` and `.jsx` files with specific names defined in `webpack.config.js` (e.g. `script.js` or `script.jsx`). These specific scripts need to be the main holders of, or be a hub for actual code, like a `main` code file for a monolithic application.

