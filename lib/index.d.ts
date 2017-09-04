/**
 * @see https://github.com/fkhadra/react-toastify
 */
export declare type ToastType = 'default' | 'info' | 'error' | 'success' | 'warn';
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
  
      var div = toast.show('hello', 'error');
      console.log(div.classList.contains('h5toast-content--error'));
      // > true
  
      var div = toast.show('hello', { progress: false });
      console.log(div.classList.contains('h5toast-content--default'));
      // > true
      ```
     */
    show(msg: string, type?: ToastType | ToastOptions, options?: ToastOptions): HTMLDivElement;
    info(msg: string, options?: ToastOptions): HTMLDivElement;
    error(msg: string, options?: ToastOptions): HTMLDivElement;
    warn(msg: string, options?: ToastOptions): HTMLDivElement;
    success(msg: string, options?: ToastOptions): HTMLDivElement;
}
