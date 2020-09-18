localStorage.setItem(LOG.ISLOG, 'true');
localStorage.setItem(LOG.ISINFO, 'true');
localStorage.setItem(LOG.ISWARN, 'true');
localStorage.setItem(LOG.ISERROR, 'true');

//https://blog.csdn.net/qq_31496003/article/details/88052223?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~all~first_rank_v2~rank_v25-8-88052223.nonecase&utm_term=log4js%E5%8F%AF%E4%BB%A5%E6%89%93%E5%8D%B0%E5%BD%93%E5%89%8D%E5%87%BD%E6%95%B0%E5%90%8D

var getStackTrace = function (arguments) {
    var obj = {};
    Error.captureStackTrace(obj, getStackTrace);

    var stack = obj.stack || "";
    var matchResult = stack.match(/\(.*?\)/g) || [];
    var line = matchResult[1] || "";
    for (var i in arguments) {

    }
    if (typeof arguments[i] == 'object') {
        arguments[i] = JSON.stringify(arguments[i]);
    }
    arguments[i] += '----' + line.replace("(", "").replace(")", "");

    return arguments;
};
console.log = (function (oriLogFunc) {
    return function () {
        //判断配置文件是否开启日志调试
        if (localStorage.getItem(LOG.ISLOG) == 'true') {
            try{
                oriLogFunc.call(console, ...getStackTrace(arguments));
            }catch(e){
                console.error('console.log error', e);
            }
        }

    }
})(console.log);
console.info = (function (oriLogFunc) {
    return function () {
        //判断配置文件是否开启日志调试
        if (localStorage.getItem(LOG.ISINFO) == 'true') {
            try{
                oriLogFunc.call(console, ...getStackTrace(arguments));
            }catch(e){
                console.error('console.info error', e);
            }
        }

    }
})(console.info);
console.warn = (function (oriLogFunc) {
    return function () {
        //判断配置文件是否开启日志调试
        if (localStorage.getItem(LOG.ISWARN) == 'true') {
            try{
                oriLogFunc.call(console, ...getStackTrace(arguments));
            }catch(e){
                console.error('console.warn error', e);
            }
        }

    }
})(console.warn);
console.error = (function (oriLogFunc) {
    return function () {
        //判断配置文件是否开启日志调试
        if (localStorage.getItem(LOG.ISERROR) == 'true') {
            try{
                oriLogFunc.call(console, ...getStackTrace(arguments));
            }catch(e){
                console.error('console.error error', e);
            }
        }

    }
})(console.error);

