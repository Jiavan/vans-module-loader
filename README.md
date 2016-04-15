## vans-module-loader
:trollface:简单实现浏览器端的模块化加载demo

之前用过RequireJS和SeaJS来加载模块，想看看它们背后的实现原理，遂造轮

### CMD写法——vans.cmd.js
```javascript
// 加载red，green模块，red依赖与blue
var red = require('./modules/red.js'),
        green = require('./modules/green.js');

    red.printRed();
    red.printBlue();
    green.printGreen();

// red.js
function printRed() {
    console.log('red');
}
var blue = require('./modules/blue.js');
exports.printRed = printRed;
exports.printBlue = blue.printBlue;

// green.js
function printGreen() {
    console.log('green');
}
exports.printGreen = printGreen;

// blue.js
function printBlue() {
    console.log('blue');
}
exports.printBlue = printBlue;
```
基本实现了模块化加载的思想，但是没有解决模块跨域的问题，后续用动态添加script标签实现，为解决循环依赖，健壮性不强，这里只是体现了一个思想。

### AMD写法——_vans.amd.js
采用AMD风格编写模块，用动态添加script加载模块，正在实现...
