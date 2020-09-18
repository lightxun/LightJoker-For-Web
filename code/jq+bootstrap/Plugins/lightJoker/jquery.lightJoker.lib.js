/*
    工具库
    Created by Light on 2020-09-02
 */
;jQuery.lightJokerLib = {
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
                'Plugins/lightJoker/lib/jquery.lightJoker.lib.' + defaults.pluginName
            ]
        })

        $.lightJokerLib[defaults.pluginName].init(defaults.callback);
    },
    bindPlugin: function(pluginType, element, options){
        if($(element).length == 0){
            console.log(sessionStorage.getItem(pluginType) + ' bind 未找到匹配元素, 停止 : ' + element);
            return;
        }
        return $.lightJokerLib[sessionStorage.getItem(pluginType)].bind(element, options);
    },
    valuePlugin: function(pluginType, element, value){
        return $.lightJokerLib[sessionStorage.getItem(pluginType)].value(element, value);
    },
    textPlugin: function(pluginType, element){
        return $.lightJokerLib[sessionStorage.getItem(pluginType)].text(element);
    },
    attrPlugin: function(pluginType, element, attrName){
        return $.lightJokerLib[sessionStorage.getItem(pluginType)].attr(element, attrName);
    },
    destroyPlugin: function(pluginType, element){
        return $.lightJokerLib[sessionStorage.getItem(pluginType)].destroy(element);
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
        init: function(options){
            return $.lightJokerLib.initPlugin({
                pluginType: PLUGIN.SELECT,
                pluginName: $.lightJokerLib.select2.name,
                srcFix: '',
                callback: options.callback
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
        init: function(options){
            return $.lightJokerLib.initPlugin({
                pluginType: PLUGIN.EDITSELECT,
                pluginName: $.lightJokerLib.editableSelect.name,
                srcFix: '',
                callback: options.callback
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
        init: function(options){
            return $.lightJokerLib.initPlugin({
                pluginType: PLUGIN.DATE,
                pluginName: $.lightJokerLib.datetimepicker.name,
                srcFix: '',
                callback: options.callback
            });
        },
        bindSampleDate: function(element, options){
            switch(sessionStorage.getItem(PLUGIN.DATE)){
                case $.lightJokerLib.datetimepicker.name:
                    return $.lightJokerLib.bindPlugin(PLUGIN.EDITSELECT, element, $.extend(true, {
                        format: 'YYYY-MM-DD'
                    }, options));
                    break;
                default:
                    return $.lightJokerLib.bindPlugin(PLUGIN.EDITSELECT, element, options);
                    break;
            }
        },
        bindSampleDateTime: function(element, options){
            switch(sessionStorage.getItem(PLUGIN.DATE)){
                case $.lightJokerLib.datepicker.name:
                    console.log(' datepicker bindSampleDateTime datetime 不支持 ');
                    break;
                default:
                    return $.lightJokerLib.bindPlugin(PLUGIN.EDITSELECT, element, options);
                    break;
            }
        },
        bindMultipleDate: function(element, options){
            switch(sessionStorage.getItem(PLUGIN.DATE)){
                case $.lightJokerLib.datetimepicker.name:
                    console.log(' datetimepicker bindMultipleDate multiple 不支持 ');
                    break;
                default:
                    return $.lightJokerLib.bindPlugin(PLUGIN.EDITSELECT, element, options);
                    break;
            }
        },
        bindMultipleDateTime: function(element, options){
            switch(sessionStorage.getItem(PLUGIN.DATE)){
                case $.lightJokerLib.datepicker.name:
                    console.log(' datepicker bindMultipleDateTime datetime 不支持 ');
                    break;
                case $.lightJokerLib.datetimepicker.name:
                    console.log(' datetimepicker bindMultipleDateTime datetime 不支持 ');
                default:
                    return $.lightJokerLib.bindPlugin(PLUGIN.EDITSELECT, element, options);
                    break;
            }
        },
        value: function(element, value){
            switch(sessionStorage.getItem('datePluginName')){
                case $.lightJokerLib.daterangepicker.name:
                    console.log('daterangepicker value 未实现');
                    break;
                default:
                    return $.lightJokerLib.date.valuePlugin(element, value);
                    break;
            }
        }
    },
    messager: {
        init: function(options){

        },
        info: function(options){

        },
        warning: function(options){

        },
        error: function(options){

        },
        success: function(options){

        }
    },
    alter: {
        init: function(options){

        },
        info: function(options){

        },
        warning: function(options){

        },
        error: function(options){

        },
        success: function(options){

        }
    },
    notice: {
        init: function(options){

        }
    },
    confirm: {
        init: function(options){

        }
    },
    tip: {
        init: function(options){

        }
    },
    tab: {
        init: function(options){

        }
    },
    modal: {
        init: function(options){

        },
        show: function(options){

        }
    },
    loading: {
        init: function(options){

        },
        show: function(options){

        },
        hide: function(options){

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
    },
    layer: {
        init: function(){
            var defaults = {
                pluginName: 'select2',
                srcFix: '',
                callback: null
            }
            $.extend(true, defaults, options);
            var plugins = [
                {
                    name: 'select2',
                    css: [
                        defaults.srcFix + 'Plugins/select2/v4.1.0/select2.min.css'
                    ],
                    js: [
                        defaults.srcFix + 'Plugins/select2/v4.1.0/select2.min.js'
                    ]
                }
            ]
            sessionStorage.setItem('selectPluginName', defaults.pluginName);

            $.each(plugins, function(pIndex, pObj){
                if(pObj.name == defaults.pluginName){
                    $.lightJokerLib.dynamicLoadPlugin(pObj, defaults.callback);
                    return false;
                }
            });
        }
    }
}