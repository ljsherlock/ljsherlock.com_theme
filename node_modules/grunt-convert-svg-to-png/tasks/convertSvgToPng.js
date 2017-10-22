
"use strict";


  var path = require("path");
  var fs = require('fs-extra');
  var os = require( "os" );
  var svgToPng = require('svg-to-png');

  var tmpPath = os.tmpdir ? os.tmpdir() : os.tmpDir();
  var tmpDir = "convert-svg-to-png-tmp";

  function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(filePath)) {
      return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(filePath);
  }
  
  module.exports = function (grunt) {

    grunt.registerMultiTask("convert-svg-to-png", "Convert SVG to PNG", function () {
      var done = this.async();
      var config = this.options({});

      var files = this.files.filter(function (file) {
        return path.extname( file.src[0] ) === ".svg";
      }).map(function (file) {
        return file.src[0];
      });

      if (files.length === 0) {
        grunt.log.writeln("No SVG files to convert");
        done();
        return;
      }

      var output = this.files[0].orig.dest;

      if( !output || output && output === "" ){
			  grunt.fatal("The destination must be a directory");
			  done( false );
		  }

      // create output dir
      fs.mkdirpSync( output );

      var tmp = path.join(tmpPath, tmpDir);

      if (fs.existsSync(tmp)) {
        fs.removeSync(tmp);
      }

      fs.mkdirpSync( tmp );

      files.forEach(function(f) {
        var filename = path.basename(f);
        fs.copySync(f, path.join(tmp, filename));
      });

      var svgFiles = fs.readdirSync(tmp)
          .map(function(file) {
            return path.join(tmp, file);
          });

      var svgToPngOpts = {
        defaultWidth: config.size.w,
        defaultHeight: config.size.h
      };

      (
        svgFiles.length ?
          svgToPng.convert(svgFiles, output, svgToPngOpts) :
          {then: function (callback) {callback();}}
      ).then(function (result, err) {
          if (err) {
            grunt.log.fatal("Error processing SVG's");
            grunt.log.fatal(err);
            done(false);
          }

          grunt.log.ok("convert-svg-to-png processed " + this.files.length + " files." );
          done(true);
      }.bind(this));
      

      //TODO(jaiew): process using a tmp dir.
      /*var svgFiles = this.files.map(function(file) {
	    var src = Array.isArray(file.src) ? file.src.pop() : file.src;
	      return path.resolve(cwd, src);
      });

      //ensureDirectoryExistence(destDir);
   
      svgToPng.convert(svgFiles, path.resolve(cwd, destDir), {defaultWidth: config.size.w, defaultHeight: config.size.h})
        .then( function(result, err) {
          if (err) {
            grunt.log.fatal("Error processing SVG's");
            grunt.log.fatal(err);
            done(false);
          }

          grunt.log.ok("convert-svg-to-png processed " + this.files.length + " files." );

          done(true);
        
        }.bind(this));*/
    });
  };


