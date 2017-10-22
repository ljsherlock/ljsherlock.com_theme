
"use strict";

var fs = require("fs");
var assert = require("assert");
var sizeOf = require("image-size");

describe("convert-svg-to-png", function () {

  it("Creates output dir", function () {
    assert(fs.existsSync("dist/test/64x64"));
    assert(fs.existsSync("dist/test/128x128"));
  });

  it("Generates PNG", function () {
    assert(fs.existsSync("dist/test/64x64/test.png"));
    assert(fs.existsSync("dist/test/128x128/test.png"));
  });

  it("Generates 64x64 PNG", function () {
    var dimensions = sizeOf("dist/test/64x64/test.png");
    assert(dimensions.width === 64);
    assert(dimensions.height === 64);
  });

  it("Generates 2x PNG", function () {
    var dimensions = sizeOf("dist/test/128x128/test.png");
    assert(dimensions.width === 128);
    assert(dimensions.height === 128);
  });

});
