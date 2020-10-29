/*
*   工具类 - bootstrapValidator
* */
;$.extend(jQuery.lightJokerLib.plugin, {
    bootstrapValidator: {
        version: 'v0.5.3',
        init: function(callback){
            var defaults = {
                css: [
                    'Plugins/bootstrap-validator/' + this.version + '/css/bootstrapValidator.css'
                ],
                js: [
                    'Plugins/bootstrap-validator/' + this.version + '/js/bootstrapValidator.js',
                    'Plugins/bootstrap-validator/' + this.version + '/js/language/zh_CN.js'
                ]
            }

            $.lightJokerLib.loadPlugin(defaults, callback);
        },
        bind: function(element, options){
            var result = new Array();

            var formObj = $(element);
            $.each(formObj, function(eIndex, eObj){
                var item = $(eObj);

                var defaults = $.extend(true, {

                }, options);

                var core = {
                    container: 'popover',
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {},
                    trigger: 'keyup focus blur change click'
                }

                result.push(item.bootstrapValidator(core).data('bootstrapValidator'));
            });

            if(result.length == 1){
                return result[0];
            }
            else{
                return result;
            }
        },
        validate: function(element, options){
            var defaults = $.extend(true, {
                fields: [],
                validateEvent: function(){ return true; }
            }, options);

            var api = $(element).data('bootstrapValidator');

            // 进行验证
            if(defaults.fields.length === 0){
                api.validate();
            }
            else{
                $.each(defaults.fields, function(fIndex, fObj){
                    api.validateField(fObj);
                });
            }

            // 返回验证结果
            return (api.isValid() && defaults.validateEvent());
        }
    }
})