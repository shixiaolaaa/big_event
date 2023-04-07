$(function() {
    //表单验证
    var form = layui.form;
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户昵称不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户昵称首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户昵称不能全为数字';
            }
        }
    });
    //获取用户信息
    function getMessage() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res.message);
                } else {
                    console.log(res.data);
                    //使用layui中的form.val()方法快速为表单赋值
                    form.val('form', res.data)
                }
            }
        })
    }
    getMessage();
    //实现重置按钮
    $('.setbnt').on('click', function(e) {
        e.preventDefault();
        //调用获取上一个获取用户信息函数
        getMessage();
    });
    //跟新用户提交请求
    //监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        //跟新数据
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status === 0) {
                    layui.layer.msg('跟新信息成功');
                    //成功后从新渲染基础页面
                    console.log(res)
                        //调用父页面的方法
                    window.parent.getUserMsg();
                    getMessage()

                } else {
                    layui.layer.msg('error')
                }
            }
        })
    })
})