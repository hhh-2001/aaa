$(function () {
    //登录点击事件
    $("#link_login,#link_reg").on("click", function () {
        $(this).parents("form").hide().siblings("form").show();
    })

    //表单校验
    layui.form.verify({
        pwd: [/^\S{6,12}$/, '密码不能有空格,且密码6到12位'],
        //确认密码一致
        repwd: function (value) {
            var val = $("#reg_form [name=password]").val();
            if (val != value) {
                return '密码输入不一致'
            }
        }
    })
    var { layer } = layui;
    //注册事件
    $("#reg_form").on("submit", function (e) {
        //阻止默认提交行为
        e.preventDefault();
        var data = {
            username: $("#reg_form [name=username]").val(),
            password: $('#reg_form [name=password]').val()
        }


        //发起ajax请求
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            //注册成功后模拟点击
            $("#link_reg").click();
        })
    })

    //登录事件
    $("#login_form").on("submit", function (e) {
        e.preventDefault();
        //发起ajax请求
        $.ajax({
            type: 'post',
            url: '/api/login',
            //$(this).serialize
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                //将获取到的token保存到本地数据
                localStorage.setItem("token", res.token);
                console.log(res.token);
                //登录成功后跳转页面
                location.href = '/index.html';
            }
        })
    })
})