  var session=getSession();
  var isDataReady = false;
  var isRolling = false;
  var result;
  var data;

  function rotateIt(i){
    $("#wheelcanvas").rotate({
      angle:0,
      animateTo:3600 - i * (360 / 6),
      duration:8000,
      callback:function (){
        console.log("rotateIt finished");
        isRolling = false;
      }
    });
  }

  function RandomOneCoupon(){
   var num=Math.floor(Math.random()*6 + 1);
   rotateIt(num);
  }

  function drawRoulettePrizes(prizes){
    // make it not smaller than 6
    var len = prizes.length;
    if (len <= 0) return;
    while(prizes.length < 6){
      for (var i = 0; i < len; i++){
        prizes.push(prizes[i]);
      }
    }

    var canvas = document.getElementById("wheelcanvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("imgFreeCoupon");
    // var arc = Math.PI / (prizes.length/2);
    var arc = Math.PI / (6/2);
    var startAngle = 0;
    for(var i = 0; i < 6; i++){
      ctx.font = 'bold 20px Microsoft YaHei';
      ctx.fillStyle = i % 2 ? "#f46747" : "#ffffff";
      ctx.strokeStyle = "#FFBE04";

      ctx.save();
      var angle = startAngle + i * arc;
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate(angle);
      
      // ctx.fillText(prizes[i].coupon_name, -ctx.measureText(prizes[i].coupon_name).width/2, -200);
      ctx.fillText(prizes[i].coupon_name, -ctx.measureText(prizes[i].coupon_name).width/2, -130);
      var width = canvas.width * 0.18;
      var height = width * 0.36
      var x = - width / 2;
      // var y = - height / 2 - 160;
      var y = - height / 2 - 100;
      img.onload = function(){
         ctx.drawImage(img, x, y, width, height);
      };
      ctx.drawImage(img, x, y, width, height);
      ctx.restore();
    }
  }

  function drawRoulette(){
    var canvas = document.getElementById("wheelcanvas");
    if (! canvas.getContext) {
      console.log("Error in canvas.getContext");
      return;
    }

    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    var imgWheel = document.getElementById("imgWheel");
    ctx.drawImage(imgWheel, 0, 0, canvas.width, canvas.height);
}

  $(window).on("load",function(){
    drawRoulette();
    requestLuckyDrawData();
  });

  function autoScrollHorizontal(obj){
    var objLi = $(obj).find("li");
    var width = objLi.width()
    var marginRight = parseInt(objLi.css("marginRight"));
    console.log("width=" + width + ", marginRight=" + marginRight);
    $(obj).animate({marginLeft:- width - marginRight}, 500, function(){
       $(this).css({marginLeft:"0px"}).find("li:first").appendTo(this);
    });
  }

   
 function drawRoulette(){
    var canvas = document.getElementById("wheelcanvas");
    if (! canvas.getContext) {
      console.log("Error in canvas.getContext");
      return;
    }
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    var imgWheel = document.getElementById("imgWheel");
    ctx.drawImage(imgWheel, 0, 0, canvas.width, canvas.height);
}

  function requestLuckyDrawData(){
    var key=getUrlPara(location.href,"key");
    $.ajax({
      url: globalData.apiBusiness + 'LotteryView.aspx',
      dataType: 'json',
      data: {
        "session": session,
        "LotteryKey":key
      },
      success: function(res) {
        if (res.status == 0) {
          document.title=res.LotteryName;
          result=res;
          var html = template('couponItem', res.data);
          $('.couponList').html(html);
          autoResizeCouponList();
          drawRoulettePrizes(res.data.CouponList);
          setInterval('autoScrollHorizontal(".couponList")',3000);
        } else {
          showTip("暂无优惠券数据");
          return;
        }
      }
    });
  }

  function autoResizeCouponList(){
    var swidth=$("ul.couponList li:first").width();
    var num=$("ul.couponList li").length;
    var totalWidth=swidth*num;
    totalWidth=totalWidth+swidth;
    $("ul.couponList").css("width",totalWidth+"px");
  }