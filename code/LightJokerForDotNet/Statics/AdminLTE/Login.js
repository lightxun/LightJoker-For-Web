$(function () {
    var api_form = $('#editForm').lightForm().data('plugin');

    //登录按钮点击事件
    $('#btnLogin').click(function () {
        login(api_form);
    });

    //输入用户名回车事件
    $('#UserCode').bind('keyup', function (event) {
        if (event.keyCode == "13") {
            login(api_form);
        }
    });

    //输入密码回车事件
    $('#UserPWD').bind('keyup', function (event) {
        if (event.keyCode == "13") {
            login(api_form);
        }
    });

    function login(api_form) {

        window.location.href = 'MainIframe.html?r=' + Math.random();
        return;

        if (api_form.validate())
            return;

        $('#btnLogin').attr('disabled', true);
        $('#UserID').attr('disabled', true);
        $('#UserPWD').attr('disabled', true);

        $.lightLib.ajax({
            url: URL.LJ,
            data: {
                DataBase: SYSTEM.DATABASE,
                ACT: 'Login',
                UserCode: $('#UserCode').val(),
                UserPWD: $('#UserPWD').val()
            },
            success: function (lData) {

                if (lData.Sign == SIGN.FAILD) {
                    $.lightLib.messager.error({ content: lData.Msg });
                }
                else if (lData.Sign == SIGN.CONFLICT) {
                    $.lightLib.messager.warning({ content: lData.Msg });
                }
                else {
                    var _rows = lData.Data.rows;
                    if (isNull(_rows) || _rows.length == 0) {
                        $.lightLib.messager.error({ content: lData.Msg });
                        return;
                    }

                    var $user = _rows[0];

                    sessionStorage.setItem(SESSION.USERCODE, $user.USERCODE);
                    sessionStorage.setItem(SESSION.USERNAME, $user.USERNAME);
                    sessionStorage.setItem(SESSION.USERDATAID, $user.ID);
                    
                    window.location.href = 'MainIframe.html?r=' + Math.random();
                }
            }

        });

        $('#btnLogin').attr('disabled', false);
        $('#UserCode').attr('disabled', false);
        $('#UserPWD').attr('disabled', false);
    }
});

