var time=60;

$(function(){
  $(".eye").on("click",function(){
    if($(this).hasClass("open")){
           $(this).removeClass("open");
           $(this).addClass("close");
           $("#pwd").attr("type","password");
        }
        else{
           var tempPwd= $.trim($("#showpwd").val());
           $(this).removeClass("close");
           $(this).addClass("open");
           $("#pwd").attr("type","text");
        }
  });

  $(document).on("click","#yzm",function(){
        var strMobile=$.trim($("#mobile").val());
        $(this).addClass("disabled");
        $(this).prop("disabled", true);
        timer(this);
        $.ajax({
        url: globalData.apiBusiness+'getCheckCode.aspx',
        type: 'get',
        dataType: 'json',
        data: { "MobileNum": strMobile},
        success: function (res) {
            if (res.status == 0) {
              var result=res.data.Result;
              if(result==1){
                 
               }
               else{
                showMsg(res.message||"系统异常");
               }
            } else {
                showMsg(res.message||"系统异常");
                return;
            }
        }
       });
    });

});

function login(){
		var strMobile=$.trim($("#mobile").val());
		var strPwd=$.trim($("#pwd").val());
    var code=$.trim($("#code").val());
		if(strMobile.length==0){
			 showTip("请输入手机号")
             return;
		}
		if(isNaN(strMobile)){
      showTip("输入的手机号无效")
      return;
		}
		if(strPwd.length==0){
			 showTip("请输入密码")
       return;
		}
    if(strPwd.length<6){
      showTip("密码强度不少于6位数");
      return;
    }
    if(code.length==0){
       showTip("请输入短信验证码")
       return;
    }
    loading(true);
    $.ajax({
        url: globalData.apiBusiness+'CreateShop.aspx',
        dataType: 'json',
        data:{ "MobileNum": strMobile,"Password":strPwd,"VerificationCode":code },
        success: function (res) {
            loading(false);
            if (res.status == 0) {
              var result=res.data.Result;
              if(result==1){
                location.href="apply.html?mobile="+strMobile;
              }else if(result==2){
                showMsg("该手机号码已存在");
                return;
              }else if(result==3){
                showMsg("验证码错误");
                return;
              }else if(result==4){
                showMsg("手机号与验证码不匹配");
                return;
              }else if(result==0){
                showMsg("开店失败");
                return;
              }
            } else {
                showMsg(res.message||"系统异常");
                return;
            }
        }
    });
	}

function timer(_this) {
    if (time > 0) {
        $(_this).text("获取验证码(" + --time + ")");
        $(_this).addClass("disabled");
        setTimeout(function () {
            timer(_this);
        }, 1000)
    }
    else {
        time = 60;
        $(_this).text("获取验证码");
        $(_this).removeClass("disabled");
        $(_this).prop("disabled", false);
    }
}


