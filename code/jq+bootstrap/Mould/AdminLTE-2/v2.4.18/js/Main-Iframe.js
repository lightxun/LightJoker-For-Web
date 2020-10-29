//# sourceURL=Main-Iframe.js

$(function(){
    $.lightJokerLib.plugin.fixSrc = '../../';

    globalInit(function(){

        // 页面扩展
        $.extend($.lightJokerPageScope, {

            signalRObj : null,
            signalREvent : {
                realTime: function (result){ console.log(result) }
            },
            sessionTimer: null,
            nthTabs: null,
            speechSwitch: false,
            infoPrompt: null,

            titleUserName: $('.titleUserName'),
            mainNthTabs: $('#main-nth-tabs'),
            mainNthTabsContent: $('#main-nth-tabs-content'),

            btnPageRefresh: $('#btnPageRefresh'),
            btnSpeech: $('#btnSpeech'),
            btnLogout: $('#btnLogout'),
            btnChangePWD: $('#btnChangePWD'),

            init: function(){
                var that = this;

                // 基本设置
                if($.lightJokerLib.storage.getItem(LIGHTJOKERCONST_WEBSETTING.TYPE, LIGHTJOKERCONST_WEBSETTING.EDITSHOW.KEY)){
                    $.lightJokerLib.storage.setItem(LIGHTJOKERCONST_WEBSETTING.TYPE, LIGHTJOKERCONST_WEBSETTING.EDITSHOW.KEY, LIGHTJOKERCONST_WEBSETTING.EDITSHOW.DIV);
                }
                if(isNull($.lightJokerLib.storage.getItem(LIGHTJOKERCONST_WEBSETTING.TYPE, LIGHTJOKERCONST_WEBSETTING.SPEECHSWITCH))){
                    $.lightJokerLib.storage.setItem(LIGHTJOKERCONST_WEBSETTING.TYPE, LIGHTJOKERCONST_WEBSETTING.SPEECHSWITCH, that.speechSwitch);
                }
                else{
                    // 如果已存在设置, 则设置为对立面, 这样在后面加载时, 会自动更正过来
                    that.speechSwitch = !$.lightJokerLib.storage.getItem(LIGHTJOKERCONST_WEBSETTING.TYPE, LIGHTJOKERCONST_WEBSETTING.SPEECHSWITCH);
                }
                // 加载用户名
                that.titleUserName.html($.lightJokerLib.storage.getItem(LIGHTJOKERCONST_SESSION.TYPE, LIGHTJOKERCONST_SESSION.USERNAME));
                // 启动定时检查 session
                if(that.sessionTimer){
                    window.clearInterval(that.sessionTimer);
                }
                // 检查 session
                that.checkSession();
                // 定时检查 session
                that.sessionTimer = window.setInterval(that.checkSession, 1000 * 60 * 10);
                // 初始化 tabs 控件
                that.nthTabs = that.mainNthTabs.nthTabs({ tabContentId: '#main-nth-tabs-content' });
                // 绑定刷新按钮事件
                that.btnPageRefresh.bind('click', function(){
                    var iframe = $(that.mainNthTabsContent.find('.tab-pane.active iframe'));
                    iframe.attr('src', iframe.attr('src'));
                })
                // 声音按钮
                that.loadSpeechSwitch();
                that.btnSpeech.bind('click', function(){
                    that.loadSpeechSwitch();
                });
                // 注销
                that.btnLogout.bind('click', function(){
                    $.lightJokerLib.confirm.show({
                        content: '您需要注销本次登录吗 ?',
                        btnOkEvent: function(){
                            that.logout();
                        }
                    })
                })
                // 修改密码
                that.btnChangePWD.bind('click', function(){
                    $.lightJokerLib.prompt.password({
                        title: '请输入新密码 .',
                        btnOkEvent: function(value, index, element){
                            var result = false;

                            $.lightJokerLib.ajax.post({
                                async: false,
                                url: LIGHTJOKERCONST_URL.SERVICE,
                                data: {
                                    DataBase: LIGHTJOKERCONST_SYSTEM.DATABASE,
                                    TableDal: 'QX00001Dal',
                                    ACT: LIGHTJOKERCONST_MOD.UPDATE,
                                    ID: $.lightJokerLib.storage.getItem(LIGHTJOKERCONST_SESSION.TYPE, LIGHTJOKERCONST_SESSION.USERDATAID),
                                    USERPWD: value
                                },
                                success: function(sResult){
                                    $.lightJokerLib.messager.success({ content: '密码修改成功 .' });
                                    result = true;
                                }
                            })

                            return result;
                        }
                    })
                })
                // 加载通知
                that.loadNotice();
                // 加载菜单
                that.loadMenu();
                // 加载 SignalR
                that.loadSignalR();
                // 加载 infoPrompt
                that.loadInfoPrompt();


                //加载主页
                setTimeout(function () {
                    that.addTab({
                        id: 'nth-tab-001002',
                        title: '主页',
                        url: 'Standard/View.html?path=Home.html',
                        active: true,
                        allowClose: false
                    });
                    that.addTab({
                        id: 'nth-tab-001003',
                        title: '主页3',
                        url: 'Standard/View.html?path=Home.html',
                        active: false,
                        allowClose: true
                    });
                }, 100);
            },
            checkSession: function(){
                var that = this;
                $.lightJokerLib.ajax.post({
                    isFilter: false,
                    url: LIGHTJOKERCONST_URL.SERVICE,
                    data: {
                        ACT: 'CheckSession'
                    },
                    success: function(result){
                        if(result.Sign === LIGHTJOKERCONST_SIGN.FAILD){
                            $.lightJokerLib.alert.warning({
                                content: '您的会话已失效, 请重新登录 .',
                                btnOkEvent: function(){
                                    return that.logout();
                                }
                            })
                        }
                        else{
                            if(isNull($.lightJokerLib.storage.getItem(LIGHTJOKERCONST_SESSION.TYPE, LIGHTJOKERCONST_SESSION.USERCODE))){
                                $.lightJokerLib.storage.setItem(LIGHTJOKERCONST_SESSION.TYPE, LIGHTJOKERCONST_SESSION.USERCODE, result.Data.Val.USERCODE);
                                $.lightJokerLib.storage.setItem(LIGHTJOKERCONST_SESSION.TYPE, LIGHTJOKERCONST_SESSION.USERNAME, result.Data.Val.USERNAME);
                                $.lightJokerLib.storage.setItem(LIGHTJOKERCONST_SESSION.TYPE, LIGHTJOKERCONST_SESSION.USERDATAID, result.Data.Val.ID);
                            }
                            else{
                                $.lightJokerLib.alert.warning({
                                    content: '您已登录了其他账号, 请重新登录 .',
                                    btnOkEvent: function(){
                                        return that.logout();
                                    }
                                })
                            }
                        }
                    }
                })
            },
            loadNotice: function(){
                // TODO: 实现加载通知
                console.warn(' 未实现加载通知 ');
            },
            loadMenu: function(){
                var that = this;
                $.lightJokerLib.ajax.post({
                    url: LIGHTJOKERCONST_URL.SERVICE,
                    data: {
                        ACT: LIGHTJOKERCONST_MOD.GETOTHERVIEW,
                        ViewName: 'VXT00003_A',
                        DataBase: LIGHTJOKERCONST_SYSTEM.DATABASE,
                        TableDal: 'XT00003Dal',
                        FK_QX00001_ID: $.lightJokerLib.storage.getItem(LIGHTJOKERCONST_SESSION.TYPE, LIGHTJOKERCONST_SESSION.USERDATAID) + LIGHTJOKERCONST_MOD.EQUAL,
                        OrderBy: 'PARENTMENUCODE, MENUVIEWORDER'
                    },
                    success: function(sResult){
                        that.initMenu(sResult.Data.rows);
                    }
                })
            },
            loadSignalR: function(){
                // TODO: 实现加载 SignalR
                console.warn(' 未实现加载 SignalR ');
            },
            loadInfoPrompt: function(){
                // TODO: 实现加载 InfoPrompt
                console.warn(' 未实现加载 InfoPrompt ');
            },
            logout: function(){
                var result = false;
                $.lightJokerLib.ajax.post({
                    async: false,
                    url: LIGHTJOKERCONST_URL.SERVICE,
                    data: {
                        ACT: 'Logout'
                    },
                    success: function(sResult){
                        $.lightJokerLib.storage.clearSession();
                        result = true;
                    }
                });
                location.href = 'Login.html'
                return result;
            },
            loadSpeechSwitch: function(){
                var that = this;

                if (that.speechSwitch) {
                    $.lightJokerLib.messager.info({ content: '语音播报关闭.' });
                    that.btnSpeech.find('i').removeClass('fa-volume-up');
                    that.btnSpeech.find('i').addClass('fa-volume-off');

                    that.speechSwitch = false;
                    $.lightJokerLib.storage.setItem(LIGHTJOKERCONST_WEBSETTING.TYPE, LIGHTJOKERCONST_WEBSETTING.SPEECHSWITCH, that.speechSwitch);
                }
                else {
                    that.speechSwitch = true;
                    $.lightJokerLib.storage.setItem(LIGHTJOKERCONST_WEBSETTING.TYPE, LIGHTJOKERCONST_WEBSETTING.SPEECHSWITCH, that.speechSwitch);

                    $.lightJokerLib.messager.info({ content: '语音播报启用.' });
                    that.btnSpeech.find('i').removeClass('fa-volume-off');
                    that.btnSpeech.find('i').addClass('fa-volume-up');
                }
            },
            addTab(options){
                var that = this;
                var defaults = $.extend(true, {
                    id: '',
                    title: '',
                    url: '',
                    active: true,
                    allowClose: true
                }, options);

                that.nthTabs.addTab(defaults);
            },
            initMenu: function(){
                var that = this;

                function _menuNode(){
                    return {
                        menuCode: '',
                        menuPath: '',
                        menuIcon: '',
                        menuName: '',
                        menuCmd:'',
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
                    that.jumpMenu(_menucode);
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
            },
            jumpMenu: function(menucode){
                var that = this;

                var menu = $('a[menucode="' + menucode + '"]');

                var _url = menu.attr('ref');

                //若为空则不加载
                if (isNull(_url))
                    return;

                $('.sidebar-menu li a.active').removeClass('active');
                menu.addClass('active');

                var _text = menu.text();
                var _code = menu.attr('menuCode');
                var _id = 'nth-tab-' + _code;

                // 判断卡片是否已经存在
                if(that.nthTabs.isExistsTab(_id)){
                    that.nthTabs.toggleTab(_id);
                    return;
                }

                // 新建选项卡
                that.nthTabs.addTab({
                    id: _id,
                    title: _text,
                    url: _url + '&menucode=' + _code + '&r=' + Math.random(),
                    //content: '这是首页',
                    active: true,
                    allowClose: true,
                    location: true,
                    fadeIn: true
                });
            }
        });

        // 初始化
        $.lightJokerPageScope.init();
    });
})