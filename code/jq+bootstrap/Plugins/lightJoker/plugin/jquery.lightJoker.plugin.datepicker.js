/*
    工具类扩展 - datepicker
 */
;$.extend(jQuery.lightJokerLib.plugin, {
    datepicker: {
        version: 'v1.9.0',
        init: function(callback){
            var defaults = {
                css: [
                    'Plugins/bootstrap-datepicker/' + this.version + '/css/bootstrap-datepicker.css'
                ],
                js: [
                    'Plugins/bootstrap-datepicker/' + this.version + '/js/bootstrap-datepicker.js',
                    'Plugins/bootstrap-datepicker/' + this.version + '/locales/bootstrap-datepicker.zh-CN.min.js'
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
                    language: 'zh-CN',
                    clearBtn: true,
                    container: 'body',
                    defaultViewDate: new Date(),
                    startDate: '',
                    endDate: '',
                    format: 'yyyy-mm-dd',
                    minViewMode: 1,
                    multidate: false,
                    multidateSeparator: ','
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
        }
    }
});