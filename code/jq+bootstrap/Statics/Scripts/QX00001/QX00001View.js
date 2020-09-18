//# sourceURL=QX00001View.js

/*
    系统 - 系统字典
    Created By LightJoker on 2020-09-01
 */
$(function(){

    // 页面扩展
    $.extend(true, pageScope, {
        // 自定义url
        customUrl_edit: '',
        customUrl_read: '',
        customUrl_print: '',
        // 自义定初始化 View
        customInitView: function(){
            pageScope.loadView();

            pageScope.api_dataTable = pageScope.dataTable.lightJokerDataTable({

            });
            pageScope.registViewEvent();
        },
        // 自定义销毁 View
        customDestroyView: function(){
            pageScope.api_dataTable.destroy();
        },
        // 自定义扩展查询参数
        customExtendQueryParam: function(){

        }
    });

    // 初始化页面
    pageScope.customInitView();
})