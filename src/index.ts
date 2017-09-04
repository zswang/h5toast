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
  constructor() {
    this.parent = document.createElement('div')
    let style = document.createElement('style')
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

    var div = toast.show('hello', 'error');
    console.log(div.classList.contains('h5toast-content--error'));
    // > true

    var div = toast.show('hello', { progress: false });
    console.log(div.classList.contains('h5toast-content--default'));
    // > true
    ```
   */
  show(msg: string, type: ToastType | ToastOptions = 'default', options?: ToastOptions): HTMLDivElement {
    options = options || {}
    if (typeof type === 'object') {
      options = type
      type = 'default'
    }
    let position = options.position || 'top-right'
    let progress = options.progress === undefined ? true : options.progress
    let timeout = options.timeout === undefined ? 5000 : options.timeout
    let encode = options.encode === undefined ? true : options.encode
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

  info(msg: string, options?: ToastOptions): HTMLDivElement {
    return this.show(msg, 'info', options)
  }

  error(msg: string, options?: ToastOptions): HTMLDivElement {
    return this.show(msg, 'error', options)
  }

  warn(msg: string, options?: ToastOptions): HTMLDivElement {
    return this.show(msg, 'warn', options)
  }

  success(msg: string, options?: ToastOptions): HTMLDivElement {
    return this.show(msg, 'success', options)
  }
}