var baseurl = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (options) {
    console.log(options);
    options.url = `${baseurl}${options.url}`

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            //因为一开始是localStorage.setItem存进浏览器所以用localStorage.getItem取出来如果没有就取出空字符串
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        if (
            res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'
        ) {
            //第一步清除token
            localStorage.removeItem('token')
            //第二步强制跳回到登陆界面
            location.href = '/denglu.html'
        }
    }
})