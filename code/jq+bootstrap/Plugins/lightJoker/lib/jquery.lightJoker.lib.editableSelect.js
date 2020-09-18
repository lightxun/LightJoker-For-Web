/*
    工具类扩展 - editSelect
 */
;$.extend(jQuery.lightJokerLib, {
    editableSelect: {
        name: 'editableSelect',
        init: function(callback){
            var defaults = {
                css: [
                    'Plugins/jquery-editable-select/v2.2.5/jquery-editable-select.css'
                ],
                js: [
                    'Plugins/jquery-editable-select/v2.2.5/jquery-editable-select-lightJoker.js'
                ]
            }

            $.lightJokerLib.loadPlugin(defaults, callback);
        },
        bind: function(element, options){
            var result = new Array();

            var editableSelectObj = $(element);
            $.each(editableSelectObj, function(eIndex, eObj){
                var item = $(eObj);

                var defaults = $.extend(true, {
                    serverSide: true,
                    async: false,
                    placeholder: '请选择 .',
                    url: '',
                    param: {},
                    key: '',
                    value: '',
                    eventComplete: function(data){ },
                    extendAttr: [],      // extendAttr: [{ keyValue: '' }]
                    filter: true,
                    effects: 'fade',
                    duration: 'fast',
                    appendTo: item.parent(),
                    css:[],
                    trigger: 'focus'
                }, options);

                // 如果未对属性写明, 则获取扩展中属性进行赋值
                if(isNull(item.attr('placeholder'))){
                    item.attr('placeholder', defaults.placeholder);
                }

                if(defaults.serverSide){
                    item.editableSelect('destroy');
                    item = $('#' + item.attr('id'));
                    item.empty();

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
                    trigger: defaults.trigger,
                    filter: defaults.filter,
                    effects: defaults.effects,
                    duration: defaults.duration,
                    appendTo: defaults.appendTo,
                    css: defaults.css
                }

                result.push(item.editableSelect(core));
            });

            // 替换元素
            if(element instanceof jQuery){
                for(var i = 0; i < result.length; i++){
                    element[i] = result[i][0];
                }
            }

            if(result.length == 1){
                // 替换元素
                element = element[0];
                return result[0];
            }
            else{
                return result;
            }
        },
        value: function(element, value){
            var editableSelectObj = $(element);

            if(!isNull(value) || '' == value){
                editableSelectObj.val(value).trigger('change');
            }
            return editableSelect.val() + '';
        },
        attr: function(element, attrName){
            var editableSelectObj = $(element);

            var value = editableSelectObj.val();

            var result = '';
            result = $('ul[lightJoker-eslist-for="' + editableSelectObj.attr('id') + '"]').children('li[value="' + value + '"]').attr('lightJokerAttr-' + attrName.toLowerCase());
            return result;
        },
        destroy: function(element){
            var editableSelectObj = $(element);

            editableSelectObj.editableSelect('destroy');
            editableSelectObj = $('#' + editableSelectObj.attr('id'));
            editableSelectObj.empty();
        }
    }
});