//jQuery在发送Ajax请求时会先调用ajaxPrefilter
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    //给有权限的api添加请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    };
    // 页面权限控制
    options.complete = function(res) {
        if (res.responseJSON.status === 1) {
            localStorage.clear();
            location.href = "/login.html"
        };
    }
})