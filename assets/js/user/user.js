$(function () {
    const { form, layer } = layui
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()
    //获取用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('获取用户信息失败！')
                    return
                }

                form.val('formUserInfo', res.data)
                console.log(res);
            }
        })
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').on('submit', function (e) {
        //第一步取消默认提交
        e.preventDefault()
        //开启ajax post 函数
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            //这里的$(this)就是指layui-form表单运用serialize根据name属性快速获取表单元素
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message || '更新失败');
                }
                layer.msg('更新用户信息成功')
                //在子页面可以用window.parent.函数名来调用父页面里面的函数
                window.parent.getUsearinfo()
            }
        })
    })
})  