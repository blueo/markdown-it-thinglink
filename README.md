# markdown-it-apester

> markdown-it plugin for adding [apester](http://apester.com/) html5 tokens

## Usage

#### Enable plugin

```js
var md = require('markdown-it')({
  html: true, // <-- markdown-it options which are, well optional...
  linkify: true,
  typography: true
}).use(require('markdown-it-apester')); // <-- this use(package_name) is required
```

#### Example

This only works in the inline style.

```md
@[apester](dQw4w9WgXcQ)
```

is interpreted as

```html
<p><interaction id="dQw4w9WgXcQ"></interaction></p>
```

Note that you will need to include the [apester SDK](http://help.apester.com/hc/en-us/articles/205649881-SDK-Documentation) in your page to load the embedded content.


## Currently supported services
 * Apester

## Acknowledgements
This plugin is heavily based on the code from [brianjgeiger/markdown-it-video](https://github.com/brianjgeiger/markdown-it-video)