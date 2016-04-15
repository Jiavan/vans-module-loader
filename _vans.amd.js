(function() {

    var define;
    window.modules = {

    };

    // 获得完整的url路径
    var getUrl = function (src) {

        var scriptSrc = '';
        if (src.indexof('/') === 0 || src.indexof('./') === 0) {
            scriptSrc = require.config.base + src.replace(/^\//, '');
        } else if (src.indexof('http:') === 0) {
            scriptSrc = src;
        } else if (src.match(/^[a-zA-Z0-9]/)) {
            scriptSrc = require.config.base + src;
        } else {
            console.log('src err');
        }

        if (src.lastIndexOf('.js') === -1) {
            scriptSrc += '.js';
        }

        return scriptSrc;
    };

    var loadScript = function (src) {
        var scriptSrc = getUrl(src);
        var scriptEle = document.createElement('script');
        var headEle = document.getElementsByName('head')[0];

        scriptEle.src = scriptSrc;
        scriptEle.onload = function () {
            console.log('script tag is load , the url is :' + scriptSrc);
        };
        headEle.appendChild(scriptEle);
    };

    var getBasePath = function () {
        var src = getCurrentPath();
        var index = src.lastIndexOf('/');
        return src.substring(0, index + 1);
    };
    var getCurrentNode = function () {

        if (document.currentScript) {
            return document.currentScript;
        }
        var scriptArr = document.getElementsByName('script');
        var len = scriptArr.length;

        for (var i = 0; i < len; i++) {
            if (scriptArr.readyState === 'interactive') {
                return scriptArr[i];
            }
        }
    };
    var getCurrentPath = function () {

    };
    var loadDpt = function (module) {
        var dp = '';
        for (var p = 0; p < module.dps.length; p++) {
            dp = getUrl(module.dps[p]);
            if (!modules[dp]) {
                loadScript(dp);
            }
        }
    };
    var checkDps = function () {

    };

    define = function (deps, fn, name) {
        if (typeof deps === 'function') {
            fn = deps;
            deps = [];
        }

        if (typeof deps !== 'object' && typeof fn === 'function') {
            console.log('参数错误');
        }

        var src = getCurrentPath();

        if (deps.length === 0) {
            modules[src] = {
                name: name || src,
                src: src,
                dps: [],
                exports: (typeof fn === 'function') && fn(),
                state: 'complete'
            };
            return checkDps();
        } else {
            modules[src] = {
                name: name || src,
                src: src,
                dps: deps,
                exports: fn,
                state: 'initial'
            };

            return checkDps();
        }
    };
    window.define = define;

    window.require = function () {

    };
})();