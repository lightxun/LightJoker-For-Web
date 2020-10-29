/*
    Created by LightJoker on 2020-09-02
 */
;(function($){

    // 成员里 var 表示私有, this 表示公有, 无任何修饰表示实例化后才有效的变量和方法
    //$.Demo = function (arg) {

        //instanceArr = '实例化后有效的变量';    //实例化后直接调用, 相当于外部变量的赋值
        //var privateArr = '私有变量';
        //this.publicArr = '公有变量';

        // 实例化后有效的方法
        //instanceFun = function () {
        //    alert(instanceArr);
        //    //实例化后直接调用, 相当于外部方法的重写 : instanceFun();
        //}

        // 私有方法
        //var privateFun = function () {
        //    alert(privateArr);
        //}

        // 公有方法
        //this.publicFun = function () {
        //    alert(this.publicArr);
        //}

        // 调用私有方法
        //this.callPrivate = function () {
        //    privateFun();
        //}
    //}

    //$(function () {
    //    var a = new $.classA({});
    //    alert(instanceAttr);            // 正常
    //    alert(a.instanceAttr);         //  undefined
    //    instanceFun();                  //  正常
    //    a.instanceFun();               //  报错
    //    alert(privateAttr);             //  报错
    //    alert(a.privateAttr);          //   undefined
    //    privateFun();                   //   报错
    //    a.privateFun();                //   报错
    //});


    $.lightJokerPageScope = function(param){
        /// 实例化变量 - 没有修饰符 变量名, 实例化后直接调用, 相当于外部变量
        window.$.lightJokerPageScope = this;
        /// 私有变量 - var 变量名
        //
        /// 公有变量 - this.变量名
        // 查询条件
        this.lightJokerQueryCondition = null;
        this.lightJokerQueryParamName = null;
        this.lightJokerQueryParamValue = null;
        // 按钮
        this.lightJokerBtnCondition = null;
        this.lightJokerBtnAdd = null;
        this.lightJokerBtnEdit = null;
        this.lightJokerBtnDelete = null;
        this.lightJokerBtnRead = null;
        this.lightJokerBtnExpExcel = null;
        this.lightJokerBtnSave = null;
        this.lightJokerBtnQuery = null;
        this.lightJokerBtnClose = null;
        this.lightJokerBtnPrint = null;
        // 按钮组
        this.lightJokerBtnGroupCmd = null;
        this.lightJokerBtnGroupQuery = null;
        this.lightJokerBtnGroupAnn = null;
        // 界面
        this.lightJokerContentView = null;
        this.lightJokerContentViewHeader = null;
        this.lightJokerContentViewBody = null;
        this.lightJokerContentEdit = null;
        this.lightJokerContentEditHeader = null;
        this.lightJokerContentEditBody = null;
        // 参数
        this.ACT = LIGHTJOKERCONST_MOD.EMPTY;
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
                lightJokerQueryCondition: $('#lightJoker-queryCondition'),
                lightJokerQueryParamName: $('#lightJoker-queryParamName'),
                lightJokerQueryParamValue: $('#lightJoker-queryParamValue'),
                lightJokerBtnCondition: $('#lightJoker-btnCondition'),
                lightJokerBtnAdd: $('#lightJoker-btnAdd'),
                lightJokerBtnEdit: $('#lightJoker-btnEdit'),
                lightJokerBtnDelete: $('#lightJoker-btnDelete'),
                lightJokerBtnRead: $('#lightJoker-btnRead'),
                lightJokerBtnExpExcel: $('#lightJoker-btnExpExcel'),
                lightJokerBtnSave: $('#lightJoker-btnSave'),
                lightJokerBtnQuery: $('#lightJoker-btnQuery'),
                lightJokerBtnClose: $('#lightJoker-btnClose'),
                lightJokerBtnPrint: $('#lightJoker-btnPrint'),
                lightJokerBtnGroupCmd: $('.lightJoker-btn-group-cmd'),
                lightJokerBtnGroupQuery: $('.lightJoker-btn-group-query'),
                lightJokerBtnGroupAnn: $('.lightJoker-btn-group-ann'),
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
            if(!defaults.beforeLoadCallback()){
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
            pageScope.lightJokerQueryCondition = defaults.lightJokerQueryCondition;
            pageScope.lightJokerQueryParamName = defaults.lightJokerQueryParamName;
            pageScope.lightJokerQueryParamValue = defaults.lightJokerQueryParamValue;
            pageScope.lightJokerBtnCondition = defaults.lightJokerBtnCondition;
            pageScope.lightJokerBtnAdd = defaults.lightJokerBtnAdd;
            pageScope.lightJokerBtnEdit = defaults.lightJokerBtnEdit;
            pageScope.lightJokerBtnDelete = defaults.lightJokerBtnDelete;
            pageScope.lightJokerBtnRead = defaults.lightJokerBtnRead;
            pageScope.lightJokerBtnExpExcel = defaults.lightJokerBtnExpExcel;
            pageScope.lightJokerBtnSave = defaults.lightJokerBtnSave;
            pageScope.lightJokerBtnQuery = defaults.lightJokerBtnQuery;
            pageScope.lightJokerBtnClose = defaults.lightJokerBtnClose;
            pageScope.lightJokerBtnPrint = defaults.lightJokerBtnPrint;
            pageScope.lightJokerBtnGroupCmd = defaults.lightJokerBtnGroupCmd;
            pageScope.lightJokerBtnGroupQuery = defaults.lightJokerBtnGroupQuery;
            pageScope.lightJokerBtnGroupAnn = defaults.lightJokerBtnGroupAnn;
            pageScope.lightJokerContentView = defaults.lightJokerContentView;
            pageScope.lightJokerContentViewHeader = defaults.lightJokerContentViewHeader;
            pageScope.lightJokerContentViewBody = defaults.lightJokerContentViewBody;
            pageScope.lightJokerContentEdit = defaults.lightJokerContentEdit;
            pageScope.lightJokerContentEditHeader = defaults.lightJokerContentEditHeader;
            pageScope.lightJokerContentEditBody = defaults.lightJokerContentEditBody;

            // 加载自定义组件 - 放置 common-global 中
            if(sessionStorage.getItem(LIGHTJOKERCONST_WEBSETTING.EDITSHOW.KEY) == LIGHTJOKERCONST_WEBSETTING.EDITSHOW.DIV){
                $.lightJokerLib.select.bind(defaults.lightJokerContentView_lightJokerSelect);
                $.lightJokerLib.date.bindSampleDate(defaults.lightJokerContentView_lightJokerDate);
                $.lightJokerLib.date.bindSampleDateTime(defaults.lightJokerContentView_lightJokerDateTime);
                $.lightJokerLib.date.bindMultipleDate(defaults.lightJokerContentView_lightJokerDateMultiple);
                $.lightJokerLib.date.bindMultipleDateTime(defaults.lightJokerContentView_lightJokerDateTimeMultiple);
            }


            // 取消所有 input 的 autocomplete, 指定显示除外
            $('input:not([autocomplete]),textarea:not([autocomplete]),select:not([autocomplete])').attr('autocomplete', 'off');

            // 展示样式为 div 时
            if(sessionStorage.getItem(LIGHTJOKERCONST_WEBSETTING.EDITSHOW.KEY) == LIGHTJOKERCONST_WEBSETTING.EDITSHOW.DIV){
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
                lightJokerContentEditBodyContent_lightJokerSelect: $('.lightJokerContent-edit-body-content .lightJoker-select'),
                lightJokerContentEditBodyContent_lightJokerDate: $('.lightJokerContent-edit-body-content .lightJoker-date'),
                lightJokerContentEditBodyContent_lightJokerDateTime: $('.lightJokerContent-edit-body-content .lightJoker-datetime'),
                lightJokerContentEditBodyContent_lightJokerDateMultiple: $('.lightJokerContent-edit-body-content .lightJoker-date-multiple'),
                lightJokerContentEditBodyContent_lightJokerDateTimeMultiple: $('.lightJokerContent-edit-body-content .lightJoker-datetime-multiple'),
                beforeLoadCallback: function(){ return true; },
                afterLoadCallback: function(){ return true; }
            }, settings);

            // 执行加载前方法
            if(!defaults.beforeLoadCallback()){
                return;
            }

            // 赋值
            pageScope.lightJokerContentEditBodyContent_lightJokerSelect = defaults.lightJokerContentEditBodyContent_lightJokerSelect;
            pageScope.lightJokerContentEditBodyContent_lightJokerDate = defaults.lightJokerContentEditBodyContent_lightJokerDate;
            pageScope.lightJokerContentEditBodyContent_lightJokerDateTime = defaults.lightJokerContentEditBodyContent_lightJokerDateTime;
            pageScope.lightJokerContentEditBodyContent_lightJokerDateMultiple = defaults.lightJokerContentEditBodyContent_lightJokerDateMultiple;
            pageScope.lightJokerContentEditBodyContent_lightJokerDateTimeMultiple = defaults.lightJokerContentEditBodyContent_lightJokerDateTimeMultiple;

            // 加载自定义组件 - 放置 common-global 中
            if(sessionStorage.getItem(LIGHTJOKERCONST_WEBSETTING.EDITSHOW.KEY) == LIGHTJOKERCONST_WEBSETTING.EDITSHOW.DIV){
                $.lightJokerLib.select.bind(defaults.lightJokerContentEditBodyContent_lightJokerSelect);
                $.lightJokerLib.date.bindSampleDate(defaults.lightJokerContentEditBodyContent_lightJokerDate);
                $.lightJokerLib.date.bindSampleDateTime(defaults.lightJokerContentEditBodyContent_lightJokerDateTime);
                $.lightJokerLib.date.bindMultipleDate(defaults.lightJokerContentEditBodyContent_lightJokerDateMultiple);
                $.lightJokerLib.date.bindMultipleDateTime(defaults.lightJokerContentEditBodyContent_lightJokerDateTimeMultiple);
            }

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
            var pageScope = this;

            if(!isNull(beforeCloseEvent) && beforeCloseEvent())
                return;

            pageScope.lightJokerBtnSave.show();
            pageScope.data = null;

            if(sessionStorage.getItem(LIGHTJOKERCONST_WEBSETTING.EDITSHOW.KEY) == LIGHTJOKERCONST_WEBSETTING.EDITSHOW.DIV){
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
            var pageScope = this;

            var defaults = $.extend(true, {
                resetPaging: true,
                params:{

                }
            }, options);

            // 收集默认查询条件
            if(!isNull(pageScope.lightJokerQueryParamValue.val())){
                $.extend(true, defaults.params, eval('({' + pageScope.lightJokerQueryParamName.val() + ' : ' + pageScope.lightJokerQueryParamValue.val() + '})'));
            }

            // 查询条件拓展
            $.extend(true, defaults.params, pageScope.customExtendQueryParam());

            pageScope.api_lightJokerDataTable.reload(defaults);
        };
        // 保存数据
        this.customSaveData = null;
        // 注册事件
        this.registViewEvent = function(paramCmdEvents, paramBtnEvents){
            var pageScope = this;

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
                    pageScope.lightJokerQueryCondition.toggle('fast');
                },
                // 查询按钮事件
                btnQueryEvent: function(){
                    pageScope.queryData();
                    // 语音播报
                    $.lightJokerLib.speech.speak({ text: lightJokerLanguage });
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
                    pageScope.data = pageScope.api_lightJokerDataTable.selectedSimpleData();

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
                            title: pageScope.lightJokerBtnEdit.text(),
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
                    pageScope.data = pageScope.api_lightJokerDataTable.selectedSimpleData();

                    if(isNull(pageScope.data)){
                        $.lightJokerLib.messager.warning({ content: lightJokerLanguage });
                        return;
                    }

                    if(!cmdEvents.beforeReadEvent(pageScope.data))
                        return;

                    pageScope.lightJokerBtnSave.hide();
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
                            title: pageScope.lightJokerBtnRead.text(),
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
                    pageScope.data = pageScope.api_lightJokerDataTable.selectedSimpleData();

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
                        title: pageScope.lightJokerBtnPrint.text(),
                        area: pageScope.modalArea,
                        btnCloseEvent: function(){
                            return pageScope.closeEdit(cmdEvents.beforeCloseEvent);
                        }
                    })
                }
            }, paramBtnEvents);


            /// 绑定按钮事件
            if(!isNull(pageScope.lightJokerBtnCondition)){
                pageScope.lightJokerBtnCondition.unbind('click');
                pageScope.lightJokerBtnCondition.on('click', btnEvents.btnConditionEvent);
            }
            if(!isNull(pageScope.lightJokerBtnQuery)){
                pageScope.lightJokerBtnQuery.unbind('click');
                pageScope.lightJokerBtnQuery.on('click', btnEvents.btnQueryEvent);
            }
            if(!isNull(pageScope.lightJokerBtnAdd)){
                pageScope.lightJokerBtnAdd.unbind('click');
                pageScope.lightJokerBtnAdd.on('click', btnEvents.btnAddEvent);
            }
            if(!isNull(pageScope.lightJokerBtnEdit)){
                pageScope.lightJokerBtnEdit.unbind('click');
                pageScope.lightJokerBtnEdit.on('click', btnEvents.btnEditEvent);
            }
            if(!isNull(pageScope.lightJokerBtnSave)){
                pageScope.lightJokerBtnSave.unbind('click');
                pageScope.lightJokerBtnSave.on('click', btnEvents.btnSaveEvent);
            }
            if(!isNull(pageScope.lightJokerBtnRead)){
                pageScope.lightJokerBtnRead.unbind('click');
                pageScope.lightJokerBtnRead.on('click', btnEvents.btnReadEvent);
            }
            if(!isNull(pageScope.lightJokerBtnDelete)){
                pageScope.lightJokerBtnDelete.unbind('click');
                pageScope.lightJokerBtnDelete.on('click', btnEvents.btnDeleteEvent);
            }
            if(!isNull(pageScope.lightJokerBtnExpExcel)){
                pageScope.lightJokerBtnExpExcel.unbind('click');
                pageScope.lightJokerBtnExpExcel.on('click', btnEvents.btnExpExcelEvent);
            }
            if(!isNull(pageScope.lightJokerBtnClose)){
                pageScope.lightJokerBtnClose.unbind('click');
                pageScope.lightJokerBtnClose.on('click', btnEvents.btnCloseEvent);
            }
            if(!isNull(pageScope.lightJokerBtnPrint)){
                pageScope.lightJokerBtnPrint.unbind('click');
                pageScope.lightJokerBtnPrint.on('click', btnEvents.btnPrintEvent);
            }
        };
    }
})(jQuery);