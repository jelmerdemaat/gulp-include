var gutil = require("gulp-util"),
    should = require("should"),
    include = require("../index"),
    fs = require("fs"),
    vm = require("vm");


// TEST DESCRIPTIONS
describe("gulp-include", function () {
  describe("File including", function () {
    it("should replace special comments with file contents", function (done) {
      var file = new gutil.File({
        base: "test/fixtures/",
        path: "test/fixtures/js/basic-include.js",
        contents: fs.readFileSync("test/fixtures/js/basic-include.js")
      });

      testInclude = include();
      testInclude.on("data", function (newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(String(fs.readFileSync("test/expected/js/basic-include.js"), "utf8"))
        done();
      });
      testInclude.write(file);
    });
    
    it("should keep whitespace when including", function (done) {
      var file = new gutil.File({
        base: "test/fixtures/",
        path: "test/fixtures/js/whitespace.js",
        contents: fs.readFileSync("test/fixtures/js/whitespace.js")
      });

      testInclude = include();
      testInclude.on("data", function (newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(String(fs.readFileSync("test/expected/js/whitespace.js"), "utf8"))
        done();
      });
      testInclude.write(file);
    });
    
    it("should include complex folder trees", function (done) {
      var file = new gutil.File({
        base: "test/fixtures/",
        path: "test/fixtures/js/include-trees.js",
        contents: fs.readFileSync("test/fixtures/js/include-trees.js")
      });

      testInclude = include();
      testInclude.on("data", function (newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(String(fs.readFileSync("test/expected/js/include-trees.js"), "utf8"))
        done();
      });
      testInclude.write(file);
    });
  })
  
  it("should not REQUIRE a file twice", function (done) {
    var file = new gutil.File({
      base: "test/fixtures/",
      path: "test/fixtures/js/big-dummy-project-file.js",
      contents: fs.readFileSync("test/fixtures/js/big-dummy-project-file.js")
    });

    testInclude = include();
    testInclude.on("data", function (newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);

      String(newFile.contents).should.equal(String(fs.readFileSync("test/expected/js/big-dummy-project-file.js"), "utf8"))
      done();
    });
    testInclude.write(file);
  });
  
  it("should pull files recursively", function (done) {
    var file = new gutil.File({
      base: "test/fixtures/",
      path: "test/fixtures/js/recursive.js",
      contents: fs.readFileSync("test/fixtures/js/recursive.js")
    });

    testInclude = include();
    testInclude.on("data", function (newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);

      String(newFile.contents).should.equal(String(fs.readFileSync("test/expected/js/recursive.js"), "utf8"))
      done();
    });
    testInclude.write(file);
  });
  
  it("should only include files with the set extensions, if provided", function (done) {
    var file = new gutil.File({
      base: "test/fixtures/",
      path: "test/fixtures/js/options-extensions.js",
      contents: fs.readFileSync("test/fixtures/js/options-extensions.js")
    });

    testInclude = include({
      extensions: ".txt"
    });
    testInclude.on("data", function (newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);

      String(newFile.contents).should.equal(String(fs.readFileSync("test/expected/js/options-extensions.js"), "utf8"))
      done();
    });
    testInclude.write(file);
  });
})