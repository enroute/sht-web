var token = getSession();
if (token && token != "undefined") {
    location.href = "home.html?m=" + parseInt(Math.random() * 1000000);
}
$(function() {
    var tempMobile=getLoginMobile();
    $("#mobile").val(tempMobile);
    $(".eye").on("click", function() {
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $(this).addClass("close");
            $("#pwd").attr("type", "password");
        } else {
            var tempPwd = $.trim($("#showpwd").val());
            $(this).removeClass("close");
            $(this).addClass("open");
            $("#pwd").attr("type", "text");
        }
    });

    $(".clear").on("click", function() {
        $("#pwd").val("");
        $("#showpwd").val("");
    });
});

function jumpShop() {
    return jumpUrl("openShop.html");
}

function jumpForGetPwd() {
    return jumpUrl("forgetpwd.html");
}

function jumpFastLogin() {
    return jumpUrl("fastlogin.html");
}

function login() {
    var strMobile = $.trim($("#mobile").val());
    var strPwd = $.trim($("#pwd").val());
    if (strMobile.length == 0) {
        showTip("请输入手机号")
        return;
    }
    if (isNaN(strMobile)) {
        showTip("输入的手机号无效")
        return;
    }
    if (strPwd.length == 0) {
        showTip("请输入密码")
        return;
    }
    if (strPwd.length < 6) {
        showTip("密码强度不少于6位数");
        return;
    }
    loading(true);
    $.ajax({
        url: globalData.apiBusiness + 'Login.aspx',
        type: 'get',
        dataType: 'JSON',
        data: {
            "MobileNum": strMobile,
            "Password": strPwd
        },
        success: function(res) {
            loading(false);
            if (res.status == 0) {
                var result = res.data.Result;
                if (result == 1) {
                    //保存手机号
                    saveLoginMobile(strMobile);

                    //查询开店状态  审核通过
                    $.ajax({
                        url: globalData.apiBusiness + 'getShopExamine.aspx',
                        type: 'get',
                        dataType: 'JSON',
                        data: { "MobileNum": strMobile },
                        success: function(res2) {
                            if (res2.status == 0) {
                                if (res2.data.status == "审核通过"&&res.data.IsExamined&&res.data.IsExamined!=1) {
                                    SaveLogin(res.data.Session);
                                    location.href = "home.html?m=" + getCurentTimeStr();
                                } else if(res2.data.status == "已上线"){
                                    SaveLogin(res.data.Session);
                                    location.href = "home.html?m=" + getCurentTimeStr();
                                }
                                else {
                                    location.href = "applyState.html?mobile=" + strMobile+"&token="+res.data.Session+"&m="+ getCurentTimeStr();
                                }
                            } else {
                                showTip(res2.message || "系统异常");
                                return;
                            }
                        }
                    });
                } else if (result == 2) {
                    showTip("该手机号码不存在");
                    return;
                } else if (result == 3) {
                    showTip("密码错误");
                    return;
                } else if (result == 4) {
                    showTip("账户异常");
                    return;
                } else if (result == 0) {
                    showTip("用户名或密码错误");
                    return;
                }
            } else {
                showTip(res.message || "系统异常");
                return;
            }
        }
    });
}

function getState(mobile) {
    $.ajax({
        url: globalData.apiBusiness + 'getShopExamine.aspx',
        dataType: 'json',
        async: false,
        data: {
            "MobileNum": mobile
        },
        success: function(res) {
            if (res.status == 0) {
                return res.data.status;
            } else {
                showMsg(res.message || "系统异常");
                return "";
            }
        }
    });
}