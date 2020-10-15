$(function () {
    const { layer, form } = layui
    initList()
    function initList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlstr = template('tpl_table', res)
                $('tbody').html(htmlstr)
            }
        })
    }
    var index = null
    $('#btnadd').on('click', function () {
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        });
        console.log(index);
    })

    //通过事件代理代理到body上
    //先给index赋值null
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    layer.msg('添加信息失败')
                    return
                }
                //通过initList()函数重新渲染一下表格
                initList()
                layer.msg('添加信息成功')
                //每个close都有一个index属性 再给index通过点击事件赋值再放到layer.close函数中
                //用layer.close() 关掉 layer.open的返回值
                layer.close(index)
            }
        })
    })



    //通过事件代理代理到tbody上
    var indexedit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexedit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        });
        //先给编辑按钮一个自定义的属性值 data-id 通过attr来获取所点击的btn 的 data-id 赋值给id
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: (res) => {
                form.val('form-edit', res.data)
                console.log(form);
            }
        })
    })
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    layer.msg('更新信息失败')
                    console.log(res);
                    return
                }
                //通过initList()函数重新渲染一下表格
                layer.msg('更新信息成功')
                //每个close都有一个index属性 再给index通过点击事件赋值再放到layer.close函数中
                //用layer.close() 关掉 layer.open的返回值
                layer.close(indexedit)
                initList()
            }
        })

    })

    $('tbody').on('click', '.btn_delete', function () {
        //首先要先获取所点击的删除按钮的id值
        var id = $(this).attr('data-id')
        layer.confirm('确定要删除吗', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: (res) => {
                    if (res.status !== 0) {
                        layer.msg('删除数据失败')
                        return
                    }
                    layer.msg('删除数据成功')
                    layer.close(index);
                    initList()
                }
            })

        });
    })

})