$(function () {
    var form = layui.form
    var layer = layui.layer
    //自定义验证规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newpwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新密码和旧密码不能相同'
            }
        },
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    //提交修改的密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (fn) {
                if (fn.status !== 0) {
                    return layer.msg('修改密码失败！')
                }
                layer.msg('修改密码成功！')
                //转换为dom操作，清空表单
                $('.layui-form')[0].reset()
            }
        })
    })
})