var babel = require("babel-core");
var sourceMap = require("source-map");

function xform(mapping) {
  var generator = new sourceMap.SourceMapGenerator({
    file: "foo.js",
    sourceRoot: "http://example.com/"
  });

  generator.addMapping(mapping);

  babel.transform("a=1", {
    sourceMaps: true,
    inputSourceMap: JSON.parse(generator.toString()),
  });
}

describe('Input source map merging', function() {
  it('should work when using a mapping with source information', function () {
    xform({
      source: "bar.js",
      original: { line: 1, column: 1 },
      generated: { line: 1, column: 1 },
    });
  });

  it('should work when using a mapping without source information', function () {
    xform({
      generated: { line: 1, column: 1 },
    });
  });
});
