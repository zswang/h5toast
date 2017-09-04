h5toast
-----------

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

## Quick Start

```js
var toast = new h5toast.Toast({
  position: 'bottom-right',
})

toast.success('success')
toast.error('error')
toast.show('default', {
  timeout: 100000
})
```

## from

* [react-toastify](https://github.com/fkhadra/react-toastify)

## License

MIT © [zswang](http://weibo.com/zswang)

[npm-url]: https://npmjs.org/package/h5toast
[npm-image]: https://badge.fury.io/js/h5toast.svg
[travis-url]: https://travis-ci.org/zswang/h5toast
[travis-image]: https://travis-ci.org/zswang/h5toast.svg?branch=master
[coverage-url]: https://coveralls.io/github/zswang/h5toast?branch=master
[coverage-image]: https://coveralls.io/repos/zswang/h5toast/badge.svg?branch=master&service=github