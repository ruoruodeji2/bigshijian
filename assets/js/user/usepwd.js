$(function () {
    const { form, layer } = layui
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samepwd: (value) => {
            if (value === $('input[name = oldpwd]').val()) {
                return '新旧密码不能一样'
            }
        },
        repwd: (value) => {
            if (value !== $('input[name = newpwd]').val()) {
                return '两次输入的密码不一致'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(), //获取form表单中的内容
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('重置密码失败')
                }
                layer.msg('重置密码成功')
                //通过[0]的方法获得原生form表单元素再用reset()方法重置form表单
                $('.layui-form')[0].reset()
            }

        })
    })

})