 var session = getSession();
 $(function() {
     getShopInfo();
     $.ajax({
         url: globalData.apiCustomer + 'getBannerList.aspx',
         type: 'get',
         dataType: 'JSON',
         data: {
             "level": 1
         },
         success: function(res) {
             if (res.status == 0) {
                 var html = template('tpl-list', res.data);
                 $('.banner .swiper-wrapper').html(html);
                 var mySwiper = new Swiper('.swiper-container', {
                     //自动播放
                     autoplay: 3000,
                     loop: true,
                     noSwiping:false,
                     // 如果需要分页器
                     pagination: '.swiper-pagination',
                 });

             }
         }
     });
     $(document).on("touchmove", ".mlayer", function() {
         //alert("hello");
     });

     $(".headerWrap").on("click", ".exit", function() {
         showConfirm("确认要退出吗？", function() {
             cancelLogin();
             location.href = "login.html";
         });
     });

 });

 function getShopInfo() {
     $.ajax({
         url: globalData.apiBusiness + 'ShopView.aspx',
         type: 'get',
         dataType: 'JSON',
         data: {
             "Session": session
         },
         success: function(res) {
             if (res.status == 0) {
                 $(".headerWrap .headerImg").html("<img src='" + res.data.LogoICON + "'/>");
                 $(".headerWrap .name").html(res.data.Name);
                 var userCount=0;
                 if(res.data.Favorite_Users)
                    userCount=res.data.Favorite_Users;
                 $(".headerWrap .fans").html("粉丝数："+userCount);
             }
         }
     });
 }

 function jumpCreateCoupon() {
     location.href = "createCoupon.html";
 }

 function jumpCreateActivity() {
     location.href = "createActivity.html";
 }

 function jumpHx() {
     location.href = "hexiao/index.html";
 }

 function jumpMyCoupon() {
     location.href = "couponList.html";
 }

 function jumpShopEdit() {
     location.href = "editShop.html";
 }

 function jumpActivity() {
     location.href = "huodong/index.html";
 }

 function jumpApply() {
     location.href = "http://cn.mikecrm.com/KvpTnXP";
 }

 function showQrcode() {
     $.ajax({
         url: globalData.apiBusiness + 'GetMyCode.aspx',
         dataType: 'text',
         data: {
             "session": session
         },
         success: function(res) {
             if (res) {
                 var data = {
                     qrCodeImg: res
                 };
                 var html = template('qrCode', data);
                 showLayer(html);
                 $(".mLayer").click(function() {
                     $(".mLayer").hide();
                 });
             } else {
                 showMsg("暂无二维码，请先装修店铺");
             }
         }
     });
 }