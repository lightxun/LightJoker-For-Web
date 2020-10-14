/*
    工具类扩展 - select2
 */
;$.extend(jQuery.lightJokerLib.plugin, {
    select2: {
        version: 'v4.1.0',
        init: function(callback){
            var defaults = {
                css: [
                    'Plugins/select2/' + this.version + '/select2.min.css'
                ],
                js: [
                    'Plugins/select2/' + this.version + '/select2.min.js'
                ]
            }

            $.lightJokerLib.loadPlugin(defaults, callback);
        },
        bind: function(element, options){
            var result = new Array();

            var selectObj = $(element);
            $.each(selectObj, function(eIndex, eObj){
                var item = $(eObj);

                var defaults = $.extend(true, {
                    serverSide: true,
                    async: false,
                    allowClear: true,
                    searchView: true,
                    placeholder: '请选择 .',
                    url: '',
                    param: {},
                    key: '',
                    value: '',
                    eventComplete: function (data) {},
                    extendAttr: []   // extendAttr: [{ keyValue : '' }]
                }, options);

                // 判断是否请求服务端
                if(defaults.serverSide)
                    item.empty();

                // 只有在 class中写明 lightJoker-empty, 视为 不允许清空
                if(item.hasClass('lightJoker-empty')){
                    defaults.allowClear = false;
                }

                // 如果 allowClear=true, 则添加默认空 option
                if(defaults.allowClear){
                    item.prepend('<option value selected></option>');
                }

                // 如果 写明了属性 placeholder, 则取
                if(!isNull(item.attr('placeholder'))){
                    defaults.placeholder = item.attr('placeholder');
                }

                // 如果请求服务端
                if(defaults.serverSide){
                    $.lightJokerLib.ajax.post({
                        async: defaults.async,
                        url: defaults.url,
                        data: defaults.param,
                        success: function(result){
                            $.each(result.Data.rows, function(rIndex, rObj){
                                var key = eval('rObj.' + defaults.key);
                                var value = eval('rObj.' + defaults.value);

                                var attr = '';
                                $.each(defaults.extendAttr, function(aIndex, aObj){
                                    var attrKey = aObj.keyValue.toLowerCase();
                                    var attrValue = eval('rObj.' + aObj.keyValue)
                                    attr += ' lightJokerAttr-' + attrKey + '="' + attrValue + '" ';
                                });

                                item.append('<option value="' + value + '" ' + attr + '>' + key + '</option>');
                            });

                            defaults.eventComplete(result);
                        }
                    })
                }

                var core = {
                    allowClear: defaults.allowClear,
                    //multiple: false,
                    //disabled: false,
                    minimumResultsForSearch: 0,
                    placeholder: defaults.placeholder,
                    width: '100%',
                    theme: 'classic'
                }

                if(!defaults.searchView){
                    core.minimumResultsForSearch = -1;
                }

                result.push(item.select2(core));
            });

            if(result.length == 1)
                return result[0];
            else
                return result;
        },
        value: function(element, value){
            var selectObj = $(element);

            if(!isNull(value) || value == ''){
                if(!isNull(selectObj.attr('multiple'))){
                    if(value == '')
                        value = [];
                    else
                        value = value.split(',');
                }

                selectObj.val(value).trigger('change');
            }

            return selectObj.val() + '';
        },
        text: function(element){
            var selectObj = $(element);

            var result = '';
            $.each(selectObj.select2('data'), function(vIndex, vObj){
                result += this.text + ',';
            });
            result = result.substring(0, result.length - 1);

            return result;
        },
        attr: function(element, attrName){
            var selectObj = $(element);

            var result = '';
            $.each($.lightJokerLib.select.valueSelect2(element).split(','), function(vIndex, vObj){
                result += selectObj.find('[value="' + vObj + '"]').attr('lightJokerAttr-' + attrName.toLowerCase());
            });

            return result;
        },
        destroy: function(element){
            return $(element).select2('destroy');
        }
    }
});