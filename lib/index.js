(function (root, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    } else { factory(null, root["h5toast"] = {}); }
})(this, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var htmlEncodeDict = {
        '"': '#34',
        "'": '#39',
        '<': 'lt',
        '>': 'gt',
        '&': 'amp',
        ' ': 'nbsp',
    };
    function encodeHTML(text) {
        return text.replace(/["<>& ']/g, function (all) {
            return '&' + htmlEncodeDict[all] + ';';
        });
    }
    function createDiv(html) {
        var parent = document.createElement('div');
        parent.innerHTML = html;
        return parent.querySelector('div');
    }
    var Toast = /** @class */ (function () {
        function Toast(options) {
            var _this = this;
            this.parent = document.createElement('div');
            var style = document.createElement('style');
            this.options = options || {};
            this.options.position = this.options.position === undefined ? 'top-right' : this.options.position;
            this.options.progress = this.options.progress === undefined ? true : this.options.progress;
            this.options.timeout = this.options.timeout === undefined ? 5000 : this.options.timeout;
            this.options.encode = this.options.encode === undefined ? true : this.options.encode;
            var text = document.createTextNode("@charset 'UTF-8';@-webkit-keyframes h5toast-bounceInRight{60%,75%,90%,from,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}from{opacity:0;-webkit-transform:translate3d(3000px,0,0);transform:translate3d(3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(-25px,0,0);transform:translate3d(-25px,0,0)}75%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}90%{-webkit-transform:translate3d(-5px,0,0);transform:translate3d(-5px,0,0)}to{-webkit-transform:none;transform:none}}@keyframes h5toast-bounceInRight{60%,75%,90%,from,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}from{opacity:0;-webkit-transform:translate3d(3000px,0,0);transform:translate3d(3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(-25px,0,0);transform:translate3d(-25px,0,0)}75%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}90%{-webkit-transform:translate3d(-5px,0,0);transform:translate3d(-5px,0,0)}to{-webkit-transform:none;transform:none}}.h5toast-bounceInRight,.toast-enter--bottom-right,.toast-enter--top-right{-webkit-animation-name:h5toast-bounceInRight;animation-name:h5toast-bounceInRight}@-webkit-keyframes h5toast-bounceOutRight{20%{opacity:1;-webkit-transform:translate3d(-20px,0,0);transform:translate3d(-20px,0,0)}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}@keyframes h5toast-bounceOutRight{20%{opacity:1;-webkit-transform:translate3d(-20px,0,0);transform:translate3d(-20px,0,0)}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}.h5toast-bounceOutRight,.toast-exit--bottom-right,.toast-exit--top-right{-webkit-animation-name:h5toast-bounceOutRight;animation-name:h5toast-bounceOutRight}@-webkit-keyframes h5toast-bounceInLeft{60%,75%,90%,from,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0);transform:translate3d(-3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}to{-webkit-transform:none;transform:none}}@keyframes h5toast-bounceInLeft{60%,75%,90%,from,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0);transform:translate3d(-3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}to{-webkit-transform:none;transform:none}}.h5toast-bounceInLeft,.toast-enter--bottom-left,.toast-enter--top-left{-webkit-animation-name:h5toast-bounceInLeft;animation-name:h5toast-bounceInLeft}@-webkit-keyframes h5toast-bounceOutLeft{20%{opacity:1;-webkit-transform:translate3d(20px,0,0);transform:translate3d(20px,0,0)}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}@keyframes h5toast-bounceOutLeft{20%{opacity:1;-webkit-transform:translate3d(20px,0,0);transform:translate3d(20px,0,0)}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}.h5toast-bounceOutLeft,.toast-exit--bottom-left,.toast-exit--top-left{-webkit-animation-name:h5toast-bounceOutLeft;animation-name:h5toast-bounceOutLeft}@-webkit-keyframes h5toast-bounceInUp{60%,75%,90%,from,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}from{opacity:0;-webkit-transform:translate3d(0,3000px,0);transform:translate3d(0,3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}75%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}90%{-webkit-transform:translate3d(0,-5px,0);transform:translate3d(0,-5px,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes h5toast-bounceInUp{60%,75%,90%,from,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}from{opacity:0;-webkit-transform:translate3d(0,3000px,0);transform:translate3d(0,3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}75%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}90%{-webkit-transform:translate3d(0,-5px,0);transform:translate3d(0,-5px,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.h5toast-bounceInUp,.toast-enter--bottom-center{-webkit-animation-name:h5toast-bounceInUp;animation-name:h5toast-bounceInUp}@-webkit-keyframes h5toast-bounceOutUp{20%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0)}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}@keyframes h5toast-bounceOutUp{20%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0)}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}.h5toast-bounceOutUp,.toast-exit--top-center{-webkit-animation-name:h5toast-bounceOutUp;animation-name:h5toast-bounceOutUp}@-webkit-keyframes h5toast-bounceInDown{60%,75%,90%,from,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)}75%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}90%{-webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)}to{-webkit-transform:none;transform:none}}@keyframes h5toast-bounceInDown{60%,75%,90%,from,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)}75%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}90%{-webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)}to{-webkit-transform:none;transform:none}}.h5toast-bounceInDown,.toast-enter--top-center{-webkit-animation-name:h5toast-bounceInDown;animation-name:h5toast-bounceInDown}@-webkit-keyframes h5toast-bounceOutDown{20%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}@keyframes h5toast-bounceOutDown{20%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}.h5toast-bounceOutDown,.toast-exit--bottom-center{-webkit-animation-name:h5toast-bounceOutDown;animation-name:h5toast-bounceOutDown}.h5toast-animated{-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.h5toast{z-index:999;position:fixed;padding:4px;width:320px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff}.h5toast *{-webkit-box-sizing:border-box;box-sizing:border-box}.h5toast--top-left{top:1em;left:1em}.h5toast--top-center{top:1em;left:50%;margin-left:-160px}.h5toast--top-right{top:1em;right:1em}.h5toast--bottom-left{bottom:1em;left:1em}.h5toast--bottom-center{bottom:1em;left:50%;margin-left:-160px}.h5toast--bottom-right{bottom:1em;right:1em}@media only screen and (max-width:480px){.h5toast{width:100vw;padding:0}.h5toast--top-center,.h5toast--top-left,.h5toast--top-right{left:0;top:0;margin:0}.h5toast--bottom-center,.h5toast--bottom-left,.h5toast--bottom-right{left:0;bottom:0;margin:0}}.h5toast__close{padding:0;color:#fff;font-weight:700;font-size:14px;background:0 0;outline:0;border:none;cursor:pointer;opacity:.7;-webkit-transition:.3s ease;transition:.3s ease;-ms-flex-item-align:start;align-self:flex-start}.h5toast__close:focus,.h5toast__close:hover{opacity:1}.h5toast-content--default .h5toast__close{color:#000;opacity:.3}.h5toast-content--default .h5toast__close:hover{opacity:1}.h5toast-content{position:relative;min-height:48px;margin-bottom:1rem;padding:8px;border-radius:1px;-webkit-box-shadow:0 1px 10px 0 rgba(0,0,0,.1),0 2px 15px 0 rgba(0,0,0,.05);box-shadow:0 1px 10px 0 rgba(0,0,0,.1),0 2px 15px 0 rgba(0,0,0,.05);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;max-height:800px;overflow:hidden;font-family:sans-serif;cursor:pointer}.h5toast-content--default{background:#fff;color:#aaa}.h5toast-content--info{background:#3498db}.h5toast-content--success{background:#07bc0c}.h5toast-content--warning{background:#f1c40f}.h5toast-content--error{background:#e74c3c}.h5toast__body{margin:auto 0}@media only screen and (max-width:480px){.h5toast-content{margin-bottom:0}}@-webkit-keyframes track-progress{0%{width:100%}100%{width:0}}@keyframes track-progress{0%{width:100%}100%{width:0}}.h5toast__progress{position:absolute;bottom:0;left:0;width:0;height:5px;z-index:999;opacity:.7;-webkit-animation:track-progress linear 1;animation:track-progress linear 1;background-color:rgba(255,255,255,.7)}.h5toast__progress--default{background:-webkit-gradient(linear,left top,right top,from(#4cd964),color-stop(#5ac8fa),color-stop(#007aff),color-stop(#34aadc),color-stop(#5856d6),to(#ff2d55));background:linear-gradient(to right,#4cd964,#5ac8fa,#007aff,#34aadc,#5856d6,#ff2d55)}");
            style.appendChild(text);
            this.parent.appendChild(style);
            document.body.appendChild(this.parent);
            this.positionItems = {
                'top-left': { parent: null, items: [] },
                'top-center': { parent: null, items: [] },
                'top-right': { parent: null, items: [] },
                'bottom-left': { parent: null, items: [] },
                'bottom-center': { parent: null, items: [] },
                'bottom-right': { parent: null, items: [] },
            };
            this.parent.addEventListener('click', function (e) {
                var target = e.target;
                while (target && !(target.parentNode
                    && /button/i.test(target.nodeName)
                    && target.classList.contains('h5toast__close')
                    && /div/i.test(target.parentNode.nodeName))) {
                    target = target.parentNode;
                }
                if (target) {
                    _this.remove(target.parentNode);
                }
            });
        }
        Toast.prototype.remove = function (item, position) {
            var _this = this;
            if (!position) {
                Object.keys(this.positionItems).some(function (key) {
                    var positionItem = _this.positionItems[key];
                    var index = positionItem.items.indexOf(item);
                    if (index >= 0) {
                        position = key;
                        return true;
                    }
                });
            }
            if (!position) {
                return;
            }
            var positionItem = this.positionItems[position];
            var index = positionItem.items.indexOf(item);
            if (index < 0) {
                return;
            }
            positionItem.items.splice(index, 1);
            item.classList.remove("toast-enter--" + position, 'h5toast-animated');
            item.classList.add("toast-exit--" + position, 'h5toast-animated');
            setTimeout(function () {
                positionItem.parent.removeChild(item);
            }, 750);
        };
        /**
         * 显示消息
         *
         * @param msg 消息问吧
         * @param type 消息类型
         * @param options 选项
         *
         * @example show():base
          ```html
          <span>jsdom</span>
          ```
          ```js
          var toast = new h5toast.Toast()
          var div = toast.show('hello');
          console.log(div.classList.contains('h5toast-content--default'));
          // > true
      
          var div = toast.show('hello', 'error');
          console.log(div.classList.contains('h5toast-content--error'));
          // > true
      
          var div = toast.show('hello', { progress: false });
          console.log(div.classList.contains('h5toast-content--default'));
          // > true
          ```
         */
        Toast.prototype.show = function (msg, type, options) {
            var _this = this;
            if (type === void 0) { type = 'default'; }
            options = options || {};
            if (typeof type === 'object') {
                options = type;
                type = 'default';
            }
            var position = options.position || this.options.position;
            var progress = options.progress === undefined ? this.options.progress : options.progress;
            var timeout = options.timeout === undefined ? this.options.timeout : options.timeout;
            var encode = options.encode === undefined ? this.options.encode : options.encode;
            if (encode) {
                msg = encodeHTML(msg);
            }
            var positionItem = this.positionItems[position];
            if (!positionItem.parent) {
                positionItem.parent = createDiv("<div class=\"h5toast h5toast--" + position + "\"></div>");
                this.parent.appendChild(positionItem.parent);
            }
            var progressHTML = '';
            if (progress && timeout > 0) {
                progressHTML = "<div class=\"h5toast__progress h5toast__progress--" + type + "\" style=\"animation-duration: " + timeout + "ms; -webkit-animation-duration: " + timeout + "ms; animation-play-state: running; -webkit-animation-play-state: running;\"></div>";
            }
            var item = createDiv("<div class=\"h5toast-content h5toast-content--" + type + " toast-enter--" + position + " h5toast-animated\">\n        <div class=\"h5toast__body\">" + msg + "</div><button class=\"h5toast__close\" type=\"button\">\u2716</button>\n        " + progressHTML + "\n      </div>");
            positionItem.items.push(item);
            positionItem.parent.appendChild(item);
            if (timeout > 0) {
                setTimeout(function () {
                    _this.remove(item, position);
                }, timeout);
            }
            return item;
        };
        Toast.prototype.info = function (msg, options) {
            return this.show(msg, 'info', options);
        };
        Toast.prototype.error = function (msg, options) {
            return this.show(msg, 'error', options);
        };
        Toast.prototype.warn = function (msg, options) {
            return this.show(msg, 'warn', options);
        };
        Toast.prototype.success = function (msg, options) {
            return this.show(msg, 'success', options);
        };
        return Toast;
    }());
    exports.Toast = Toast;
});
