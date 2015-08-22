# gualtrapa-sass: A gulp kit for Bootstrap Sass.
Basic kit for setting up a frontend workflow using Bootstrap Sass. Especially useful for those situations when I come up with some ideas I want to put fast in a design.

It also uses:
* **BrowserSync**. 
* **Nunjucks** templates. 

But check the `gulpfile.js` to see what it's used.

## Installation.
Just clone away:
```bash
$ git clone https://github.com/lifeBalance/gualtrapa-sass
```
Install the packages:
```bash
$ cd gualtrapa-sass
$ npm install
```
Run Gulp:
```bash
$ gulp
```
Start designing.

## Usage.
### About the nunchucks templates
The `source` directory is being watched and livereloaded thanks to **BrowserSync**. The nunchucks templates inside it make use of the layouts and partials in the `layouts` and `partials` folders. These folders are not being watched, that's why they're the perfect place to put the stuff you don't want "as is" in the HTML output.

In the main layout ('layouts/layout.html'), the `bootstrap-theme` and the `bootstrap` styles are commented out. This is because the `main.css` imports all the bootstrap styles. 
```html
	<!-- Bootstrap, Bootstrap-theme, and main. -->
    <!-- <link href="css/bootstrap.min.css" rel="stylesheet"> -->
    <!-- <link href="css/bootstrap.theme.min.css" rel="stylesheet"> -->
    <link href="css/main.css" rel="stylesheet">
```
They may be enabled if necessary. The `main.min.css` contains all the bootstrap styles, plus any customization or mixin that we drop in it. If you enable it, don't forget to disable `bootstrap.min.css` since those styles are already included in `main`.

Feel free to experiment and change stuff around to get a better feeling. You can always throw everything away and clone again the repo to start over.

### About the Bootstrap Sass files

## How I built it.
For those people interested in what I did, very basic stuff:

1. Downloaded the Bootstrap Source Code, the Sass version:
```bash
$ git clone https://github.com/twbs/bootstrap.git
```
2. Deleted about everything except the `Sass`, `fonts` and `JavaScript` folders inside the `source` directory.

## This is what I kept
Inside the `bootstrap/fonts` folder we have:
```
$ cd bootstrapsass-3.3.5/assets
$ tree fonts
fonts
├── glyphicons-halflings-regular.eot
├── glyphicons-halflings-regular.svg
├── glyphicons-halflings-regular.ttf
├── glyphicons-halflings-regular.woff
└── glyphicons-halflings-regular.woff2
```

Inside the `bootstrap/js` directory:
```
$ cd bootstrap-sass-3.3.5/assets
$ tree js
js
├── affix.js
├── alert.js
├── button.js
├── carousel.js
├── collapse.js
├── dropdown.js
├── modal.js
├── popover.js
├── scrollspy.js
├── tab.js
├── tooltip.js
└── transition.js
```
And inside the `sass` folder:
```
$ cd bootstrap-sass-3.3.5/assets
$ tree stylesheets/
stylesheets/
├── _bootstrap-compass.scss
├── _bootstrap-mincer.scss
├── _bootstrap-sprockets.scss
├── _bootstrap.scss
└── bootstrap
    ├── _alerts.scss
    ├── _badges.scss
    ├── _breadcrumbs.scss
    ├── _button-groups.scss
    ├── _buttons.scss
    ├── _carousel.scss
    ├── _close.scss
    ├── _code.scss
    ├── _component-animations.scss
    ├── _dropdowns.scss
    ├── _forms.scss
    ├── _glyphicons.scss
    ├── _grid.scss
    ├── _input-groups.scss
    ├── _jumbotron.scss
    ├── _labels.scss
    ├── _list-group.scss
    ├── _media.scss
    ├── _mixins.scss
    ├── _modals.scss
    ├── _navbar.scss
    ├── _navs.scss
    ├── _normalize.scss
    ├── _pager.scss
    ├── _pagination.scss
    ├── _panels.scss
    ├── _popovers.scss
    ├── _print.scss
    ├── _progress-bars.scss
    ├── _responsive-embed.scss
    ├── _responsive-utilities.scss
    ├── _scaffolding.scss
    ├── _tables.scss
    ├── _theme.scss
    ├── _thumbnails.scss
    ├── _tooltip.scss
    ├── _type.scss
    ├── _utilities.scss
    ├── _variables.scss
    ├── _wells.scss
    └── mixins
        ├── _alerts.scss
        ├── _background-variant.scss
        ├── _border-radius.scss
        ├── _buttons.scss
        ├── _center-block.scss
        ├── _clearfix.scss
        ├── _forms.scss
        ├── _gradients.scss
        ├── _grid-framework.scss
        ├── _grid.scss
        ├── _hide-text.scss
        ├── _image.scss
        ├── _labels.scss
        ├── _list-group.scss
        ├── _nav-divider.scss
        ├── _nav-vertical-align.scss
        ├── _opacity.scss
        ├── _pagination.scss
        ├── _panels.scss
        ├── _progress-bar.scss
        ├── _reset-filter.scss
        ├── _reset-text.scss
        ├── _resize.scss
        ├── _responsive-visibility.scss
        ├── _size.scss
        ├── _tab-focus.scss
        ├── _table-row.scss
        ├── _text-emphasis.scss
        ├── _text-overflow.scss
        └── _vendor-prefixes.scss
```
Inside the `sass` directory the most important file is the partial named `_bootstrap.scss`: it imports all of the other `_sass` partials in the proper order. I took this last file and rename it to `bootstrap.scss` to be able to compile it with the sass task (since partials are ignored) and also took the `_theme.scss` partial and move it and rename it to `source/sass/bootstrap-theme.scss`.

## Resulting project structure
Then I created two folders: `src` for all the **Sass**, **nunjucks templates** and **JavaScript** source files before any processing, and `dist` for the resulting compiled and minified files. Inside this folder I also added the basic HTML template that you can find in the [Bootstrap's officcial site](http://getbootstrap.com/getting-started/#template):
```bash
$ tree gualtrapa-sass -L 2
gualtrapa-sass
├── README.md
├── dist
│   ├── about.html
│   ├── css
│   ├── fonts
│   ├── img
│   ├── index.html
│   └── js
├── gulpfile.js
├── node_modules
│   ├── browser-sync
│   ├── gulp
│   ├── gulp-autoprefixer
│   ├── gulp-concat
│   ├── gulp-jshint
│   ├── gulp-load-plugins
│   ├── gulp-minify-css
│   ├── gulp-notify
│   ├── gulp-nunjucks-render
│   ├── gulp-plumber
│   ├── gulp-rename
│   ├── gulp-sass
│   ├── gulp-scss-lint
│   ├── gulp-util
│   └── jshint-stylish
├── package.json
├── sass-lint-config.yml
└── source
    ├── js
    ├── sass
    └── templates
```
## Used packages
For creating the Gulp workflow I used the following packages:
* [gulp](https://www.npmjs.com/package/gulp) itself, obviously. No introductions required.
* [browser-sync](http://www.browsersync.io/), if you don't know it, just check it.
* [gulp-nunjucks-render](https://www.npmjs.com/package/gulp-nunjucks-render), it renders nunjucks templates to HTML.
* [gulp-sass](https://www.npmjs.com/package/gulp-sass) for compiling our Sass to CSS.
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer), plugin that adds vendor prefixes automatically when needed.
* [gulp-concat](https://www.npmjs.com/package/gulp-concat), to concatenate files, mainly our JavaScripts.
* [gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins), it loads automatically any plugin listed in our `package.json` file, no need of requiring it in our `gulpfile.js`.
* [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css), to minify CSS, using [clean-css](https://github.com/jakubpawlowicz/clean-css)
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify), to minify our JavaScripts using [UglifyJS](https://github.com/mishoo/UglifyJS)
* [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) This plugin is very important, since it prevents pipe breaking caused by errors from gulp plugins.
* [gulp-util](https://www.npmjs.com/package/gulp-util), it does interesting stuff like colouring our logs, making very easy to spot errors(they will appear in red).
* [gulp-notify](https://www.npmjs.com/package/gulp-notify), plugin to send messages based on Vinyl Files or Errors to Mac OS X, Linux or Windows using the node-notifier module. 
* [gulp-rename](https://www.npmjs.com/package/gulp-rename), plugin to rename files easily.

Check `package.json` for a complete list.

## LICENSE
	DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
	                Version 2, December 2004

	Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

	Everyone is permitted to copy and distribute verbatim or modified
	copies of this license document, and changing it is allowed as long
	as the name is changed.

	        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
	TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

	0. You just DO WHAT THE FUCK YOU WANT TO.
