"use strict";
// 不足 10 自动补 0
function format(num = 0) {
    return String(num).padStart(2, '0');
}
function type3(t) {
    let nowTime = new Date().getTime(), time = new Date(t).getTime();
    if (nowTime - time < 60 * 1000) {
        return `${Math.floor((nowTime - time) / (1000))} 秒前`;
    }
    else if (nowTime - time < 60 * 60 * 1000) {
        return `${Math.floor((nowTime - time) / (60 * 1000))} 分钟前`;
    }
    else if (nowTime - time < 24 * 60 * 60 * 1000) {
        return `${Math.floor((nowTime - time) / (60 * 60 * 1000))} 小时前`;
    }
    else if (nowTime - time < 7 * 24 * 60 * 60 * 1000) {
        return `${Math.floor((nowTime - time) / (24 * 60 * 60 * 1000))} 天前`;
    }
    else if (new Date().getFullYear() === new Date(t).getFullYear()) {
        return `${format(new Date(t).getMonth() + 1)}月${format(new Date(t).getDate())}日`;
    }
    else {
        return `${new Date(t).getFullYear()}-${format(new Date(t).getMonth() + 1)}-${format(new Date(t).getDate())}`;
    }
}
const formatTime = (time, type = '1') => {
    let str = '';
    switch (type) {
        // yyyy-mm-dd hh:MM:ss
        case '1':
            time = new Date(time);
            str = `${time.getFullYear()}-${format(time.getMonth() + 1)}-${format(time.getDate())} ${format(time.getHours())}:${format(time.getMinutes())}:${format(time.getSeconds())}`;
            break;
        // yyyy-mm-dd
        case '2':
            let date = new Date(time);
            str = `${time.getFullYear()}-${format(time.getMonth() + 1)}-${format(time.getDate())}`;
            break;
        // 倒计时
        case '3':
            str = type3(time);
            break;
        default:
            break;
    }
    return str;
};
module.exports = {
    formatTime: formatTime
};
//# sourceMappingURL=util.js.map