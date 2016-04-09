/**
 * require模块，获得模块代码以及返回模块对象
 * @param moduleId 模块标识
 * @returns {*} 返回模块对象
 */
var require = function (moduleId) {

    // 如果已经加载到缓存，返回缓存中的对象
    if (moduleId in require.cache) {
        return require.cache[moduleId];
    }

    var getModuleContent = function (path) {
        var xhr,
            res = null;

        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = stateChange;
        xhr.open('GET', path, false);

        function stateChange() {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) {
                res = xhr.responseText.toString();
            }
        }
        xhr.send(null);

        return res;
    };

    // 获得模块的代码
    var code = new Function('require, exports, module', getModuleContent(moduleId)),
        exports = {},
        module = {exports: exports};

    // 执行模块代码(将模块中的方法/对象export出来)
    code(require, exports, module);
    // 已加载完模块并记录缓存，返回模块对象
    require.cache[moduleId] = module.exports;

    return module.exports;
};

// 模块缓存对象
require.cache = Object.create(null);


//(function (path) {
//    var script = document.createElement('script');
//    script.src = path;
//    (document.getElementsByTagName('head') || document.body.appendChild(script));
//})();
