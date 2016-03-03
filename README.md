# markdown-it-thinglink

> markdown-it plugin for adding [thinglink](http://thinglink.com/) interactive images

## Usage

#### Enable plugin

```js
var md = require('markdown-it')({
  html: true, // <-- markdown-it options which are, well optional...
  linkify: true,
  typography: true
}).use(require('markdown-it-thinglink')); // <-- this use(package_name) is required
```

#### Example

This only works in the inline style.

```md
@[thinglink](//cdn.thinglink.me/api/image/755567949791625217/1024/10/scaletowidth#tl-755567949791625217;1043138249')
```

is interpreted as

```html
<p><img style="max-width:100%" src="//cdn.thinglink.me/api/image/755567949791625217/1024/10/scaletowidth#tl-755567949791625217;1043138249'" class="alwaysThinglink"/></p>
```

Note that you will need to include the [thinglink embed link](https://www.thinglink.com/help/Setting%20up%20Thinglink) in your page to load the embedded content.

Also, if changing pages dynamically, call `__thinglink.rebuild();` or `__thinglink.rebuild('http://example.com/pics/picture.jpg');` to render the content

## Currently supported services
 * thinglink

## Acknowledgements
This plugin is heavily based on the code from [brianjgeiger/markdown-it-video](https://github.com/brianjgeiger/markdown-it-video)