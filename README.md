#  [![Build Status](https://secure.travis-ci.org/larixsource/confluence2ghost.png?branch=master)](http://travis-ci.org/larixsource/confluence2ghost)

> Generates ghost markdown from confluence storage format


## Getting Started

Install the module with: `npm install confluence2ghost`

```js
var confluence2ghost = require('confluence2ghost');
confluence2ghost.convert('<h1>Aj&aacute;!</h1>'); // "# Ajá!"
```

Install with cli command

```sh
$ npm install -g confluence2ghost
$ confluence2ghost --help
$ confluence2ghost --version
$ confluence2ghost file.xhtml
```


## Documentation

We made this tiny module to translate easily our blog posts from [Confluence](https://www.atlassian.com/software/confluence) to [Ghost](https://ghost.org).

You can get the xhtml of a post from Confluence in **Tools > View Storage Format**. More details in [Confluence Storage Format](https://confluence.atlassian.com/display/DOC/Confluence+Storage+Format). Save the content to a file, and run the command:

```sh
$ confluence2ghost file.xhtml
```

Currently, the plugin performs 3 tasks, beside normal xhtml to markdown transformation:

* Entities are unescaped: `&aacute`; is replaced by `á`. We write in spanish, and dealing with text with "codes" is uncomfortable, so we get rid of escaped characters.
* `<ac:image>` elements are replaces by `![]()`, the Ghost marker for an image.
* `<ac:structured-macro ac:name="code">` elements are replaced by code blocks.


## Example

This post:

```xhtml
<h1>Some article</h1>
<p>Bla bla, <b>bla!</b>, from <a href="http://www.this.place.com">this place</a>.</p>
<ol>
<li>one</li>
<li>two</li>
<li>tree</li>
<h2>Picture</h2>
<p>Looks like this:</p>
<p><ac:image><ri:attachment ri:filename="superlist.png" /></ac:image></p>
<h2>API</h2>
<p>A <i>wonderful</i> API.</p>
<ac:structured-macro ac:name="code"><ac:parameter ac:name="language">bash</ac:parameter><ac:plain-text-body><![CDATA[function inc(n) {
    return n++;
}
]]></ac:plain-text-body></ac:structured-macro>
<p>Thats all!</p>
```

is translated to:

```markdown
# Some article

Bla bla, **bla!**, from [this place](http://www.this.place.com).

<li>one</li>
<li>two</li>
<li>tree</li>

## Picture

Looks like this:

![]()

## API

A _wonderful_ API.

    function inc(n) {
        return n++;
    }

Thats all!
```


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com).


## License

Copyright (c) 2014 Larix Ltda.
Licensed under the Apache-2.0 license.
