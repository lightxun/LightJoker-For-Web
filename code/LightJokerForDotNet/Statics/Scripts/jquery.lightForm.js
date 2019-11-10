/**



*/
; (function ($, window, document, undefined) {

    var pluginName = 'lightForm',
        pluginKey = 'plugin',
        pluginResultKey = 'plugin_res',
        defaults = {
            isWebApi: false,
            input_type: ["date", "datetime-local", "text", "email", "number", "tel", "password", "hidden"],
            tag: ["select, textarea"],
            validator:{
                container: 'popover',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {},
                trigger: 'keyup focus blur change click'
            },
            api_validator: {},
            eventValidate: function (data) { return true; },
            eventSaveSuccess: function (data) { }
        }

    function Form(element, options) {
        this.element = element;
        this.$element = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.version = 'v1.0.0';
        this.methods = {
            empty: function () { }
        };
        return this;
    }

    Form.prototype = { //鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪
        create: function () {
            //绑定验证
            this.$element.bootstrapValidator(this.settings.validator);
            //获取验证API
            this.api_validator = this.$element.data('bootstrapValidator');
            //避免表单回车提交
            this.$element.bind('keydown', function (event) {
                if (event.keyCode == 13) { return false; }
            });
        },
        init: function (options) {
            var _tmp = $.extend({ method: 'empty' }, options);
            var _method = _tmp.method;

            if (this.methods[_method])
                return this.methods[_method].apply(this, options);
            else if (typeof _method == 'object' || !_method)
                return this.methods.init.apply(this, options);
            else
                $.error('方法 ' + _method + ' 不存在此插件中.');
        },
        destroy: function () {

        },
        setValue: function (options) {
            var _default = {
                data: {},
                eventCallback: function (data) { }
            }
            $.extend(_default, options);

            var $form = this.$element;

            $.each(this.settings.input_type, function (index, val) {
                setValue_Type(val);
            });

            $.each(this.settings.tag, function (index, val) {
                setValue_Tag(val);
            });

            _default.eventCallback(_default.data);

            function setValue_Type(_type) {
                $form.find("[type=" + _type + "]").each(function () {
                    var controlID = $(this).attr('id');
                    var val = eval("_default.data." + controlID);

                    switch (_type) {
                        case 'date':
                            val = $.lightLib.date.formatDate(val);
                            break;
                        case 'datetime-local':
                            val = $.lightLib.date.formatDateTimeMin(val);
                            break;
                    }

                    // 结合样式 light-date 及 light-datetime 格式化数据
                    if ($(this).hasClass('light-date')){
                        val = $.lightLib.date.formatDate(val);
                        $.lightLib.daterangepicker.setDate("#" + controlID, val);
                    }
                    else if ($(this).hasClass('light-datetime')) {
                        val = $.lightLib.date.formatDateTimeMin(val);
                        $.lightLib.daterangepicker.setDate("#" + controlID, val);
                    }
                    else {
                        $("#" + controlID).val(val);
                    }
                        

                    
                });
            }

            function setValue_Tag(_tag) {
                $form.find(_tag).each(function () {
                    var controlID = $(this).attr('id');
                    $control = $("#" + controlID);
                    $value = eval("_default.data." + controlID);
                    if (isNull($value))
                        return true;//break----用return false;   continue --用return true;﻿
                    if ("select" == $(this)[0].tagName.toLowerCase()) {
                        $.lightLib.select.val($control, $value);
                        //if ($(this)[0].hasAttribute('multiple')) {
                        //    var arrVal = $value.split(',');
                        //    $.each(arrVal, function (index, val) {
                        //        $control.find("option[value='" + val + "']").attr("selected", true);
                        //    });
                        //    $(this).val(eval('[' + $value + ']'));
                        //}
                        //else {
                        //    $control.find("option[value='" + $value + "']").attr("selected", true);
                        //    $(this).val($value);
                        //    $(this).change();
                        //}
                    }
                    else
                        $control.val($value);
                });
            }
        },
        clearValue: function(){
            var $form = this.$element;

            $.each(this.settings.input_type, function (index, val) {
                clearValue_Type(val);
            });

            $.each(this.settings.tag, function (index, val) {
                clearValue_Tag(val);
            });

            //清空复选框
            $form.find("[type=checkbox]").each(function () {
                $(this).removeAttr("checked");
            });

            function clearValue_Type(_type) {
                $form.find("[type=" + _type + "]").each(function () {
                    $(this).val('');
                });
            }

            function clearValue_Tag(_tag) {
                $form.find(_tag).each(function () {
                    if ($(this)[0].tagName.toLowerCase() == "select") {
                        //$(this).find('option').removeAttr("selected"); //移除属性selected
                        //$(this).change();
                        $.lightLib.select.val($(this), '');
                    }
                    else
                        $(this).val('');
                });
            }
        },
        validate: function () {
            return (!this.settings.eventValidate() || !this.api_validator.validate() || !this.api_validator.isValid());
        },
        resetValidate: function(){
            this.api_validator.resetForm(true);
        },
        unique: function(options){
            var $form = this.$element;
            var $unique = $form.find("[unique]");
            var api_validator = this.api_validator;

            var res = true;

            var _unique = {
                url: options.url,
                text:'',
                ACT: MOD.VALIDATE_AND,
                params: {
                    DataBase: options.params.DataBase,
                    TableDal: options.params.TableDal
                }
            }
            $.extend(_unique, options.unique);

            var dataStr = '({'
            var isVail = false;
            $unique.each(function () {
                var _id = $(this).attr('id');
                var _value = $(this).val();
                dataStr += _id + " : '" + _value + "',";

                isVail = true;
            });
            if (!isVail)
                return res;

            dataStr = dataStr.substring(0, dataStr.length - 1);
            dataStr += '})';

            $.extend(_unique.params, eval(dataStr));

            _unique.params.ACT = _unique.ACT;

            $.lightLib.ajax({
                async: false,
                url: _unique.url,
                data: _unique.params,
                success: function (data) {
                    if (data.Sign == SIGN.FAILD) {
                        $.lightLib.messager.error({ content: '该请求处理异常 :' + data.Msg });
                        res = false
                        return;
                    }

                    var rows = data.Data.rows;

                    if (rows.length == 0)
                        return;

                    ///根据操作AND 还是 OR 进行不同验证
                    ///1. AND
                    ///   记录中必须同时含有多个相同数值, 则视为不通过
                    ///2. OR
                    ///   记录中含有任意一个数值, 则视为不通过

                    $.each(rows, function (index, element) {

                        // 避开验证自己, 由于没有修改数据, 而导致持续验证不通过
                        if (element.ID == options.dataID || element.DataGUID == options.dataID) {
                            return true;
                        }

                        //开始验证
                        var _uniqueCount = 0;   //验证冲突字段个数
                        $unique.each(function () {
                            if ($(this).attr('type') == 'hidden') {
                                _uniqueCount++;
                                return true;
                            }

                            var _controlID = $(this).attr('id');
                            var _value = eval("element." + _controlID);
                            var _type = $(this).attr('type');
                            if (_type == 'date')
                                _value = $.lightLib.date.formatDate(_value);
                            if ($.trim(_value) == $.trim($(this).val()) && !isNull($(this).val())) {

                                try {
                                    //在这里运行代码
                                    api_validator.updateStatus(_controlID, "INVALID", 'different');
                                }
                                catch (err) {
                                    //在这里处理错误
                                }
                                

                                _uniqueCount++;
                            }
                        });

                        //对比冲突字段个数与验证个数, 若相等, 则视为该行数据冲突, 匹配 AND
                        if ((_unique.ACT == MOD.VALIDATE_AND && _uniqueCount == $unique.length) ||
                        //对比冲突字段个数与验证个数, 若有一个验证不通过, 则视为该行数据冲突, 匹配 OR
                            (_unique.ACT == MOD.VALIDATE_OR && _uniqueCount > 0)){
                            $.lightLib.messager.warning({ content: _unique.text });
                            res = false;
                            return false;
                        }
                    });
                }
            });

            return res;
        },
        submit: function (options) {
            var result = false;

            var $this = this;

            if (this.validate())
                return false;

            var _defaults = {
                url: URL.BASE,
                dataID: 0,
                params:{

                }
            }
            $.extend(_defaults, options);

             if (!this.unique(_defaults))
                 return false;



            $.extend(true, _defaults.params, this.loadJson());


            if (_defaults.dataID > 0 || _defaults.dataID != 0)
                $.extend(_defaults.params, {
                    ID: options.dataID
                });


            $.lightLib.ajax({
                async: false,
                url: _defaults.url,
                data: _defaults.params,
                success: function (data) {
                    if (data.Sign == SIGN.SUCCESS) {
                        result = true;
                        //为可能有保存后直接用到填写值, 遂操作后再清空
                        _defaults.eventSaveSuccess(data);
                        if (_defaults.dataID == 0 || _defaults.params.ACT == MOD.CREATE) {
                            $this.clearValue();
                            $this.resetValidate();
                        }

                        $.lightLib.messager.success({
                            content: '保存成功!',
                            closeEvent: function(){
                                
                            }
                        });

                    } else if (data.Sign == SIGN.FAILD)
                        $.lightLib.messager.error({ content: '保存中出现错误! Msg: ' + data.Msg });
                }
            });

            return result;
        },
        loadJson: function () {
            var $from = this.$element;
            var jsonStr = "";

            $.each(this.settings.input_type, function (index, val) {
                loadValue_Type(val);
            });

            $.each(this.settings.tag, function (index, val) {
                loadValue_Tag(val);
            });

            return eval('({' + jsonStr.substring(0, jsonStr.length - 1) + '})');

            function loadValue_Type(_type) {
                $from.find(" [type=" + _type + "]").each(function () {
                    jsonStr += $(this).attr('id') + " : '" + $.trim($(this).val()) + "',";
                });
            }

            function loadValue_Tag(_tag) {
                $from.find(_tag).each(function () {
                    jsonStr += $(this).attr('id') + " : '" + $.trim($(this).val()) + "',";
                });
            }
        }
    }

    //插件定义
    $.fn[pluginName] = function (options) {
        this.each(function () {
            var _form = $.data(this, pluginKey);
            if (!_form) {
                _form = new Form(this, options);
                $.data(this, pluginKey, _form);
                _form.create();
            }
            $.data(this, pluginResultKey, _form.init(options));
        });
        return this;
    }

})(jQuery, window, document);