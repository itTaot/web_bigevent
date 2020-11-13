$(function () {
    var form = layui.form
    var layer = layui.layer
    //自定义用户昵称输入验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6位之间'
            }
        }
    })
    userInfo();
    //初始化用户信息
    function userInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (fn) {
                if (fn.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(fn);
                form.val('form_userinfo', fn.data);
            }
        })
    }
    //实现重置的功能
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        userInfo();
    })
    //用户提交更新功能
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (fn) {
                if (fn.status !== 0) {
                    return layer.msg('更新提交信息失败！')
                }
                layer.msg('更新提交信息成功了！')
                //调用父页面中的方法，重新渲染用户的信息
                window.parent.getUserInfo();
            }
        })
    })
})