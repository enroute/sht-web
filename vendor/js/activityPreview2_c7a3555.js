
var turnplate={
        restaraunts:[],             //大转盘奖品名称
        colors:["#ffe9a6", "#f46747", "#ffe9a6", "#f46747","#ffe9a6", "#f46747"],                  //大转盘奖品区块对应背景颜色
        outsideRadius:192,          //大转盘外圆的半径
        textRadius:155,             //大转盘奖品位置距离圆心的距离
        insideRadius:68,            //大转盘内圆的半径
        startAngle:0,               //开始角度
        
        bRotate:false               //false:停止;ture:旋转
};

$(document).ready(function(){
    //动态添加大转盘的奖品与奖品区域背景颜色  
    var rotateTimeOut = function (){
        $('#wheelcanvas').rotate({
            angle:0,
            animateTo:2160,
            duration:8000,
            callback:function (){
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };

    //旋转转盘 item:奖品位置; txt：提示语;
    var rotateFn = function (item, txt){
        var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length*2));
        if(angles<270){
            angles = 270 - angles; 
        }else{
            angles = 360 - angles + 270;
        }
        $('#wheelcanvas').stopRotate();
        $('#wheelcanvas').rotate({
            angle:0,
            animateTo:angles+1800,
            duration:8000,
            callback:function (){
                alert(txt);
                turnplate.bRotate = !turnplate.bRotate;
            }
        });
    };

    $('.pointer').click(function (){
        if(turnplate.bRotate)return;
        turnplate.bRotate = !turnplate.bRotate;
        //获取随机数(奖品个数范围内)
        var item = rnd(1,turnplate.restaraunts.length);
        //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
        rotateFn(item, turnplate.restaraunts[item-1]);
        /* switch (item) {
            case 1:
                rotateFn(252, turnplate.restaraunts[0]);
                break;
            case 2:
                rotateFn(216, turnplate.restaraunts[1]);
                break;
            case 3:
                rotateFn(180, turnplate.restaraunts[2]);
                break;
            case 4:
                rotateFn(144, turnplate.restaraunts[3]);
                break;
            case 5:
                rotateFn(108, turnplate.restaraunts[4]);
                break;
            case 6:
                rotateFn(72, turnplate.restaraunts[5]);
                break;
            case 7:
                rotateFn(36, turnplate.restaraunts[6]);
                break;
            case 8:
                rotateFn(360, turnplate.restaraunts[7]);
                break;
            case 9:
                rotateFn(324, turnplate.restaraunts[8]);
                break;
            case 10:
                rotateFn(288, turnplate.restaraunts[9]);
                break;
        } */
        console.log(item);
    });
});

function rnd(n, m){
    var random = Math.floor(Math.random()*(m-n+1)+n);
    return random;
    
}

function drawRouletteWheel() {    
  var canvas = document.getElementById("wheelcanvas");    
  if (canvas.getContext) {
      //根据奖品个数计算圆周角度
      var arc = Math.PI / (turnplate.restaraunts.length/2);
      var ctx = canvas.getContext("2d");
      //在给定矩形内清空一个矩形
      ctx.clearRect(0,0,422,422);
      //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
      ctx.strokeStyle = "#FFBE04";
      //font 属性设置或返回画布上文本内容的当前字体属性
      ctx.font = '16px Microsoft YaHei';      
      for(var i = 0; i < turnplate.restaraunts.length; i++) {       
          var angle = turnplate.startAngle + i * arc;
          ctx.fillStyle = turnplate.colors[i];
          ctx.beginPath();
          //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
          ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);    
          ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
          ctx.stroke();  
          ctx.fill();
          //锁画布(为了保存之前的画布状态)
          ctx.save();   
          
          //----绘制奖品开始----
          ctx.fillStyle = "#E5302F";
          var text = turnplate.restaraunts[i];
          var line_height = 17;
          //translate方法重新映射画布上的 (0,0) 位置
          ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
          
          //rotate方法旋转当前的绘图
          ctx.rotate(angle + arc / 2 + Math.PI / 2);
          
          /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
          if(text.indexOf("M")>0){//流量包
              var texts = text.split("M");
              for(var j = 0; j<texts.length; j++){
                  ctx.font = j == 0?'bold 20px Microsoft YaHei':'16px Microsoft YaHei';
                  if(j == 0){
                      ctx.fillText(texts[j]+"M", -ctx.measureText(texts[j]+"M").width / 2, j * line_height);
                  }else{
                      ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                  }
              }
          }else if(text.indexOf("M") == -1 && text.length>6){//奖品名称长度超过一定范围 
              text = text.substring(0,6)+"||"+text.substring(6);
              var texts = text.split("||");
              for(var j = 0; j<texts.length; j++){
                  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
              }
          }else{
              //在画布上绘制填色的文本。文本的默认颜色是黑色
              //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
              ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
          }
          
          //添加对应图标
          if(text.indexOf("闪币")>0){
              var img= document.getElementById("shan-img");
              img.onload=function(){  
                  ctx.drawImage(img,-15,10);      
              }; 
              ctx.drawImage(img,-15,10);  
          }else if(text.indexOf("谢谢参与")>=0){
              var img= document.getElementById("sorry-img");
              img.onload=function(){  
                  ctx.drawImage(img,-15,10);      
              };  
              ctx.drawImage(img,-15,10);  
          }
          //把当前画布返回（调整）到上一个save()状态之前 
          ctx.restore();
          //----绘制奖品结束----
      }     
  } 
}


  var session=getSession();
  var isDataReady = false;
  var isRolling = false;
  var result;
  var data;

  var fakeData={"status":0,"data":{"id":"E6AE6F81-24A7-4D78-A659-CE802BB09574","participants":8998,"prize_list":[{"prize":"优惠券A","shopName":"商户名称：","start_date":"2017-10-06T09:38:20","expired_date":"2017-11-02T21:16:07","logo":"ftp://192.168.1.104:8093/201708/20170827110001.PNG"},{"prize":"优惠C","shopName":"商户名称：","start_date":"2017-10-06T09:38:20","expired_date":"2017-11-02T21:16:07","logo":"ftp://192.168.1.104:8093/201708/20170827110001.PNG"},{"prize":"优惠B","shopName":"商户名称：","start_date":"2017-10-06T09:38:20","expired_date":"2017-11-02T21:16:07","logo":"ftp://192.168.1.104:8093/201708/20170827110001.PNG"}]
   }}
  var IsDebug=false;

  function rotateIt(i){
    $("#wheelcanvas").rotate({
      angle:0,
      animateTo:3600 - i * (360 / 6),
      duration:8000,
      callback:function (){
        console.log("rotateIt finished");
        var r = data.data.prize_list[i];
        r.sn = result.data.prize.sn;
        r.claimWay = "到店使用";
        $("#conDialog").html(Mustache.render(document.getElementById("tplConDialog").innerHTML.trim(), r));
        $("#conDialog").show();
        $("#dimmerOverlay").show();
         isRolling = false;
      }
    });
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
    var arc = Math.PI / (prizes.length/2);
    var startAngle = 0;
    for(var i = 0; i < 6; i++){
      ctx.font = 'bold 24px Microsoft YaHei';
      ctx.fillStyle = i % 2 ? "#f46747" : "#ffffff";
      ctx.strokeStyle = "#FFBE04";

      ctx.save();
      var angle = startAngle + i * arc;
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate(angle);

      ctx.fillText(prizes[i].prize, -ctx.measureText(prizes[i].prize).width/2, -200);
      var width = canvas.width * 0.2;
      var height = width * 0.4;
      var x = - width / 2;
      var y = - height / 2 - 160;
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


  
  $(function(){
    //drawRoulette();
    requestLuckyDrawData(function(){
      //页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
      drawRouletteWheel();
    });
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

  function requestLuckyDrawData(callback){
    if(IsDebug){
      result=fakeData;
      drawRoulettePrizes(result.data.prize_list);
    }else{
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

          var cnames=[];
          $.each(res.data.CouponList,function(index,value){
            if(value.coupon_name&&value.coupon_name.length>0){
               cnames.push(value.coupon_name);
            } 
          });
          turnplate.restaraunts = cnames;

          callback();
          autoResizeCouponList();
          setInterval('autoScrollHorizontal(".couponList")',3000);
        } else {
          showTip("暂无优惠券数据");
          return;
        }
      }
    });
    }
  }

  function autoResizeCouponList(){
    var swidth=$("ul.couponList li:first").width();
    var num=$("ul.couponList li").length;
    var totalWidth=swidth*num;
    totalWidth=totalWidth+swidth;
    $("ul.couponList").css("width",totalWidth+"px");
  }