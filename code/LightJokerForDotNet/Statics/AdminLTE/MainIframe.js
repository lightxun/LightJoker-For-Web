var arg_Obj_sessionTimer = {};
var arg_Obj_nthTabs;

var signalRObj = null;

$(function () {

    // 局部变量
    var _$titleUserName = $('#TitleUserName');
    var _$mainNthTabs = $('#main-nth-tabs');
    var _$mainNthTabsContent = $('#main-nth-tabs-content');
    var _$pageRefresh = $('#pageRefresh');
    var _$btnLogout = $('#btnLogout');
    var _$btnChangePWD = $('#btnChangePWD');

    // 存入session展示样式
    sessionStorage.setItem(WEBSTYLE.EDITSHOW.KEY, WEBSTYLE.EDITSHOW.MODAL);    
    
    // 加载用户名
    _$titleUserName.text(sessionStorage.getItem(SESSION.USERNAME));

    //清除已有sessionTimer
    if (arg_Obj_sessionTimer)
        window.clearInterval(arg_Obj_sessionTimer);

    //加载session
    //checkSession()
    //定时检查session 1分钟一次
    //arg_Obj_sessionTimer = window.setInterval(checkSession, 1000 * 60 * 10);

    // 初始化tabs控件
    arg_Obj_nthTabs = _$mainNthTabs.nthTabs({
        tabContentId: '#main-nth-tabs-content'
    });

    //刷新按钮
    _$pageRefresh.click(function () {
        var _iframe = _$mainNthTabsContent.find('.tab-pane.active iframe');
        $(_iframe).attr('src', $(_iframe).attr('src'));
    });


    //注销
    _$btnLogout.click(function () {
        $.lightLib.confirm({
            content: '您需要注销本次登录吗 ?',
            btnOkEvent: function () {
                logout();
            }
        });
    });

    //修改密码
    _$btnChangePWD.click(function () {
        $.lightLib.prompt.password({
            title: '请输入新密码 ',
            btnOkEvent: function (value, index, elem) {
                var result = false;

                $.lightLib.ajax({
                    async: false,
                    url: URL.BASE,
                    data: {
                        DataBase: SYSTEM.DATABASE,
                        TableDal: 'LJ00101Dal',
                        ACT: MOD.UPDATE,
                        ID: sessionStorage.getItem(SESSION.USERDATAID),
                        UserPWD: value
                    },
                    success: function (pwdData) {
                        if (pwdData.Sign == SIGN.SUCCESS){
                            $.lightLib.messager.success({ content: '修改成功 .' });
                            result = true;
                        }                            
                        else
                            $.lightLib.messager.error({ content: pwdData.Msg });
                    }
                });

                return true;
            }
        });
    });

    //加载主页
    setTimeout(function () {
        addTab({
            id: 'nth-tab-002002',
            title: '主页',
            url: 'StandardView.html?path=ComingSoon.html',
            active: true,
            allowClose: false
        });
    }, 1500);

    //加载通知
    $.lightLib.notice.info({
        title: '通知',
        text: '欢迎访问本系统.'
    });

    // 加载菜单
    //loadMenu();
    // 加载SignalR
    //loadSignalR();
});

function addTab(option) {
    var _default = {
        id: '',
        title: '',
        url: '',
        //content: '',
        active: true,
        allowClose: true
    }
    $.extend(true, _default, option);
    arg_Obj_nthTabs.addTab(_default);
}

// 加载菜单
function loadMenu() {
    $.lightLib.ajax({
        url: URL.BASE,
        data: {
            ACT: MOD.GETOTHERVIEW,
            ViewName: 'VLJ00107_A',
            DataBase: SYSTEM.DATABASE,
            TableDal: 'LJ00107Dal',
            CD_LJ00101_ID: sessionStorage.getItem(SESSION.USERDATAID) + SQL.OPERATION.EQUAL,
            Order_By: 'ParentMenuCode, MenuViewOrder'  // 排序保证父节点在前端
        },
        success: function (sData) {
            if (sData.Sign == SIGN.FAILD) {
                $.lightLib.messager.error({ content: sData.Msg });
                return;
            }

            initMenu(sData.Data.rows);
        }
    });
}

// 初始化菜单
function initMenu(data) {
    function _menuNode(){
        return {
            menuCode: '',
            menuPath: '',
            menuIcon: '',
            menuName: '',
            children: []
        }
    }

    var _arr_menuNode = new Array();
    var _arr_missNode = new Array();
    _loopMenuNode(
        data,
        function (node) {

        },
        function (node) {
        _arr_missNode.push(node);
    });
    while (true) {
        if (_arr_missNode.length > 0)
            _loopMenuNode(
                _arr_missNode,
                function (node) {
                    _arr_missNode.pop(node);
                },
                function (node) {

                });
        else
            break;
    }

    $.each(_arr_menuNode, function (mIndex, mObj) {
        $('.sidebar-menu').append(_makeupMenuNode(mObj));
    });

    //点击菜单切换内容
    $('.sidebar-menu li a[menucode]').on('click', function () {
        var _menucode = $(this).attr('menucode');
        jumpMenu(_menucode);
    });

    function _loopMenuNode(data, eSuccess, eFaild) {
        $.each(data, function (mIndex, mObj) {
            if (_dealMenuNode(mObj))
                eSuccess(mObj);
            else
                eFaild(mObj);

        });
    }

    function _dealMenuNode(mNode) {
        var _res = false;
        var _node = _findParentNode(_arr_menuNode, mNode.PARENTMENUCODE);
        if (_node == null && mNode.PARENTMENUCODE == SYSTEM.INFOCODE.GNCD) {
            _node = new _menuNode();
            _node.menuCode = mNode.MENUCODE;
            _node.menuPath = mNode.MENUPATH;
            _node.menuIcon = mNode.MENUICON;
            _node.menuName = mNode.MENUNAME;

            _arr_menuNode.push(_node);
            _res = true;
        } else if (_node != null) {
            var _subNode = new _menuNode();
            _subNode.menuCode = mNode.MENUCODE;
            _subNode.menuPath = mNode.MENUPATH;
            _subNode.menuIcon = mNode.MENUICON;
            _subNode.menuName = mNode.MENUNAME;

            _node.children.push(_subNode);
            _res = true;
        }
        return _res;
    }

    function _findParentNode(src, parentMenuCode) {
        var _res = null;
        $.each(src, function (sIndex, sObj) {
            if (sObj.menuCode == parentMenuCode) {
                _res = sObj;
                return false;
            }
            if (sObj.children.length > 0) {
                _res = _findParentNode(sObj.children, parentMenuCode);
                if (_res != null)
                    return false;
            }
        });
        return _res;
    }

    function _makeupMenuNode(node) {
        var _class_treeview = '';
        if (node.children.length > 0) {
            _class_treeview = 'treeview';
        }
        var _class_icon = '';
        if (isNull(node.menuIcon)) {
            _class_icon = 'fa fa-circle-o';
        }

        var _li = '<li class="' + _class_treeview + '">';
        _li += '<a href="javascript:;" ref="' + node.menuPath + '" menuCode="' + node.menuCode + '">';
        _li += '<i class="' + _class_icon + '"></i> <span>' + node.menuName + '</span>';

        if (node.children.length > 0) {
            _li += '<span class="pull-right-container">';
            _li += '<i class="fa fa-angle-left pull-right"></i>';
            _li += '</span>';
        }

        _li += '</a>';

        if (node.children.length > 0) {
            _li += '<ul class="treeview-menu">';

            $.each(node.children, function (cIndex, cObj) {
                _li += _makeupMenuNode(cObj);
            })

            _li += '</ul>';
        }

        _li += '</li>';

        return _li;
    }
}

// 跳转菜单
function jumpMenu(menucode) {
    var $this = $('a[menucode="' + menucode + '"]');

    var _menucode = $this.attr('menucode');
    var _url = $this.attr('ref');

    //若为空则不加载
    if (isNull(_url))
        return;

    $('.sidebar-menu li a.active').removeClass('active');
    $this.addClass('active');

    var _text = $this.text();
    var _code = $this.attr('menuCode');
    var _id = 'nth-tab-' + _code;

    // 判断卡片是否已经存在
    if(arg_Obj_nthTabs.isExistsTab(_id)){
        arg_Obj_nthTabs.toggleTab(_id);
        return;
    }

    // 新建选项卡
    arg_Obj_nthTabs.addTab({
        id: _id,
        title: _text,
        url: _url,
        //content: '这是首页',
        active: true,
        allowClose: true,
        location: true,
        fadeIn: true
    });

}

//检查session
function checkSession() {
    // 如果sessionStorage没有, 则直接重新登录

     $.lightLib.ajax({
         url: URL.LJ,
         data: {
             ACT: 'CheckSession'
         },
         success: function (result) {
             if (result.Sign == SIGN.FAILD) {
                 $.lightLib.alert.warning({
                     title: '警告',
                     content: '会话已失效, 请重新登录 .',
                     btnOkEvent: function () {
                         return logout();
                     }
                 });
             } else {
                 if (isNull(sessionStorage.getItem(SESSION.USERCODE))) {
                     sessionStorage.setItem(SESSION.USERCODE, result.Data.Val.USERCODE);
                     sessionStorage.setItem(SESSION.USERNAME, result.Data.Val.USERNAME);
                     sessionStorage.setItem(SESSION.USERDATAID, result.Data.Val.ID);

                 }else if (result.Data.Val.UserCode != sessionStorage.getItem(SESSION.USERCODE)) {
                     $.lightLib.alert.warning({
                         title: '警告',
                         content: '您已登录了其他账号, 请重新登录 .',
                         btnOkEvent: function () {
                             return logout();
                         }
                     });
                 }
             }
         }
     });
}

//注销
function logout() {
    var res = false;

    $.lightLib.ajax({
        async: false,
         url: URL.LJ,
         data: {
             ACT: 'Logout'
         },
         success: function (result) {
             if (result.Sign == SIGN.SUCCESS) {
                 sessionStorage.clear();
                
                 res = true;
             } else {
                 $.lightLib.messager.error({ content: result.Msg });
             }
         }
     });
     location.href = 'Login.html';
     return res;
}

// 加载 signalR
function loadSignalR() {
    signalRObj = $('#SignalRObj');
    
    //return;

    $.getScript(URL.SIGNALR, function () {
        $.connection.hub.url = URL.SIGNALR;

        // 获取hub, 定义 hub 方法
        var _supplySellMeteringHub = $.connection.supplySellMeteringHub;
        _supplySellMeteringHub.client.dataRefresh_ForCar = function (signalRResult) {

            signalRObj.trigger(SIGNALR.SUPPLYSELL.FORCAR, dealSignalRResult(signalRResult));
        }
        var _produceMeteringHub = $.connection.produceMeteringHub;
        _produceMeteringHub.client.dataRefresh_For3055 = function (signalRResult) {
            signalRObj.trigger(SIGNALR.PRODUCE.FOR3055, dealSignalRResult(signalRResult));
        }
        _produceMeteringHub.client.dataRefresh_ForDrawhole = function (signalRResult) {
            signalRObj.trigger(SIGNALR.PRODUCE.FORDRAWHOLE, dealSignalRResult(signalRResult));
        }

        // 启动hub
        $.connection.hub.start().done(function () {
            _supplySellMeteringHub.server.regist();
            _produceMeteringHub.server.regist();
        });
    }).fail(function (jqxhr, settings, exception) {
        console.log('获取 SignalR Hub 失败 .');

    });

    function dealSignalRResult(json) {
        var result = null;

        try {
            result = eval('(' + json + ')');
        }
        catch (err) {
            $.lightLib.messager.error({ content: err });

            result = {
                Sign: SIGN.FAILD,
                Msg: err,
                Data: err
            }
        }

        return result;
    }
}