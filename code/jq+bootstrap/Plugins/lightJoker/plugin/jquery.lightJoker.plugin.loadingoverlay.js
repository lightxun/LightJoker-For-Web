/*
*   工具类扩展 - loadingoverlay
* */
;$.extend(jQuery.lightJokerLib.plugin, {
    loadingoverlay: {
        version: 'v2.1.7',
        init: function(callback){
            var defaults = {
                css: [],
                js: [
                    'Plugins/jquery-loading-overlay/' + this.version + '/loadingoverlay.js'
                ]
            }

            $.lightJokerLib.loadPlugin(defaults, callback);
        },
        loading: {
            show: function(options){
                var defaults = $.extend(true, {
                    element: ''
                }, options);

                if(isNull(defaults.element))
                    $.LoadingOverlay('show');
                else
                    $(defaults.element).LoadingOverlay('show');
            },
            hide: function(options){
                var defaults = $.extend(true, {
                    element: ''
                }, options);

                if(isNull(defaults.element))
                    $.LoadingOverlay('hide');
                else
                    $(defaults.element).LoadingOverlay('hide');
            }
        }
    }
})