var session = getSession();
var imgPath = "";

$(function() {
    $(".imgWrap").on("click", ".uploadExample", function(e) {
        var _this = $(this);
        userUpload(function(res) {
            if (res && res.length > 0) {
                var strHtml = "";
                $.each(res, function(index, item) {
                    strHtml += "<li><img src='" + item + "'/><span class='imgdel'></span></li>";
                    imgPath += item + ";";
                });
                _this.before(strHtml);
            }
        },5);
        e.stopPropagation();
    });
    
    $("ul.imgWrap").on("click",".imgdel",function(e){
        $(this).parent("li").remove();
        e.stopPropagation();
    });

});

function chooseBeginTime() {
    var now = new Date();
    now = new Date(now.setMinutes(now.getMinutes() + 30));
    var opt = {
        theme: "ios",
        mode: "scroller",
        display: "bottom",
        lang: "zh",
        minDate: now,
        dateFormat: 'yyyy-mm-dd',
        onSelect: function(valueText, inst) {
            $("#span_begintime").removeClass("gray");
            $("#span_begintime").text(valueText);
            $("#begintime").val(valueText);

            var strEndTime=$("#endtime").val();
            if(strEndTime.length>0){
                var bTime=new Date(valueText);
                var eTime=new Date(strEndTime);
                if(bTime>eTime){
                    $("#span_endtime").text("");
                    $("#endtime").val("");
                }
            }
        },
    };
    $("#begintime").mobiscroll('destroy').mobiscroll().date(opt);
    $("#begintime").trigger("click");
}

function chooseEndTime() {
    var now = new Date();
    now = new Date(now.setMinutes(now.getMinutes() + 30));
    var opt = {
        theme: "ios",
        mode: "scroller",
        display: "bottom",
        lang: "zh",
        minDate: now,
        dateFormat: 'yyyy-mm-dd',
        onSelect: function(valueText, inst) {
            $("#span_endtime").removeClass("gray");
            $("#span_endtime").text(valueText);
            $("#endtime").val(valueText);
        },
    };
    var beginTime=$.trim($("#begintime").val());
    if(beginTime.length>0){
        var _now = new Date(beginTime);
        var _end=_now.addDays(30);
        opt.minDate=_now;
        opt.maxDate=_end;
    }
    
    $("#endtime").mobiscroll('destroy').mobiscroll().date(opt);
    $("#endtime").trigger("click");
}

function create() {
    var name = $.trim($("#txtname").val());
    var face = $.trim($("#txtface").val());
    var num = $.trim($("#txtnum").val());
    var beginTime = $("#begintime").val();
    var endTime = $("#endtime").val();
    var remark = $.trim($("#txtremark").val());
    var imgs="";
    $("ul.imgWrap li img").each(function(){
       imgs+=$(this).attr("src")+";";
    });
    imgs=imgs.length>0?imgs.substring(0,imgs.length-1):"";
    if (name.length == 0) {
        showTip("奖券名称不能为空");
        return;
    }
    if (face.length == 0) {
        showTip("奖券面值不能为空");
        return;
    }
    if (isNaN(face)) {
        showTip("奖券面值格式不正确,请输入数字");
        return;
    }
    if (parseInt(face) <= 0) {
        showTip("奖券面值必须大于0");
        return;
    }

    if (num.length == 0) {
        showTip("奖券数量不能为空");
        return;
    }
    if(num>=10000){
        showTip("奖券数量不能超过10000张");
        return;
    }
    if (isNaN(num)) {
        showTip("奖券数量格式不正确");
        return;
    }
    if (parseInt(num) <= 0) {
        showTip("奖券数量必须大于0");
        return;
    }
    if (remark.length == 0) {
        showTip("内容和说明不能为空");
        return;
    }
    if(imgs.length==0){
        showTip("请至少上传一张奖券图片");
        return;
    }
    $.ajax({
        url: globalData.apiBusiness + 'CreateCoupon.aspx',
        dataType: 'json',
        data: {
            "Session": session,
            "Name": name,
            "Count": num,
            "SelfUseNum": 0,
            "ForOthers": 0,
            "OfferValue": face,
            "Remark": remark,
            "UploadPicture": imgs,
            "StartTime":beginTime,
            "EndTime":endTime
        },
        success: function(res) {
            if (res.status == 0) {
                var result = res.data.Result;
                if (result == 1) {
                    location.replace("couponList.html?m="+getCurentTimeStr());
                } else {
                    showMsg(res.data.msg);
                }
            } else {
                showMsg(res.message || "系统异常");
                return;
            }
        }
    });

}