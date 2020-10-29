/**
 *  Created by LightJoker on 2020-08-28
 */

;$(function(){

    // 全局初始 - 各页面引用
    //globalInit(globalInitCallback);
});

// 全局初始
function globalInit(callback){
    var initCount = 0;

    // 初始化 - loading
    $.lightJokerLib.loading.init({
        pluginName: $.lightJokerLib.loading.plugin.loadingoverlay,
        callback: function(){
            $.LoadingOverlaySetup({
                background: "rgba(0, 0, 0, 0.5)",
                size: 8
            });

            $.lightJokerLib.loading.show();

            initEnd();
        }
    });
    // 初始化 - select
    $.lightJokerLib.select.init({
        pluginName: $.lightJokerLib.select.plugin.select2,
        callback: function(){
            if(sessionStorage.getItem(LIGHTJOKERCONST_WEBSETTING.EDITSHOW.KEY) == LIGHTJOKERCONST_WEBSETTING.EDITSHOW.MODAL) {
                $.lightJokerLib.select.bind('.lightJoker-select', {serverSide: false});
            }
            initEnd();
        }
    });
    // 初始化 - editSelect
    $.lightJokerLib.editSelect.init({
        pluginName: $.lightJokerLib.editSelect.plugin.editableSelect,
        callback: function(){
            if(sessionStorage.getItem(LIGHTJOKERCONST_WEBSETTING.EDITSHOW.KEY) == LIGHTJOKERCONST_WEBSETTING.EDITSHOW.MODAL) {
                $.lightJokerLib.select.bind('.lightJoker-editSelect', {serverSide: false});
            }
            initEnd();
        }
    });
    // 初始化 - date
    $.lightJokerLib.date.init({
        pluginName: $.lightJokerLib.date.plugin.datetimepicker,
        callback: function(){
            if(sessionStorage.getItem(LIGHTJOKERCONST_WEBSETTING.EDITSHOW.KEY) == LIGHTJOKERCONST_WEBSETTING.EDITSHOW.MODAL) {
                $.lightJokerLib.date.bindSampleDate('.lightJoker-date');
                $.lightJokerLib.date.bindSampleDateTime('.lightJoker-datetime');
                $.lightJokerLib.date.bindMultipleDate('.lightJoker-date-multiple');
                $.lightJokerLib.date.bindMultipleDateTime('.lightJoker-datetime-multiple');
            }

            initEnd();
        }
    });
    // 初始化 - notice
    $.lightJokerLib.notice.init({
        pluginName: $.lightJokerLib.notice.plugin.pnotify,
        callback: function(){
            //设置全局配置 - 通知条
            PNotify.prototype.options.styling = "bootstrap3";
            PNotify.prototype.options.delay = 5000;


            initEnd();
        }
    });
    // 初始化 - tip
    $.lightJokerLib.tip.init({
        pluginName: $.lightJokerLib.tip.plugin.qTip2,
        callback: function(){
            initEnd();
        }
    });
    // 初始化 messager
    $.lightJokerLib.messager.init({
        pluginName: $.lightJokerLib.messager.plugin.layer,
        callback:function(){
            initEnd();
        }
    });
    // 初始化 alert
    $.lightJokerLib.alert.init({
        pluginName: $.lightJokerLib.alert.plugin.layer,
        callback:function(){

        }
    });

    // 初始化 - prompt
    $.lightJokerLib.prompt.init({
        pluginName: $.lightJokerLib.prompt.plugin.layer,
        callback: function(){

        }
    });

    // 初始化 - confirm
    $.lightJokerLib.confirm.init({
        pluginName: $.lightJokerLib.confirm.plugin.layer,
        callback: function(){

        }
    });

    // 初始化 - tab
    $.lightJokerLib.tab.init({
        pluginName: $.lightJokerLib.tab.plugin.layer,
        callback: function(){

        }
    });
    // 初始化 - modal
    $.lightJokerLib.modal.init({
        pluginName: $.lightJokerLib.modal.plugin.layer,
        callback: function(){

        }
    });


    // 实例化 - lightJokerPageScope
    new $.lightJokerPageScope();

    function initEnd(){
        initCount++;

        if(initCount == 7){
            $.lightJokerLib.loading.hide();

            if(!isNull(callback))
                callback();
        }
    }
}

// 获取请求中参数值
function getRequestParamValue(paramName){
    var args = new Object();
    var query = location.search.substring(1);

    var pairs = query.split("&"); // Break at ampersand
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[argname] = value;
    }
    return args[paramName];
}

// 判断空
function isNull(param){
    if(param == null || param == undefined)
        return true;
    else
        param = param.toString();

    if(typeof(param) == 'undefined')
        return true;

    if(param == '')
        return true;

    if(param == 'null')
        return true;

    return false;
}

// 处理空
function dealNull(param){
    if(isNull(param))
        return '';
    else
        return param;
}

// 处理重复
function distinctArrray(arrParam){
    arrParam.sort();
    let hash = [arrParam[0]];
    for (let i = 1; i < arrParam.length; i++) {
        if (arrParam[i] != hash[hash.length - 1]) {
            hash.push(arrParam[i]);
        }
    }
    return hash;
}

// 格式化编码 - 3 位
function formatNo3(param){
    param = parseInt(param);
    if(param < 10)
        return '00' + param;
    else if(param >= 10 && param < 100)
        return '0' + param;
    else
        return param;
}
// 格式化编码 - 2 位
function formatNo2(param){
    param = parseInt(param);
    if(param < 10)
        return '0' + param;
    else
        return param;
}

/**
 *  动态加载参考
 *  https://www.cnblogs.com/morang/p/dynamicloadjscssiframe.html
 */
/**
 * 动态加载JS
 * @param {string} url 脚本地址
 * @param {function} callback  回调函数
 */
function dynamicLoadJs(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if(typeof(callback)=='function'){
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
                callback();
                script.onload = script.onreadystatechange = null;
            }
        };
    }
    head.appendChild(script);
}
/**
 * 动态加载CSS
 * @param {string} url 样式地址
 */
function dynamicLoadCss(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type='text/css';
    link.rel = 'stylesheet';
    link.href = url;
    if(typeof(callback)=='function'){
        link.onload = link.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
                callback();
                link.onload = link.onreadystatechange = null;
            }
        };
    }
    head.appendChild(link);
}
/**
 * 动态加载css脚本
 * @param {string} cssText css样式
 */
function loadStyleString(cssText) {
    var style = document.createElement("style");
    style.type = "text/css";
    try{
        // firefox、safari、chrome和Opera
        style.appendChild(document.createTextNode(cssText));
    }catch(ex) {
        // IE早期的浏览器 ,需要使用style元素的stylesheet属性的cssText属性
        style.styleSheet.cssText = cssText;
    }
    document.getElementsByTagName("head")[0].appendChild(style);

    // 测试
    //var css = "body{color:blue;}";
    //loadStyleString(css);
}
/**
 * 动态加载js脚本
 * @param {string} code js脚本
 */
function loadScriptString(code) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    try{
        // firefox、safari、chrome和Opera
        script.appendChild(document.createTextNode(code));
    }catch(ex) {
        // IE早期的浏览器 ,需要使用script的text属性来指定javascript代码。
        script.text = code;
    }
    document.getElementsByTagName("head")[0].appendChild(script);

    // 测试
    //var text = "function test(){alert('test');}";
    //loadScriptString(text);
    //test();
}
/**
 * 动态加载Iframe
 * @param {string} url 脚本地址
 * @param {function} callback  回调函数
 * @param {string} style  加载样式
 */
function dynamicLoadIframe(url,callback,style) {
    var body = document.getElementsByTagName('body')[0];
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style=style||'display:none;width:0px;height:0px;';
    if(typeof(callback)=='function'){
        iframe.onload = iframe.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                callback();
                iframe.onload = iframe.onreadystatechange = null;
            }
        };
    }
    body.appendChild(iframe);
}
/**
 * query 参数转对象
 * @returns {string}
 */
function query(search) {
    let str = search || window.location.search
    let objURL = {}

    str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
        objURL[$1] = $3
    })
    return objURL

    // 测试
    // query('?v=1')
}
/**
 * 对象转query参数
 * @returns {string}
 */
function queryString(url, query) {
    let str = []
    for (let key in query) {
        str.push(key + '=' + query[key])
    }
    let paramStr = str.join('&')
    return paramStr ? `${url}?${paramStr}` : url

    // 参数
    // queryString('http://192.168.1.32:3638/checkout',{abc:123})
}

// 辨别 浏览器
function decideBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1
        && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1
        && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1
        && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return "IE7";
        } else if (fIEVersion == 8) {
            return "IE8";
        } else if (fIEVersion == 9) {
            return "IE9";
        } else if (fIEVersion == 10) {
            return "IE10";
        } else if (fIEVersion == 11) {
            return "IE11";
        } else {
            return "0";
        }//IE版本过低
        return "IE";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isEdge) {
        return "Edge";
    }
    if (isFF) {
        return "FF";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }

}

// 产生随机数
function randomScaling() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}