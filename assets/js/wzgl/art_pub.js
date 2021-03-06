$(function () {
    const {
        form,
        layer
    } = layui
    initCate()
    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                var htmlstr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlstr)
                //一定要调用一下render（函数）
                form.render()
            }
        })
    }
    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })

    $('#coverFile').on('change', function (e) {
        var files = e.target.files
        if (files.length === 0) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    // 定义文章的发布状态
    var art_state = '已发布'
    //为存为草稿按钮，绑定点击事件处理函数 当存为草稿被点击时 将文章的发布装袋变为草稿
    $('#btnSave2').on('click', function () {
        art_state = '已存为草稿'
    })

    $('#form-pub').on('submit', function (e) {
        //阻止默认提交
        e.preventDefault()
        //获取form表单中的元素 通过formData来获取这个form表单中的元素
        var fd = new FormData($(this)[0])
        //将文章的发布状态发布到fd上如果点了提交就是显示提交成功如果点了草稿就会显示 存为草稿
        fd.append('state', art_state)
        //第四步 把裁剪的图片添加到fd中
        // 4. 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                publishArticle(fd)
            })
    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
                location.href = '/wzgl/art_list.html'
            }
        })
    }
})