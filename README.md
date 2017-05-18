# context-entry-webpack-plugin

> Use a context module as webpack entry

## Usage

Example:

```js
module.exports = {
  output: {
    filename: '[name].js'
  },
  plugins: [
    new ContextEntryPlugin(__dirname, 'json-loader!./stuff/', true, /\.json$/, 'stuff')
  ]
};
```
