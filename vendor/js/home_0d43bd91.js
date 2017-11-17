 var session = getSession();
 $(function() {
     getShopInfo();
     var mySwiper = new Swiper('.swiper-container', {
         //自动播放
         autoplay: 3000,
         loop: true,
         // 如果需要分页器
         pagination: '.swiper-pagination',
     });

     $.ajax({
         url: globalData.apiCustomer + 'getBannerList.aspx',
         type: 'get',
         dataType: 'JSON',
         data: { "level": 1 },
         success: function(res) {
             if (res.status == 0) {
                 var html = template('tpl-list', res.data);
                 $('.banner .swiper-wrapper').html(html);
             }
         }
     });
     $(document).on("touchmove",".mlayer",function(){
        //alert("hello");
     });
     
     $(".headerWrap").on("click",".exit",function(){
        showConfirm("确认要退出吗？",function(){
           cancelLogin();
           location.href="login.html";
        });    
     });

 });

 function getShopInfo(){
    $.ajax({
         url: globalData.apiBusiness + 'ShopView.aspx',
         type: 'get',
         dataType: 'JSON',
         data: { "Session": session },
         success: function(res) {
             if (res.status == 0) {
                 $(".headerWrap .headerImg").html("<img src='"+res.data.LogoICON+"'/>");
                 $(".headerWrap .name").html(res.data.Name);
                 $(".headerWrap .fans").html(res.data.Favorite_Users);
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
     location.href = "wlsq/create.html";
 }

 function showQrcode() {
     //template.config("escape", false);
     var html = template('qrCode');
     showLayer(html);
     $(".mLayer").click(function(){
        $(".mLayer").hide();
     });
 }