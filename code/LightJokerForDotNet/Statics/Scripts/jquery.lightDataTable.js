/**
 * Created by Light on 2017-06-03.

 调用方法：
 1. var res = api_datatable.selectedSimple();
 2. var res = $('#dataTable').lightDataTable({ method: 'selectedSimple' }).data('plugin_res');

 未解决：
 1. 非服务器端时, loading 问题
 2. 非服务器端时, 序号 问题

 */
;(function($, window, document,undefined) {

    var pluginName = 'lightDataTable',
        pluginKey = 'plugin',
        pluginResultKey = 'plugin_res',
        defaults = {
            options: {
                colors: [DATATABLE.COLOR.RED, DATATABLE.COLOR.GREEN, DATATABLE.COLOR.BLUE, DATATABLE.COLOR.YELLOW, DATATABLE.COLOR.GRAY],
                isXh: true,
                xh_index: 0,                                     //序号列
                isChk: false,
                chkField: 'ID',
                isRdo: false,
                url: URL.BASE,
                async: false,
                params: {},
                ajaxBeforeSend: function () { },
                ajaxComplete: function () { },
                ajaxSuccess: function (data) { },
                ajaxReloadCallback: function () { },
                loadingElement: {},
                isRowspan: false
            },
            core: {
                ordering: true,
                info: true,
                paging: true,
                resetPaging: false,
                //columns: [],
                columnDefs: [
                    {
                        defaultContent: '',
                        targets: '_all'
                    }
                ],
                responsive: true,
                select: false,
                createdRow: function (row, data, index) { },
                drawCallback: function (settings) { },
                preDrawCallback: function (settings) { },
                selectCallback: function (data) { },
                deselectCallback: function (data) { },
                chkChangeCallback: function (chkState, dataID) { },
                autoWidth: false,
                serverSide: true,
                lengthChange: false,
                searching: false,
                processing: false,
                pageLength: 20,
                scrollX: true,
                //scrollY: 'calc(100vh - 185px)',//表格内容部分高度设置为窗口高度-100px "scrollY": "50vh",  //表格内容部分高度设置为窗口的一半
                //scrollCollapse: true,
                //order: [],
                language: {
                    select: {
                        rows: ''
                    },
                    processing: '查询中...',
                    emptyTable: '没有数据',
                    info: '显示数据 _START_ 至 _END_ , 共 _TOTAL_ 条数据',
                    infoEmpty: '显示数据 0 至 0 , 共 0 条数据',
                    search: '当前页内搜索',
                    paginate: {
                        first: '首页',
                        last: '末页',
                        next: '下一页',
                        previous: '上一页'
                    }
                },
                treeGrid: {
                    left: 10,
                    expandIcon: '<span>+</span>',
                    collapseIcon: '<span>-</span>'
                }
            },
            annotation: {
                btnAddAnn: '#btnAddAnn',
                btnAddAnnEvent: function(){
                    var _powers = sessionStorage.getItem(SESSION.POWERS);
                    if (null == _powers || -1 == _powers.indexOf('cd-sjbz')) {
                        $.lightLib.messager.info({ content: '对不起, 您没有该权限.' });
                        return;
                    }

                    var plugin = $(this).data('plugin');
                    var data = plugin.selectedSimple();

                    if (isNull(data)) {
                        $.lightLib.messager.info({ content: '请先选择需要标注的数据' });
                        return;
                    }

                    plugin.addAnn({
                        DataID: data.ID
                    });
                },
                btnDelAnn: '#btnDelAnn',
                btnDelAnnEvent: function(){
                    var _powers = sessionStorage.getItem(SESSION.POWERS);
                    if (null == _powers || -1 == _powers.indexOf('cd-sjbz')) {
                        $.lightLib.messager.info({ content: '对不起, 您没有该权限.' });
                        return;
                    }

                    var plugin = $(this).data('plugin');
                    var data = plugin.selectedSimple();

                    if (isNull(data)) {
                        $.lightLib.messager.info({ content: '请先选择需要标注的数据' });
                        return;
                    }

                    plugin.delAnn({
                        DataID: data.ID
                    });
                },
                url: URL.BASE,
                DataBase: 'LightJokerDB',
                Dal: 'LJ00110Dal',
                bind: true,
                btnGroup: '.btn-group-ann',
                PageID: '',
                data: []
            }
        },
        ajax = {
            ajax: function (data, callback, settings) {
                var $plugin = $.data(this[0], pluginKey);
                $plugin.showLoading();

                var _settings = $plugin.settings;

                if (_settings.annotation.bind)
                    $.lightLib.tip.destroy($plugin.element);

                //分页信息
                var param_page = {
                    PageIndex: (data.start / data.length + 1),
                    PageSize: data.length
                }
                $.extend(_settings.options.params, param_page);

                //排序信息
                if(data.order.length > 0){
                    var _index = data.order[0].column;
                    var param_order = {
                        Order_By: data.columns[_index].data + ' ' + data.order[0].dir
                    }
                    $.extend(_settings.options.params, param_order);
                }

                //记录
                $.extend($.data(this[0], pluginKey).settings.options, _settings.options);

                setTimeout(function () {
                    $.lightLib.ajax({
                        url: _settings.options.url,
                        async: _settings.options.async,
                        data: _settings.options.params,
                        beforeSend: _settings.options.ajaxBeforeSend,
                        complete: _settings.options.ajaxComplete,
                        success: function (result) {
                            if (result.Sign == SIGN.FAILD) {
                                $.lightLib.messager.error({ content: result.Msg });
                                return;
                            }


                            //var resultData = JSON.parse(result.Data);
                            var resultData = result.Data;
                            //var resultData = result;
                            //封装返回数据
                            var returnData = {};
                            returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                            returnData.recordsTotal = resultData.total;//返回数据全部记录
                            returnData.recordsFiltered = resultData.total;//后台不实现过滤功能，每次查询均视作全部结果
                            returnData.data = resultData.rows;//返回的数据列表

                            //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                            //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                            callback(returnData);
                            _settings.options.ajaxSuccess(resultData);

                            //绘制foot
                            $plugin.$element.find('tfoot').remove();
                            if (!isNull(resultData.footer) && resultData.footer.length > 0) {
                                $plugin.bindFooter(resultData.footer);
                            }
                            $plugin.bind();
                            $plugin.hideLoading();


                        }
                    });



                }, 300);

            }
        }


    function DataTable(element, options) {
        this.element = element;
        this.$element = $(element);

        //默认定位loading元素对象
        //defaults.options.loadingElement = this.$element.parents('.box-body').siblings('.overlay');
        defaults.options.loadingElement = this.$element.parents('.box').children('.overlay');

        //this.settings = $.extend({}, defaults, options, { core: { order: [] } });
        this.settings = {
            options: { },
            core: { },
            annotation: { }
        }
        $.extend(this.settings.options, defaults.options, options.options);
        $.extend(this.settings.core, defaults.core, options.core, { order: [] });
        $.extend(this.settings.annotation, defaults.annotation, options.annotation);

        this._defaults = defaults;
        this._name = pluginName;
        this.version = 'v1.0.0';
        this.methods = {
            empty:function(){},
            reload: this.reload,
            selectedSimple: this.selectedSimple
        };
        if(this.settings.core.serverSide)
            $.extend(this.settings.core, ajax);
        return this;
    }

    DataTable.prototype = {
        //显示loading, 只需要在设置中定位loading元素对象
        showLoading: function () {
            this.settings.options.loadingElement.show();
        },
        //隐藏loading, 只需要在设置中定位loading元素对象
        hideLoading: function () {
            this.settings.options.loadingElement.hide();
        },
        //创建
        create: function () {
            //this.showLoading();

            //序号
            if (this.settings.options.isXh && this.settings.core.serverSide) {
                this.settings.core.columns.splice(
                    0,
                    0,
                    {
                        data: null,
                        orderable: false,
                        width: '50px'
                    })
            }
            //复选框
            if (this.settings.options.isChk && this.settings.core.serverSide) {
                var _chkField = this.settings.options.chkField;
                this.settings.core.columns.splice(
                    this.settings.options.xh_index + 1,
                    0,
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<input type="checkbox" dataID="' + eval('row.' + _chkField) + '" style="width:10px">';
                        },
                        orderable: false
                    })
            }
            // 单选框
            if (this.settings.options.isRdo && this.settings.core.serverSide) {
                this.settings.core.columns.splice(
                    this.settings.options.xh_index + 1,
                    0,
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<input type="radio" name="lightDataTable-rdo" dataID="' + eval('row.' + _chkField) + '" style="width:10px">';
                        },
                        orderable: false
                    })
            }

            this.api =
                this.$element.on('page.dt', function () {
                    //翻页
                    //$.data(this, pluginKey).showLoading();
                }).on('order.dt', function () {
                    //排序
                }).on('search.dt', function () {
                    //搜索
                }).on('init.dt', function(){
                    //初始
                }).DataTable(this.settings.core);

            var _settings = this.settings;
            //绑定选定时的事件
            this.api.on('select', function (e, dt, type, indexes) {
                if (type === 'row') {
                    _settings.core.selectCallback(dt.row('.selected').data());

                    var $tr = dt[type](indexes).nodes().to$();
                    $.each(_settings.options.colors, function (cIndex, cObj) {
                        if ($tr.hasClass(cObj)) {
                            $tr.attr('toggleClass', cObj);
                            $tr.removeClass(cObj);
                            return false;
                        }
                    })

                }
            });
            //绑定取消选定时的事件
            this.api.on('deselect', function (e, dt, type, indexes) {
                if (type === 'row') {
                    _settings.core.deselectCallback(dt.rows(indexes).data());

                    var $tr = dt[type](indexes).nodes().to$();
                    if (!isNull($tr.attr('toggleClass'))) {
                        $tr.addClass($tr.attr('toggleClass'));

                    }

                }
            })
            //加载标注
            this.loadAnn();

        },
        //加载标注
        loadAnn: function () {
            var _settings = this.settings;
            if (_settings.annotation.bind) {
                var _powers = sessionStorage.getItem(SESSION.POWERS);
                if (null == _powers || -1 == _powers.indexOf('cd-sjbz')) {
                    $('.btn-group-ann').hide();
                }
                var _tableID = this.element.id;
                $.lightLib.ajax({
                    async: false,
                    url: _settings.options.url,
                    data: {
                        DataBase: _settings.annotation.DataBase,
                        TableDal: _settings.annotation.Dal,
                        ACT: MOD.GETVIEW,
                        PageID: _settings.annotation.PageID + SQL.OPERATION.EQUAL,
                        TableID: _tableID + SQL.OPERATION.EQUAL
                    },
                    success: function (data) {
                        if (data.Sign == SIGN.FAILD) {
                            $.lightLib.messager.error({ content: '请求处理异常 : ' + data.Msg });
                            return;
                        }
                        _settings.annotation.data = data.Data.rows;
                    }
                });

                $btnAddAnn = $(_settings.annotation.btnAddAnn);
                $btnAddAnn.unbind('click');
                $btnAddAnn.on('click', _settings.annotation.btnAddAnnEvent);
                $btnAddAnn.data(pluginKey, this);

                $btnDelAnn = $(_settings.annotation.btnDelAnn);
                $btnDelAnn.unbind('click');
                $btnDelAnn.on('click', _settings.annotation.btnDelAnnEvent);
                $btnDelAnn.data(pluginKey, this);
            }
            else
            {
                $(_settings.annotation.btnGroup).hide();
            }
        },
        //绑定标注
        bindAnn: function () {
            //绑定注释
            if (this.settings.annotation.bind) {
                var annotationData = this.settings.annotation.data;
                var datas = this.api.rows().data();
                var trs = this.api.rows().nodes();

                $.each(datas, function (index, rowData) {

                    $.each(annotationData, function (i, annotation) {
                        if (rowData.ID == annotation.DataID) {

                            $.lightLib.tip.bind(trs[index],
                                {
                                    content: {
                                        title: '【' + annotation.CommandUser + '】 于 ' + annotation.UpdateTime + ' 标注',
                                        text: annotation.Summary
                                    }
                                });

                            var $tip = $(trs[index]).find('td:first-child');
                            $tip.removeClass('qtip-color-green');
                            $tip.removeClass('qtip-color-orange');
                            $tip.removeClass('qtip-color-red');
                            switch(annotation.Nature){
                                case "1":
                                    $tip.addClass('qtip-color-green');
                                    break;
                                case "2":
                                    $tip.addClass('qtip-color-orange');
                                    break;
                                case "3":
                                    $tip.addClass('qtip-color-red');
                                    break;
                            }

                            return true;    //continue
                        }
                    });
                });
            }
        },
        //绑定一些列事件
        bind: function () {
            var _element = this.$element;
            var _settings = this.settings;
            var _api = this.api;

            //画序号
            if (this.settings.options.isXh) {
                var _xh = this.settings.options.xh_index;
                var _start = (parseInt(this.settings.options.params.PageIndex) - 1) * parseInt(this.settings.options.params.PageSize);
                $.each(_element.find('tbody tr'), function (index, obj) {
                    if ($(this).children('td')[0].innerHTML == '没有数据')
                        return false;
                    $(this).children('td')[_xh].innerHTML = (index + 1 + _start);
                });
            }


            //绑定icheck
            var _chkObj = _element;
            if(_settings.core.scrollCollapse){
                _chkObj = _element.parents('.dataTables_scroll');
            }
            _chkObj.find('input[type="checkbox"]').iCheck({
                checkboxClass:'icheckbox_flat-blue'
            }).on('ifClicked', function () {
                if (!this.checked) {
                    $(this).parents('tr').addClass('checked');
                    $(this).parents('tr').addClass('selected');
                }else{
                    $(this).parents('tr').removeClass('checked');
                    $(this).parents('tr').removeClass('selected');
                }
                _settings.core.chkChangeCallback(!this.checked, $(this).attr('dataID'));
            });
            _chkObj.find('input[type="radio"]').iCheck({
                radioClass: 'iradio_flat-blue'
            }).on('ifChanged', function () {
                if (this.checked) {
                    $(this).parents('tr').addClass('selected');
                } else {
                    $(this).parents('tr').removeClass('selected');
                }
            });

            //icheck全选
            _chkObj.find('.checkbox-toggle').next().click(function () {
                var clicks = $(this).data('clicks');
                if(clicks){
                    _chkObj.find('input[type="checkbox"]').iCheck('uncheck');
                    $('.fa', this).removeClass('fa-check-square-o').addClass('fa-square-o');
                }else{
                    _chkObj.find('input[type="checkbox"]').iCheck('check');
                    $('.fa', this).removeClass('fa-square-o').addClass('fa-check-square-o');
                }
                $(this).data('clicks', !clicks);
            });

            //绑定注释
            this.bindAnn();

            //加载合并行
            if (this.settings.options.isRowspan) {
                var api = this.api;
                var rows = api.rows({ page: 'current' }).nodes();
                if (rows.length > 0) {
                    // 后面的列先进行合并
                    for (var idx = rows[0].cells.length - 1; idx > 0; idx--) {
                        var last = null;
                        var tr = null;
                        var ltd = null;
                        api.column(idx, { page: 'current' }).data().each(function (group, i) {

                            if (Object.prototype.toString.call(group) === '[object Object]')
                                return false;

                            tr = $(rows[i]);
                            var td = $("td:eq(" + idx + ")", tr);
                            if (last !== group) {
                                td.attr("rowspan", 1);
                                td.text(group);
                                ltd = td;
                                last = group;
                            } else {
                                ltd.attr("rowspan", parseInt(ltd.attr("rowspan")) + 1);
                                td.remove();
                            }
                        });
                    }
                }
            }
        },
        //绑定footer
        bindFooter: function (footerData) {
            this.$element.find('tfoot').remove();
            var columns = this.api.columns();
            var footer = '<tfoot>'
            $.each(footerData, function(fIndex, fObj){
                var row = '<tr>';

                columns.every(function(index){
                    var column = this;
                    var code = this.dataSrc();
                    var value = eval('fObj.' + code);

                    if (value == '1900/1/1 00:00:00' || value == '1900-01-01 00:00:00' || isNull(value))
                        value = '';
                    if (index == 0)
                        value = '总计';

                    row += '<td class="' + $(column.header()).attr('class') + '">' + value + '</td>';
                });
                row += '</tr>';
                footer += row;
            });
            footer += '</tfoot>';
            this.$element.append(footer);
        },
        //初始化, 即入口
        init: function(options){
            var _tmp = $.extend({method:'empty'}, options);
            var _method = _tmp.method;

            if (this.methods[_method])
                return this.methods[_method].apply(this, options);
            else if (typeof _method == 'object' || !_method)
                return this.methods.init.apply(this, options);
            else
                $.error('方法 ' + _method + ' 不存在此插件中.');
        },
        // 清空
        clear: function(){
            this.api.clear();
        },
        //销毁
        destroy: function(){
            this.api.destroy();
            this.$element.removeData(pluginKey);
            if (this.settings.annotation.bind)
                $.lightLib.tip.destroy(this.element);
            return this;
        },
        //重新读取
        reload: function (options) {
            //this.showLoading();

            $.extend(this.settings.options, options);
            this.api.ajax.reload(this.settings.options.ajaxReloadCallback, this.settings.options.resetPaging);

            this.$element.find('input[type="checkbox"]').iCheck('uncheck');
            //this.hideLoading();
            return this;
        },
        //选中单行
        selectedSimple: function () {
            var _datas = this.api.rows('.selected').data();
            if (_datas.length > 1)
                return null;
            else
                return this.api.row('.selected').data();
        },
        //设置选中行
        setSelectedSimple: function(index){
            this.api.row(':eq(' + index + ')', { page: 'current' }).select();
        },
        //获取check 选中数据ID
        checkedDataID: function(){
            var _checked = '';
            this.$element.find('tbody input:checked').each(function(){
                _checked += $(this).attr('dataID') + ',';
            });
            _checked = _checked.substring(0, _checked.length - 1);
            return _checked;
        },
        //获取check 选中数据对象
        checkedData: function(){
            return this.api.rows('.checked').data();
        },
        //删除选中行
        del: function (options) {
            var _datatable = this;
            var _settings = this.settings;
            var _tableID = this.element.id;
            var _defaults = {
                url: _settings.options.url,
                params: {

                },
                eventSuccess: function () { }
            };
            $.extend(_defaults, options);

            $.lightLib.confirm({
                content: '是否确认删除该条数据 ?',
                btnOkEvent: function () {
                    if (_settings.annotation.bind) {
                        //先删除该条数据的标注
                        $.lightLib.ajax({
                            url: _settings.annotation.url,
                            async: false,
                            data: {
                                DataBase: _settings.annotation.DataBase,
                                TableDal: _settings.annotation.Dal,
                                ACT: MOD.DELETE,
                                PageID: _settings.annotation.PageID,
                                TableID: _tableID,
                                DataID: _defaults.params.ID
                            }
                        });
                    }


                    //再删除数据
                    $.lightLib.ajax({
                        url: _defaults.url,
                        async: false,
                        data: _defaults.params,
                        success: function (data) {
                            if (data.Sign == SIGN.SUCCESS) {
                                _defaults.eventSuccess();
                                $.lightLib.layer.msg.success({
                                    core: {
                                        icon: 1,
                                        content: '删除成功 .'
                                    },
                                    closeEvent: function () {
                                        
                                    }
                                });
                            }
                        }
                    });


                    return true;
                }
            });
        },
        //删除标注
        delAnn: function(options){
            var _datatable = this;
            var _element = this.element;
            var _tableID = this.element.id;
            var _settings = this.settings;

            $.lightLib.confirm({
                content: '是否确认删除本条数据的标注 ?',
                btnOkEvent: function () {
                    $.lightLib.ajax({
                        url: _settings.annotation.url,
                        async: false,
                        data: {
                            DataBase: _settings.annotation.DataBase,
                            TableDal: _settings.annotation.Dal,
                            ACT: MOD.DELETE,
                            PageID: _settings.annotation.PageID,
                            TableID: _tableID,
                            DataID: options.DataID
                        },
                        success: function (data) {
                            if (data.Sign == SIGN.SUCCESS) {
                                $.lightLib.tip.destroy(_element);
                                _datatable.loadAnn();
                                _datatable.bindAnn();
                                $.lightLib.messager.success({ content: '标注删除成功' });
                            }
                        }
                    });

                    return true;
                }
            });
        },
        //添加标注
        addAnn: function (options) {
            var _datatable = this;
            var _tableID = this.element.id;
            var _settings = this.settings;

            var _defaults = {
                title: '添加标注',
                html:
                '<select id="swal-select" class=" select2 swal2-select" ><option value="1">一般性质</option><option value="2">加急性质</option><option value="3">紧急性质</option></select>' +
                '<input id="swal-input" class="swal2-input" >',
                preConfirm: function () {
                    return new Promise(function (resolve, reject) {
                        if (isNull($('#swal-input').val()))
                            reject('请输入标注内容 !');
                        else {
                            resolve([
                                $('#swal-select').val(),
                                $('#swal-input').val()
                            ])
                        }
                    })
                },
                onOpen: function () {
                    $('#swal-select').focus()
                },
                showCancelButton: true,
                eventThen: function (result) {
                    var _nature = result[0];
                    var _summary = result[1];

                    if (isNull(_summary)) {
                        $.lightLib.messager.info({ content: '请先填写标注内容' });
                        return;
                    }

                    if (_settings.annotation.bind) {
                        //先删除
                        $.lightLib.ajax({
                            url: _settings.annotation.url,
                            async: false,
                            data: {
                                DataBase: _settings.annotation.DataBase,
                                TableDal: _settings.annotation.Dal,
                                ACT: MOD.DELETE,
                                PageID: _settings.annotation.PageID,
                                TableID: _tableID,
                                DataID: options.DataID
                            }
                        });
                    }


                    //再添加
                    $.lightLib.ajax({
                        url: _settings.annotation.url,
                        async: false,
                        data: {
                            DataBase: _settings.annotation.DataBase,
                            TableDal: _settings.annotation.Dal,
                            ACT: MOD.CREATE,
                            PageID: _settings.annotation.PageID,
                            TableID: _tableID,
                            DataID: options.DataID,
                            Nature: _nature,
                            Summary: _summary
                        },
                        success: function (data) {
                            if (data.Sign == SIGN.SUCCESS) {
                                _datatable.loadAnn();
                                _datatable.bindAnn();
                                $.lightLib.messager.success({ content: '标注添加成功' });
                            }
                        }
                    });
                }
            }
            $.extend(_defaults, options);

            $.lightLib.sweetalert.base(_defaults);
            $.lightLib.select.bind('#swal-select', { serverSide: false, allowClear: false });
        }
    }

    //插件定义
    $.fn[pluginName] = function(options){
        this.each(function(){
            var _datatable = $.data(this, pluginKey);
            if(!_datatable){
                _datatable = new DataTable(this, options);
                $.data(this, pluginKey, _datatable);
                _datatable.create();
            }
            $.data(this, pluginResultKey, _datatable.init(options));
        });
        return this;
    }
})(jQuery, window, document);
