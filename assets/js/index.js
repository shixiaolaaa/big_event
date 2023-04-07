var layer = layui.layer
    //定义一个获取用户的基本信息函数
function getUserMsg() {
    $.ajax({
        type: "get",
        url: '/my/userinfo',
        success: function(res) {
            if (status !== 0) {
                let mes = res.data;
                //获取用户名称
                console.log(mes.nickname)
                if (mes.nickname) {
                    $('.nick').html(mes.nickname)
                } else {
                    $('.nick').html(mes.username.substr(0, 1))
                };

                //实现退出功能
                $('.back').on('click', function() {
                    //清空本地存储的localStorage
                    localStorage.removeItem('token');
                    //跳转到登录界面
                    location.href = '/login.html';
                });
                //获取图像
                console.log(mes.user_pic)
                if (mes.user_pic) {
                    $('.textimg').hide();
                    $('.layui-nav-img').prop('src', mes.user_pic)
                    $('.layui-nav-img').show();
                } else {
                    $('.textimg').html(mes.username.substr(0, 1));
                    $('.textimg').show();
                }
            }
        },
        //不管成功失败，服务器都会回调一个complete函数
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1) {
        //         localStorage.clear();
        //         location.href = "/login.html"
        //     }
        // }

    })
};
// 登陆后获取用户基本信息
getUserMsg();