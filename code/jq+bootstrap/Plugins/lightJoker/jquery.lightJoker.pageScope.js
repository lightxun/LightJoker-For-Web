/*
    Created by LightJoker on 2020-09-02
 */
;(function($){
    $.lightJokerPageScope = function(param){
        /// 实例化变量 - 没有修饰符 变量名, 实例化后直接调用, 相当于外部变量
        lightJokerPageScope = this;
        /// 私有变量 - var 变量名
        //
        /// 公有变量 - this.变量名
        // 数据表格
        this.dataTable = null;
        this.api_dataTable = null;
        // 表单
        this.form = null;
        this.api_form = null;
        // 查询条件
        this.queryCondition = null;
        this.queryParamName = null;
        this.queryParamValue = null;
        // 按钮
        this.btnCondition = null;
        this.btnAdd = null;
        this.btnEdit = null;
        this.btnDelete = null;
        this.btnRead = null;
        this.btnExpExcel = null;
        this.btnSave = null;
        this.btnQuery = null;
        this.btnClose = null;
        this.btnPrint = null;
        // 按钮组
        this.btnGroupCmd = null;
        this.btnGroupQuery = null;
        this.btnGroupAnn = null;
        // 界面
        this.lightJokerContentView = null;
        this.lightJokerContentViewHeader = null;
        this.lightJokerContentViewBody = null;
        this.lightJokerContentEdit = null;
        this.lightJokerContentEditHeader = null;
        this.lightJokerContentEditBody = null;
        // 参数
        this.ACT = MODS.EMPTY;
        this.data = null;
        this.isMonitorAjax = true;
        this.modalIndex = -1;
        this.modalArea = ['60%', 'auto'];
        this.customUrl_edit = null;
        this.customUrl_read = null;
        this.customUrl_print = null;
        this.pageShowAnimate = 'fadeInRight';
        this.pageHideAnimate = 'fadeOutRight';

        /// 实例化方法 - 没有修饰符 方法名, 实例化后直接调用, 相当于外部方法
        //
        /// 私有方法 - var 方法名
        //
        /// 公有方法 - this.方法名
        // 加载 View 页
        this.loadView = function(settings){
            var pageScope = this;

            // 拓展参数
            var defaults = $.extend(true, {
                dataTable: $('#dataTable'),
                queryCondition: $('#queryCondition'),
                queryParamName: $('#queryParamName'),
                queryParamValue: $('#queryParamValue'),
                btnCondition: $('#btnCondition'),
                btnAdd: $('#btnAdd'),
                btnEdit: $('#btnEdit'),
                btnDelete: $('#btnDelete'),
                btnRead: $('#btnRead'),
                btnExpExcel: $('#btnExpExcel'),
                btnSave: $('#btnSave'),
                btnQuery: $('#btnQuery'),
                btnClose: $('#btnClose'),
                btnPrint: $('#btnPrint'),
                btnGroupCmd: $('.btn-group-cmd'),
                btnGroupQuery: $('.btn-group-query'),
                btnGroupAnn: $('.btn-group-ann'),
                lightJokerContentView: $('.lightJokerContent-view'),
                lightJokerContentViewHeader: $('.lightJokerContent-view-header'),
                lightJokerContentViewBody: $('.lightJokerContent-view-body'),
                lightJokerContentEdit: $('.lightJokerContent-edit'),
                lightJokerContentEditHeader: $('.lightJokerContent-edit-header'),
                lightJokerContentEditBody: $('.lightJokerContent-edit-body'),
                lightJokerContentView_lightJokerSelect: $('.lightJokerContent-view .lightJoker-select'),
                lightJokerContentView_lightJokerDate: $('.lightJokerContent-view .lightJoker-date'),
                lightJokerContentView_lightJokerDateTime: $('.lightJokerContent-view .lightJoker-datetime'),
                lightJokerContentView_lightJokerDateMultiple: $('.lightJokerContent-view .lightJoker-date-multiple'),
                lightJokerContentView_lightJokerDateTimeMultiple: $('.lightJokerContent-view .lightJoker-datetime-multiple'),
                beforeLoadCallback: function(){ return true; },
                afterLoadCallback: function(){ return true; }
            }, settings);

            // 执行加载前方法
            if(defaults.beforeLoadCallback()){
                return;
            }

            // 监控页面中每一个 ajax 请求, 需要显示 loading
            $(document).ajaxSend(function(event, jqxhr, settings){
               if(pageScope.isMonitorAjax){
                   $.lightJokerLib.loading.show();
               }
            });
            $(document).ajaxComplete(function(event, jqxhr, settings){
                if(pageScope.isMonitorAjax){
                    $.lightJokerLib.loading.hide();
                }
            });

            // 赋值
            this.dataTable = defaults.dataTable;
            this.queryCondition = defaults.queryCondition;
            this.queryParamName = defaults.queryParamName;
            this.queryParamValue = defaults.queryParamValue;
            this.btnCondition = defaults.btnCondition;
            this.btnAdd = defaults.btnAdd;
            this.btnEdit = defaults.btnEdit;
            this.btnDelete = defaults.btnDelete;
            this.btnRead = defaults.btnRead;
            this.btnExpExcel = defaults.btnExpExcel;
            this.btnSave = defaults.btnSave;
            this.btnQuery = defaults.btnQuery;
            this.btnClose = defaults.btnClose;
            this.btnPrint = defaults.btnPrint;
            this.btnGroupCmd = defaults.btnGroupCmd;
            this.btnGroupQuery = defaults.btnGroupQuery;
            this.btnGroupAnn = defaults.btnGroupAnn;
            this.lightJokerContentView = defaults.lightJokerContentView;
            this.lightJokerContentViewHeader = defaults.lightJokerContentViewHeader;
            this.lightJokerContentViewBody = defaults.lightJokerContentViewBody;
            this.lightJokerContentEdit = defaults.lightJokerContentEdit;
            this.lightJokerContentEditHeader = defaults.lightJokerContentEditHeader;
            this.lightJokerContentEditBody = defaults.lightJokerContentEditBody;

            // 加载自定义组件
            $.lightJokerLib.select.bindLocal(defaults.lightJokerContentView_lightJokerSelect);
            $.lightJokerLib.date.bindSampleDate(defaults.lightJokerContentView_lightJokerDate);
            $.lightJokerLib.date.bindSampleDateTime(defaults.lightJokerContentView_lightJokerDateTime);
            $.lightJokerLib.date.bindMultipleDate(defaults.lightJokerContentView_lightJokerDateMultiple);
            $.lightJokerLib.date.bindMultipleDateTime(defaults.lightJokerContentView_lightJokerDateTimeMultiple);

            // 取消所有 input 的 autocomplete, 指定显示除外
            $('input:not([autocomplete]),textarea:not([autocomplete]),select:not([autocomplete])').attr('autocomplete', 'off');

            // 展示样式为 div 时
            if(sessionStorage.getItem(WEBSETTINGS.EDITSHOW.KEY) == WEBSETTINGS.EDITSHOW.DIV){
                $.lightJokerLib.loading.show();

                var viewHeight = defaults.lightJokerContentViewHeader.outerHeight() + 20 + 30;
                var viewWidth = defaults.lightJokerContentViewHeader.outerWidth();
                if(viewWidth <= 768)
                    viewHeight += 50;
                defaults.lightJokerContentViewBody.css('height', 'calc(100vh - ' + viewHeight + 'px)');

                var editHeight = defaults.lightJokerContentEditHeader.outerHeight() + 20 + 30;
                defaults.lightJokerContentViewBody.css('height', 'calc(100vh - ' + editHeight + 'px)');

                defaults.lightJokerContentEdit.hide();

                $.lightJokerLib.loading.hide();
            }

            // 绑定滚动条
            $.lightJokerLib.scroll.bind(defaults.lightJokerContentViewBody);
            $.lightJokerLib.scroll.bind(defaults.lightJokerContentEditBody);

            // 加载操作级权限
            /// code

            // 执行加载前方法
            defaults.afterLoadCallback();
        };
        // 初始化 View 页
        this.customInitView = null;
        // 销毁 View 页
        this.customDestroyView = null;
        // 加载 Edit 页
        this.loadEdit = function(settings){
            var pageScope = this;

            // 扩展参数
            var defaults = $.extend(true, {
                form: $('#form'),
                lightJokerContentEditBodyContent_lightJokerSelect: $('.lightJokerContent-edit-body-content .lightJoker-select'),
                lightJokerContentEditBodyContent_lightJokerDate: $('.lightJokerContent-edit-body-content .lightJoker-date'),
                lightJokerContentEditBodyContent_lightJokerDateTime: $('.lightJokerContent-edit-body-content .lightJoker-datetime'),
                lightJokerContentEditBodyContent_lightJokerDateMultiple: $('.lightJokerContent-edit-body-content .lightJoker-date-multiple'),
                lightJokerContentEditBodyContent_lightJokerDateTimeMultiple: $('.lightJokerContent-edit-body-content .lightJoker-datetime-multiple'),
                beforeLoadCallback: function(){ return true; },
                afterLoadCallback: function(){ return true; }
            }, settings);

            // 执行加载前方法
            if(defaults.beforeLoadCallback()){
                return;
            }

            // 加载自定义组件 - 放置 common-global 中
            //$.lightJokerLib.select.bindLocal(defaults.lightJokerContentView_lightJokerSelect);
            //$.lightJokerLib.date.bindSampleDate(defaults.lightJokerContentView_lightJokerDate);
            //$.lightJokerLib.date.bindSampleDateTime(defaults.lightJokerContentView_lightJokerDateTime);
            //$.lightJokerLib.date.bindMultipleDate(defaults.lightJokerContentView_lightJokerDateMultiple);
            //$.lightJokerLib.date.bindMultipleDateTime(defaults.lightJokerContentView_lightJokerDateTimeMultiple);

            // 取消所有 input 的 autocomplete, 指定显示除外
            $('input:not([autocomplete]),textarea:not([autocomplete]),select:not([autocomplete])').attr('autocomplete', 'off');

            // 执行加载前方法
            defaults.afterLoadCallback();
        };
        // 初始化 Edit 页
        this.customInitEdit = null;
        // 销毁 Edit 页
        this.customDestroyEdit = null;
        // 关闭 Edit 页
        this.closeEdit = function(beforeCloseEvent){
            pageScope = this;

            if(!isNull(beforeCloseEvent) && beforeCloseEvent())
                return;

            pageScope.btnSave.show();
            pageScope.data = null;

            if(sessionStorage.getItem(WEBSETTINGS.EDITSHOW.KEY) == WEBSETTINGS.EDITSHOW.DIV){
                if(pageScope.lightJokerContentView.is('.' + pageScope.pageHideAnimate)){
                    pageScope.lightJokerContentEdit.removeClass(pageScope.pageShowAnimate).addClass(pageScope.pageHideAnimate);
                    setTimeout(function(){
                        pageScope.lightJokerContentEdit.hide();
                        pageScope.lightJokerContentView.removeClass(pageScope.pageHideAnimate).addClass(pageScope.pageShowAnimate).show();
                    }, 700);
                }
            }
        };
        // 查询条件拓展
        this.customExtendQueryParam = function(){ return {} };
        // 查询数据
        this.queryData = function(options){
            pageScope = this;

            var defaults = $.extend(true, {
                resetPaging: true,
                params:{

                }
            }, options);

            // 收集默认查询条件
            if(!isNull(pageScope.queryParamValue.val())){
                $.extend(true, defaults.params, eval('({' + pageScope.queryParamName.val() + ' : ' + pageScope.queryParamValue.val() + '})'));
            }

            // 查询条件拓展
            $.extend(true, defaults.params, pageScope.customExtendQueryParam());

            pageScope.api_dataTable.reload(defaults);
        };
        // 保存数据
        this.customSaveData = null;
        // 注册事件
        this.registViewEvent = function(paramExpExcelData, paramCmdEvents, paramBtnEvents){
            var pageScope = this;

            // 赋值导出 Excel 数据
            var expExcelData = [];
            if(!isNull(paramExpExcelData))
                expExcelData = paramExpExcelData;

            // 拓展操作事件
            var cmdEvents = $.extend(true, {
                beforeAddEvent: function (){ return true; },
                beforeEditEvent: function (data){ return true; },
                beforeDeleteEvent: function (data){ return true; },
                beforeCloseEvent: function (){ return true; },
                beforeReadEvent: function (data){ return true; },
                afterAddEvent: function (){ return true; },
                afterEditEvent: function (data){ return true; },
                afterDeleteEvent: function(data){ return true; },
                afterReadEvent: function(data){ return true; }
            }, paramCmdEvents);


            // 拓展按钮事件
            var btnEvents = $.extend(true, {
                // 条件按钮事件
                btnConditionEvent: function(){
                    pageScope.queryCondition.toggle('fast');
                },
                // 查询按钮事件
                btnQueryEvent: function(){
                    pageScope.queryData();
                    // 语音播报
                    $.lightJokerlib.speech.speak({ text: lightJokerLanguage });
                },
                // 添加按钮事件
                btnAddEvent: function(){

                    // 执行添加前事件
                    if(!cmdEvents.beforeAddEvent())
                        return;

                    pageScope.ACT = MODS.CREATE;
                    pageScope.data = null;

                    // 判断展示方式
                    if(sessionStorage.getItem(WEBSETTINGS.EDITSHOW.KEY) == WEBSETTINGS.EDITSHOW.DIV){
                        if(pageScope.lightJokerContentView.is('.' + pageScope.pageShowAnimate)){
                            pageScope.lightJokerContentView.removeClass(pageScope.pageShowAnimate).addClass(pageScope.pageHideAnimate);
                            setTimeout(function(){
                                pageScope.lightJokerContentView.hide();
                                pageScope.lightJokerContentEdit.removeClass(pageScope.pageHideAnimate).addClass(pageScope.pageShowAnimate).show();
                                pageScope.lightJokerContentEditBody.load(
                                    pageScope.customUrl_edit,
                                    function(){

                                    }
                                );
                            }, 700);
                        }
                    }else if(sessionStorage.getItem(WEBSETTINGS.EDITSHOW.KEY) == WEBSETTINGS.EDITSHOW.MODAL){
                        pageScope.modalIndex = $.lightJokerLib.modal.show({
                            url: pageScope.customUrl_edit,
                            title: pageScope.btnAdd.text(),
                            area: pageScope.modalArea,
                            btnOkEvent: function(){
                                var result = false;
                                if(pageScope.customSaveData() && cmdEvents.afterAddEvent()){
                                    result = true;
                                }
                                return result;
                            },
                            btnCloseEvent: function(){
                                return pageScope.closeEdit(cmdEvents.beforeCloseEvent);
                            }
                        })
                    }
                },
                // 编辑按钮事件
                btnEditEvent: function(){
                    // 获取选中数据
                    pageScope.data = pageScope.api_dataTable.selectedSimpleData();

                    if(isNull(pageScope.data)){
                        $.lightJokerLib.messager.warning({ content: lightJokerLanguage });
                        return;
                    }

                    if(!cmdEvents.beforeEditEvent(pageScope.data))
                        return;

                    pageScope.ACT = MODS.UPDATE;

                    if(sessionStorage.getItem(WEBSETTINGS.EDITSHOW.KEY) == WEBSETTINGS.EDITSHOW.DIV){
                        if(pageScope.lightJokerContentView.is('.' + pageScope.pageShowAnimate)){
                            pageScope.lightJokerContentView.removeClass(pageScope.pageShowAnimate).addClass(pageScope.pageHideAnimate);
                            setTimeout(function(){
                                pageScope.lightJokerContentView.hide();
                                pageScope.lightJokerContentEdit.removeClass(pageScope.pageHideAnimate).addClass(pageScope.pageShowAnimate).show();
                                pageScope.lightJokerContentEditBody.load(
                                    pageScope.customUrl_edit,
                                    function(){

                                    }
                                )
                            }, 700)
                        }
                    }else if(sessionStorage.getItem(WEBSETTINGS.EDITSHOW.KEY) == WEBSETTINGS.EDITSHOW.MODAL){
                        pageScope.modalIndex = $.lightJokerLib.modal.show({
                            url: pageScope.customUrl_edit,
                            title: pageScope.btnEdit.text(),
                            area: pageScope.modalArea,
                            btnOkEvent: function(){
                                var result = false;
                                if(pageScope.customSaveData() && cmdEvents.afterEditEvent(pageScope.data)){
                                    result = true;
                                }
                                return result;
                            },
                            btnCloseEvent: function(){
                                return pageScope.closeEdit(cmdEvents.beforeCloseEvent);
                            }
                        })
                    }
                },
                // 保存按钮事件
                btnSaveEvent: function(){
                    var result = false;

                    if(pageScope.customSaveData()){
                        if(pageScope.ACT == MODS.CREATE){
                            if(cmdEvents.afterAddEvent())
                                result = true;
                        }
                        if(pageScope.ACT == MODS.UPDATE){
                            if(cmdEvents.afterEditEvent(pageScope.data))
                                result = true;
                        }
                    }

                    if(result){
                        pageScope.closeEdit(cmdEvents.beforeCloseEvent);
                    }
                },
                // 只读按钮事件
                btnReadEvent: function(){
                    // 获取选中数据
                    pageScope.data = pageScope.api_dataTable.selectedSimpleData();

                    if(isNull(pageScope.data)){
                        $.lightJokerLib.messager.warning({ content: lightJokerLanguage });
                        return;
                    }

                    if(!cmdEvents.beforeReadEvent(pageScope.data))
                        return;

                    pageScope.btnSave.hide();
                    pageScope.ACT = MODS.READ;

                    if(sessionStorage.getItem(WEBSETTINGS.EDITSHOW.KEY) == WEBSETTINGS.EDITSHOW.DIV){
                        if(pageScope.lightJokerContentView.is('.' + pageScope.pageShowAnimate)){
                            pageScope.lightJokerContentView.removeClass(pageScope.pageShowAnimate).addClass(pageScope.pageHideAnimate);
                            setTimeout(function(){
                                pageScope.lightJokerContentView.hide();
                                pageScope.lightJokerContentEdit.removeClass(pageScope.pageHideAnimate).addClass(pageScope.pageShowAnimate).show();
                                pageScope.lightJokerContentEditBody.load(
                                    pageScope.customUrl_read,
                                    function(){

                                    }
                                )
                            }, 700)
                        }
                    }else if(sessionStorage.getItem(WEBSETTINGS.EDITSHOW.KEY) == WEBSETTINGS.EDITSHOW.MODAL){
                        pageScope.modalIndex = $.lightJokerLib.modal.show({
                            url: pageScope.customUrl_read,
                            title: pageScope.btnRead.text(),
                            area: pageScope.modalArea,
                            btnCloseEvent: function(){
                                cmdEvents.afterReadEvent(pageScope.data);
                                return pageScope.closeEdit(cmdEvents.beforeCloseEvent);
                            }
                        })
                    }
                },
                // 删除按钮事件
                btnDeleteEvent: function(){
                    pageScope.data = pageScope.api_dataTable.selectedSimpleData();

                    if(isNull(pageScope.data)){
                        $.lightJokerLib.messager.warning({ content: lightJokerLanguage });
                        return;
                    }

                    if(!cmdEvents.beforeDeleteEvent(pageScope.data))
                        return;

                    if(isNull(pageScope.data.ID)){
                        $.lightJokerLib.messager.warning({ content: lightJokerLanguage });
                    }

                    /// 删除数据


                    cmdEvnets.afterDeleteEvent(pageScope.data);
                },
                // 导出按钮事件
                btnExpExcelEvent: function(){
                    $.lightJokerLib.excel.export({
                        arrData: expExcelData
                    })
                },
                // 关闭按钮事件
                btnCloseEvent: function(){
                    pageScope.closeEdit(cmdEvents.beforeCloseEvent);
                },
                // 打印按钮事件
                btnPrintEvent: function(){
                    pageScope.modalIndex = $.lightJokerLib.modal.show({
                        url: pageScope.customUrl_print,
                        title: pageScope.btnPrint.text(),
                        area: pageScope.modalArea,
                        btnCloseEvent: function(){
                            return pageScope.closeEdit(cmdEvents.beforeCloseEvent);
                        }
                    })
                }
            }, paramBtnEvents);


            /// 绑定按钮事件
            if(!isNull(pageScope.btnCondition)){
                pageScope.btnCondition.unbind('click');
                pageScope.btnCondition.on('click', btnEvents.btnConditionEvent);
            }
            if(!isNull(pageScope.btnQuery)){
                pageScope.btnQuery.unbind('click');
                pageScope.btnQuery.on('click', btnEvents.btnQueryEvent);
            }
            if(!isNull(pageScope.btnAdd)){
                pageScope.btnAdd.unbind('click');
                pageScope.btnAdd.on('click', btnEvents.btnAddEvent);
            }
            if(!isNull(pageScope.btnEdit)){
                pageScope.btnEdit.unbind('click');
                pageScope.btnEdit.on('click', btnEvents.btnEditEvent);
            }
            if(!isNull(pageScope.btnSave)){
                pageScope.btnSave.unbind('click');
                pageScope.btnSave.on('click', btnEvents.btnSaveEvent);
            }
            if(!isNull(pageScope.btnRead)){
                pageScope.btnRead.unbind('click');
                pageScope.btnRead.on('click', btnEvents.btnReadEvent);
            }
            if(!isNull(pageScope.btnDelete)){
                pageScope.btnDelete.unbind('click');
                pageScope.btnDelete.on('click', btnEvents.btnDeleteEvent);
            }
            if(!isNull(pageScope.btnExpExcel)){
                pageScope.btnExpExcel.unbind('click');
                pageScope.btnExpExcel.on('click', btnEvents.btnExpExcelEvent);
            }
            if(!isNull(pageScope.btnClose)){
                pageScope.btnClose.unbind('click');
                pageScope.btnClose.on('click', btnEvents.btnCloseEvent);
            }
            if(!isNull(pageScope.btnPrint)){
                pageScope.btnPrint.unbind('click');
                pageScope.btnPrint.on('click', btnEvents.btnPrintEvent);
            }
        };
    }
})(jQuery);