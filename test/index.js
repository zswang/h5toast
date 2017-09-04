
global.h5toast = require('../')
      

describe("src/index.ts", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  var jsdom = require('jsdom');
  

  it("jsdom@show():base", function (done) {
    jsdom.env("    <span>jsdom</span>", {
        features: {
          FetchExternalResources : ["script", "link"],
          ProcessExternalResources: ["script"]
        }
      },
      function (err, window) {
        global.window = window;
        ["document","navigator"].forEach(
          function (key) {
            global[key] = window[key];
          }
        );
        assert.equal(err, null);
        done();
      }
    );
  });
          
  it("show():base", function () {
    examplejs_printLines = [];
    var toast = new h5toast.Toast()
    var div = toast.show('hello');
    examplejs_print(div.classList.contains('h5toast-content--default'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];

    var div = toast.show('hello', 'error');
    examplejs_print(div.classList.contains('h5toast-content--error'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];

    var div = toast.show('hello', { progress: false });
    examplejs_print(div.classList.contains('h5toast-content--default'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
});
         