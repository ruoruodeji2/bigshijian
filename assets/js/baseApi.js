var baseurl = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (options) {
    console.log(options);
    options.url = `${baseurl}${options.url}`
})