// 切换登录注册模式
$('.Register').hide();
$('.bnt1').on('click', function() {
    $('.form1').hide()
    $('.Register').show();
});
$('.bnt2').on('click', function() {
    $('.Register').hide();
    $('.form1').show()
});
//导入layui的form对象
var form = layui.form;
//导入layui的layer对象
var layer = layui.layer;
//表单密码格式认证
// 对表单进行预筛选
form.verify({
    username: function(value, item) { //value：表单的值、item：表单的DOM对象
        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
            return '用户名不能有特殊字符';
        }
        if (/(^\_)|(\__)|(\_+$)/.test(value)) {
            return '用户名首尾不能出现下划线\'_\'';
        }
        if (/^\d+\d+\d$/.test(value)) {
            return '用户名不能全为数字';
        }

        //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
        if (value === 'xxx') {
            alert('用户名不能为敏感词');
            return true;
        }
    },
    pwd: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    repwd: function() {
        if ($('.rcrpwd').val() !== $('.crpwd').val()) {
            return "两次输入的密码必需一致"
        }
    }
});
//基础填写格式校验成功后
//登录
//监听登录按钮
//项目根路径
var cactlog = 'http://www.liulongbin.top:3007'
$('.login_form').on('submit', function(e) {
    //阻止默认提交
    e.preventDefault();
    //拿到用户数据
    const username = $('.zhang').val();
    const password = $('.mi').val();
    //发起Ajax请求
    $.ajax({
        type: "POST",
        url: "" + cactlog + "/api/login",
        data: { username: username, password: password },
        success: function(res) {
            if (res.status !== 0) {
                layer.msg('登录失败，账号或密码错误')
            } else {
                //拿到服务器给的token接口保存到本地浏览器
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        },
    });
});
//注册
//监听注册表单事件
$('.Register_form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '' + cactlog + '/api/reguser',
        data: {
            username: $('.da').val(),
            password: $('.rcrpwd').val()
        },
        success: function(res) {
            if (res.status !== 0) {
                layer.msg(res)
            } else {
                layer.msg('注册成功请登录')
            }
        }
    })
})