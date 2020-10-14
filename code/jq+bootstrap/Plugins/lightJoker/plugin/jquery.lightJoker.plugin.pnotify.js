/*
*   工具类扩展 - pnotify
* */
;$.extend(jQuery.lightJokerLib.plugin, {
    pnotify: {
        version: 'v3.2.0',
        init: function(callback){
            var defaults = {
                css: [
                    'Plugins/pnotify/' + this.version + '/pnotify.min.css'
                ],
                js: [
                    'Plugins/pnotify/' + this.version + '/pnotify.min.js'
                ]
            }

            $.lightJokerLib.loadPlugin(defaults, callback);
        },
        notice: {
            info: function(options){
                var defaults = $.extend(true, {
                    type: 'info',
                    title: '消息',
                    content: '消息内容'
                }, options);

                return $.lightJokerLib.plugin.pnotify.notice.base(defaults);
            },
            success: function(options){
                var defaults = $.extend(true, {
                    type: 'success',
                    title: '成功',
                    content: '成功内容'
                }, options);

                return $.lightJokerLib.plugin.pnotify.notice.base(defaults);
            },
            error: function(options){
                var defaults = $.extend(true, {
                    type: 'error',
                    title: '错误',
                    content: '错误内容'
                }, options);

                return $.lightJokerLib.plugin.pnotify.notice.base(defaults);
            },
            warning: function(options){
                var defaults = $.extend(true, {
                    type: '',
                    title: '警告',
                    content: '警告内容'
                }, options);

                return $.lightJokerLib.plugin.pnotify.notice.base(defaults);
            },
            base: function(options){
                var defaults = $.extend(true, {
                    hide: true,
                    type: '',
                    title: '通知',
                    content: '这是一条测试通知'
                }, options);

                var core = {
                    hide: defaults.hide,
                    type: defaults.type,
                    addclass: 'lightJoker-pnotify',
                    title: defaults.title,
                    text: defaults.content,
                    animate: {
                        animate: true,
                        in_class: 'bounceInLeft',
                        out_class: 'bounceOutRight'
                    }
                }

                return new PNotify(core);
            }
        }

    }
})