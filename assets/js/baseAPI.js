//注意：每次调用$.get()或$.post()或$.ajax()的时候
//会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);

    //为有权限的接口，统一设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //无论成功还是失败，都会调用complete函数
    options.complete = function (e) {
        if (e.responseJSON.status === 1 && e.responseJSON.message === '身份认证失败！') {
            //清空token值
            localStorage.removeItem('token')
            //跳转登录页面
            location.href = '/login.html'
        }
    }
})