function wxconfig(res){
    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appId, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名，见附录1
        jsApiList: [
            'checkJsApi',
            'openLocation',
            'getLocation',
            'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
}

var wxShareUrlPrefix = window.location.protocol + "//" + window.location.host + "/";
var wxShareConfig = {
    title:document.title,
    imgUrl:wxShareUrlPrefix + "favicon.png",
    link:window.location,
    desc:"",
    type:"link",
    dataUrl:"",
    success:null,
    cancel:null
};

function wxSetConfig(config){
    wxShareConfig.title   = config.title   || wxShareConfig.title;
    wxShareConfig.imgUrl  = config.imgUrl  || wxShareConfig.imgUrl;
    wxShareConfig.link    = config.link    || wxShareConfig.link;
    wxShareConfig.desc    = config.desc    || wxShareConfig.desc;
    wxShareConfig.dataUrl = config.dataUrl || wxShareConfig.dataUrl;
    wxShareConfig.success = config.success || wxShareConfig.success;
    wxShareConfig.cancel  = config.cancel  || wxShareConfig.cancel;
}

wx.ready(function () {
    wx.checkJsApi({
        jsApiList: [
            'getLocation'
        ],
        success: function (res) {
            // alert(JSON.stringify(res));
            // alert(JSON.stringify(res.checkResult.getLocation));
            if (res.checkResult.getLocation == false) {
                alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                return;
            }
        }
    });

    wx.getLocation({
        success: function (res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度

            console.log("location:");
            console.log(res);
        },
        cancel: function (res) {
            alert('用户拒绝授权获取地理位置');
        }
    });

    wx.onMenuShareAppMessage({
        title:wxShareConfig.title,
        desc:wxShareConfig.desc,
        link:wxShareConfig.link,
        imgUrl:wxShareConfig.imgUrl,
        type:wxShareConfig.type,//type: music/video/link, default is link
        dataUrl:wxShareConfig.dataUrl,//link for data if type=music/vidoe
        success:function(){
            if(wxShareConfig.success != null){
                wxShareConfig.success();
            }
        },
        cancel:function(){
            if(wxShareConfig.cancel != null){
                wxShareConfig.cancel();
            }
        }
    });

    wx.onMenuShareTimeline({
        title:wxShareConfig.title,
        link:wxShareConfig.link,
        imgUrl:wxShareConfig.imgUrl,
        success:function(){
            if(wxShareConfig.success != null){
                wxShareConfig.success();
            }
        },
        cancel:function(){
            if(wxShareConfig.cancel != null){
                wxShareConfig.cancel();
            }
        }
    });

    wx.onMenuShareQQ({
        title:wxShareConfig.title,
        desc:wxShareConfig.desc,
        link:wxShareConfig.link,
        imgUrl:wxShareConfig.imgUrl,
        success:function(){
            if(wxShareConfig.success != null){
                wxShareConfig.success();
            }
        },
        cancel:function(){
            if(wxShareConfig.cancel != null){
                wxShareConfig.cancel();
            }
        }
    });

    
    wx.onMenuShareWeibo({
        title:wxShareConfig.title,
        desc:wxShareConfig.desc,
        link:wxShareConfig.link,
        imgUrl:wxShareConfig.imgUrl,
        success:function(){
            if(wxShareConfig.success != null){
                wxShareConfig.success();
            }
        },
        cancel:function(){
            if(wxShareConfig.cancel != null){
                wxShareConfig.cancel();
            }
        }
    });

    wx.onMenuShareQZone({
        title:wxShareConfig.title,
        desc:wxShareConfig.desc,
        link:wxShareConfig.link,
        imgUrl:wxShareConfig.imgUrl,
        success:function(){
            if(wxShareConfig.success != null){
                wxShareConfig.success();
            }
        },
        cancel:function(){
            if(wxShareConfig.cancel != null){
                wxShareConfig.cancel();
            }
        }
    });

});

$.ajax({
    url: "http://api.shequshenghuotong.com/GetJsApI_Info.aspx",
    dataType: 'json',
    data: {
        "name": "getwxconfig",
        "curl": location.href.split('#')[0]
    },
    success: function(res) {
        if (res) {
            console.log(res);
        }
        wxconfig(res);
    },
    error: function(jqXHR, textStatus, errorThrown) {
        alert("微信js-sdk验证失败");
    }
});
