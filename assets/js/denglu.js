$(function () {
    $('#qu_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#qu_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // const{form}=layui 通过解构也可以获得form
    //也可以const{form:form1} = layui 这样下面就可以写form1.verify form1是个别名
    // var form = layui.form
    //layui内部有form 和layer属性所以可以通过解构获得
    const { form, layer } = layui
    // console.log(layui);
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            //获取密码框输入的值
            var val = $('.reg-box [name=password]').val()
            if (val !== value) {
                return '两次输入密码不正确'
            }
        }
    })
    //监听注册表单的post事件
    $('#form_reg').on('submit', function (e) {
        //阻止默认提交
        e.preventDefault()
        $.post(
            '/api/reguser',
            {
                username: $('.reg-box [name="username"]').val(),
                password: $('.reg-box [name="password"]').val()
            },
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message || '注册失败');
                }
                layer.msg('注册成功');
                $('#qu_login').click()
            }
        )
    })
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    layer.msg(res.message || '登陆失败')
                    return
                }
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                //当登录成功是跳转到主页面
                location.href = '/houtai.html'
            }
        })
    })
})