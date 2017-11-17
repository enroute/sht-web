var time = 60;

$(function() {
  $(".eye").on("click", function() {
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).addClass("close");
      var tempPwd = $.trim($("#pwd").val());
      $("#pwd").hide();
      $("#showpwd").val(tempPwd);
      $("#showpwd").show();
    } else {
      var tempPwd = $.trim($("#showpwd").val());
      $("#showpwd").hide();
      $("#pwd").val(tempPwd);
      $("#pwd").show();
      $(this).removeClass("close");
      $(this).addClass("open");
    }
  });

  $(document).on("click", "#yzm", function() {
    var strMobile = $.trim($("#mobile").val());
    if(strMobile.length==0){
      showTip("请输入您的手机号");
      return;
    }
    $(this).addClass("disabled");
    $(this).prop("disabled", true);
    timer(this); 
    $.ajax({
      url: globalData.apiBusiness + 'getCheckCode.aspx',
      type: 'get',
      dataType: 'json',
      data: {
        "MobileNum": strMobile
      },
      success: function(res) {
        if (res.status == 0) {
          var result = res.data.Result;
          if (result == 1) {

          } else {
            showMsg(res.message || "系统异常");
          }
        } else {
          showMsg(res.message || "系统异常");
          return;
        }
      }
    });
  });

  $("#code").keyup(function() {
    if ($(this).val().length > 0) {
      $(".forgetpwd").addClass("forgetpwdOn");
    } else {
      $(".forgetpwd").removeClass("forgetpwdOn");
    }
  });
});

function next() {
  var strMobile = $.trim($("#mobile").val());
  var strCode = $.trim($("#code").val());
  if (strMobile.length == 0) {
    showTip("请输入手机号")
    return;
  }
  if (isNaN(strMobile)) {
    showTip("输入的手机号无效")
    return;
  }
  if (strCode.length == 0) {
    showTip("请输入验证码")
    return;
  }

  location.href = "modifyPwd.html?mobile=" + strMobile +"&code="+strCode+ "&m=" + parseInt(Math.random() * 1000000);

}

function timer(_this) {
  if (time > 0) {
    $(_this).text("获取验证码(" + --time + ")");
    $(_this).addClass("disabled");
    setTimeout(function() {
      timer(_this);
    }, 1000)
  } else {
    time = 60;
    $(_this).text("获取验证码");
    $(_this).removeClass("disabled");
    $(_this).prop("disabled", false);
  }
}