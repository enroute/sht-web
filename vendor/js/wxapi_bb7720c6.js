/*
微信js-sdk，需要引入jquery，微信http://res.wx.qq.com/open/js/jweixin-1.2.0.js
1、图片上传，在需要上传的组件上增加class="imgUpload"即可，上传成功后会在上传按钮上附加data-url上传成功后的本地图片路径
*/
//权限验证配置
$.ajax({
  url: globalData.api + 'GetJsApI_Info.aspx',
  dataType: 'json',
  data: {
    "name": "getwxconfig",
    "curl": location.href.split('#')[0]
  },
  success: function(res) {
    if (res) {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appId, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名，见附录1
        jsApiList: [
            'checkJsApi',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'scanQRCode'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    }
  },
  error: function(jqXHR, textStatus, errorThrown) {
    alert("微信js-sdk验证失败");
  }
});

//图片接口
var images = {
  localId: [], //微信本地图片id
  serverId: [], //微信上传服务器后图片id
  remoteImageUrl: [] //本地服务器返回的图片地址
};
//callback:上传后回调函数
function userUpload(callback,count) {
  //重新初始化
  images.localId=[];
  images.serverId=[];
  images.remoteImageUrl=[];
  //1.图片选择
  wx.chooseImage({
    count: count||1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function(res) {
      images.localId = res.localIds;
      var i = 0,
      length = images.localId.length;
      images.serverId = [];

      //2.上传图片到微信服务器上，获取返回的serverId
      UploadImg(images.localId, callback);
    }
  });

}
//2.上传图片到微信服务器上，获取返回的serverId
function UploadImg(localIds, callback) {
  var localId = localIds.pop();
  setTimeout(function(){
    wx.uploadImage({
      localId: localId,
      success: function(res) {
        images.serverId.push(res.serverId); //保存上传到微信服务器后返回的serverId
        if (localIds.length > 0) {
          UploadImg(localIds, callback); //递归调用上传到微信服务器上
        } else {
          uploadImgToServer(images.serverId, callback);
        }
      },
      fail: function(res) {
        alert(JSON.stringify(res));
      }
    });
  },100);
}

//3.使用serverId调用本地接口上传到本地服务器上
function uploadImgToServer(serverIds, callback) {
  var serverId = serverIds.pop(); //很微妙的方法，每次从数组取一个
  $.ajax({
    url: globalData.api + 'GetJsApI_Info.aspx',
    dataType: 'json',
    data: {
      "name": "uploadimage",
      "serverId": serverId
    },
    success: function(res) {
      if (res) {
        images.remoteImageUrl.push(res.data.url); //保存本地服务器返回的图片地址
        if (serverIds.length > 0) {
          uploadImgToServer(serverIds,callback); //递归调用
        } else {
          if(callback){
            callback(images.remoteImageUrl);         
          }
        }
      }
    }
  });
}
wx.error(function(res) {
  alert(res.errMsg);
});