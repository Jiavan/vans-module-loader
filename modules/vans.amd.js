(function () {

    var moduleCache = {};

    var require = function (deps, callback) {
        var params = [];
        var depCount = 0;
        var i, len, isEmpty = false, modName;

        modName = document.currentScript && document.currentScript.id;

        if (deps.length) {
            for (i = 0, len = deps.length; i < len; i++) {
                depCount++;

            }
        }
    };

    var getPathUrl = function (modName) {
        var url = modName;

        if (url.lastIndexOf('.js') === -1) {
            url += '.js';
        }

        return url;
    };

    var loadModule = function (modName, callback) {
        var url = getPathUrl(modName),
            mod;

        if (moduleCache[modName]) {
            mod = moduleCache[modName];
            if (mod.status === 'loaded') {
                setTimeout(callback(this.params), 0);
            } else {
                mod.onload.push(callback);
            }
        } else {
            mod = moduleCache[modName] = {
                modName: modName,
                status: 'loading',
                export: null,
                onload: [callback]
            };

            _script = document.createElement('script');
            _script.id = modName;
            _script.type = 'text/javascript';
            _script.charset = 'utf-8';
            _script.async = true;
            _script.src = url;

            document.getElementsByTagName('head')[0].appendChild(_script);
        }
    };
})();