/**
 * @file h5toast
 
 * @url https://github.com/zswang/h5toast.git
 
 * Simple toast notifications of Mobile Web
 * @author
     
 *   Fadi Khadra (https://fkhadra.github.io)
     
 *   zswang (http://weibo.com/zswang)
     
 * @version 0.0.9
     
 * @date 2017-10-06
 * @license MIT
 */
/**
 * @see https://github.com/fkhadra/react-toastify
 */
export declare type ToastType = 'default' | 'info' | 'error' | 'success' | 'warning';
export declare type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export interface ToastOptions {
    position?: ToastPosition;
    progress?: boolean;
    timeout?: number;
    encode?: boolean;
}
export declare class Toast {
    parent: HTMLDivElement;
    positionItems: {
        [key: string]: {
            parent: HTMLDivElement;
            items: HTMLDivElement[];
        };
    };
    /**
     * 默认配置
     */
    options: ToastOptions;
    constructor(options: ToastOptions);
    remove(item: HTMLDivElement, position?: ToastPosition | string): void;
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
    show(msg: string, type?: ToastType | ToastOptions, options?: ToastOptions): HTMLDivElement;
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
    info(msg: string, options?: ToastOptions): HTMLDivElement;
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
    error(msg: string, options?: ToastOptions): HTMLDivElement;
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
      console.log(div.classList.contains('h5toast-content--warning'));
      // > true
      ```
     */
    warn(msg: string, options?: ToastOptions): HTMLDivElement;
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
    success(msg: string, options?: ToastOptions): HTMLDivElement;
}
