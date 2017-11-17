
        $(function(){
            $(".commitbtn").click(function() {
                var pwd1 = $.trim($("#txt_newPwd").val());
                var pwd2 = $.trim($("#txt_confirmPwd").val());
                if(pwd1.length==0){
                    showTip("请输入您的新密码");
                    return;
                }
                if (pwd2.length==0) {
                    showTip("请输入确认密码");
                    return;
                }
                if (pwd1.length < 6||pwd2.length<6) {
                    showTip("密码强度不少于6位数");
                    return;
                }
                if (pwd1 != pwd2) {
                    showTip("2次密码输入不一致，请重新输入");
                    return;
                }

                var mobile = getUrlPara(location.href, "mobile");
                if (!mobile) {
                    showTip("手机号为空");
                    return;
                }
                var code=getUrlPara(location.href,"code");
                if(!code){
                    showTip("验证码为空");
                    return;  
                }
                $.ajax({
                    url: globalData.apiBusiness + 'SetNewPWD.aspx',
                    type: 'get',
                    dataType: 'json',
                    data: { "MobileNum": mobile,"VerificationCode":code,"NewPassword":pwd1},
                    success: function(res) {
                        if (res.status == 0) {
                            var result = res.data.Result;
                            if(result==0){
                               showMsg("修改密码失败!");
                                return;
                            }else if (result == 1) {
                                location.href = "login.html";
                            } else if (result == 2) {
                                showMsg("验证码错误");
                                return;
                            }else if (result == 4) {
                                showMsg("账号异常");
                                return;
                            }
                        } else {
                            showMsg(res.message || "系统异常");
                            return;
                        }
                    }
                });
            });
         
        });