//# sourceURL=QX00001Edit.js

/*
    系统 - 系统字典
    Created By LightJoker on 2020-09-02
 */
$(function(){

    // 页面扩展
    $.extend(true, pageScope, {
        customInitEdit: function(){
            pageScope.loadEdit();

            pageScope.api_form = pageScope.form.lightJokerForm({

            });
        },
        customDestroyEdit: function(){

        },
        customSaveData: function(){

        }
    });

    // 初始化页面
    pageScope.customInitEdit();
})