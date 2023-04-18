var layer = layui.layer
var form = layui.form
    //渲染文章类别数据函数
function renderArtCate() {
    //获取数据
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function(res) {
            if (res.status == 0) {
                //拿到数据
                var data = res.data
                    //渲染数据
                var strhtml = '';
                $.each(data, function(i) {
                    strhtml += '<tr><td>' + data[i].name + '</td><td>' + data[i].alias + '</td><td><button type="button"  class="layui-btn layui-btn-sm edit-bnt"data-index = ' + data[i].Id + '>编辑</button> <button type="button" class="layui-btn layui-btn-danger layui-btn-sm dele-bnt" data-index = ' + data[i].Id + '>删除</button></td></tr>'
                })
                $('.cateTable').html(strhtml)

            } else {
                layer.msg(res.message)
            }
        }
    })
}
//渲染初始页面
renderArtCate();
//实现添加类别
//点击页面实现弹出效果
//content内容可以通过在HTML内嵌script标签然后通过$('script').html()获取字符串
$('.addbnt').on('click', function() {
    layer.open({
        title: '添加文章分类',
        area: ['500px', '300px'],
        type: 1,
        content: $('.addpop').html()
    });
});
//立即提交按钮实现添加文章分类
$('body').on('submit', '.addform', function(e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('新增分类失败！接口失效')
            }
            layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
            layer.close(indexAdd)
        }
    })

});
//文章分类编辑功能
$('body').on('click', '.edit-bnt', function() {
    layer.open({
        title: '修改文章分类',
        area: ['500px', '300px'],
        type: 1,
        content: $('.edit').html()
    });
    $.ajax({
        type: 'get',
        url: '/my/article/cates/' + $(this).attr("data-index"),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            //给表单赋值
            form.val("formtext", res.data);
            //修改
            $('body').on('submit', '.editform', function(e) {
                e.preventDefault();
                $.ajax({
                    type: 'post',
                    url: '/my/article/updatecate',
                    data: $(this).serialize(),
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message);
                        }
                        layer.msg(res.message);
                    }
                })

            })
        }
    })

});
//文章分类删除功能
$('body').on('click', '.dele-bnt', function() {
    $.ajax({
        url: '/my/article/deletecate/' + $(this).attr('data-index'),
        method: 'get',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            };
            layer.msg(res.message);
        }
    });
});