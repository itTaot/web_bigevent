$(function () {

    getUserInfo();

    var layer = layui.layer
    // 点击退出按钮,实现退出功能
    $('#tuichu').on('click', function () {
        layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            //清空token值
            localStorage.removeItem('token')
            //跳转登录页面
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (e) {
            if (e.status !== 0) {
                return layui.layer.msg('获取用户头像失败！')
            }
            //调用renderAvatar渲染头像
            renderAvatar(e.data);
        },
        //无论成功还是失败，都会调用complete函数
        // complete: function (e) {
        //     if (e.responseJSON.status === 1 && e.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
//渲染用户头像
function renderAvatar(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username
    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3.渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide
        //toUpperCase把字符转换成大写字母
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
