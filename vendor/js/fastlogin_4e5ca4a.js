var time=60;
var token=getSession();
$(function(){    
    if(token&&token!="undefined"){
      location.href="home.html?m="+parseInt(Math.random() * 1000000);
    }
    
    var tempMobile=getLoginMobile();
    $("#mobile").val(tempMobile);

    $(document).on("click","#yzm",function(){
        var strMobile=$.trim($("#mobile").val());
        if(strMobile.length==0){
          showTip("请输入您的手机号");
          return;
        }
        $(this).addClass("disabled");
        $(this).prop("disabled", true);
        timer(this);
        $.ajax({
        url: globalData.apiBusiness+'getCheckCode.aspx',
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
    var code=$.trim($("#code").val());
    if(strMobile.length==0){
       showTip("请输入手机号")
             return;
    }
    if(isNaN(strMobile)){
             showTip("输入的手机号无效")
             return;
    }
    if(code.length==0){
       showTip("请输入短信验证码")
       return;
    }
    loading(true);
    $.ajax({
        url: globalData.apiBusiness+'LoginByVC.aspx',
        dataType: 'json',
        data: { "MobileNum": strMobile,"VerificationCode":code },
        success: function (res) {
            loading(false);
            if (res.status == 0) {
              var result=res.data.Result;
              if(result==1){
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
              }else if(result==2){
                showTip("验证码错误");
                return;
              }else if(result==4){
                showTip("账户异常");
                return;
              }
              else if(result==0){
                showTip("手机或验证码错误");
                return;
              }
            } else {
                showTip(res.message||"系统异常");
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

