//全局文档加载
$(function () {
    //设置全局配置 - 通知条
    PNotify.prototype.options.styling = "bootstrap3";
    PNotify.prototype.options.delay = 5000;

    // 注册每一个 ajax 都显示
    $.LoadingOverlaySetup({
        background: "rgba(0, 0, 0, 0.5)",
        size: 8
    });
    // 监控至每个ajax请求 加 loading
    $(document).ajaxSend(function (event, jqxhr, settings) {
        $.LoadingOverlay("show");
    });
    $(document).ajaxComplete(function (event, jqxhr, settings) {
        $.LoadingOverlay("hide");
    });
});

/**
 * Created by Light on 2017-05-25.
 */

function PageScopeV_Default() {
    return {
        // 数据表格
        $dataTable: {},
        $api_dataTable: {},

        // 查询条件
        $searchCondition: {},
        $queryParamName: {},
        $queryParamValue: {},

        // 按钮
        $btnCondition: {},
        $btnAdd: {},
        $btnEdit: {},
        $btnDel: {},
        $btnExpExcel: {},
        $btnSave: {},
        $btnSearch: {},
        $btnClose: {},

        // 基本参数
        ACT: MOD.CREATE,
        DataBase: '',
        TableDal: '',
        $data: null,

        // 页面
        $lightContentView: {},
        $lightContentEdit: {},
        $lightContentEditBody: {},

        // 按钮组
        $btn_group_cmd: {},
        $btn_group_search: {},
        $btn_group_ann: {},

        // 加载页面
        load: function () {

            // 数据表格
            PageScopeV.$dataTable = $('#dataTable');

            // 查询条件
            PageScopeV.$searchCondition = $('.search-condition'),
            PageScopeV.$queryParamName = $('#queryParamName'),
            PageScopeV.$queryParamValue = $('#queryParamValue'),

            // 按钮
            PageScopeV.$btnCondition = $('#btnCondition'),
            PageScopeV.$btnAdd = $('#btnAdd');
            PageScopeV.$btnEdit = $('#btnEdit');
            PageScopeV.$btnDel = $('#btnDel');
            PageScopeV.$btnExpExcel = $('#btnExpExcel');
            PageScopeV.$btnSave = $('#btnSave');
            PageScopeV.$btnSearch = $('#btnSearch');
            PageScopeV.$btnClose = $('#btnClose');

            // 页面
            PageScopeV.$lightContentView = $('.lightContent-view'),
            PageScopeV.$lightContentEdit = $('.lightContent-edit'),
            PageScopeV.$lightContentEditBody = $('.lightContent-edit-body'),

            // 按钮组
            PageScopeV.$btn_group_search = $('.btn-group-search'),
            PageScopeV.$btn_group_cmd = $('.btn-group-cmd'),
            PageScopeV.$btn_group_ann = $('.btn-group-ann'),

            // 绑定页面 select2
            $.lightLib.select.bind('.lightContent-view .light-select', { serverSide: false, allowClear: false });

            // 绑定页面 light-date
            $.lightLib.daterangepicker.bindSampleDate('.lightContent-view .light-date');
            // 绑定页面 light-datetime
            $.lightLib.daterangepicker.bindSampleDateTime('.lightContent-view .light-datetime');
            // 绑定页面 light-date-multiple
            $.lightLib.daterangepicker.bindMultipleDate('.lightContent-view .light-date-multiple');
            // 绑定页面 light-datetime-multiple
            $.lightLib.daterangepicker.bindMultipleDateTime('.lightContent-view .light-datetime-multiple');

            // 去掉所有input的autocomplete, 显示指定的除外 
            $('input:not([autocomplete]),textarea:not([autocomplete]),select:not([autocomplete])').attr('autocomplete', 'off');

            
            $.LoadingOverlay("show");
            // 计算lightContent 尺寸 - bak
            //var _viewHeight = $('.lightContent-view-header').outerHeight() + $('.lightContent-view-footer').outerHeight();
            //$('.lightContent-view-body').css('height', 'calc(100vh - ' + _viewHeight + 'px)');
            //var _editHeight = $('.lightContent-edit-header').outerHeight() + $('.lightContent-edit-footer').outerHeight();
            //$('.lightContent-edit-body').css('height', 'calc(100vh - ' + _editHeight + 'px)');
            //$('.lightContent-edit').hide();

            // 展示样式为 div 时, 计算
            if (sessionStorage.getItem(WEBSTYLE.EDITSHOW.KEY) == WEBSTYLE.EDITSHOW.DIV) {
                var _viewHeight = $('.lightContent-view-header').outerHeight() + 20 + 30;
                var _viewWidth = $('.lightContent-view-header').outerWidth();
                if (_viewWidth <= 768)
                    _viewHeight += 50;
                $('.lightContent-view-body').css('height', 'calc(100vh - ' + _viewHeight + 'px)');
                var _editHeight = $('.lightContent-edit-header').outerHeight() + 20 + 30;
                $('.lightContent-edit-body').css('height', 'calc(100vh - ' + _editHeight + 'px)');
            }
            $('.lightContent-edit').hide();
            $.LoadingOverlay("hide");

            // 绑定主体滚动条
            $.lightLib.niceScroll('.lightContent-view-body',
                {
                    cursorcolor: "#1a2226",
                    autohidemode: 'leave'
                });
            $.lightLib.niceScroll('.lightContent-edit-body',
                {
                    cursorcolor: "#1a2226",
                    autohidemode: 'leave'
                });
        },
        // 初始化
        init: function () { },
        // 销毁
        destroy: function () { },
        // 查询数据
        searchData: function () { }
    }
}
var PageScopeV = new PageScopeV_Default();

function PageScopeE_Default() {
    return {
        // 表单对象
        $form: {},
        $api_form: {},

        // 当前数据ID
        dataID: 0,
        modalIndex: -1,

        // 加载页面
        load: function () {
            PageScopeE.$form = $('#editForm');
            PageScopeE.$api_form = PageScopeE.$form.lightForm({
                eventValidate: PageScopeE.validateData
            }).data('plugin');

            // 绑定页面 select2
            $.lightLib.select.bind('.lightContent-edit-body-content .light-select', { serverSide: false, allowClear: false });
            // 绑定页面 light-date
            $.lightLib.daterangepicker.bindSampleDate('.lightContent-edit-body-content .light-date');
            // 绑定页面 light-datetime
            $.lightLib.daterangepicker.bindSampleDateTime('.lightContent-edit-body-content .light-datetime');
            // 绑定页面 light-date-multiple
            $.lightLib.daterangepicker.bindMultipleDate('.lightContent-edit-body-content .light-date-multiple');
            // 绑定页面 light-datetime-multiple
            $.lightLib.daterangepicker.bindMultipleDateTime('.lightContent-edit-body-content .light-datetime-multiple');

            // 去掉所有input的autocomplete, 显示指定的除外 
            $('input:not([autocomplete]),textarea:not([autocomplete]),select:not([autocomplete])').attr('autocomplete', 'off');
        },
        // 初始化
        init: function () { },
        // 销毁
        destroy: function () { },
        // 加载编辑及只读数据 loadValueCallback, loadedCallback
        loadEditAndRead: function (loadValueCallback, loadedCallback) {
            if ((PageScopeV.ACT == MOD.UPDATE || PageScopeV.ACT == MOD.READ) && !isNull(PageScopeV.$data)) {
                PageScopeE.dataID = PageScopeV.$data.ID;

                PageScopeE.$api_form.setValue({
                    data: PageScopeV.$data,
                    eventCallback: loadValueCallback
                });

                if (!isNull(loadedCallback))
                    loadedCallback();
            }
        },
        // 验证数据有效性
        validateData: function () { return true; },
        // 保存数据
        saveData: function () { return true; },
        //关闭事件
        closeEvent: function () { return true; }
    }
}
var PageScopeE = new PageScopeE_Default();

function PageScopeO_Default() {
    return {
        init: function () { },
        destroy: function () { }
    }
}
var PageScopeO = new PageScopeO_Default();

// 重置内置参数
function resetPageScope() {
    resetPageScopeEO();

    if (PageScopeV != null) {
        // 销毁产生对象
        PageScopeV.destroy();

        delete (PageScopeV);
        PageScopeV = new PageScopeV_Default();
    }
}

// 重置EO内置参数
function resetPageScopeEO() {
    if (PageScopeE != null) {
        // 销毁产生对象
        PageScopeE.destroy();

        delete (PageScopeE);
        PageScopeE = new PageScopeE_Default();
    }

    if (PageScopeO != null) {
        // 销毁产生对象
        PageScopeO.destroy();

        delete (PageScopeO);
        PageScopeO = new PageScopeO_Default();
    }
}

//获取request中参数
function request(strParame) {
    var args = new Object();
    var query = location.search.substring(1);

    var pairs = query.split("&"); // Break at ampersand
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[argname] = value;
    }
    return args[strParame];
}

function dealNull(_tmp) {
    if (isNull(_tmp))
        return '';
    else
        return _tmp;
}

//判断是否为空
function isNull(_tmp) {
    if (typeof (_tmp) == "undefined") {
        return true;
    }

    if (_tmp == "") {
        return true;
    }

    if (_tmp == "null") {
        return true;
    }

    if (!_tmp && typeof (_tmp) != "undefined" && _tmp != 0) {
        return true;
    }

    return false;
}

//格式化编码
function formatNo3(tmp) {
    if (tmp < 10)
        return '00' + tmp;
    else if (tmp >= 10 && tmp < 100)
        return '0' + tmp;
    else
        return tmp;
}
function formatNo2(tmp) {
    if (tmp < 10)
        return '0' + tmp;
    else
        return tmp;
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//绑定View页按钮事件
function registViewEvent(paramEvents, paramBtnEvents) {
    var cmdEvents = {
        beforeAddEvent: function () { return true; },
        beforeEditEvent: function (data) { return true; },
        beforeDelEvent: function (data) { return true; },
        beforeCloseEvent: function () { return true; },
        beforeReadEvent: function (data) { return true; },
        afterAddEvent: function () { return true; },
        afterEditEvent: function(data) { return true; },
        afterDelEvent: function (data) { return true; },
        expExcelData: []
    };
    $.extend(cmdEvents, paramEvents);

    var btnEvents = {
        btnConditionEvent: function(){
            PageScopeV.$searchCondition.toggle('fast');
        },
        btnSearchEvent: function () {
            PageScopeV.searchData();
        },
        btnAddEvent: function () {

            if (!cmdEvents.beforeAddEvent())
                return;

            
            PageScopeV.ACT = MOD.CREATE;
            PageScopeE.dataID = 0;

            if (sessionStorage.getItem(WEBSTYLE.EDITSHOW.KEY) == WEBSTYLE.EDITSHOW.DIV) {
                if (PageScopeV.$lightContentView.is('.fadeInRight')) {
                    PageScopeV.$lightContentView.removeClass('fadeInRight').addClass('fadeOutRight');
                    setTimeout(function () {
                        PageScopeV.$lightContentView.hide();
                        PageScopeV.$lightContentEdit.removeClass('fadeOutRight').addClass('fadeInLeft').show();
                        PageScopeV.$lightContentEditBody.load(
                            PageScopeV.url_edit,
                            function () {

                            }
                        );
                    }, 700);
                }
            } else if (sessionStorage.getItem(WEBSTYLE.EDITSHOW.KEY) == WEBSTYLE.EDITSHOW.MODAL) {
                PageScopeE.modalIndex = $.lightLib.modal.show({
                    url: PageScopeV.url_edit,
                    title: PageScopeV.$btnAdd.text(),
                    btnOkEvent: function () {
                        if (PageScopeE.saveData()) {
                            
                            // 保存时不关闭
                            return false;
                        }

                        if (!cmdEvents.afterAddEvent())
                            return;
                    },
                    btnCloseEvent: function () {
                        return PageScopeE.closeEvent();
                    }
                })
            }

        },
        btnEditEvent: function () {

            PageScopeV.$data = PageScopeV.$api_dataTable.selectedSimple();

            if (isNull(PageScopeV.$data)) {
                $.lightLib.messager.warning({ content: '请先选择<span class="font-redBold"> 一条 </span>需要<span class="font-redBold">' + PageScopeV.$btnEdit.text() + ' </span>的数据.' });
                return;
            }

            if (!cmdEvents.beforeEditEvent(PageScopeV.$data))
                return;

            PageScopeV.ACT = MOD.UPDATE;

            if (sessionStorage.getItem(WEBSTYLE.EDITSHOW.KEY) == WEBSTYLE.EDITSHOW.DIV) {
                if (PageScopeV.$lightContentView.is('.fadeInRight')) {
                    PageScopeV.$lightContentView.removeClass('fadeInRight').addClass('fadeOutRight');
                    setTimeout(function () {
                        PageScopeV.$lightContentView.hide();
                        PageScopeV.$lightContentEdit.removeClass('fadeOutRight').addClass('fadeInLeft').show();
                        PageScopeV.$lightContentEditBody.load(
                            PageScopeV.url_edit,
                            function () {

                            }
                        );
                    }, 700);
                }
            } else if (sessionStorage.getItem(WEBSTYLE.EDITSHOW.KEY) == WEBSTYLE.EDITSHOW.MODAL) {
                PageScopeE.modalIndex = $.lightLib.modal.show({
                    url: PageScopeV.url_edit,
                    title: PageScopeV.$btnEdit.text(),
                    btnOkEvent: function () {
                        if (PageScopeE.saveData()) {
                            return true;
                        }

                        if (!cmdEvents.afterEditEvent(PageScopeV.$data))
                            return;
                    },
                    btnCloseEvent: function () {
                        return PageScopeE.closeEvent();
                    }
                })
            }

        },
        btnReadEvent: function () {

            PageScopeV.$data = PageScopeV.$api_dataTable.selectedSimple();

            if (isNull(PageScopeV.$data)) {
                $.lightLib.messager.warning({ content: '请先选择<span class="font-redBold"> 一条 </span>需要<span class="font-redBold">' + PageScopeV.$btnRead.text() + ' </span>的数据.' });
                return;
            }

            if (!cmdEvents.beforeEditEvent(PageScopeV.$data))
                return;

            PageScopeV.$btnSave.hide();

            PageScopeV.ACT = MOD.READ;

            if (sessionStorage.getItem(WEBSTYLE.EDITSHOW.KEY) == WEBSTYLE.EDITSHOW.DIV) {
                if (PageScopeV.$lightContentView.is('.fadeInRight')) {
                    PageScopeV.$lightContentView.removeClass('fadeInRight').addClass('fadeOutRight');
                    setTimeout(function () {
                        PageScopeV.$lightContentView.hide();
                        PageScopeV.$lightContentEdit.removeClass('fadeOutRight').addClass('fadeInLeft').show();
                        PageScopeV.$lightContentEditBody.load(
                            PageScopeV.url_read,
                            function () {

                            }
                        );
                    }, 700);
                }
            } else if (sessionStorage.getItem(WEBSTYLE.EDITSHOW.KEY) == WEBSTYLE.EDITSHOW.MODAL) {
                PageScopeE.modalIndex = $.lightLib.modal.show({
                    url: PageScopeV.url_edit,
                    title: PageScopeV.$btnRead.text(),
                    btnCloseEvent: function () {
                        return PageScopeE.closeEvent();
                    }
                })
            }

        },
        btnDelEvent: function () {
            PageScopeV.$data = PageScopeV.$api_dataTable.selectedSimple();

            if (isNull(PageScopeV.$data)) {
                $.lightLib.messager.warning({ content: '请先选择<span class="font-redBold"> 一条 </span>需要<span class="font-redBold">' + PageScopeV.$btnDel.text() + ' </span>的数据.' });
                return;
            }

            if (!cmdEvents.beforeDelEvent(PageScopeV.$data))
                return;

            PageScopeV.$api_dataTable.del({
                params: {
                    DataBase: PageScopeV.DataBase,
                    TableDal: PageScopeV.TableDal,
                    ACT: MOD.DELETE,
                    ID: PageScopeV.$data.ID
                },
                eventSuccess: function () {
                    cmdEvents.afterDelEvent(PageScopeV.$data);
                    PageScopeV.searchData({ resetPaging: false });
                }
            });
        },
        btnExpExcelEvent: function () {
            $.lightLib.expExcel({
                arrData: cmdEvents.expExcelData
            })
        },
        btnCloseEvent: function () {

            if (!cmdEvents.beforeCloseEvent())
                return;

            PageScopeV.$btnSave.show();

            PageScopeV.$data = null;

            
            if (sessionStorage.getItem(WEBSTYLE.EDITSHOW.KEY) == WEBSTYLE.EDITSHOW.DIV) {
                if (PageScopeV.$lightContentView.is('.fadeOutRight')) {
                    PageScopeV.$lightContentEdit.removeClass('fadeInRight').addClass('fadeOutRight');
                    setTimeout(function () {
                        PageScopeV.$lightContentEdit.hide();
                        PageScopeV.$lightContentView.removeClass('fadeOutRight').addClass('fadeInRight').show();
                    }, 700);
                }
            }
        },
        btnPrintEvent: function () {

            //PageScopeV.$editModal_Title.html(PageScopeV.$btnPrint.text());
            //PageScopeV.$editModal_Body.load(
            //    PageScopeV.url_print,
            //    function () {

            //    }
            //);
            //PageScopeV.$editModal.modal('show');

            PageScopeE.modalIndex = $.lightLib.modal.show({
                url: PageScopeV.url_print,
                title: PageScopeV.$btnPrint.text(),
                btnCloseEvent: function () {
                    return PageScopeE.closeEvent();
                }
            });

        }
    }

    $.extend(btnEvents, paramBtnEvents);

    // 绑定查询条件时间
    if (PageScopeV.$btnCondition != undefined) {
        PageScopeV.$btnCondition.unbind('click');
        PageScopeV.$btnCondition.on('click', btnEvents.btnConditionEvent);
    }

    // 绑定查询按钮事件
    if (PageScopeV.$btnSearch != undefined) {
        PageScopeV.$btnSearch.unbind('click');
        PageScopeV.$btnSearch.on('click', btnEvents.btnSearchEvent);
    }

    // 绑定添加按钮事件
    if (PageScopeV.$btnAdd != undefined) {
        PageScopeV.$btnAdd.unbind('click');
        PageScopeV.$btnAdd.on('click', btnEvents.btnAddEvent);
    }

    // 绑定编辑按钮事件
    if (PageScopeV.$btnEdit != undefined) {
        PageScopeV.$btnEdit.unbind('click');
        PageScopeV.$btnEdit.on('click', btnEvents.btnEditEvent);
    }

    // 绑定只读按钮事件
    if (PageScopeV.$btnRead != undefined) {
        PageScopeV.$btnRead.unbind('click');
        PageScopeV.$btnRead.on('click', btnEvents.btnReadEvent);
    }

    // 绑定删除按钮事件
    if (PageScopeV.$btnDel != undefined) {
        PageScopeV.$btnDel.unbind('click');
        PageScopeV.$btnDel.on('click', btnEvents.btnDelEvent);
    }

    // 绑定关闭按钮事件
    if (PageScopeV.$btnClose != undefined) {
        PageScopeV.$btnClose.unbind('click');
        PageScopeV.$btnClose.on('click', btnEvents.btnCloseEvent);
    }

    // 绑定导出按钮事件
    if (PageScopeV.$btnExpExcel != undefined) {
        PageScopeV.$btnExpExcel.unbind('click');
        PageScopeV.$btnExpExcel.on('click', btnEvents.btnExpExcelEvent);
    }

    // 绑定打印按钮事件
    if(PageScopeV.$btnPrint != undefined){
        PageScopeV.$btnPrint.unbind('click');
        PageScopeV.$btnPrint.on('click', btnEvents.btnPrintEvent);
    }
}

function autoClose(funcThen){
    PageScopeV.$data = null;

    if(PageScopeV.$lightContentView.is('.fadeOutRight')){
        PageScopeV.$lightContentEdit.removeClass('fadeInRight').addClass('fadeOutRight');
        setTimeout(function () {
            PageScopeV.$lightContentEdit.hide();
            PageScopeV.$lightContentView.removeClass('fadeOutRight').addClass('fadeInRight').show();
        }, 700);
    }

    if(isNull(funcThen))
        return;

    setTimeout(function(){
        funcThen();
    }, 1000);
}
