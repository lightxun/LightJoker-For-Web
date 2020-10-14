/*
    工具类扩展 - datetimepicker
 */
;$.extend(jQuery.lightJokerLib.plugin, {
    datetimepicker: {
        version: 'v4.17.47',
        init: function(callback){
            var defaults = {
                css: [
                    'Plugins/bootstrap-datetimepicker/' + this.version + '/css/bootstrap-datetimepicker.css'
                ],
                js: [
                    'Plugins/moment/v2.27.0/moment.js',
                    'Plugins/moment/v2.27.0/moment-with-locales.js',
                    'Plugins/bootstrap-datetimepicker/' + this.version + '/js/bootstrap-datetimepicker.min.js'
                ]
            }

            $.lightJokerLib.loadPlugin(defaults, callback);
        },
        bind: function(element, options){
            var result = new Array();

            var dateObj = $(element);
            $.each(dateObj, function(eIndex, eObj){
                var item = $(eObj);

                var defaults = $.extend(true, {
                    dayViewHeaderFormat: 'YYYY年 MMMM',
                    format: 'YYYY-MM-DD HH:mm:ss',
                    locale: 'zh-CN',
                    showTodayButton: true,
                    showClear: true,
                    showClose: true,
                    date: ''
                }, options);

                // 只有在 class中写明 lightJoker-empty, 视为 不允许清空
                if(item.hasClass('lightJoker-empty')){
                    defaults.date = '';
                }

                result.push(item.datetimepicker(defaults));

            });

            if(result.length == 1)
                return result[0];
            else
                return result;
        },
        value: function(element, value){
            var dateObj = $(element);

            if(!isNull(value) || value == ''){
                dateObj.val(value);
            }

            return dateObj.val();
        },
    }
});