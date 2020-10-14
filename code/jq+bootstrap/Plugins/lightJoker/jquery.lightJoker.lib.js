/*
    工具库
    Created by Light on 2020-09-02
 */
;jQuery.lightJokerLib = {
    plugin: {},
    loadPlugin: function(plugin, callback){
        $.each(plugin.css, function(cssIndex, cssObj){
            if($('link[href="' + cssObj + '"]').length > 0){
                console.log(cssObj + ' 该文件已加载. ');
                return true;
            }

            dynamicLoadCss(cssObj, null);   // 加载 CSS 时, 不回调
        });

        // 如果只有一个文件,则调用基础的异步实现
        if(plugin.js.length === 1){
            if($('script[src="' + plugin.js[0] + '"]').length > 0){
                console.log(plugin.js[0] + ' 该文件已加载. ');
                return;
            }

            dynamicLoadJs(plugin.js[0], callback);
        }
        // 如果有多个文件, 则同步进行加载
        else{
            $.each(plugin.js, function(jsIndex, jsObj){
                if($('script[src="' + jsObj + '"]').length > 0){
                    console.log(jsObj + ' 该文件已加载. ');
                    return true;
                }

                // 只在最后一次加载完毕后, 回调
                if(jsIndex == plugin.js.length -1){
                    $LAB.script(jsObj).wait(callback);
                }
                else{
                    $LAB.script(jsObj).wait();
                }
            });
        }

    },
    initPlugin: function(options){
        var defaults = $.extend({
            pluginType: '',
            pluginName: '',
            srcFix: '',
            callback: null
        }, options);

        sessionStorage.setItem(defaults.pluginType, defaults.pluginName);

        $.lightJokerLib.loadPlugin({
            js:[
                'Plugins/lightJoker/plugin/jquery.lightJoker.plugin.' + defaults.pluginName + '.js'
            ]
        }, function(){
            $.lightJokerLib.plugin[defaults.pluginName].init(defaults.callback);
        })
    },
    bindPlugin: function(pluginType, element, options){
        if($(element).length == 0){
            console.log(sessionStorage.getItem(pluginType) + ' bind 未找到匹配元素, 停止 : ' + element);
            return;
        }
        return $.lightJokerLib.plugin[sessionStorage.getItem(pluginType)].bind(element, options);
    },
    valuePlugin: function(pluginType, element, value){
        return $.lightJokerLib.plugin[sessionStorage.getItem(pluginType)].value(element, value);
    },
    textPlugin: function(pluginType, element){
        return $.lightJokerLib.plugin[sessionStorage.getItem(pluginType)].text(element);
    },
    attrPlugin: function(pluginType, element, attrName){
        return $.lightJokerLib.plugin[sessionStorage.getItem(pluginType)].attr(element, attrName);
    },
    destroyPlugin: function(pluginType, element){
        return $.lightJokerLib.plugin[sessionStorage.getItem(pluginType)].destroy(element);
    },
    ajax: {
        init: function(options){

        },
        post: function(options){
            var defaults = $.extend(true, {
                type: 'post',
                async: true,
                webApi: false,
                cache: false,
                url: '',
                data: {
                    ACT: ''
                },
                dataType: 'json',
                beforeSend: function(){ },
                complete: function(data){ },
                success: function(data){ },
                error: function (data){
                    if (data.readyState != 4 || data.status != 200)
                    {
                        var _errContent = data.responseText;
                        if (isNull(_errContent))
                            _errContent = data.statusText;
                        console.log(_errContent);
                    }
                }
            }, options);

            if(defaults.webApi){
                defaults.data = JSON.stringify(defaults.data);
            }

            return $.ajax({
                type: defaults.type,
                url: defaults.url,
                async: defaults.async,
                cache: defaults.cache,
                data: defaults.data,
                dataType: defaults.dataType,
                contentType: defaults.contentType,
                beforeSend: defaults.beforeSend,
                complete: defaults.complete,
                success: function(data){
                    switch(data.Sign){
                        case SIGNS.SUCCESS:
                            defaults.success(data);
                            break;
                        case SIGNS.FAILD:
                            break;
                        default:
                            defaults.success(data);
                            break;
                    }
                },
                error: defaults.error
            })
        },
        get: function(options){

        }
    },
    select: {
        plugin: {
            select2: 'select2'
        },
        init: function(options){
            var defaults = $.extend(true, {
                callback: null
            }, options);

            return $.lightJokerLib.initPlugin({
                pluginType: PLUGIN.SELECT,
                pluginName: $.lightJokerLib.select.plugin.select2,
                srcFix: '',
                callback: defaults.callback
            });
        },
        bind: function(element, options){
            return $.lightJokerLib.bindPlugin(PLUGIN.SELECT, element, options);
        },
        value: function(element, value){
            return $.lightJokerLib.valuePlugin(PLUGIN.SELECT, element, value);
        },
        text: function(element){
            return $.lightJokerLib.textPlugin(PLUGIN.SELECT, element);
        },
        attr: function(element, attrName){
            return $.lightJokerLib.attrPlugin(PLUGIN.SELECT, element, attrName);
        },
        destroy: function(element){
            return $.lightJokerLib.destroyPlugin(PLUGIN.SELECT, element);
        }
    },
    editSelect: {
        plugin:{
            editableSelect: 'editableSelect'
        },
        init: function(options){
            var defaults = $.extend(true, {
                callback: null
            }, options);

            return $.lightJokerLib.initPlugin({
                pluginType: PLUGIN.EDITSELECT,
                pluginName: $.lightJokerLib.editSelect.plugin.editableSelect,
                srcFix: '',
                callback: defaults.callback
            });
        },
        bind: function(element, options){
            return $.lightJokerLib.bindPlugin(PLUGIN.EDITSELECT, element, options);
        },
        value: function(element, value){
            return $.lightJokerLib.valuePlugin(PLUGIN.EDITSELECT, element, value);
        },
        attr: function(element, attrName){
            return $.lightJokerLib.attrPlugin(PLUGIN.EDITSELECT, element, attrName);
        },
        destroy: function(element){
            return $.lightJokerLib.destroyPlugin(PLUGIN.EDITSELECT, element);
        }
    },
    date: {
        plugin:{
            datepicker: 'datepicker',
            datetimepicker: 'datetimepicker',
            daterangepicker: 'daterangepicker'
        },
        init: function(options){
            var defaults = $.extend(true, {
                callback: null
            }, options);

            return $.lightJokerLib.initPlugin({
                pluginType: PLUGIN.DATE,
                pluginName: $.lightJokerLib.date.plugin.datetimepicker,
                srcFix: '',
                callback: defaults.callback
            });
        },
        bindSampleDate: function(element, options){
            switch(sessionStorage.getItem(PLUGIN.DATE)){
                case $.lightJokerLib.date.plugin.datetimepicker:
                    return $.lightJokerLib.bindPlugin(PLUGIN.DATE, element, $.extend(true, {
                        format: 'YYYY-MM-DD'
                    }, options));
                    break;
                default:
                    return $.lightJokerLib.bindPlugin(PLUGIN.DATE, element, options);
                    break;
            }
        },
        bindSampleDateTime: function(element, options){
            switch(sessionStorage.getItem(PLUGIN.DATE)){
                case $.lightJokerLib.date.plugin.datepicker:
                    console.log(' datepicker bindSampleDateTime datetime 不支持 ');
                    break;
                default:
                    return $.lightJokerLib.bindPlugin(PLUGIN.DATE, element, options);
                    break;
            }
        },
        bindMultipleDate: function(element, options){
            switch(sessionStorage.getItem(PLUGIN.DATE)){
                case $.lightJokerLib.date.plugin.datetimepicker:
                    console.log(' datetimepicker bindMultipleDate multiple 不支持 ');
                    break;
                default:
                    return $.lightJokerLib.bindPlugin(PLUGIN.DATE, element, options);
                    break;
            }
        },
        bindMultipleDateTime: function(element, options){
            switch(sessionStorage.getItem(PLUGIN.DATE)){
                case $.lightJokerLib.date.plugin.datepicker:
                    console.log(' datepicker bindMultipleDateTime datetime 不支持 ');
                    break;
                case $.lightJokerLib.date.plugin.datetimepicker:
                    console.log(' datetimepicker bindMultipleDateTime datetime 不支持 ');
                default:
                    return $.lightJokerLib.bindPlugin(PLUGIN.DATE, element, options);
                    break;
            }
        },
        value: function(element, value){
            switch(sessionStorage.getItem(PLUGIN.DATE)){
                case $.lightJokerLib.date.plugin.daterangepicker:
                    console.log('daterangepicker value 未实现');
                    break;
                default:
                    return $.lightJokerLib.date.valuePlugin(PLUGIN.DATE, element, value);
                    break;
            }
        }
    },
    messager: {
        plugin:{
            layer: 'layer'
        },
        init: function(options){
            var defaults = $.extend(true, {
                callback: null
            }, options);

            return $.lightJokerLib.initPlugin({
                pluginType: PLUGIN.MESSAGER,
                pluginName: $.lightJokerLib.messager.plugin.layer,
                srcFix: '',
                callback: defaults.callback
            });
        },
        info: function(options){
            var defaults = $.extend(true, {
                content: '',
                btnCloseEvent: function() {}
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.MESSAGER)].messager.info(defaults);
        },
        warning: function(options){
            var defaults = $.extend(true, {
                content: '',
                btnCloseEvent: function() {}
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.MESSAGER)].messager.warning(defaults);
        },
        error: function(options){
            var defaults = $.extend(true, {
                content: '',
                area: 'auto',
                btnCloseEvent: function() {}
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.MESSAGER)].messager.error(defaults);
        },
        success: function(options){
            var defaults = $.extend(true, {
                content: '',
                btnCloseEvent: function() {}
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.MESSAGER)].messager.success(defaults);
        }
    },
    alert: {
        plugin:{
            layer: 'layer'
        },
        init: function(options){
            var defaults = $.extend(true, {
                callback: null
            }, options);

            return $.lightJokerLib.initPlugin({
                pluginType: PLUGIN.ALERT,
                pluginName: $.lightJokerLib.alert.plugin.layer,
                srcFix: '',
                callback: defaults.callback
            });
        },
        info: function(options){
            var defaults = $.extend(true, {
                title: '',
                content: '',
                btnOkEvent: function(){ return true; }
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.ALERT)].alert.info(defaults);
        },
        warning: function(options){
            var defaults = $.extend(true, {
                title: '',
                content: '',
                btnOkEvent: function(){ return true; }
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.ALERT)].alert.warning(defaults);
        },
        error: function(options){
            var defaults = $.extend(true, {
                title: '',
                content: '',
                btnOkEvent: function(){ return true; }
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.ALERT)].alert.error(defaults);
        },
        success: function(options){
            var defaults = $.extend(true, {
                title: '',
                content: '',
                btnOkEvent: function(){ return true; }
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.ALERT)].alert.success(defaults);
        }
    },
    notice: {
        plugin: {
            pnotify: 'pnotify'
        },
        init: function(options){
            var defaults = $.extend(true, {
                callback: null
            }, options);

            return $.lightJokerLib.initPlugin({
                pluginType: PLUGIN.NOTICE,
                pluginName: $.lightJokerLib.notice.plugin.pnotify,
                srcFix: '',
                callback: defaults.callback
            });
        },
        info: function(options){
            var defaults = $.extend(true, {
                content: ''
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.NOTICE)].notice.info(defaults);
        },
        success: function(options){
            var defaults = $.extend(true, {
                content: ''
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.NOTICE)].notice.success(defaults);
        },
        error: function(options){
            var defaults = $.extend(true, {
                content: ''
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.NOTICE)].notice.error(defaults);
        },
        warning: function(options){
            var defaults = $.extend(true, {
                content: ''
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.NOTICE)].notice.warning(defaults);
        }
    },
    confirm: {
        plugin:{
            layer: 'layer'
        },
        init: function(options){
            var defaults = $.extend(true, {
                callback: null
            }, options);

            return $.lightJokerLib.initPlugin({
                pluginType: PLUGIN.CONFIRM,
                pluginName: $.lightJokerLib.confirm.plugin.layer,
                srcFix: '',
                callback: defaults.callback
            });
        },
        show: function(options){
            var defaults = $.extend(true, {
                title: '',
                content: '',
                btnOkEvent: function(){ return true; },
                btnCancelEvent: function(){ return true; }
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.CONFIRM)].confirm.show(defaults);
        }
    },
    tip: {
        plugin:{
            qTip2: 'qTip2'
        },
        init: function(options){
            var defaults = $.extend(true, {
                callback: null
            }, options);

            return $.lightJokerLib.initPlugin({
                pluginType: PLUGIN.TIP,
                pluginName: $.lightJokerLib.tip.plugin.qTip2,
                srcFix: '',
                callback: defaults.callback
            });
        },
        bind: function(element, options){
            return $.lightJokerLib.bindPlugin(PLUGIN.TIP, element, options);
        },
        destroy: function(element){
            return $.lightJokerLib.destroyPlugin(PLUGIN.TIP, element);
        }
    },
    tab: {
        plugin: {
            layer: 'layer'
        },
        init: function(options){
            var defaults = $.extend(true, {
                callback: null
            }, options);

            return $.lightJokerLib.initPlugin({
                pluginType: PLUGIN.TAB,
                pluginName: $.lightJokerLib.tab.plugin.layer,
                srcFix: '',
                callback: defaults.callback
            });
        },
        show: function(options){
            var defaults = $.extend(true, {
                area: ['55%', 'auto'],
                tab: [
                    // {
                    //     title: '',
                    //     url: '',
                    //     content: ''
                    // }
                ]
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.TAB)].tab.show(defaults);
        },
        close: function(options){
            var defaults = $.extend(true, {

            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.TAB)].tab.close(defaults);
        }
    },
    modal: {
        plugin: {
            layer: 'layer'
        },
        init: function(options){
            var defaults = $.extend(true, {
                callback: null
            }, options);

            return $.lightJokerLib.initPlugin({
                pluginType: PLUGIN.MODAL,
                pluginName: $.lightJokerLib.modal.plugin.layer,
                srcFix: '',
                callback: defaults.callback
            });
        },
        show: function(options){
            var defaults = $.extend(true, {
                title: false,
                url: '',
                area: ['55%', 'auto'],
                content: '',
                btn: ['保存', '取消'],
                btnOkEvent: function(index, layerok){ return true; },
                btnCancelEvent: function(){ return true; },
                btnCloseEvent: function(){ return true; }
            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.MODAL)].modal.show(defaults);
        },
        close: function(options){
            var defaults = $.extend(true, {

            }, options);

            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.MODAL)].modal.close(defaults);
        }
    },
    loading: {
        plugin: {
            loadingoverlay: 'loadingoverlay'
        },
        init: function(options){
            var defaults = $.extend(true, {
                callback: null
            }, options);

            return $.lightJokerLib.initPlugin({
                pluginType: PLUGIN.LOADING,
                pluginName: $.lightJokerLib.loading.plugin.loadingoverlay,
                srcFix: '',
                callback: defaults.callback
            });
        },
        show: function(options){
            var defaults = $.extend(true, {}, options);
            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.LOADING)].loading.show(defaults);
        },
        hide: function(options){
            var defaults = $.extend(true, {}, options);
            return $.lightJokerLib.plugin[sessionStorage.getItem(PLUGIN.LOADING)].loading.hide(defaults);
        }
    },
    scroll: {
        init: function(options){

        },
        bind: function(element, options){

        }
    },
    speech: {
        init: function(options){

        },
        speak: function(options){

        }
    },
    excel: {
        init: function(options){

        },
        export: function(options){

        }
    }
}