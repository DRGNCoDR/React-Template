To set up from scratch

npm install rollup --global
npm init -y
npm i react react-dom
npm i rollup rollup-plugin-serve rollup-plugin-livereload @rollup/plugin-node-resolve @rollup/plugin-babel @rollup/plugin-commonjs @rollup/plugin-replace @babel/preset-react --save-dev

Create the rollup.config.js file
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: [".js"],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    babel({
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
    serve({
      open: true,
      verbose: true,
      contentBase: ["", "public"],
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: "dist" }),
  ]
};

-------------------------------------------------
Generally, Rollup only needs you to define the input and the ouput on its configuration file. You can select the format of the output bundle:

iife if you run the code in the browser
cjs for running the bundle in Node.js server
umd for both browser and Node.js

-------------------------------------------------
Create index.html file
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React - Rollup Test</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
    <script src="../dist/bundle.js"></script>
  </body>
</html>
---------------------------------------------------
create src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(<App />, document.querySelector('#root'));

-----------------------------------------------------

create src/App.js
import React from 'react';
function App(){
  return <h1>Hello World From React-Rollup</h1>;
}
export default App;

------------------------------------------------------
Run the template (in terminal)
rollup -c rollup.config.js -w
------------------------------------------------------
modify package .json
"scripts": {
  "start": "rollup -c rollup.config.js -w"
},
