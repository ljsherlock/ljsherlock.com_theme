# grunt-convert-svg-to-png [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> Generate PNG from SVG using [svg-to-png](https://github.com/filamentgroup/svg-to-png)


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```sh
npm install --save-dev grunt-convert-svg-to-png
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-convert-svg-to-png');
```

*Tip: the [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) module makes it easier to load multiple grunt tasks.*


[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started


## Motivation

We found that [Grunticon](https://github.com/filamentgroup/grunticon) provided the best way to convert a lot of SVGs to PNGs quickly, but we wanted to do this without all the extra cruft around grunticon.
At the time of writing, none of the other grunt plugins offered the scaling capability [svg2png](https://github.com/domenic/svg2png) was the closest and this plugin is modelled off that and the [grunticon-lib](https://github.com/filamentgroup/grunticon-lib/blob/master/lib/grunticon-lib.js)
Bear in mind this is just a grunt wrapper on top of [svg-to-png](https://github.com/filamentgroup/svg-to-png).
Can be combined with [svgmin](https://github.com/sindresorhus/grunt-svgmin) to reduce size of output svg files.

## Documentation

See the [Gruntfile](Gruntfile.js) in this repo for a full example.


### Example config

```js
grunt.initConfig({
  "convert-svg-to-png": {
    fallback: {
      options: {
        size: {w: 100px, h: 100px},
      },
      files: [{
        expand: true,
        cwd: "test/svg",
        src: ["*/*.svg"],
        dest: "../../png/"
      }]
    }
  }
});

grunt.loadNpmTasks("grunt-convert-svg-to-png");
grunt.registerTask("default", ["convert-svg-to-png"]);
```

## License

unlicense
