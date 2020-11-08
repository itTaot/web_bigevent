$(function () {
    //点击注册事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击登录事件
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从layui中获取form对象
    var form = layui.form

    //从layui中获取layer对象
    var layer = layui.layer

    //通过form.verify()这个函数来校验
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //自定义校验规则，校验两次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name = password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致'
            }
        }
    })

    //监听注册表单事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.post('http://ajax.frontend.itheima.net/api/reguser',
            {
                username: '$(#form_reg[name=username]).val()',
                password: '$(#form_reg[name=password]).val()'
            },
            function (fn) {
                if (fn.status !== 0) {
                    console.log(fn.status);
                    console.log(fn.password);
                    return layer.msg(fn.message);
                }
                layer.msg('注册成功，请登录')
                $('#link_login').click();
            })
    })

    //监听登录表单事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'post',
            //快速获取表单中的数据
            data: $(this).serialize(),
            // data: {
            //     username: '$(#form_login[name=username]).val()',
            //     password: '$(#form_login[name=password]).val()'
            // },
            success: function (fn) {
                if (fn.status !== 0) {
                    console.log(fn);
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功')
            }
        })
    })
})