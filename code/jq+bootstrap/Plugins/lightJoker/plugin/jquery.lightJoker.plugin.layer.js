/*
    工具类扩展 - layer
 */
;$.extend(jQuery.lightJokerLib.plugin, {
    layer: {
        version: 'v3.1.1',
        skin: 'layui-layer-lan',
        init: function(callback){
            var defaults = {
                css: [
                    'Plugins/layer/' + this.version + '/theme/default/layer.css'
                ],
                js: [
                    'Plugins/layer/' + this.version + '/layer.js'
                ]
            }

            $.lightJokerLib.loadPlugin(defaults, callback);
        },
        close: function(options){
            var defaults = $.extend(true, {
                index: -1
            }, options);

            layer.close(defaults.index);
        },
        tab: {
            show: function(options){
                var defaults = $.extend(true, {
                    skin: $.lightJokerLib.plugin.layer.skin,
                    area: ['55%', 'auto'],
                    tab: []
                }, options);

                var core = {
                    skin: defaults.skin,
                    area: defaults.area,
                    tab: []
                }

                $.each(defaults.tab, function(tIndex, tObj){
                    if(!isNull(tObj.url)){
                        $.lightJokerLib.ajax.post({
                            async: false,
                            url: tObj.url,
                            dataType: 'html',
                            success: function(result){
                                tObj.content = result;
                            }
                        });
                    }
                    core.tab.push(tObj);
                });

                layer.tab(core);
            },
            close: function(options){
                var defaults = $.extend(true, {}, options);

                $.lightJokerLib.plugin.layer.close(defaults);
            }
        },
        modal: {
            show: function(options){
                var defaults = $.extend(true, {
                    skin: $.lightJokerLib.plugin.layer.skin,
                    title: false,
                    url: '',
                    area: ['55%', 'auto'],
                    content: '',
                    btn: ['保存', '取消'],
                    btnOkEvent: function(index, layerok){ return true; },
                    btnCancelEvent: function(){ return true; },
                    btnCloseEvent: function(){ return true; }
                }, options);


                var core = {
                    skin: defaults.skin,
                    type: 1,
                    anim: 1,
                    title: defaults.title,
                    scrollbar: false,
                    shadeClose: false,
                    shade: [0.8, '#393D49'],
                    resize: false,
                    maxmin: true,
                    area: defaults.area,
                    offset: '50px',
                    content: defaults.content,
                    btn: defaults.btn,
                    closeBtn: true,
                    yes: function(index, layerok){
                        if(defaults.btnOkEvent(index, layerok)){
                            layer.close(index);
                        }
                    },
                    btn2: function(){
                        return defaults.btnCancelEvent();
                    },
                    cancel: function(){
                        return defaults.btnCloseEvent();
                    }
                }

                if(!isNull(defaults.url)){

                    $.lightJokerLib.ajax.post({
                        async: false,
                        url: defaults.url,
                        dataType: 'html',
                        success: function(result){
                            core.content = result;
                        }
                    })

                }

                return layer.open(core);
            },
            close: function(options){
                var defaults = $.extend(true, {}, options);

                $.lightJokerLib.plugin.layer.close(defaults);
            }
        },
        confirm: {
            show: function(options){
                var defaults = $.extend(true, {
                    skin: $.lightJokerLib.plugin.layer.skin,
                    title: '',
                    content: '',
                    btn: ['确定', '取消'],
                    btnOkEvent: function(){ return true; },
                    btnCancelEvent: function(){ return true; }
                }, options);

                var core = {
                    skin: defaults.skin,
                    title: defaults.title,
                    content: defaults.content,
                    btn: defaults.btn,
                    icon: 0,
                    anim: 6
                }

                return layer.confirm(
                    '',
                    core,
                    function(index){
                        if(defaults.btnOkEvent()){
                            layer.close(index);
                        }
                    },
                    function(){
                        defaults.btnCancelEvent();
                    }
                )
            },
            close: function(options){
                var defaults = $.extend(true, {}, options);

                $.lightJokerLib.plugin.layer.close(defaults);
            }
        },
        prompt: {
            input: function(options){
                var defaults = $.extend(true, {
                    formType: 0,
                    title: '',
                    btnOkEvent(value, index, element){ return true; }
                }, options);

                $.lightJokerLib.plugin.layer.prompt.base(defaults);
            },
            password: function(options){
                var defaults = $.extend(true, {
                    formType: 1,
                    title: '',
                    btnOkEvent(value, index, element){ return true; }
                }, options);

                $.lightJokerLib.plugin.layer.prompt.base(defaults);
            },
            textarea: function(options){
                var defaults = $.extend(true, {
                    formType: 2,
                    title: '',
                    area: ['800px', '350px'], //自定义文本域宽高
                    btnOkEvent(value, index, element){ return true; }
                }, options);

                $.lightJokerLib.plugin.layer.prompt.base(defaults);
            },
            base: function(options){
                var defaults = $.extend(true, {
                    skin: $.lightJokerLib.plugin.layer.skin,
                    formType: 0,
                    title: '标题',
                    area: '',
                    btnOkEvent: function(value, index, element){ return true; }
                }, options);

                var core = {
                    skin: defaults.skin,
                    formType: defaults.formType,
                    title: defaults.title
                }

                if(!isNull(defaults.area) && defaults.area.length > 0)
                    core.area = defaults.area;

                return layer.prompt(
                    core,
                    function(value, index, element){
                        if(defaults.btnOkEvent(value, index, element)){
                            layer.close(index);
                        }
                    }
                )
            }
        },
        messager: {
            warning: function(options){
                var defaults = $.extend(true, {
                    icon: 0,
                    content: '警告内容',
                    btnCloseEvent: function(){ }
                }, options);

                $.lightJokerLib.plugin.layer.messager.base(defaults);
            },
            success: function(options){
                var defaults = $.extend(true, {
                    icon: 1,
                    content: '成功内容',
                    btnCloseEvent: function(){ }
                }, options);

                $.lightJokerLib.plugin.layer.messager.base(defaults);
            },
            error: function(options){
                var defaults = $.extend(true, {
                    icon: 2,
                    content: '错误内容',
                    time: 5000,
                    btnCloseEvent: function(){ }
                }, options);

                $.lightJokerLib.plugin.layer.messager.base(defaults);
            },
            question: function(options){
                var defaults = $.extend(true, {
                    icon: 3,
                    content: '问题内容',
                    btnCloseEvent: function(){ }
                }, options);

                $.lightJokerLib.plugin.layer.messager.base(defaults);
            },
            lock: function(options){
                var defaults = $.extend(true, {
                    icon: 4,
                    content: '锁住内容',
                    btnCloseEvent: function(){ }
                }, options);

                $.lightJokerLib.plugin.layer.messager.base(defaults);
            },
            uninfo: function(options){
                var defaults = $.extend(true, {
                    icon: 5,
                    content: 'UN消息内容',
                    btnCloseEvent: function(){ }
                }, options);

                $.lightJokerLib.plugin.layer.messager.base(defaults);
            },
            info: function(options){
                var defaults = $.extend(true, {
                    icon: 6,
                    content: '消息内容',
                    btnCloseEvent: function(){ }
                }, options);

                $.lightJokerLib.plugin.layer.messager.base(defaults);
            },
            base: function(options){
                var defaults = $.extend(true, {
                    skin: $.lightJokerLib.plugin.layer.skin,
                    content: '',
                    icon: 0,
                    anim: 3,
                    time: 3000,
                    area: '',
                    btnCloseEvent: function(){ }
                }, options);

                var core = {
                    skin: defaults.skin,
                    content: defaults.content,
                    icon: defaults.icon,
                    anim: defatuls.anim,
                    time: defaults.time
                }

                if(!isNull(defaults.area) && defaults.area.length > 0)
                    core.area = defaults.area;

                return layer.msg(
                    '',
                    core,
                    function(){
                        defaults.btnCloseEvent();
                    }
                )
            }
        },
        alert: {
            warning: function(options){
                var defaults = $.extend(true, {
                    icon: 0,
                    title: '警告',
                    content: '警告内容',
                    btnOkEvent: function(){ return true; }
                }, options)

                $.lightJokerLib.plugin.layer.alert.base(defaults);
            },
            success: function(options){
                var defaults = $.extend(true, {
                    icon: 1,
                    title: '成功',
                    content: '成功内容',
                    btnOkEvent: function(){ return true; }
                }, options)

                $.lightJokerLib.plugin.layer.alert.base(defaults);
            },
            error: function(options){
                var defaults = $.extend(true, {
                    icon: 2,
                    title: '错误',
                    content: '错误内容',
                    btnOkEvent: function(){ return true; }
                }, options)

                $.lightJokerLib.plugin.layer.alert.base(defaults);
            },
            question: function(options){
                var defaults = $.extend(true, {
                    icon: 3,
                    title: '问题',
                    content: '问题内容',
                    btnOkEvent: function(){ return true; }
                }, options)

                $.lightJokerLib.plugin.layer.alert.base(defaults);
            },
            lock: function(options){
                var defaults = $.extend(true, {
                    icon: 4,
                    title: '锁住',
                    content: '锁住内容',
                    btnOkEvent: function(){ return true; }
                }, options)

                $.lightJokerLib.plugin.layer.alert.base(defaults);
            },
            uninfo: function(options){
                var defaults = $.extend(true, {
                    icon: 5,
                    title: 'UN消息',
                    content: 'UN消息内容',
                    btnOkEvent: function(){ return true; }
                }, options)

                $.lightJokerLib.plugin.layer.alert.base(defaults);
            },
            info: function(options){
                var defaults = $.extend(true, {
                    icon: 6,
                    title: '消息',
                    content: '消息内容',
                    btnOkEvent: function(){ return true; }
                }, options)

                $.lightJokerLib.plugin.layer.alert.base(defaults);
            },
            base: function(options){
                var defaults = $.extend(true, {
                    skin: $.lightJokerLib.plugin.layer.skin,
                    title: '',
                    content: '',
                    icon: 0,
                    anim: 0,
                    btnOkEvent: function(){ return true; }
                }, options);

                var core = {
                    skin: defaults.skin,
                    title: defaults.title,
                    content: defaults.content,
                    icon: defaults.icon,
                    anim: defaults.anim
                }

                return layer.alert(
                    '',
                    core,
                    function(index){
                        if(defaults.btnOkEvent()){
                            layer.close(index);
                        }
                    }
                )
            }
        }
    }
});