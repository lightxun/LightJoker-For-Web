;(function(){
    // 此处的 this： 指 window
    var pluginName = 'lightJokerDataForm';

    // lightJokerDataForm - 构造方法
    function lightJokerDataForm(element, options){
        // 此处 this：指 lightJokerDataForm 对象
        var that = this;

        // 放在构造函数中的属性, 都是属于每一个实例单独拥有

        that.init(element, options);
    };
    //  lightJokerDataForm - 默认设置
    lightJokerDataForm.defaults = {
        type_input: ['date', 'datetime-local', 'text', 'email', 'number', 'tel', 'password', 'hidden', 'file'],
        type_tag: ['select', 'textarea'],
        plugin: {
            bootstrapValidator: 'bootstrapValidator'
        }
    };
    //  lightJokerDataForm - 原型
    lightJokerDataForm.prototype = {
        constructor: lightJokerDataForm,
        version: 'v1.0.0',
        init: function(element, options){
            // 此处 this：指 lightJokerDataForm 对象及原型
            var that = this;
            // 初始化需要做的事情
            that.element = element;
            that.elementObj = $(element);
            $.lightJokerLib.initPlugin({
                pluginType: LIGHTJOKERCONST_PLUGIN.DATAFORM,
                pluginName: lightJokerDataForm.defaults.plugin.bootstrapValidator,
                srcFix: '',
                callback: function(){
                    that.api = $.lightJokerLib.bindPlugin(LIGHTJOKERCONST_PLUGIN.DATAFORM, element, options);
                }
            });
            // 取消回车提交表单
            that.elementObj.bind('keydown', function (event) {
                if (event.keyCode == 13) { return false; }
            });
            that.elementObj.data(pluginName, that);
        },
        test: function(){
            console.log(' lightJokerDataForm test ');
        },
        destroy: function(){
            console.error(' lightJokerDataForm destroy not implement ') ;
        },
        setValue: function(){
            console.error(' lightJokerDataForm setValue not implement ')
        },
        clearValue: function(){
            console.error(' lightJokerDataForm clearValue not implement ');
        },
        validate: function(options){
            var that = this;

            var defaults = $.extend(true, {
                fields: [],
                validateEvent: function(){ return true; }
            }, options);

            return $.lightJokerLib.plugin[$.lightJokerLib.storage.getItem(LIGHTJOKERCONST_PLUGIN.TYPE, LIGHTJOKERCONST_PLUGIN.DATAFORM)].validate(that.element, defaults);
        },
        unique: function(){
            console.error(' lightJokerDataForm unique not implement ');
        },
        ajaxSubmit: function(){
            console.error(' lightJokerDataForm ajaxSubmit not implement ');
        },
        formSubmit: function(){
            console.error(' lightJokerDataForm formSubmit not implement ');
        },
        loadJson: function(){
            console.error(' lightJokerDataForm loadJson not implement ');
        },
        loadFormData: function(){
            console.error(' lightJokerDataForm loadFormData not implement ');
        }
    }

    // 一种对外暴露方式：var target = new lightJokerDataForm();
    //window.lightJokerDataForm = lightJokerDataForm;
    // 另一种对外暴露方式：var target = $('#elem').lightJokerDataForm();
    $.fn[pluginName] = function(options){
        var result = new Array();
        // 此处 this：指 $(element) 元素
        var that = this;
        var args = Array.prototype.slice.call(arguments, 1);
        that.each(function(index, obj){
            // 此处 this：指 $(element) 每一个元素
            var formObj = $(obj).data(pluginName);
            var formObj_options = $.extend(true, {}, lightJokerDataForm.defaults, args[0]);
            //var options = $.extend(true, {}, lightJokerDataForm.defaults, $this.data(), typeof options == 'Object' && options);

            if(!formObj)
                formObj = new lightJokerDataForm(obj, formObj_options);
            if(typeof options == 'string')
                formObj[options].apply(formObj, formObj_options);

            result.push(formObj);
        });

        if(result.length == 1)
            return result[0];
        else
            return result;
    }
})(jQuery);