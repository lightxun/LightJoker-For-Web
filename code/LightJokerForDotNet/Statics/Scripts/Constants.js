/**
 * Created by Light on 2017-05-25.
 */
//志鸟高飞且收翼, 身翔云空心在沉.
window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)',
    deep_green: '#006666',
    deep_blue:'#006699',
    deep_red:'#993333',
    light_blue:'#0099CC',
    light_green:'#339966',
    light_red:'#996666'
};

window.randomScalingFactor = function () {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

window.WEBSTYLE = {
    EDITSHOW: {
        KEY: 'editShow',
        MODAL: 'modal',
        DIV: 'div'
    }
}

window.SIGNALR = {

}

window.SIGN = {
    FAILD: '0',
    SUCCESS: '1',
    REPEAT: '2',
    CONFLICT: '3'
}

window.MOD = {
    ACT : 'ACT',
    COPY : 'COPY',
    CREATE : 'C',
    DELETE : 'D',
    UPDATE : 'U',
    READ: 'R',
    QUERY : 'Q',
    QUERYVIEW: "QV",
    QUERYOTHERVIEW: 'QOV',
    GET : 'G',
    GETVIEW: 'GV',
    GETOTHERVIEW: 'GOV',
    DELSEL : 'DS',
    PROC : 'P',
    PROCQ : "PQ",
    PROCQ_FOOT : "PQF",
    //MOD_PROCQ_FOOT_COL
    //MOD_PROCQ_FOOT_DATA
    //ProcName
    VALIDATE_AND : "VA",
    VALIDATE_OR : "VO",
    EXPORT_XLS: "EXP_XLS",
    EXPORT_PROCQ_XLS: 'EXP_PQ_XLS',
    EXPORT_PROCQ_FOOT_XLS: 'EXP_PQF_XLS'
}

window.SESSION = {
    USERNAME : 'UserName',
    USERCODE: 'UserCode',
    USERDATAID: 'UserDataID'
}

window.URL = {
    BASE: 'http://127.0.0.1:20000/lightApi/Common/ProcessRequest',
    LJ: 'http://127.0.0.1:20000/LJ/',
    //BASE: '../../Controllers/CommonController.ashx',
    //LJ: '../../Controllers/LJController.ashx',
    //SIGNALR: 'http://10.2.10.133:20000/lightSignalR/hubs'
    SIGNALR: 'http://127.0.0.1:20000/lightSignalR/hubs'
}

window.CONST = {
    NUMBER_MASK: '#,##0.00'
}

window.SYSTEM = {
    DATABASE: 'LightJokerDB'
}

window.SQL = {
    OPERATION: {
        EQUAL: '[Equal'
    },
    LINK: {
        OR: ']Or'
    }
}

window.DATATABLE = {
    COLOR: {
        GRAY: 'active',
        GREEN: 'success',
        BLUE: 'info',
        YELLOW: 'warning',
        RED: 'danger'
    }
}