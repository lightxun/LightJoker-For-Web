/**



*/
; (function ($, window, document, underined) {

    var pluginName = 'lightJsTree',
        pluginKey = 'plugin',
        pluginResultKey = 'plugin_res',
        defaults = {
            openAll: false,
            openRoot: true,
            url: URL.BASE,
            async: false,
            serverSide: false,
            disabled: false,
            BindControl:{
                isBind: false,
                isCheckLeafOnly: false
            },
            params: {},
            core: {
                check_callback: true,
                multiple: false,
                data: []
            },
            plugins: ['wholerow', 'checkbox'],//types, themes, state
            checkbox: {
                visible: false,
                three_state: false
            },
            eventReady: function (e, data) { },
            eventLoaded: function (e, data) { },
            eventChanged: function (e, data) { }
        },
        ajax = {
            data: function (obj, callback) {
                var _$element = this;
                $.lightLib.ajax({
                    url: _$element.settings.url,
                    async: _$element.settings.async,
                    data: _$element.settings.params,
                    success: function (data) {
                        if (data.Sign == SIGN.SUCCESS) {
                            if (_$element.settings.disabled) {
                                $.each(data.Data.rows, function (dIndex, dObj) {
                                    $.extend(true, dObj, { state: { disabled: true } });
                                });
                            }


                            callback.call(obj, data.Data.rows);


                            if (_$element.settings.openAll)
                                _$element.open_all();
                        }
                        else
                            $.lightLib.messager.error({ content: '请求过程中出现异常 :' + data.Msg });
                    }
                });


            }
        }

    function JsTree(element, options) {

        this.settings = $.extend({}, defaults, options);
        element = BindControl(element, this.settings);

        this.element = element;
        this.$element = $(element);

        this._defaults = defaults;
        this._name = pluginName;
        this.version = 'v1.0.0';
        this.methods = {
            empty: function () { },
            reload: this.reload,
            getSelected: this.getSelected,
            setSelected: this.setSelected,
            unSelected: this.unSelected
        };
        if (this.settings.serverSide)
            $.extend(this.settings.core, ajax);
        return this;
    }

    function BindControl(element, options) {
        var _treeViewID = $(element).attr('id');
        var _treeDivID = 'treeDiv_' + _treeViewID;
        var _treeDiv = $('<div></div>');
        var _treeNode = $('<div></div>');
        if(options.BindControl.isBind){
            $(_treeDiv).attr('id', _treeDivID);
            $(_treeDiv).attr('style', 'display: none;border: 1px solid #d2d6de;position: absolute;z-index: 1061;background-color: rgb(255, 255, 255);width: 95%;height: 300px;overflow-y: auto;text-align: left;');
            _treeViewID = 'treeview_' + _treeViewID;
            $(_treeDiv).append('<div style="padding: 5px 0 0 15px;border-bottom: 1px solid #d2d6de;font-size: 13px;text-align:left;position: sticky;top: 0;z-index: 99;background-color: #fff;"><span style="cursor:pointer" onclick="javascript:$(\'#' + _treeDivID + '\').hide();$(\'#' + $(element).attr('id') + '\').change();"><i class="fa fa-close"></i> 关闭</span> <span style="cursor:pointer" onclick="javascript:$(\'#' + $(element).attr('id') + '\').val(\'\');$(\'#' + $(element).attr('id') + '\').data(\'plugin\').unSelected();"><i class="fa fa-close"></i> 清空</span></div>');
            $(_treeNode).attr('id', _treeViewID);
            $(_treeDiv).append(_treeNode);
            $(element).attr('placeholder', options.placeholder);
            $(element).css('cursor', 'pointer');
            $(element).attr('readonly', true);
            $(element).parent().css('position', 'relative');
            $(element).after(_treeDiv);
            $(element).unbind('click');
            $(element).bind('click', function () {
                $('#' + _treeDivID).show()
            });
            // 选择节点
            $(_treeNode).on('select_node.jstree', function (e, data) {
                // // 如果选中的是父节点
                // if(data.node.children.length > 0 && options.core.multiple){
                //
                //     // 如果需要多选
                //     if(options.core.multiple){
                //
                //
                //     }
                // }



                if(data.node.children.length == 0 || !options.BindControl.isCheckLeafOnly){
                    if(options.core.multiple){
                        // 获取资产类别选中数据
                        var _categoryID = '';
                        var _categoryText = '';
                        $.each(data.instance.get_selected(true), function(nIndex, nObj){
                            if(nObj.children.length == 0){
                                _categoryID += nObj.id + ',';
                                _categoryText += nObj.text + ',';
                            }
                        })
                        _categoryID = _categoryID.substr(0, _categoryID.length - 1);
                        _categoryText = _categoryText.substr(0, _categoryText.length - 1);

                        $(element).val(_categoryText);
                        $(element).attr('data-selectId', _categoryID);
                    }else{
                        $(element).val(data.node.text);
                        $(element).attr('data-selectId', data.node.id);
                    }
                }
                else
                    data.instance.uncheck_node(data.node);

                $(element).change();

            });
            $(_treeNode).on('deselect_node.jstree', function (e, data) {
                if(!data.node.is_selected)
                    return;
                if(data.node.children.length == 0 || !options.BindControl.isCheckLeafOnly){
                    if(options.core.multiple){
                        // 获取资产类别选中数据
                        var _categoryID = '';
                        var _categoryText = '';
                        $.each(data.instance.get_selected(true), function(nIndex, nObj){
                            if(nObj.children.length == 0){
                                _categoryID += nObj.id + ',';
                                _categoryText += nObj.text + ',';
                            }
                        })
                        _categoryID = _categoryID.substr(0, _categoryID.length - 1);
                        _categoryText = _categoryText.substr(0, _categoryText.length - 1);

                        $(element).val(_categoryText);
                        $(element).attr('data-selectId', _categoryID);
                    }else{
                        $(element).val(data.node.text);
                        $(element).attr('data-selectId', data.node.id);
                    }
                }
                else
                    data.instance.uncheck_node(data.node);
            })


            $(_treeDiv).mouseleave(function(){
                var _id = $(this).attr('id').replace('treeDiv_','');
                if(!isNull($('#' + _id).val()))
                    $(this).hide();
            });
        }else{
            _treeNode = element;
        }
        return _treeNode;
    }

    JsTree.prototype = {
        create: function () {
            var _setting = this.settings;
            this.$element.jstree(this.settings)
                .on('ready.jstree', this.settings.eventReady)
                .on('loaded.jstree', function(e, data){
                    if(_setting.openRoot){
                        var inst = data.instance;
                        var obj = inst.get_node(e.target.firstChild.firstChild.lastChild);

                        inst.open_node(obj);
                    }

                    _setting.eventLoaded(e, data);
                })
                .on('changed.jstree', this.settings.eventChanged);
            this.api = $.jstree.reference(this.$element);
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
        reload: function (options) {
            $.extend(this.settings, options);
            $.extend(this.api.settings, options);
            this.api.refresh();
        },
        openAll: function(){
            this.api.open_all();
        },
        getSelected: function () {
            return this.api.get_selected(true);
        },
        setSelected: function (value) {
            this.api.check_node(value);
        },
        unSelected: function(){
            this.api.uncheck_all();
        }
    }

    $.fn[pluginName] = function (options) {
        this.each(function () {
            var _jsTree = $.data(this, pluginKey);
            if (!_jsTree) {
                _jsTree = new JsTree(this, options);
                $.data(this, pluginKey, _jsTree);
                _jsTree.create();
            }
            $.data(this, pluginResultKey, _jsTree.init(options));
        });
        return this;
    }

})(jQuery, window, document);