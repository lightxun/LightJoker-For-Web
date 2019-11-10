/**俩俩相忘
 * Created by Light on 2017-05-31.
 */
; jQuery.lightLib = {
    tab: {
        show: function(opt){
            var _default = {
                area: ['55%', 'auto'],
                offset: 'auto',
                tab: [
                    //{
                    //    title: 'TAB1',
                    //    url: ''
                    //}
                ]
            }
            $.extend(true, _default, opt);


            var _option = {
                area: _default.area,
                offset: _default.offset,
                tab: []
            }


            $.ajaxSettings.async = false;
            $.each(_default.tab, function (uIndex, uObj) {
                $.get(uObj.url, function (data, status) {
                    _option.tab.push({
                        title: uObj.title,
                        content: data
                    })
                });
            });
            $.ajaxSettings.async = true;
            
            $.lightLib.layer.tab(_option);
        },
        hide: function (opt) {
            var _default = {
                index: -1
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.close(_default);
        }
    },
    prompt: {
        input: function (opt) {
            var _default = {
                title: '',
                btnOkEvent: function (value, index, elem) { return true; }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.prompt.input({
                core: {
                    title: _default.title
                },
                btnOkEvent: _default.btnOkEvent
            })
        },
        password: function (opt) {
            var _default = {
                title: '',
                btnOkEvent: function (value, index, elem) { return true; }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.prompt.password({
                core: {
                    title: _default.title
                },
                btnOkEvent: _default.btnOkEvent
            })
        },
        textarea: function (opt) {
            var _default = {
                title: '',
                btnOkEvent: function (value, index, elem) { return true; }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.prompt.textarea({
                core: {
                    title: _default.title
                },
                btnOkEvent: _default.btnOkEvent
            })
        }
    },
    confirm: function (opt) {
        var _default = {
            title: '确认',
            content: '',
            btnOkEvent: function () { return true; },
            btnCancelEvent: function () { return true; }
        }
        $.extend(true, _default, opt);

        $.lightLib.layer.confirm({
            core: {
                title: _default.title,
                content: _default.content
            },
            btnOkEvent: _default.btnOkEvent,
            btnCancelEvent: _default.btnCancelEvent
        });
    },
    modal: {
        show: function (opt) {
            var _default = {
                url: '',
                btnOkEvent: function (index, layerok) { return true; },
                //btnCancelEvent: function () { return true; },
                btnCloseEvent: function () { return true; },
                title: ''
            }
            $.extend(true, _default, opt);

            return $.lightLib.layer.modal({
                url: _default.url,
                btnOkEvent: _default.btnOkEvent,
                btnCancelEvent: _default.btnCloseEvent,
                btnCloseEvent: _default.btnCloseEvent,
                core: {
                    title: _default.title
                }
            });
        },
        hide: function (opt) {
            var _default = {
                index: -1
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.close(_default);
        }
    },
    alert: {
        warning: function (opt) {
            var _default = {
                title: '',
                content: '',
                btnOkEvent: function () { return true; }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.alert.warning({
                core: {
                    title: _default.title,
                    content: _default.content
                },
                btnOkEvent: _default.btnOkEvent
            })
        },
        success: function (opt) {
            var _default = {
                title: '',
                content: '',
                btnOkEvent: function () { return true; }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.alert.success({
                core: {
                    title: _default.title,
                    content: _default.content
                },
                btnOkEvent: _default.btnOkEvent
            })
        },
        error: function (opt) {
            var _default = {
                title: '',
                content: '',
                btnOkEvent: function () { return true; }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.alert.error({
                core: {
                    title: _default.title,
                    content: _default.content
                },
                btnOkEvent: _default.btnOkEvent
            })
        },
        question: function (opt) {
            var _default = {
                title: '',
                content: '',
                btnOkEvent: function () { return true; }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.alert.question({
                core: {
                    title: _default.title,
                    content: _default.content
                },
                btnOkEvent: _default.btnOkEvent
            })
        },
        info: function (opt) {
            var _default = {
                title: '',
                content: '',
                btnOkEvent: function () { return true; }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.alert.info({
                core: {
                    title: _default.title,
                    content: _default.content
                },
                btnOkEvent: _default.btnOkEvent
            })
        }
    },
    messager:{
        warning: function (opt) {
            var _default = {
                content: '',
                closeEvent: function(){ }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.msg.warning({
                core: {
                    content: _default.content
                },
                closeEvent: _default.closeEvent
            })
        },
        success: function (opt) {
            var _default = {
                content: '',
                closeEvent: function () { }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.msg.success({
                core: {
                    content: _default.content
                },
                closeEvent: _default.closeEvent
            })
        },
        error: function (opt) {
            var _default = {
                content: '',
                area: 'auto',
                closeEvent: function () { }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.msg.error({
                core: {
                    content: _default.content,
                    area: _default.area
                },
                closeEvent: _default.closeEvent
            })
        },
        question: function (opt) {
            var _default = {
                content: '',
                closeEvent: function () { }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.msg.question({
                core: {
                    content: _default.content
                },
                closeEvent: _default.closeEvent
            })
        },
        lock: function (opt) {
            var _default = {
                content: '',
                closeEvent: function () { }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.msg.lock({
                core: {
                    content: _default.content
                },
                closeEvent: _default.closeEvent
            })
        },
        uninfo: function (opt) {
            var _default = {
                content: '',
                closeEvent: function () { }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.msg.uninfo({
                core: {
                    content: _default.content
                },
                closeEvent: _default.closeEvent
            })
        },
        info: function (opt) {
            var _default = {
                content: '',
                closeEvent: function () { }
            }
            $.extend(true, _default, opt);

            $.lightLib.layer.msg.info({
                core: {
                    content: _default.content
                },
                closeEvent: _default.closeEvent
            })
        }
    },
    layer: {
        // api: https://www.layui.com/doc/modules/layer.html#full
        tab: function(opt){
            var _default = {
                area: ['55%', 'auto'],
                tab: [
                    //{
                    //    title: 'TAB1',
                    //    content: '内容1'
                    //}, {
                    //    title: 'TAB2',
                    //    content: '内容2'
                    //}, {
                    //    title: 'TAB3',
                    //    content: '内容3'
                    //}
                ]
            }

            $.extend(true, _default, opt);

            layer.tab(_default);
        },
        close: function (opt) {
            var _index = opt.index;
            layer.close(_index);
        },
        modal: function (opt) {
            var _default = {
                url: '',
                btnOkEvent: function (index, layerok) { return true; },
                btnCancelEvent: function () { return true; },
                btnCloseEvent: function () { return true; },
                core: {
                    type: 1,                                    // type: 层类型, 0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）若你采用layer.open({type: 1})方式调用，则type为必填项（信息框除外）
                    anim: 1,
                    title: false,                               // title: 标题 类型：String/Array/Boolean，默认：'信息', title: ['文本', 'font-size:18px;'], title: false
                    scrollbar: false,
                    shadeClose: false,
                    resize: false,
                    shade: [0.8, '#393D49'],
                    maxmin: true, //开启最大化最小化按钮
                    area: ['55%', 'auto'],                      // area: 宽高
                    //area: ['auto', 'auto'],
                    //offset: ['100px', '20%'],
                    offset: '50px',
                    content: '',                                // content: 内容
                    btn: ['保存', '取消'],                      // btn: 提示按钮
                    yes: function (index, layerok) {
                        // 保存按钮, 按钮【按钮一】的回调
                        if (_default.btnOkEvent(index, layerok)) {
                            layer.close(index);
                        }
                    },
                    btn2: function () {
                        // 取消按钮, 按钮【按钮二】的回调
                        return _default.btnCancelEvent();
                        //return false 开启该代码可禁止点击该按钮关闭
                    },
                    cancel: function () {
                        // 关闭按钮, 右上角关闭回调
                        return _default.btnCloseEvent();
                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                }
            };
            $.extend(true, _default, opt);

            
            $.ajaxSettings.async = false;
            var res = -1;
            $.get(_default.url, function (data, status) {
                $.extend(true, _default.core, { content: data });
                res = layer.open(_default.core);
            });
            $.ajaxSettings.async = true;

            return res;
        },
        prompt: {
            input: function(opt){
                var _default = {
                    core:{
                        formType: 0
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.prompt.base(_default);
            },
            password: function (opt) {
                var _default = {
                    core: {
                        formType: 1
                    }
                }
                $.extend(true, _default, opt);
                
                $.lightLib.layer.prompt.base(_default);
            },
            textarea: function (opt) {
                var _default = {
                    core: {
                        formType: 2,
                        area: ['800px', '350px'] //自定义文本域宽高
                    }
                }
                $.extend(true, _default, opt);
                
                $.lightLib.layer.prompt.base(_default);
            },
            base: function (opt) {
                var _default = {
                    btnOkEvent: function (value, index, elem) { return true; },
                    core: {
                        formType: 0,
                        title: '标题'
                    }
                }

                $.extend(true, _default, opt);

                layer.prompt(
                    _default.core,
                    function (value, index, elem) {
                        if (_default.btnOkEvent(value, index, elem))
                            layer.close(index);
                    }
                );
            }
        },
        confirm: function (opt) {
            var _default = {
                btnOkEvent: function () { return true; },
                btnCancelEvent: function () { return true; },
                core: {
                    title: '确认',
                    content: '',
                    icon: 0,
                    anim: 6,
                    btn: ['确定', '取消'] //按钮
                }
            };
            $.extend(true, _default, opt);

            layer.confirm(
                '',
                _default.core,
                function (index) {
                    if (_default.btnOkEvent()) {
                        layer.close(index);
                    }
                },
                function () {
                    _default.btnCancelEvent();
                }
            );
        },
        msg: {
            warning: function (opt) {
                var _default = {
                    core: {
                        icon: 0,
                        content: '警告内容 .'
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.msg.base(_default);
            },
            success: function (opt) {
                var _default = {
                    core: {
                        icon: 1,
                        content: '成功内容 .'
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.msg.base(_default);
            },
            error: function (opt) {
                var _default = {
                    core: {
                        icon: 2,
                        content: '错误内容 .',
                        time: 5000
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.msg.base(_default);
            },
            question: function (opt) {
                var _default = {
                    core: {
                        icon: 3,
                        content: '问题内容 .'
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.msg.base(_default);
            },
            lock: function(opt){
                var _default = {
                    core: {
                        icon: 4,
                        content: '锁住内容 .'
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.msg.base(_default);
            },
            uninfo: function(opt){
                var _default = {
                    core: {
                        icon: 5,
                        content: '消息内容 .'
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.msg.base(_default);
            },
            info: function (opt) {
                var _default = {
                    core: {
                        icon: 6,
                        content: '消息内容 .'
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.msg.base(_default);
            },
            base: function (opt) {
                var _default = {
                    closeEvent: function () { },
                    core: {
                        content: '',
                        icon: 0,
                        anim: 3,
                        time: 3000
                    }
                }
                $.extend(true, _default, opt);

                layer.msg(
                    '',
                    _default.core,
                    function () {
                        _default.closeEvent();
                    }
                );
            }
        },
        alert: {
            warning: function (opt) {
                var _default = {
                    core: {
                        icon: 0,
                        title: '警告',
                        content: '警告内容'
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.alert.base(_default);
            },
            success: function (opt) {
                var _default = {
                    core: {
                        icon: 1,
                        title: '成功',
                        content: '成功内容'
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.alert.base(_default);
            },
            error: function (opt) {
                var _default = {
                    core: {
                        icon: 2,
                        title: '错误',
                        content: '错误内容'
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.alert.base(_default);
            },
            question: function (opt) {
                var _default = {
                    core: {
                        icon: 3,
                        title: '问题',
                        content: '问题内容'
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.alert.base(_default);
            },
            lock: function(opt){
                var _default = {
                    core: {
                        icon: 4,
                        title: '锁住',
                        content: '锁住内容'
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.alert.base(_default);
            },
            uninfo: function(opt){
                var _default = {
                    core: {
                        icon: 5,
                        title: '消息',
                        content: '消息内容'
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.alert.base(_default);
            },
            info: function (opt) {
                var _default = {
                    core: {
                        icon: 6,
                        title: '消息',
                        content: '消息内容'
                    }
                }
                $.extend(true, _default, opt);

                $.lightLib.layer.alert.base(_default);
            },
            base: function (opt) {
                var _default = {
                    core: {
                        title: '',
                        content: '',
                        icon: 0,
                        anim: 0
                    },
                    btnOkEvent: function () { return true; }
                }
                $.extend(true, _default, opt);

                layer.alert(
                    '',
                    _default.core,
                    function (index) {
                        
                        if (_default.btnOkEvent()) {
                            layer.close(index);
                        }                    
                });
            }
        }
    },
    loading: {
        show: function(ele){
            if(isNull(ele))
                $.LoadingOverlay("show");
            else
                $(ele).LoadingOverlay("show");
        },
        hide: function (ele) {
            if(isNull(ele))
                $.LoadingOverlay("hide");
            else
                $(ele).LoadingOverlay("hide");
        }
    },
    ajax: function (options) {
        
        var _opt = {
            isWebApi: true,
            type: 'post',
            async: true,
            cache: false,
            url: '',
            data: {},
            dataType: 'json',
            //contentType: 'application/json;charset=utf-8', // webapi 打开
            beforeSend: function () { },
            complete: function (data) { },
            success: function (data) { },
            error: function (data) {
                if (data.readyState != 4 || data.status != 200)
                {
                    var _errContent = data.responseText;
                    if (isNull(_errContent))
                        _errContent = data.statusText;


                    $.lightLib.messager.error({
                        content: _errContent,
                        area: ['80%','80%']
                    });
                    //$.lightLib.alert.error({ text: '请求响应过程中出现异常: ' + data.statusText });
                    console.log(_errContent);
                }
            }
        };

        if (!isNull(options))
            $.extend(_opt, options);

        if(JSON.stringify(_opt.data) == '{}')
            $.extend(_opt.data, { ACT: '' });

        if(_opt.isWebApi){
            _opt.data = JSON.stringify(_opt.data);
            _opt.contentType = 'application/json;charset=utf-8';
        }


        //ajax 请求
        $.ajax({
            type: _opt.type,
            url: _opt.url,
            async: _opt.async,
            cache: _opt.cache,
            data: _opt.data,
            dataType: _opt.dataType,
            contentType: _opt.contentType,
            beforeSend: _opt.beforeSend,
            complete: _opt.complete,
            success: _opt.success,
            error: _opt.error
        });

        ////1.创建对象
        //var oAjax = null;
        //if(window.XMLHttpRequest){
        //    oAjax = new XMLHttpRequest();
        //}else{
        //    oAjax = new ActiveXObject("Microsoft.XMLHTTP");
        //}

        ////2.连接服务器
        //oAjax.open(_opt.type, _opt.url, _opt.async);   //open(方法, url, 是否异步)

        ////3.发送请求
        //oAjax.send(_opt.data);

        ////4.接收返回
        //oAjax.onreadystatechange = function(){  //OnReadyStateChange事件
        //    if(oAjax.readyState == 4){  //4为完成
        //        if(oAjax.status == 200){    //200为成功
        //            var _tmpResp = oAjax.responseText;
        //            if('json' == _opt.dataType)
        //                _opt.success(eval(_tmpResp));
        //            else
        //                _opt.success(_tmpResp);
        //        }else{
        //            _opt.erzror(oAjax.responseText)
        //        }
        //    }
        //}
    },
    select: {
        bind: function (element, options) {
            var _result = new Array();

            var $element = $(element);

            $.each($element, function (eIndex, eObj) {
                var $eObj = $(eObj);

                var defaults = {
                    serverSide: true,
                    async: false,
                    placeholder: '请选择..',
                    allowClear: true,
                    width: '100%',
                    url: URL.BASE,
                    params: {},
                    key: '',
                    value: '',
                    isSearchView: true,
                    eventAjaxComplete: function (data) { },
                    extendAttr: []      //extendAttr:[{key:'', value:''}]
                }
                $.extend(defaults, options);

            

                if(defaults.serverSide)
                    $eObj.empty();

                if (!isNull($eObj.attr('allowClear'))) {
                    defaults.allowClear = $eObj.attr('allowClear');
                }
                if (defaults.allowClear)
                    $eObj.append("<option value='' ></option>");
            
                if (!isNull($eObj.attr('placeholder')))
                    defaults.placeholder = $eObj.attr('placeholder');

                if(defaults.serverSide){
                    $.lightLib.ajax({
                        async: defaults.async,
                        url: defaults.url,
                        data: defaults.params,
                        complete: function(cData){
                            if(cData.status == 200){
                                if(cData.responseJSON.Sign == SIGN.FAILD){
                                    $.lightLib.alert.error({text: '请求过程中异常 :' + cData.responseJSON.Msg});
                                    return;
                                }
                                var _rows = cData.responseJSON.Data.rows;

                                if (!isNull(_rows)) {
                                    var _temp = '';
                                    $.each(_rows, function (index, item) {
                                        var _key = eval("item." + defaults.key);
                                        var _value = eval("item." + defaults.value);

                                        var _attr = '';
                                        $.each(defaults.extendAttr, function (eIndex, eItem) {
                                            _attr += ' ' + 'lightAttr-' + eItem.name + '=' + eval('item.' + eItem.name) + ' ';
                                        });

                                        _temp += "<option value=" + _value + " " + _attr + ">" + _key + "</option>";
                                    });
                                    $eObj.append(_temp);
                                }


                                defaults.eventAjaxComplete(cData);
                            }
                        }
                    });
                }

                if(!defaults.isSearchView)
                    $.extend(defaults,{ minimumResultsForSearch: -1 });

                _result.push($eObj.select2(defaults));
            });

            if (_result.length == 1)
                return _result[0];
            else
                return _result;
        },
        val: function (element, val) {
            var $element = $(element);

            if (!isNull(val) || '' == val) {
                if (!isNull($element.attr('multiple'))) {
                    if ('' == val)
                        val = [];
                    else
                        val = val.split(',');
                }
                   
                $element.val(val).trigger("change");
                //$element.change();
            }
            return $element.val() + '';
        },
        text: function (element) {
            var $element = $(element);

            var _text = '';
            $.each($element.select2('data'), function (index, obj) {
                _text += this.text + ',';
            });
            _text = _text.substring(0, _text.length - 1);

            return _text;
        },
        attr: function (element, attrName) {
            var $element = $(element);

            var _valArr = $.lightLib.select.val(element).split(',');

            var _result = '';
            $.each(_valArr, function (aIndex, aObj) {
                _result += $(element).find('[value=' + aObj + ']').attr('lightAttr-' + attrName.toLowerCase());
            });

            return _result;
        },
        destroy: function (element) {
            $(element).select2('destroy');
        }
    },
    daterangepicker: {
        /// options = { locale: {}, core: {} }
        bindSampleDate: function (element, options) {
            var _result = new Array();

            $(element).each(function (elementIndex, elementObj) {
                var _defaults = {
                    core: {
                        singleDatePicker: true,
                        startDate: $.lightLib.date.currentDate(),
                        endDate: $.lightLib.date.currentDate()
                    }
                };

                $.extend(true, _defaults, options);

                // 结合样式 light-date 及 light-datetime 格式化数据
                $(elementObj).addClass('light-date');

                _result.push($.lightLib.daterangepicker.bind(elementObj, _defaults))

                if ($(elementObj).hasClass('light-empty')) {
                    $.lightLib.daterangepicker.setDate($(elementObj), '');
                }
            })

            if (_result.length == 1)
                return _result[0];
            else
                return _result;
        },
        bindSampleDateTime: function (element, options) {
            var _result = new Array();

            $(element).each(function (elementIndex, elementObj) {
                var _defaults = {
                    locale: {
                        format: 'YYYY-MM-DD HH:mm'
                    },
                    core: {
                        singleDatePicker: true,
                        timePicker: true,
                        startDate: $.lightLib.date.currentDate(),
                        endDate: $.lightLib.date.currentDate()
                    }
                };

                $.extend(true, _defaults, options);

                // 结合样式 light-date 及 light-datetime 格式化数据
                $(elementObj).addClass('light-datetime');

                _result.push($.lightLib.daterangepicker.bind(elementObj, _defaults));

                if ($(elementObj).hasClass('light-empty')) {
                    $.lightLib.daterangepicker.setDate($(elementObj), '');
                }
            });

            if (_result.length == 1)
                return _result[0];
            else
                return _result;
        },
        bindMultipleDate: function (element, options) {
            var _result = new Array();

            $(element).each(function (elementIndex, elementObj) {
                var _defaults = {
                    core: {
                        startDate: $.lightLib.date.currentYear0101(),
                        endDate: $.lightLib.date.currentYear1231()
                    }
                };

                $.extend(true, _defaults, options);

                // 结合样式 light-date 及 light-datetime 格式化数据
                $(elementObj).addClass('light-date-multiple');

                _result.push($.lightLib.daterangepicker.bind(elementObj, _defaults));

                if ($(elementObj).hasClass('light-empty')) {
                    $.lightLib.daterangepicker.setDate($(elementObj), '');
                }

            });

            if (_result.length == 1)
                return _result[0];
            else
                return _result;
        },
        bindMultipleDateTime: function (element, options) {
            var _result = new Array();

            $(element).each(function (elementIndex, elementObj) {
                var _defaults = {
                    locale: {
                        format: 'YYYY-MM-DD HH:mm'
                    },
                    core: {
                        timePicker: true,
                        startDate: $.lightLib.date.currentYear0101(),
                        endDate: $.lightLib.date.currentYear1231()
                    }
                };

                $.extend(true, _defaults, options);

                // 结合样式 light-date 及 light-datetime 格式化数据
                $(elementObj).addClass('light-datetime-multiple');

                _result.push($.lightLib.daterangepicker.bind(elementObj, _defaults));

                if ($(elementObj).hasClass('light-empty')) {
                    $.lightLib.daterangepicker.setDate($(elementObj), '');
                }

            });

            if (_result.length == 1)
                return _result[0];
            else
                return _result;
        },
        bind: function (element, options) {
            var _tmp = {
                locale:{

                },
                core: {

                }
            }
            var defaults = {
                locale: {
                    format: 'YYYY-MM-DD',
                    applyLabel: '确定',
                    cancelLabel: '清除',
                    fromLabel: '起始时间',
                    toLabel: '结束时间',
                    customRangeLabel: '自定义',
                    weeklabel: 'W',
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    firstDay: 1
                },
                //opens: 'left',
                drops: 'down',
                timePicker: false,
                timePicker24Hour:true,
                autoUpdateInput: true,
                startDate: $.lightLib.date.currentYear0101(),
                endDate: $.lightLib.date.nextYear0101(),
                singleDatePicker: false,
                showDropdowns: true,
                alwaysShowCalendars: true,
                autoApply: false,
                eventCancel: function (ev, picker) {
                    $(this).val('');
                    $(this).change();
                },
                eventApply: function (ev, picker) {
                    //$(element).change();  // 当外部再次绑定change时,将调用两遍
                }
            }
            $.extend(_tmp, options);
            $.extend(defaults.locale, _tmp.locale);
            $.extend(defaults, _tmp.core);


            return $(element).daterangepicker(defaults)
                  .on('cancel.daterangepicker', defaults.eventCancel)
                  .on('apply.daterangepicker', defaults.eventApply);
        },
        setStartDate: function (element, val) {

            $(element).each(function (elementIndex, elementObj) {

                if (isNull(val) || val == '1900-01-01')
                    $(elementObj).val('');
                else
                    $(elementObj).data('daterangepicker').setStartDate(val);

                $(elementObj).change();
            });
            
            return $(element);
        },
        setEndDate: function (element, val) {

            $(element).each(function (elementIndex, elementObj) {
                if (isNull(val) || val == '1900-01-01')
                    $(elementObj).val('');
                else
                    $(elementObj).data('daterangepicker').setEndDate(val);

                $(elementObj).change();
            });

            return $(element);
        },
        setDate: function (element, val) {

            $(element).each(function (elementIndex, elementObj) {
                if (isNull(val) || val == '1900-01-01')
                    $(elementObj).val('');
                else {
                    $(elementObj).data('daterangepicker').setStartDate(val);
                    $(elementObj).data('daterangepicker').setEndDate(val);
                }

                $(elementObj).change();
            })

            return $(element);
        }
    },
    timepicker: {
        bind: function (element, options) {
            var _result = new Array();

            $(element).each(function (elementIndex, elementObj) {
                var defaults = {
                    showInputs: false,
                    minuteStep: 1,
                    showMeridian: false
                }
                $.extend(true, defaults, options);

                $(elementObj).timepicker(defaults);
            });

            if (_result.length == 1)
                return _result[0];
            else
                return _result;
        }
    },
    date: {
        formatDateMask: function(date, mask){
            if (isNull(date))
                return '';
            return new Date(date).Format(mask);
        },
        formatDate: function (date) {
            if (isNull(date))
                return '';
            return new Date(date).Format('yyyy-MM-dd');
        },
        formatDateYMD: function (date) {
            if (isNull(date))
                return '';
            return new Date(date).Format('yyyyMMdd');
        },
        formatDateD: function (date) {
            if (isNull(date))
                return '';
            return new Date(date).Format('dd');
        },
        formatDateTime: function(date){
            if (isNull(date))
                return '';
            return new Date(date).Format("yyyy-MM-dd hh:mm:ss");
        },
        formatDateTimeMin: function(date){
            if (isNull(date))
                return '';
            return new Date(date).Format("yyyy-MM-ddThh:mm");
        },
        formatDateCN: function (date) {
            if (isNull(date))
                return '';
            return new Date(date).Format("yyyy年MM月d日");
        },
        formatDateYear: function (date) {
            if (isNull(date))
                return '';
            return new Date(date).Format('yyyy');
        },
        currentYear: function () {
            return new Date().Format('yyyy');
        },
        previousYear: function(){
            var date = new Date();
            return (date.getFullYear() - 1) + '';
        },
        currentDate: function () {
            return new Date().Format('yyyy-MM-dd');
        },
        currentDateYMD: function(){
            return new Date().Format('yyyyMMdd');
        },
        currentDateTime: function () {
            return new Date().Format('yyyy-MM-dd hh:mm:ss');
        },
        currentYear0101: function () {
            return new Date().Format('yyyy-01-01');
        },
        currentYear1231: function(){
            return new Date().Format('yyyy-12-31');
        },
        nextYear0101: function () {
            var date = new Date();
            return (date.getFullYear() + 1) + '-01-01';
        },
        previousYear0101: function () {
            var date = new Date();
            return (date.getFullYear() - 1) + '-01-01';
        },
        addDate: function (date, days) {
            if (days == undefined || (days == '' && days != 0)) {
                days = 1;
            }
            var _date = new Date(date);
            _date.setDate(_date.getDate() + days);
            return new Date(_date).Format('yyyy-MM-dd');
        },
        addMonth: function(date, months){
            if (months == undefined || (months == '' && months != 0)) {
                months = 1;
            }
            var _date = new Date(date);
            _date.setMonth(_date.getMonth() + months);
            return new Date(_date).Format('yyyy-MM-dd');
        },
        addYear: function(date, years){
            if(years == undefined || (years == '' && years != 0)){
                years = 1;
            }
            var _date = new Date(date);
            _date.setFullYear(_date.getFullYear() + years);
            return new Date(_date).Format('yyyy-MM-dd');
        },
        compareDate: function (d1, d2) {
            return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
        },
        dateDiff: function (sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
            var dateSpan,
            tempDate,
            iDays;
            sDate1 = Date.parse(new Date(sDate1).Format('yyyy-MM-dd').split("-"));
            sDate2 = Date.parse(new Date(sDate2).Format('yyyy-MM-dd').split("-"));
            dateSpan = sDate2 - sDate1;
            dateSpan = Math.abs(dateSpan);
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            return iDays
        },
        previousMonthDate: function (date) {
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份
            var day = arr[2]; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中月的天数
            var year2 = year;
            var month2 = parseInt(month) - 1;
            if (month2 == 0) {//如果是1月份，则取上一年的12月份
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {//如果原来日期大于上一月的日期，则取当月的最大日期。比如3月的30日，在2月中没有30
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;//月份填补成2位。
            }
            var t2 = year2 + '-' + month2 + '-' + day2;
            return t2;
        }
    },
    tip:{
        bind: function (element, options) {
            var _result = new Array();

            $(element).each(function (elementIndex, elementObj) {
                var defaults = {
                    content: {
                        title: '标题',
                        text: '内容'
                    },
                    position: {
                        my: 'Bottom Center',
                        at: 'Top Center'
                    },
                    style: {
                        classes: 'qtip-bootstrap'
                    }
                }
                $.extend(defaults, options);

                $(elementObj).attr('qtip', true);
                _result.push($(elementObj).qtip(defaults));
            })

            if (_result.length == 1)
                return _result[0];
            else
                return _result;
        },
        destroy: function(element){
            $(element).find('[qtip]').qtip('destroy', true);
            $(element).find('[qtip]').removeAttr('qtip');
        }
    },
    niceScroll: function (element, options) {
        var _result = new Array();

        $(element).each(function (elementIndex, elementObj) {
            var defaults = {
                cursorcolor: 'rgba(34,45,50, 0.5)',
                cursorwidth: "10px", // cursor width in pixel (you can also write "5px")
                cursorborder: "0", // css definition for cursor border
                autohidemode: false,
                railpadding: { top: 0, right: 2, left: 0, bottom: 0 } // set padding for rail bar
            }
            $.extend(defaults, options);

            _result.push($(elementObj).niceScroll(defaults));
        });

        if (_result.length == 1)
            return _result[0];
        else
            return _result;
    },
    notice: {
        info: function (options) {
            var _defaults = {
                type: 'info'
            }
            $.extend(_defaults, options);

            return $.lightLib.notice.base(_defaults);
        },
        success: function (options) {
            var _defaults = {
                type: 'success'
            }
            $.extend(_defaults, options);

            return $.lightLib.notice.base(_defaults);
        },
        error: function (options) {
            var _defaults = {
                type: 'error'
            }
            $.extend(_defaults, options);

            return $.lightLib.notice.base(_defaults);
        },
        warning: function (options) {
            var _defaults = {
                
            }
            $.extend(_defaults, options);

            return $.lightLib.notice.base(_defaults);
        },
        base: function (options) {
            var _defaults = {
                hide: true,
                addclass: 'light',
                title: '通知',
                text: '这是一条测试通知',
                animate: {
                    animate: true,
                    in_class: 'bounceInLeft',
                    out_class: 'bounceOutRight'
                }
            }
            $.extend(_defaults, options);

            return new PNotify(_defaults);
            //var notice = new PNotify(_defaults);
            //notice.get().click(function () {
            //    notice.remove();
            //});
        }
    },
    sweetalert2: {
        success: function (options) {
            var _defaults = {
                title: '成功 !',
                type: 'success'
            }
            $.extend(_defaults, options);

            $.lightLib.alert.base(_defaults);
        },
        error: function (options) {
            var _defaults = {
                title: '错误 !',
                type: 'error'
            }
            $.extend(_defaults, options);

            $.lightLib.alert.base(_defaults);
        },
        warning: function (options) {
            var _defaults = {
                title: '警告 !',
                type: 'warning'
            }
            $.extend(_defaults, options);

            $.lightLib.alert.base(_defaults);
        },
        info: function (options) {
            var _defaults = {
                title: '消息 !',
                type: 'info'
            }
            $.extend(_defaults, options);

            $.lightLib.alert.base(_defaults);
        },
        question: function (options) {
            var _defaults = {
                title: '问题 !',
                type: 'question'
            }
            $.extend(_defaults, options);

            $.lightLib.alert.base(_defaults);
        },
        confirm: function (options) {
            var _defaults = {
                title: '确认 !',
                type: 'warning',
                showCancelButton: true
            }
            $.extend(_defaults, options);

            $.lightLib.alert.base(_defaults);
        },
        input: function (options) {
            var _defaults = {
                input: 'text',
                showCancelButton: true,
                inputValidator: function (value) {
                    return new Promise(function (resolve, reject) {
                        if (value) {
                            resolve();
                        } else {
                            reject('请输入内容 !');
                        }
                    });
                }
            }
            $.extend(_defaults, options);

            $.lightLib.alert.base(_defaults);
        },
        select2: function (options) {
            var element = '.swal2-select';

            var _defaults = {
                select2Options: {

                },
                multiple: false,
                input: 'select',
                inputOptions: {

                },
                showCancelButton: true,
                inputValidator: function (value) {
                    return new Promise(function (resolve, reject) {
                        if (value) {
                            resolve();
                        } else {
                            reject('请选择 !');
                        }
                    });
                },
                eventThenSelected: function () { },
                selectedValue: ''
            }
            $.extend(_defaults, options);
            $.extend(_defaults, {
                eventThen: function (result) {
                    var res = '';
                    //为解决无法赋值下拉选框的bug, 增加判定位进行在第一次打开选项时进行赋值选中, 避免未打开选项而直接保存
                    if ($element.attr('isInit') == 'false')
                        res = _defaults.selectedValue;
                    else
                        res = $.lightLib.select2.val($element);
                    _defaults.eventThenSelected(res);
                    $.lightLib.select2.destroy($element);
                }
            });

            $.lightLib.alert.base(_defaults);


            $element = $(element);
            
            $element.attr('multiple', _defaults.multiple);
            //为解决无法赋值下拉选框的bug, 增加判定位进行在第一次打开选项时进行赋值选中
            $element.attr('isInit', 'false');
            $element.addClass('form-control');
            $element.addClass('select2');
            $element.css({ 'width': '100%' });
            $.lightLib.select2.bind($element, _defaults.select2Options).on('select2:open', function (evt) {
                if ($element.attr('isInit') == 'false') {
                    $.lightLib.select2.val($element, _defaults.selectedValue);
                    $element.attr('isInit', 'true');
                }
            });
            $.lightLib.select2.val($element, _defaults.selectedValue);
        },
        base: function (options) {
            var _defaults = {
                title: '',
                text: '',
                allowOutsideClick: false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                //confirmButtonClass: 'btn btn-style',
                //cancelButtonClass: 'btn btn-style',
                eventThen: function (result) { },
                eventCancel: function () { },
                onOpen: function () { }
            }
            $.extend(_defaults, options);

            swal(_defaults).then(
                _defaults.eventThen, 
                function (dismiss) {
                    if (dismiss == 'cancel') {
                        _defaults.eventCancel();
                    }
                }).catch(swal.noop);
        }
    },
    maskedinput: {
        //options = { mask: '', placeholder:'' }
        bind: function (element, options) {
            var _result = new Array();

            $(element).each(function (elementIndex, elementObj) {
                var _tmp = {
                    mask: '',
                    placeholder: {

                    }
                }

                //a - Represents an alpha character (A-Z,a-z)
                //9 - Represents a numeric character (0-9)
                //* - Represents an alphanumeric character (A-Z,a-z,0-9)
                var _mask = '';
                var _placeholder = {
                    placeholder: ''
                }
                _mask = options.mask;
                _placeholder.placeholder = options.placeholder;

                _result.push($(elementObj).mask(_mask, _placeholder));
            });

            if (_result.length == 1)
                return _result[0];
            else
                return _result;
        }
    },
    owlCarousel: {
        bind: function (element, options) {
            var _result = new Array();

            $(element).each(function (elementIndex, elementObj) {
                var _defaults = {
                    margin: 10,
                    autoWidth: true,
                    nav: false,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 2
                        },
                        1000: {
                            items: 5
                        }
                    }
                }

                _result.push($(elementObj).owlCarousel(_defaults));
            })

            if (_result.length == 1)
                return _result[0];
            else
                return _result;
        },
        destroy: function (element) {
            $(element).empty();
            $(element).owlCarousel('destroy');
        }
    },
    expExcel: function (options, isRun) {

        if (isNull(isRun)) {
            $.lightLib.messager.info({ content: '开发中,敬请期待……' });
            return;
        }

        $.lightLib.confirm({
            content: '是否对当前查出数据进行导出 ?',
            btnOkEvent: function () {
                var _defaults = {
                    url: URL.BASE,
                    arrData: []
                }
                $.extend(_defaults, options);

                var tmpForm = document.createElement('form');
                tmpForm.id = 'expForm';
                tmpForm.method = 'post';
                tmpForm.action = _defaults.url;
                tmpForm.target = '_blank';

                $.each(_defaults.arrData, function (index, obj) {
                    var hideInput = document.createElement('input');
                    hideInput.type = 'hidden';
                    hideInput.name = obj.name;
                    hideInput.value = obj.value;

                    tmpForm.appendChild(hideInput);
                });

                document.body.appendChild(tmpForm);
                tmpForm.submit();
                document.body.removeChild(tmpForm);

                return true;
            }
        });
        
    }
};