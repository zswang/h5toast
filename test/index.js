
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

    var div = toast.show('hello', 'error', {
      timeout: 1000,
      encode: false,
    });
    examplejs_print(div.classList.contains('h5toast-content--error'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];

    var div = toast.show('hello', { progress: false });
    examplejs_print(div.classList.contains('h5toast-content--default'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("jsdom@show():not encode", function (done) {
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
          
  it("show():not encode", function () {
    examplejs_printLines = [];
    var toast = new h5toast.Toast({
      encode: false
    })
    var div = toast.show('<em>hello</em>');
    examplejs_print(!!div.querySelector('em'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("jsdom@show():timeout", function (done) {
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
          
  it("show():timeout", function (done) {
    examplejs_printLines = [];
    var toast = new h5toast.Toast({
      timeout: 100
    })
    var div = toast.show('hello');
    examplejs_print(!!document.querySelector('.h5toast-content--default'))
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
    setTimeout(function () {
      examplejs_print(!!document.querySelector('.h5toast-content--default'))
      assert.equal(examplejs_printLines.join("\n"), "false"); examplejs_printLines = [];
      done();
    }, 1000)
  });
          
  it("jsdom@show():remove", function (done) {
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
          
  it("show():remove", function (done) {
    examplejs_printLines = [];
    var toast = new h5toast.Toast()
    var div = toast.show('hello');
    examplejs_print(!!document.querySelector('.h5toast-content--default'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];

    toast.remove(div);
    setTimeout(function () {
      examplejs_print(!!document.querySelector('.h5toast-content--default'));
      assert.equal(examplejs_printLines.join("\n"), "false"); examplejs_printLines = [];
      done();
    }, 1000)
    toast.remove(div, 'top-center');
  });
          
  it("jsdom@show():encode", function (done) {
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
          
  it("show():encode", function () {
    examplejs_printLines = [];
    var toast = new h5toast.Toast()
    var div = toast.show('<b>test</b>');
    examplejs_print(document.querySelector('.h5toast__body').innerHTML);
    assert.equal(examplejs_printLines.join("\n"), "&lt;b&gt;test&lt;/b&gt;"); examplejs_printLines = [];
  });
          
  it("jsdom@show():no progress", function (done) {
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
          
  it("show():no progress", function () {
    examplejs_printLines = [];
    var toast = new h5toast.Toast({
      progress: false,
      position: 'top-center',
    })
    var div = toast.show('test');
    examplejs_print(!!document.querySelector('.h5toast__progress'));
    assert.equal(examplejs_printLines.join("\n"), "false"); examplejs_printLines = [];

    examplejs_print(!!document.querySelector('.h5toast--top-center'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("jsdom@show():click close button", function (done) {
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
          
  it("show():click close button", function (done) {
    examplejs_printLines = [];
    var toast = new h5toast.Toast({
      position: 'top-center',
    })
    var div = toast.show('test');
    document.querySelector('.h5toast__close').click();
    setTimeout(function () {
      examplejs_print(!!document.querySelector('.h5toast-content--default'));
      assert.equal(examplejs_printLines.join("\n"), "false"); examplejs_printLines = [];
      done();
    }, 1000)
    document.querySelector('.h5toast__progress').click();
    toast.remove(document.querySelector('.h5toast__progress'))
  });
          
  it("jsdom@show():timeout -1", function (done) {
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
          
  it("show():timeout -1", function () {
    examplejs_printLines = [];
    var toast = new h5toast.Toast({
      position: 'top-center',
      timeout: -1,
    })
    var div = toast.show('test');
    examplejs_print(!!document.querySelector('.h5toast__progress'));
    assert.equal(examplejs_printLines.join("\n"), "false"); examplejs_printLines = [];
  });
          
  it("jsdom@info():base", function (done) {
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
          
  it("info():base", function () {
    examplejs_printLines = [];
    var toast = new h5toast.Toast()
    var div = toast.info('hello');
    examplejs_print(div.classList.contains('h5toast-content--info'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("jsdom@error():base", function (done) {
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
          
  it("error():base", function () {
    examplejs_printLines = [];
    var toast = new h5toast.Toast()
    var div = toast.error('hello');
    examplejs_print(div.classList.contains('h5toast-content--error'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("jsdom@warn():base", function (done) {
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
          
  it("warn():base", function () {
    examplejs_printLines = [];
    var toast = new h5toast.Toast()
    var div = toast.warn('hello');
    examplejs_print(div.classList.contains('h5toast-content--warning'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("jsdom@success():base", function (done) {
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
          
  it("success():base", function () {
    examplejs_printLines = [];
    var toast = new h5toast.Toast()
    var div = toast.success('hello');
    examplejs_print(div.classList.contains('h5toast-content--success'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
});
         