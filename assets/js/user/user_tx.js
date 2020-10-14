$(function () {
    const { layer } = layui
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#shangchuan').on('click', function () {
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        //e.target.files这是一个数组里面是选择的图片文件
        var txwj = e.target.files
        if (txwj.length == 0) {
            return layer.msg('请选择图片!!')
        }
        //选出所选择的图片
        var file = e.target.files[0]
        var fileurl = URL.createObjectURL(file)
        $('#image').cropper('destroy').attr('src', fileurl).cropper(options)
        // 销毁旧的裁剪区域 重新设置图片路径 重新初始化裁剪区域

    })
    $('#retx').on('click', function (e) {
        var dataURL = $image
            //创建一个 Canvas 画布，将 Canvas 画布上的内容，转化为 `base64` 格式的字符串
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                //调用父页面里的getUserInfo()
                window.parent.getUserInfo()
            }
        })
    })
})