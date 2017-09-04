/**
 * @see https://github.com/fkhadra/react-toastify
 */
export type ToastType = 'default' | 'info' | 'error' | 'success' | 'warn'
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

const htmlEncodeDict: { [key: string]: string } = {
  '"': '#34',
  "'": '#39',
  '<': 'lt',
  '>': 'gt',
  '&': 'amp',
  ' ': 'nbsp',
}

function encodeHTML(text: string) {
  return text.replace(/["<>& ']/g, (all) => {
    return '&' + htmlEncodeDict[all] + ';'
  })
}

function createDiv(html: string) {
  let parent = document.createElement('div')
  parent.innerHTML = html
  return parent.querySelector('div')
}

export interface ToastOptions {
  position?: ToastPosition
  progress?: boolean
  timeout?: number
  encode?: boolean
}

export class Toast {
  parent: HTMLDivElement
  positionItems: {
    [key: string]: {
      parent: HTMLDivElement,
      items: HTMLDivElement[],
    }
  }
  /**
   * 默认配置
   */
  options: ToastOptions
  constructor(options: ToastOptions) {
    this.parent = document.createElement('div')
    let style = document.createElement('style')
    this.options = options || {}
    this.options.position = this.options.position === undefined ? 'top-right' : this.options.position
    this.options.progress = this.options.progress === undefined ? true : this.options.progress
    this.options.timeout = this.options.timeout === undefined ? 5000 : this.options.timeout
    this.options.encode = this.options.encode === undefined ? true : this.options.encode

    /*<remove>*/
    let text = document.createTextNode('')
    /*</remove>*/
    /*<jdists>
    let text = document.createTextNode(<!--jdists encoding="less,autoprefixer,clean-css,quoted"-->@import "./less/index.less";<!--/jdists-->)
    </jdists>*/
    style.appendChild(text)
    this.parent.appendChild(style)
    document.body.appendChild(this.parent)
    this.positionItems = {
      'top-left': { parent: null, items: [] },
      'top-center': { parent: null, items: [] },
      'top-right': { parent: null, items: [] },
      'bottom-left': { parent: null, items: [] },
      'bottom-center': { parent: null, items: [] },
      'bottom-right': { parent: null, items: [] },
    }
    this.parent.addEventListener('click', (e) => {
      let target = e.target as HTMLElement
      while (target && !(target.parentNode
        && /button/i.test(target.nodeName)
        && target.classList.contains('h5toast__close')
        && /div/i.test(target.parentNode.nodeName))) {
        target = target.parentNode as HTMLElement
      }
      if (target) {
        this.remove(target.parentNode as HTMLDivElement)
      }
    })
  }

  remove(item: HTMLDivElement, position?: ToastPosition | string) {
    if (!position) {
      Object.keys(this.positionItems).some((key) => {
        let positionItem = this.positionItems[key]
        let index = positionItem.items.indexOf(item)
        if (index >= 0) {
          position = key
          return true
        }
      })
    }

    if (!position) {
      return
    }

    let positionItem = this.positionItems[position]
    let index = positionItem.items.indexOf(item)
    if (index < 0) {
      return
    }
    positionItem.items.splice(index, 1)
    item.classList.remove(`toast-enter--${position}`, 'h5toast-animated')
    item.classList.add(`toast-exit--${position}`, 'h5toast-animated')
    setTimeout(() => {
      positionItem.parent.removeChild(item)
    }, 750)
  }

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

    var div = toast.show('hello', 'error', {
      timeout: 1000,
      encode: false,
    });
    console.log(div.classList.contains('h5toast-content--error'));
    // > true

    var div = toast.show('hello', { progress: false });
    console.log(div.classList.contains('h5toast-content--default'));
    // > true
    ```
   * @example show():not encode
    ```html
    <span>jsdom</span>
    ```
    ```js
    var toast = new h5toast.Toast({
      encode: false
    })
    var div = toast.show('<em>hello</em>');
    console.log(!!div.querySelector('em'));
    // > true
    ```
   * @example show():timeout
    ```html
    <span>jsdom</span>
    ```
    ```js
    var toast = new h5toast.Toast({
      timeout: 100
    })
    var div = toast.show('hello');
    console.log(!!document.querySelector('.h5toast-content--default'))
    // > true
    setTimeout(function () {
      console.log(!!document.querySelector('.h5toast-content--default'))
      // > false
      // * done
    }, 1000)
    ```
   * @example show():remove
    ```html
    <span>jsdom</span>
    ```
    ```js
    var toast = new h5toast.Toast()
    var div = toast.show('hello');
    console.log(!!document.querySelector('.h5toast-content--default'));
    // > true

    toast.remove(div);
    setTimeout(function () {
      console.log(!!document.querySelector('.h5toast-content--default'));
      // > false
      // * done
    }, 1000)
    toast.remove(div, 'top-center');
    ```
   * @example show():encode
    ```html
    <span>jsdom</span>
    ```
    ```js
    var toast = new h5toast.Toast()
    var div = toast.show('<b>test</b>');
    console.log(document.querySelector('.h5toast__body').innerHTML);
    // > &lt;b&gt;test&lt;/b&gt;
    ```
   * @example show():no progress
    ```html
    <span>jsdom</span>
    ```
    ```js
    var toast = new h5toast.Toast({
      progress: false,
      position: 'top-center',
    })
    var div = toast.show('test');
    console.log(!!document.querySelector('.h5toast__progress'));
    // > false

    console.log(!!document.querySelector('.h5toast--top-center'));
    // > true
    ```
   * @example show():click close button
    ```html
    <span>jsdom</span>
    ```
    ```js
    var toast = new h5toast.Toast({
      position: 'top-center',
    })
    var div = toast.show('test');
    document.querySelector('.h5toast__close').click();
    setTimeout(function () {
      console.log(!!document.querySelector('.h5toast-content--default'));
      // > false
      // * done
    }, 1000)
    document.querySelector('.h5toast__progress').click();
    toast.remove(document.querySelector('.h5toast__progress'))
    ```
   * @example show():timeout -1
    ```html
    <span>jsdom</span>
    ```
    ```js
    var toast = new h5toast.Toast({
      position: 'top-center',
      timeout: -1,
    })
    var div = toast.show('test');
    console.log(!!document.querySelector('.h5toast__progress'));
    // > false
    ```
   */
  show(msg: string, type: ToastType | ToastOptions = 'default', options?: ToastOptions): HTMLDivElement {
    options = options || {}
    if (typeof type === 'object') {
      options = type
      type = 'default'
    }
    let position = options.position || this.options.position
    let progress = options.progress === undefined ? this.options.progress : options.progress
    let timeout = options.timeout === undefined ? this.options.timeout : options.timeout
    let encode = options.encode === undefined ? this.options.encode : options.encode
    if (encode) {
      msg = encodeHTML(msg)
    }
    let positionItem = this.positionItems[position]
    if (!positionItem.parent) {
      positionItem.parent = createDiv(`<div class="h5toast h5toast--${position}"></div>`)
      this.parent.appendChild(positionItem.parent)
    }
    let progressHTML = ''
    if (progress && timeout > 0) {
      progressHTML = `<div class="h5toast__progress h5toast__progress--${type}" style="animation-duration: ${timeout}ms; -webkit-animation-duration: ${timeout}ms; animation-play-state: running; -webkit-animation-play-state: running;"></div>`
    }

    let item = createDiv(
      `<div class="h5toast-content h5toast-content--${type} toast-enter--${position} h5toast-animated">
        <div class="h5toast__body">${msg}</div><button class="h5toast__close" type="button">✖</button>
        ${progressHTML}
      </div>`
    )
    positionItem.items.push(item)
    positionItem.parent.appendChild(item)
    if (timeout > 0) {
      setTimeout(() => {
        this.remove(item, position)
      }, timeout)
    }
    return item
  }

  /**
   * 显示 info 消息
   * 
   * @param msg 消息问吧
   * @param options 选项
   * 
   * @example info():base
    ```html
    <span>jsdom</span>
    ```
    ```js
    var toast = new h5toast.Toast()
    var div = toast.info('hello');
    console.log(div.classList.contains('h5toast-content--info'));
    // > true
    ```
   */
  info(msg: string, options?: ToastOptions): HTMLDivElement {
    return this.show(msg, 'info', options)
  }

  /**
   * 显示 error 消息
   * 
   * @param msg 消息问吧
   * @param options 选项
   * 
   * @example error():base
    ```html
    <span>jsdom</span>
    ```
    ```js
    var toast = new h5toast.Toast()
    var div = toast.error('hello');
    console.log(div.classList.contains('h5toast-content--error'));
    // > true
    ```
   */
  error(msg: string, options?: ToastOptions): HTMLDivElement {
    return this.show(msg, 'error', options)
  }

  /**
   * 显示 warn 消息
   * 
   * @param msg 消息问吧
   * @param options 选项
   * 
   * @example warn():base
    ```html
    <span>jsdom</span>
    ```
    ```js
    var toast = new h5toast.Toast()
    var div = toast.warn('hello');
    console.log(div.classList.contains('h5toast-content--warn'));
    // > true
    ```
   */
  warn(msg: string, options?: ToastOptions): HTMLDivElement {
    return this.show(msg, 'warn', options)
  }

  /**
   * 显示 success 消息
   * 
   * @param msg 消息问吧
   * @param options 选项
   * 
   * @example success():base
    ```html
    <span>jsdom</span>
    ```
    ```js
    var toast = new h5toast.Toast()
    var div = toast.success('hello');
    console.log(div.classList.contains('h5toast-content--success'));
    // > true
    ```
   */
  success(msg: string, options?: ToastOptions): HTMLDivElement {
    return this.show(msg, 'success', options)
  }
}