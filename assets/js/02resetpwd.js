$(function() {
    //导入layui的form对象
    var form = layui.form;
    //导入layui的layer对象
    var layer = layui.layer;
    //表单密码格式认证
    // 对表单进行预筛选
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function() {
            if ($('.newpwd').val() !== $('.cfpwd').val()) {
                return "两次输入的密码必需一致"
            }
        }
    });
    //修改密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg(res.message);
                } else {
                    layer.msg(res.message);
                    //清空表单
                    //reset()为原生方法
                    $('.layui-form')[0].reset();
                }
            }
        })
    })
})