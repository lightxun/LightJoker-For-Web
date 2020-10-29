//# sourceURL=Login.js

$(function(){
    $.lightJokerLib.plugin.fixSrc = '../../';

    globalInit(function(){
        $.lightJokerLib.notice.info({ content: 'test' });

        // 页面扩展
        $.extend($.lightJokerPageScope, {

            btnLogin: $('#btnLogin'),
            UserCode: $('#UserCode'),
            UserPWD: $('#UserPWD'),

            dataForm: null,
            dataFormApi: null,

            customInitEdit: function(){
                var that = this;
                // 加载 Edit
                that.loadEdit();
                // 初始化表单
                that.dataForm = $('#lightJoker-dataForm');
                that.dataFormApi = that.dataForm.lightJokerDataForm();
                // 绑定回车登录事件
                that.btnLogin.bind('click', function(event){
                    that.login();
                });
                that.UserCode.bind('keyup', function(event){
                    if(event.keyCode === 13){
                        that.login();
                    }
                });
                that.UserPWD.bind('keyup', function(event){
                    if(event.keyCode === 13){
                        that.login();
                    }
                });
            },
            customDestroyEdit: function(){

            },
            login: function(){
                var that = this;

                if(!that.dataFormApi.validate()){
                    $.lightJokerLib.messager.info({ content:'请正确填写用户名/密码.' });
                    return;
                }

                $.lightJokerLib.storage.setItem(LIGHTJOKERCONST_SESSION.TYPE, LIGHTJOKERCONST_SESSION.USERDATAID, -1);
                $.lightJokerLib.storage.setItem(LIGHTJOKERCONST_SESSION.TYPE, LIGHTJOKERCONST_SESSION.USERCODE, 'test');
                $.lightJokerLib.storage.setItem(LIGHTJOKERCONST_SESSION.TYPE, LIGHTJOKERCONST_SESSION.USERNAME, '测试人');
                window.location.href = 'Main-Iframe.html?r=' + Math.random();
            }
        });

        $.lightJokerPageScope.customInitEdit();
    });




})