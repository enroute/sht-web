var userMobile="";
var token="";
$(function() {
	var mobile = getArgs("mobile");
	token=getArgs("token");
	userMobile=mobile;
	if (mobile) {
		$.ajax({
			url: globalData.apiBusiness + 'getShopExamine.aspx',
			dataType: 'json',
			data: {
				"MobileNum": mobile
			},
			success: function(res) {
				if (res.status == 0) {
					$("#title").text(res.data.name);
					var resStatus=res.data.status;
					if(resStatus=="未完成"){
						var strTime=res.data.CreateTime.replace(/T/," ");
						$("#sp_date").text(strTime);
						$("#s1").show();
					}else if(resStatus=="审核中"||resStatus=="已提交"){
						$("#s2").show();
					}else if(resStatus=="审核未通过"){
						$("#s3").show();
					}else if(resStatus=="审核通过"){
						if(token)
						   SaveLogin(token);
						$("#s4").show();
					}
				} else {
					showMsg(res.message || "系统异常");
					return;
				}
			}
		});
	}

	$(document).on("click",".content",function(e){
		var strUrl=$(this).attr("data-url");
		if(strUrl){
			location.href=strUrl+"?mobile="+userMobile+"&token="+token+"&m="+getCurentTimeStr();
		}
	});
});
