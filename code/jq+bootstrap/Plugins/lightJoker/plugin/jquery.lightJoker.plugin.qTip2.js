/*
*   工具类扩展 - qTip2
* */
;$.extend(jQuery.lightJokerLib.plugin, {
    qTip2: {
        version: 'v3.0.3',
        init: function(callback){
            var defaults = {
                css: [
                    'Plugins/qTip2/' + this.version + '/jquery.qtip.css'
                ],
                js: [
                    'Plugins/qTip2/' + this.version + '/jquery.qtip.js'
                ]
            }

            $.lightJokerLib.loadPlugin(defaults, callback);
        },
        bind: function(element, options){
            var result = new Array();

            var tipObj = $(element);
            $.each(tipObj, function(eIndex, eObj){
                var item = $(eObj);

                var defaults = $.extend(true, {
                    title: '',
                    content: ''
                }, options);

                var core = {
                    content: {
                        title: defaults.title,
                        text: defaults.content
                    },
                    position: {
                        my: 'Bottom Center',
                        at: 'Top Center'
                    },
                    style: {
                        classes: 'qtip-bootstrap'
                    }
                }


                result.push(item.qtip(core));
            });

            if(result.length == 1)
                return result[0];
            else
                return result;
        },
        destroy: function(element){
            $(element).qtip('destroy');
        }
    }
});