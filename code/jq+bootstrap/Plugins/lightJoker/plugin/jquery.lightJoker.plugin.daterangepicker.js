/*
    工具类扩展 - daterangepicker
 */
;$.extend(jQuery.lightJokerLib.plugin, {
    daterangepicker: {
        version: 'v2.1.27',
        init: function(callback){
            var defaults = {
                css: [
                    'Plugins/bootstrap-daterangepicker/' + this.version + '/daterangepicker.css'
                ],
                js: [
                    'Plugins/bootstrap-daterangepicker/' + this.version + '/daterangepicker.js'
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
                    eventCancel: function(){
                        $(this).val('');
                        $(this).change();
                    },
                    eventApply: function(ev, picker){

                    }
                }, options);

                var core = {
                    locale:{
                        format: 'YYYY-MM-DD',
                        applyLabel: '确定',
                        cancelLabel: '清除',
                        fromLabel: '起始时间',
                        toLabel: '结束时间',
                        customRangeLabel: '自定义',
                        weekLabel: 'W',
                        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        firstDay: 1
                    },
                    drops: 'down',
                    timePicker: false,
                    timePicker24Hour: true,
                    autoUpdateInput: true,
                    startDate: '',
                    endDate: '',
                    singleDatePicker: false,
                    showDropdowns: true,
                    alwaysShowCalendars: true,
                    autoApply: false
                }

                result.push(item.daterangepicker(core)
                    .on('cancel.daterangepicker', defaults.eventCancel)
                    .on('apply.daterangepicker', defaults.eventApply));
            })

            if(result.length == 1)
                return result[0];
            else
                return result;
        }
    }
});