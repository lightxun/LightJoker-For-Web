/*
    工具库
    Created by Light on 2020-09-02
 */
;jQuery.lightJokerLib = {
    plugin: {
        fixSrc: ''
    },
    loadPlugin: function(plugin, callback){
        var that = this;

        var fixSrc = that.plugin.fixSrc;

        $.each(plugin.css, function(cssIndex, cssObj){
            cssObj = fixSrc + cssObj;

            if($('link[href="'  + cssObj + '"]').length > 0){
                console.log(cssObj + ' 该文件已加载. ');
                return true;
            }

            dynamicLoadCss(cssObj, null);   // 加载 CSS 时, 不回调
        });

        // 如果只有一个文件,则调用基础的异步实现
        if(plugin.js.length === 1){
            plugin.js[0] = fixSrc + plugin.js[0];

            if($('script[src="' + plugin.js[0] + '"]').length > 0){
                console.log(plugin.js[0] + ' 该文件已加载. ');
            }
            else{
                dynamicLoadJs(plugin.js[0], callback);
            }
        }
        // 如果有多个文件, 则同步进行加载
        else{
            $.each(plugin.js, function(jsIndex, jsObj){
                jsObj = fixSrc + jsObj;

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
        var that = this;
        var defaults = $.extend({
            pluginType: '',
            pluginName: '',
            srcFix: '',
            callback: null
        }, options);

        that.storage.setItem(LIGHTJOKERCONST_PLUGIN.TYPE, defaults.pluginType, defaults.pluginName);
        //sessionStorage.setItem(defaults.pluginType, defaults.pluginName);

        that.loadPlugin({
            js:[
                'Plugins/lightJoker/plugin/jquery.lightJoker.plugin.' + defaults.pluginName + '.js'
            ]
        }, function(){
            that.plugin[defaults.pluginName].init(defaults.callback);
        })
    },
    bindPlugin: function(pluginType, element, options){
        var that = this;
        if($(element).length == 0){
            console.log(that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, pluginType) + ' bind 未找到匹配元素, 停止 : ' + element);
            return;
        }
        return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, pluginType)].bind(element, options);
    },
    valuePlugin: function(pluginType, element, value){
        var that = this;
        return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, pluginType)].value(element, value);
    },
    textPlugin: function(pluginType, element){
        var that = this;
        return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, pluginType)].text(element);
    },
    attrPlugin: function(pluginType, element, attrName){
        var that = this;
        return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, pluginType)].attr(element, attrName);
    },
    destroyPlugin: function(pluginType, element){
        var that = this;
        return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, pluginType)].destroy(element);
    },
    ajax: {
        init: function(options){

        },
        post: function(options){
            var defaults = $.extend(true, {
                isFilter: true,
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
                    if(defaults.isFilter){
                        switch(data.Sign){
                            case LIGHTJOKERCONST_SIGN.SUCCESS:
                                defaults.success(data);
                                break;
                            case LIGHTJOKERCONST_SIGN.FAILD:
                                break;
                            default:
                                defaults.success(data);
                                break;
                        }
                    }
                    else{
                        defaults.success(data);
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
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                pluginName: that.select.plugin.select2,
                callback: null
            }, options);

            return that.initPlugin({
                pluginType: LIGHTJOKERCONST_PLUGIN.SELECT,
                pluginName: defaults.pluginName,
                srcFix: '',
                callback: defaults.callback
            });
        },
        bind: function(element, options){
            var that = $.lightJokerLib;
            return that.bindPlugin(LIGHTJOKERCONST_PLUGIN.SELECT, element, options);
        },
        value: function(element, value){
            var that = $.lightJokerLib;
            return that.valuePlugin(LIGHTJOKERCONST_PLUGIN.SELECT, element, value);
        },
        text: function(element){
            var that = $.lightJokerLib;
            return that.textPlugin(LIGHTJOKERCONST_PLUGIN.SELECT, element);
        },
        attr: function(element, attrName){
            var that = $.lightJokerLib;
            return that.attrPlugin(LIGHTJOKERCONST_PLUGIN.SELECT, element, attrName);
        },
        destroy: function(element){
            var that = $.lightJokerLib;
            return that.destroyPlugin(LIGHTJOKERCONST_PLUGIN.SELECT, element);
        }
    },
    editSelect: {
        plugin:{
            editableSelect: 'editableSelect'
        },
        init: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                pluginName: that.editSelect.plugin.editableSelect,
                callback: null
            }, options);

            return that.initPlugin({
                pluginType: LIGHTJOKERCONST_PLUGIN.EDITSELECT,
                pluginName: defaults.pluginName,
                srcFix: '',
                callback: defaults.callback
            });
        },
        bind: function(element, options){
            var that = $.lightJokerLib;
            return that.bindPlugin(LIGHTJOKERCONST_PLUGIN.EDITSELECT, element, options);
        },
        value: function(element, value){
            var that = $.lightJokerLib;
            return that.valuePlugin(LIGHTJOKERCONST_PLUGIN.EDITSELECT, element, value);
        },
        attr: function(element, attrName){
            var that = $.lightJokerLib;
            return that.attrPlugin(LIGHTJOKERCONST_PLUGIN.EDITSELECT, element, attrName);
        },
        destroy: function(element){
            var that = $.lightJokerLib;
            return that.destroyPlugin(LIGHTJOKERCONST_PLUGIN.EDITSELECT, element);
        }
    },
    date: {
        plugin:{
            datepicker: 'datepicker',
            datetimepicker: 'datetimepicker',
            daterangepicker: 'daterangepicker'
        },
        init: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                pluginName: that.date.plugin.datetimepicker,
                callback: null
            }, options);

            return that.initPlugin({
                pluginType: LIGHTJOKERCONST_PLUGIN.DATE,
                pluginName: defaults.pluginName,
                srcFix: '',
                callback: defaults.callback
            });
        },
        bindSampleDate: function(element, options){
            var that = $.lightJokerLib;
            switch(that.storage.getItem(LIGHTJOKERCONST_PLUGIN.DATE)){
                case that.date.plugin.datetimepicker:
                    return that.bindPlugin(LIGHTJOKERCONST_PLUGIN.DATE, element, $.extend(true, {
                        format: 'YYYY-MM-DD'
                    }, options));
                    break;
                default:
                    return that.bindPlugin(LIGHTJOKERCONST_PLUGIN.DATE, element, options);
                    break;
            }
        },
        bindSampleDateTime: function(element, options){
            var that = $.lightJokerLib;
            switch(that.storage.getItem(LIGHTJOKERCONST_PLUGIN.DATE)){
                case that.date.plugin.datepicker:
                    console.log(' datepicker bindSampleDateTime datetime 不支持 ');
                    break;
                default:
                    return that.bindPlugin(LIGHTJOKERCONST_PLUGIN.DATE, element, options);
                    break;
            }
        },
        bindMultipleDate: function(element, options){
            var that = $.lightJokerLib;
            switch(that.storage.getItem(LIGHTJOKERCONST_PLUGIN.DATE)){
                case that.date.plugin.datetimepicker:
                    console.log(' datetimepicker bindMultipleDate multiple 不支持 ');
                    break;
                default:
                    return that.bindPlugin(LIGHTJOKERCONST_PLUGIN.DATE, element, options);
                    break;
            }
        },
        bindMultipleDateTime: function(element, options){
            var that = $.lightJokerLib;
            switch(that.storage.getItem(LIGHTJOKERCONST_PLUGIN.DATE)){
                case that.date.plugin.datepicker:
                    console.log(' datepicker bindMultipleDateTime datetime 不支持 ');
                    break;
                case that.date.plugin.datetimepicker:
                    console.log(' datetimepicker bindMultipleDateTime datetime 不支持 ');
                default:
                    return that.bindPlugin(LIGHTJOKERCONST_PLUGIN.DATE, element, options);
                    break;
            }
        },
        value: function(element, value){
            var that = $.lightJokerLib;
            switch(that.storage.getItem(LIGHTJOKERCONST_PLUGIN.DATE)){
                case that.date.plugin.daterangepicker:
                    console.log('daterangepicker value 未实现');
                    break;
                default:
                    return that.date.valuePlugin(LIGHTJOKERCONST_PLUGIN.DATE, element, value);
                    break;
            }
        }
    },
    messager: {
        plugin:{
            layer: 'layer'
        },
        init: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                pluginName: that.messager.plugin.layer,
                callback: null
            }, options);

            return that.initPlugin({
                pluginType: LIGHTJOKERCONST_PLUGIN.MESSAGER,
                pluginName: defaults.pluginName,
                srcFix: '',
                callback: defaults.callback
            });
        },
        info: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                content: '',
                btnCloseEvent: function() {}
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.MESSAGER)].messager.info(defaults);
        },
        warning: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                content: '',
                btnCloseEvent: function() {}
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.MESSAGER)].messager.warning(defaults);
        },
        error: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                content: '',
                area: 'auto',
                btnCloseEvent: function() {}
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.MESSAGER)].messager.error(defaults);
        },
        success: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                content: '',
                btnCloseEvent: function() {}
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.MESSAGER)].messager.success(defaults);
        }
    },
    alert: {
        plugin:{
            layer: 'layer'
        },
        init: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                pluginName: that.alert.plugin.layer,
                callback: null
            }, options);

            return that.initPlugin({
                pluginType: LIGHTJOKERCONST_PLUGIN.ALERT,
                pluginName: defaults.pluginName,
                srcFix: '',
                callback: defaults.callback
            });
        },
        info: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                title: '',
                content: '',
                btnOkEvent: function(){ return true; }
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.ALERT)].alert.info(defaults);
        },
        warning: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                title: '',
                content: '',
                btnOkEvent: function(){ return true; }
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.ALERT)].alert.warning(defaults);
        },
        error: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                title: '',
                content: '',
                btnOkEvent: function(){ return true; }
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.ALERT)].alert.error(defaults);
        },
        success: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                title: '',
                content: '',
                btnOkEvent: function(){ return true; }
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.ALERT)].alert.success(defaults);
        }
    },
    notice: {
        plugin: {
            pnotify: 'pnotify'
        },
        init: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                pluginName: that.notice.plugin.pnotify,
                callback: null
            }, options);

            return that.initPlugin({
                pluginType: LIGHTJOKERCONST_PLUGIN.NOTICE,
                pluginName: defaults.pluginName,
                srcFix: '',
                callback: defaults.callback
            });
        },
        info: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                content: ''
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.NOTICE)].notice.info(defaults);
        },
        success: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                content: ''
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.NOTICE)].notice.success(defaults);
        },
        error: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                content: ''
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.NOTICE)].notice.error(defaults);
        },
        warning: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                content: ''
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.NOTICE)].notice.warning(defaults);
        }
    },
    prompt: {
        plugin: {
            layer: 'layer'
        },
        init: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                pluginName: that.prompt.plugin.layer,
                callback: null
            }, options);

            return that.initPlugin({
                pluginType: LIGHTJOKERCONST_PLUGIN.PROMPT,
                pluginName: defaults.pluginName,
                srcFix: '',
                callback: defaults.callback
            })
        },
        input: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                title: '',
                btnOkEvent(value, index, element){ return true; }
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.PROMPT)].prompt.input(defaults);
        },
        password: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                title: '',
                btnOkEvent(value, index, element){ return true; }
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.PROMPT)].prompt.password(defaults);
        },
        textarea: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                title: '',
                btnOkEvent(value, index, element){ return true; }
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.PROMPT)].prompt.textarea(defaults);
        }
    },
    confirm: {
        plugin:{
            layer: 'layer'
        },
        init: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                pluginName: that.confirm.plugin.layer,
                callback: null
            }, options);

            return that.initPlugin({
                pluginType: LIGHTJOKERCONST_PLUGIN.CONFIRM,
                pluginName: defaults.pluginName,
                srcFix: '',
                callback: defaults.callback
            });
        },
        show: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                title: '确认',
                content: '',
                btnOkEvent: function(){ return true; },
                btnCancelEvent: function(){ return true; }
            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.CONFIRM)].confirm.show(defaults);
        }
    },
    tip: {
        plugin:{
            qTip2: 'qTip2'
        },
        init: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                pluginName: that.tip.plugin.qTip2,
                callback: null
            }, options);

            return that.initPlugin({
                pluginType: LIGHTJOKERCONST_PLUGIN.TIP,
                pluginName: defaults.pluginName,
                srcFix: '',
                callback: defaults.callback
            });
        },
        bind: function(element, options){
            var that = $.lightJokerLib;
            return that.bindPlugin(LIGHTJOKERCONST_PLUGIN.TIP, element, options);
        },
        destroy: function(element){
            var that = $.lightJokerLib;
            return that.destroyPlugin(LIGHTJOKERCONST_PLUGIN.TIP, element);
        }
    },
    tab: {
        plugin: {
            layer: 'layer'
        },
        init: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                pluginName: that.tab.plugin.layer,
                callback: null
            }, options);

            return that.initPlugin({
                pluginType: LIGHTJOKERCONST_PLUGIN.TAB,
                pluginName: defaults.pluginName,
                srcFix: '',
                callback: defaults.callback
            });
        },
        show: function(options){
            var that = $.lightJokerLib;
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

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.TAB)].tab.show(defaults);
        },
        close: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {

            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.TAB)].tab.close(defaults);
        }
    },
    modal: {
        plugin: {
            layer: 'layer'
        },
        init: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                pluginName: that.modal.plugin.layer,
                callback: null
            }, options);

            return that.initPlugin({
                pluginType: LIGHTJOKERCONST_PLUGIN.MODAL,
                pluginName: defaults.pluginName,
                srcFix: '',
                callback: defaults.callback
            });
        },
        show: function(options){
            var that = $.lightJokerLib;
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

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.MODAL)].modal.show(defaults);
        },
        close: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {

            }, options);

            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.MODAL)].modal.close(defaults);
        }
    },
    loading: {
        plugin: {
            loadingoverlay: 'loadingoverlay'
        },
        init: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {
                pluginName: that.loading.plugin.loadingoverlay,
                callback: null
            }, options);

            return that.initPlugin({
                pluginType: LIGHTJOKERCONST_PLUGIN.LOADING,
                pluginName: defaults.pluginName,
                srcFix: '',
                callback: defaults.callback
            });
        },
        show: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {}, options);
            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.LOADING)].loading.show(defaults);
        },
        hide: function(options){
            var that = $.lightJokerLib;
            var defaults = $.extend(true, {}, options);
            return that.plugin[that.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.LOADING)].loading.hide(defaults);
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
    storage: {
        type: function(){
            var result = new Object();

            result[LIGHTJOKERCONST_SESSION.TYPE] = sessionStorage;
            result[LIGHTJOKERCONST_PLUGIN.TYPE] = localStorage;
            result[LIGHTJOKERCONST_WEBSETTING.TYPE] = localStorage;
            result[LIGHTJOKERCONST_LOG.TYPE] = localStorage;

            return result;
        },
        setItem: function(type, key, value){
            var sessionItem = sessionStorage.getItem(type);
            var localItem = localStorage.getItem(type);

            var item = new Object;
            item[key] = value;
            if(!isNull(sessionItem)){
                sessionStorage.setItem(type, JSON.stringify($.extend(true, JSON.parse(sessionItem), item)));
            }
            else if(!isNull(localItem)){
                localStorage.setItem(type, JSON.stringify($.extend(true, JSON.parse(localItem), item)));
            }
            else{

                var isStorage = false;

                var typeObj = this.type();
                for(var prop in typeObj){
                    if(prop === type){
                        typeObj[prop].setItem(type, JSON.stringify($.extend(true, JSON.parse(sessionItem), item)));
                        isStorage = true;
                    }
                }

                if(!isStorage)
                    console.error(' 该类型 未进行存储类别设置 : ' + type);
            }
        },
        getItem: function(type, key){
            var result = '';

            var sessionItem = sessionStorage.getItem(type);
            var localItem = localStorage.getItem(type);

            if(!isNull(sessionItem)){
                result = JSON.parse(sessionItem)[key];
            }
            else if(!isNull(localItem)){
                result = JSON.parse(localItem)[key];
            }

            return result;
        },
        removeItem: function(type, key){
            var sessionItem = sessionStorage.getItem(type);
            var localItem = localStorage.getItem(type);

            if(isNull(key)){
                sessionStorage.removeItem(type);
                localStorage.removeItem(type);
            }else{
                if(!isNull(sessionItem)){
                    delete JSON.parse(sessionItem)[key];
                }
                else if(!isNull(localItem)){
                    delete JSON.parse(localItem)[key];
                }
            }
        },
        clear: function(type){
            var typeObj = this.type();
            for(var prop in typeObj){
                if(prop === type){
                    typeObj[prop].clear();
                }
            }
        },
        clearSession: function(){
            sessionStorage.clear();
        },
        clearLocal: function(){
            localStorage.clear();
        }
    }
}