var session = getSession();
$(function() {
	$.ajax({
		url: globalData.apiBusiness + 'getShopInfo.aspx',
		dataType: 'json',
		data: {
			"Session": session
		},
		success: function(res) {
			if (res.status == 0) {
				$("#v_img").attr("src", res.data.LogoICON);
				$("#txt_shopName").val(res.data.name);
				$("#txt_tel").val(res.data.FixTel);
				$("#txt_mobile").val(res.data.ResponsibleMobileNum);
				$("#txt_cost").val(res.data.Average_Cost);
				$("#txt_introduce").val(res.data.Introduction);
				$("#txt_recommand").val(res.data.Recommends);
				$(".mapAddress").text(res.data.address);
				$("#hid_address").val(res.data.address);
				$("#hid_lat").val(res.data.Latitude);
				$("#hid_lng").val(res.data.Longitude);
				$("#hid_type").val(res.data.TYPE);
				$(".typeList li").each(function() {
					if ($(this).attr("data-type") == res.data.TYPE) {
						$(".type_text").text($(this).text());
					}
				});
				if (res.data.PicturesUpload) {
					var imgs = res.data.PicturesUpload.split(";");
					$.each(imgs, function(index, value) {
						$(".shopImageUpload").before('<li style="position: relative;""><img src="' + value + '"><span class="base-badge btn-imgDel">×</span></li>');
					});
				}
			}
		}
	});

	$(".typeList li").click(function() {
		$(".typeList li").removeClass("active");
		$(this).addClass("active");
		var type = $(this).attr("data-type");
		$("#hid_type").val(type);
		$(".type_text").text($(this).text());
		$("#typePage").hide();
		$("#mainPage").show();
	});

	$(document).on("click", ".btn-imgDel", function() {
		var obj = $(this);
		obj.parent().remove();
	});
});

function create() {
	var name = $("#txt_shopName").val();
	var userimg = $(".headerImgUpload img").attr("src");
	var type = $("#hid_type").val();
	var tel = $("#txt_tel").val();
	var mobile = $("#txt_mobile").val();
	var address = $("#hid_address").val();
	var cost = $("#txt_cost").val();
	var introduction = $("#txt_introduce").val();
	var recommand = $("#txt_recommand").val();

	var imgs = [];
	$(".imgWrap li img").each(function() {
		imgs.push($(this).attr("src"));
	});
	var lat = $("#hid_lat").val();
	var lng = $("#hid_lng").val();
	if (!userimg || userimg.length == 0) {
		showMsg("请选择头像");
		return;
	}
	if (type.length == 0) {
		showMsg("请选择类型");
		return;
	}
	if (tel.length == 0) {
		showMsg("请输入座机号");
		return;
	}

	var telReg = /^([0-9]{3,4}-)[0-9]{7,8}$/;
	if (!telReg.test(tel)) {
		showMsg("请输入正确的座机号格式如：0755-88886666");
		return;
	}
	if (mobile.length == 0) {
		showMsg("请输入手机号");
		return;
	}
	if (mobile.length != 11) {
		showMsg("请输入11位的手机号");
		return;
	}
	if (address.length == 0) {
		showMsg("请选择地址");
		return;
	}
	if (cost.length == 0) {
		showMsg("请输入店内人均消费");
		return;
	}
	if (introduction.length == 0) {
		showMsg("请输入店内介绍");
		return;
	}
	if (recommand.length == 0) {
		showMsg("请输入推荐菜");
		return;
	}
	if (imgs.length == 0) {
		showMsg("请上传店铺照片");
		return;
	}
	$.ajax({
		url: globalData.apiBusiness + 'SaveShopDetail.aspx',
		dataType: 'json',
		data: {
			"Session": session,
			"Name": name,
			"FixTel": tel,
			"LogoICON": userimg,
			"TYPE": type,
			"ResponsibleMobileNum": mobile,
			"Address": address,
			"AverageCost": cost,
			"Introduction": introduction,
			"Recommends": recommand,
			"PicturesUpload": imgs.join(";"),
			"Latitude": lat,
			"Longitude": lng
		},
		success: function(res) {
			if (res.status == 0) {
				if (res.data.Result == "1") {
					location.href = "shopPreview.html";
				} else {
					showMsg("创建失败");
				}
			} else {
				showMsg(res.message || "系统异常");
				return;
			}
		}
	});
}

function preview() {
	create();
}