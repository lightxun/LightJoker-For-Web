//绑定角色
function BindRoleInfo(element, options) {
    var defaults = {
        placeholder: '请选择角色 .',
        params: {
            DataBase: 'LightJokerDB',
            TableDal: 'LJ00106Dal',
            ACT: MOD.GET
        },
        key: 'ROLENAME',
        value: 'ID',
        allowClear: false
    }
    $.extend(true, defaults, options);

    return $.lightLib.select.bind(element, defaults);
}

// 绑定人员
function BindUserInfo(element, options) {
    var defaults = {
        placeholder: '请选择人员 .',
        params: {
            DataBase: 'LightJokerDB',
            TableDal: 'LJ00101Dal',
            ACT: MOD.GET
        },
        key: 'USERNAME',
        value: 'ID'
    };
    $.extend(true, defaults, options);

    return $.lightLib.select.bind(element, defaults);
}

// 绑定班次
function BindClassesInfo(element, options) {
    var defaults = {
        placeholder: '请选择班次 .',
        params: {
            DataBase: 'LightJokerDB',
            TableDal: 'LJ00102Dal',
            ACT: MOD.GET
        },
        key: 'CLASSESNAME',
        value: 'ID',
        allowClear: false
    }
    $.extend(true, defaults, options);

    return $.lightLib.select.bind(element, defaults);
}

// 绑定调拨单信息
function BindRequisitionInfo(element, options) {
    var defaults = {
        placeholder: '请选择调拨单 .',
        params: {
            DataBase: 'LightJokerDB',
            TableDal: 'LJ00201Dal',
            ACT: MOD.GET,
            Order_By: 'REQUISITIONCODE desc'
        },
        key: 'REQUISITIONCODE',
        value: 'DATAGUID'
    }
    $.extend(true, defaults, options);

    return $.lightLib.select.bind(element, defaults);
}

// 绑定调拨单车辆
function BindRequisitionCarInfo(element, options) {
    var defaults = {
        placeholder: '请选择调拨单车辆 .',
        params: {
            DataBase: 'LightJokerDB',
            TableDal: 'LJ00202Dal',
            ACT: MOD.GET,
            CD_LJ00201_DATAGUID: ''
        },
        key: 'PLATENUM',
        value: 'ID'
    }
    $.extend(true, defaults, options);

    return $.lightLib.select.bind(element, defaults);
}

// 绑定系统信息
function BindSystemInfo(element, options) {
    var defaults = {
        params: {
            DataBase: 'LightJokerDB',
            TableDal: 'LJ00001Dal',
            ACT: MOD.GET,
            ParentCode: options.ParentCode
        }
    }
    $.extend(true, defaults, options);

    return $.lightLib.select.bind(element, defaults);
}

// 绑定系统对象 - 类型 
function BindSystemInfo_Type(element, options) {
    var defaults = {
        placeholder: '对象类型',
        ParentCode: SYSTEM.INFOCODE.ROOT + SQL.OPERATION.EQUAL,
        key: 'INFONAME',
        value: 'INFOCODE'
    }
    $.extend(true, defaults, options);

    return BindSystemInfo(element, defaults);
}

// 绑定系统对象 - 调拨单设置
function BindSystemInfo_Requisition(element, options) {
    var defaults = {
        placeholder: '信息项类型',
        ParentCode: SYSTEM.INFOCODE.DBDSZ + SQL.OPERATION.EQUAL,
        key: 'INFONAME',
        value: 'INFOCODE'
    }
    $.extend(true, defaults, options);

    return BindSystemInfo(element, defaults);
}


// 绑定调拨单设置 - 类型
function BindRequisitionSet_Type(element, options) {
    var defaults = {
        placeholder: '调拨单类型',
        ParentCode: SYSTEM.INFOCODE.DBDSZ_DBDLX + SQL.OPERATION.EQUAL,
        key: 'INFONAME',
        value: 'ID'
    }
    $.extend(true, defaults, options);

    return BindSystemInfo(element, defaults);
}

// 绑定调拨单设置 - 产品
function BindRequisitionSet_Product(element, options) {
    var defaults = {
        placeholder: '产品名称',
        ParentCode: SYSTEM.INFOCODE.DBDSZ_CPMC + SQL.OPERATION.EQUAL,
        key: 'INFONAME',
        value: 'ID'
    }
    $.extend(true, defaults, options);

    return BindSystemInfo(element, defaults);
}

// 绑定调拨单设置 - 销售类型
function BindRequisitionSet_TransportType(element, options) {
    var defaults = {
        placeholder: '运输类型',
        ParentCode: SYSTEM.INFOCODE.DBDSZ_YSLX + SQL.OPERATION.EQUAL,
        key: 'INFONAME',
        value: 'ID'
    }
    $.extend(true, defaults, options);

    return BindSystemInfo(element, defaults);
}

// 绑定调拨单设置 - 单位
function BindRequisitionSet_Company(element, options) {
    var defaults = {
        placeholder: '单位名称',
        ParentCode: SYSTEM.INFOCODE.DBDSZ_DWMC + SQL.OPERATION.EQUAL,
        key: 'INFONAME',
        value: 'ID'
    }
    $.extend(true, defaults, options);

    return BindSystemInfo(element, defaults);
}

// 绑定调拨单设置 - 发货地点
function BindRequisitionSet_DeliveryPlace(element, options) {
    var defaults = {
        placeholder: '发货地点',
        ParentCode: SYSTEM.INFOCODE.DBDSZ_FHDD + SQL.OPERATION.EQUAL,
        key: 'INFONAME',
        value: 'ID'
    }
    $.extend(true, defaults, options);

    return BindSystemInfo(element, defaults);
}

// 绑定调拨单设置 - 收货人
function BindRequisitionSet_Receiver(element, options) {
    var defaults = {
        placeholder: '收货人',
        ParentCode: SYSTEM.INFOCODE.DBDSZ_SHR + SQL.OPERATION.EQUAL,
        key: 'INFONAME',
        value: 'ID'
    }
    $.extend(true, defaults, options);

    return BindSystemInfo(element, defaults);
}

// 绑定调拨单设置 - 合同编号
function BindRequisitionSet_Contract(element, options) {
    var defaults = {
        placeholder: '合同编号',
        ParentCode: SYSTEM.INFOCODE.DBDSZ_HTBH + SQL.OPERATION.EQUAL,
        key: 'INFONAME',
        value: 'INFONAME'
    }
    $.extend(true, defaults, options);

    return BindSystemInfo(element, defaults);
}

// 绑定调拨单设置 - 常用车辆
function BindRequisitionSet_Car(element, options) {
    var defaults = {
        placeholder: '常用车辆',
        ParentCode: SYSTEM.INFOCODE.DBDSZ_CYCL + SQL.OPERATION.EQUAL,
        key: 'INFONAME',
        value: 'INFONAME'
    }
    $.extend(true, defaults, options);

    return BindSystemInfo(element, defaults);
}

// 绑定系统字典 - 矿堆名称
function BindSysDict_Stock(element, options) {
    var defaults = {
        placeholder: '矿堆名称',
        ParentCode: SYSTEM.INFOCODE.XTZD_KDMC + SQL.OPERATION.EQUAL,
        key: 'INFONAME',
        value: 'ID'
    }
    $.extend(true, defaults, options);

    return BindSystemInfo(element, defaults);
}