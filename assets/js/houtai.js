$(function () {
    getUsearinfo()
    var layer = layui.layer
    $('#logout').on('click', function () {
        layer.confirm('你确定要退出吗', { icon: 3, title: '提示' }, function (index) {
            //第一步清除localStorage中储存的token
            localStorage.removeItem('token')
            //第二步回到登陆页面
            location.href = '/denglu.html'
            //第三步关闭弹窗
            layer.close(index);
        });
        //eg2

    })
})
function getUsearinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //因为一开始是localStorage.setItem存进浏览器所以用localStorage.getItem取出来如果没有就取出空字符串
        //直接将hearder请求头统一写到baseApi.js中

        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message || '获取用户信息失败')
            }
            //将res.data里面的内容当做参数放入渲染头像函数中
            xrtouxiang(res.data)
            //打印的res.data是data: {id: 16543, username: "牛子", nickname: "", email: "", user_pic: null}
        },
        // complete是不管ajax请求是否成功都会执行
        //也直接放在挂载函数 baseApi.js里面
    })
}
function xrtouxiang(user) {
    var name = user.nickname || user.username
    $('.welcome').html(`欢迎你  ${name}`)
    if (user.user_pic !== null) {
        //attr是获取自带元素的 获取src 将数值改成user里面的user_pic并且显示
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        //提取出名字name中的第一个字符 并且转为大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}