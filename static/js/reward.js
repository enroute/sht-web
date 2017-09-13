var turnplate={
    restaraunts:[],             //大转盘奖品名称
    colors:[],                  //大转盘奖品区块对应背景颜色
    outsideRadius:192,          //大转盘外圆的半径
    textRadius:155,             //大转盘奖品位置距离圆心的距离
    insideRadius:68,            //大转盘内圆的半径
    startAngle:0,               //开始角度
    
    bRotate:false               //false:停止;ture:旋转
};

//turnplate.colors = ["#FFFFFF","#C4C400", "#0080FF", "#C4C400","#A6A6D2", "#6C3365", "#64A600" ];
turnplate.colors = ["#f46747", "#ffe9a6", "#f46747", "#ffe9a6", "#f46747", "#ffe9a6", "#f46747", "#ffe9a6"];

var readyToDraw = false;
var luckyDrawInfo;

function updateWinnerList(){
    var liHtml = "";

    console.log("KKKKKK");
    console.log(luckyDrawInfo);

    luckyDrawInfo.data.winner_list.forEach(function(val, index, arr){
        liHtml += '<li style="margin-top:10px;"><img src="' + val.avatar + '" class="my_header"/><span>' + val.nickname + '</span><span class="reward_thing">' + val.prize + '</span></li>';
    });

    console.log(liHtml);
    $("#ulWinnerList").html(liHtml);
}

// request lucky draw info
$(function(){
    $.ajax({
        url:buildRequestUrl("api/v1/getLuckyDraw", ""),
        type:"get",
        success:function(data){
            luckyDrawInfo = JSON.parse(data);
            console.log(data);
            if(0 != luckyDrawInfo.status) return;

            for(var i = 0; i < luckyDrawInfo.data.prize_list.length; i++){
                turnplate.restaraunts.push(luckyDrawInfo.data.prize_list[i].prize);
            }

            if(3 == luckyDrawInfo.data.prize_list.length){
                //do it again
                for(var i = 0; i < luckyDrawInfo.data.prize_list.length; i++){
                    turnplate.restaraunts.push(luckyDrawInfo.data.prize_list[i].prize);
                }
            }

            readyToDraw = true;
            drawRouletteWheel();

            updateWinnerList();
            $("#participants").html(luckyDrawInfo.data.participants);
        }
    });
});

$(document).ready(function(){
    var phoneArr = $('.phone');
    for(var i=0;i<phoneArr.length;i++){
        var phone = $('.phone')[i].innerText;
        var mphone = phone.substr(0, 3) + '****' + phone.substr(7);
        $('.phone')[i].innerText=mphone;
    }

    //动态添加大转盘的奖品与奖品区域背景颜色
    // turnplate.restaraunts = ["永和大王券", "永和小王券", "水果拼盘300元月卡", "2元现金红包", "夏威夷果一袋", "3元现金红包", "松子一袋 ", "5元现金红包"];
    // turnplate.colors = ["#FFFFFF","#5fcbd5", "#FFFFFF", "#5fcbd5", "#FFFFFF","#5fcbd5", "#FFFFFF", "#5fcbd5" ];

    // turnplate.restaraunts = ["获取中1", "获取中2", "获取中3"];
    // turnplate.colors = ["#FFFFFF","#C4C400", "#0080FF"];//, "#C4C400","#A6A6D2", "#6C3365", "#64A600" ];

    
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
        // TODO: stop should be called by ajax result
        //$('#wheelcanvas').stopRotate();
        $('#wheelcanvas').rotate({
            angle:0,
            animateTo:angles+1800,
            duration:8000,
            callback:function (){       //回调
                alert('恭喜中奖了'+txt);
            }
        });
    };

    $('.pointer').click(function (){
        if(! readyToDraw) return;

        $.ajax({
            url:buildRequestUrl("api/v1/getLuckyDrawResult", "id=" + luckyDrawInfo.data.id),
            type:"get",
            success:function(data){
                var luckyDrawResultInfo = JSON.parse(data);
                if(0 != luckyDrawResultInfo.status) {
                    alert("Ozn, unknown error @_@");
                    return;
                }

                console.log("turnplate.bRotate:"+turnplate.bRotate);
                //if(turnplate.bRotate)return;
                turnplate.bRotate = !turnplate.bRotate;
                //获取随机数(奖品个数范围内)
                //var item = rnd(1,turnplate.restaraunts.length);
                var item = luckyDrawResultInfo.data.prize.index + 1; // 1-based rather than 0-based

                console.log("item:"+item);
                //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
                rotateFn(item, turnplate.restaraunts[item-1]);
                console.log(item);
            }
        });
    });
});

function rnd(n, m){
    var random = Math.floor(Math.random()*(m-n+1)+n);
    return random;
    
}


//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
window.onload=function(){
    drawRouletteWheel();
};

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
        ctx.font = 'bold 18px Microsoft YaHei';      
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

            //改变画布文字颜色
            var b = i+2;
            if(b%2){
                //ctx.fillStyle = "#FFFFFF";
                ctx.fillStyle = "#f46747";
            }else{
                //ctx.fillStyle = "#E5302F";
                ctx.fillStyle = "#FFFFFF";
            };
            
            //----绘制奖品开始----
            
            
            var text = turnplate.restaraunts[i];
            var line_height = 17;
            //translate方法重新映射画布上的 (0,0) 位置
            //ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
            ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
            
            //rotate方法旋转当前的绘图
            ctx.rotate(angle + arc / 2 + Math.PI / 2);

            // ctx.translate(0, 30);
            
            /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
            /** if(text.indexOf("盘")>0){//判断字符进行换行
                var texts = text.split("盘");
                for(var j = 0; j<texts.length; j++){
                ctx.font = j == 0?'bold 20px Microsoft YaHei':'bold 18px Microsoft YaHei';
                if(j == 0){
                ctx.fillText(texts[j]+"盘", -ctx.measureText(texts[j]+"盘").width / 2, j * line_height);
                }else{
                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height*1.2); //调整行间距
                }
                }
                }else */
            if(/**text.indexOf("盘") == -1 &&*/ text.length>8){//奖品名称长度超过一定范围 
                text = text.substring(0,8)+"||"+text.substring(8);
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
            {
                var img = document.getElementById("coupon-img" + i);
                var x = -50;
                var y = 20;
                img.onload = function(){
                    ctx.drawImage(img, x, y);
                };
                ctx.drawImage(img, x, y);
            }
            /*
            if(text.indexOf(turnplate.restaraunts[0])>=0){
                var img= document.getElementById("diy1-img");
                img.onload=function(){  
                    ctx.drawImage(img,-35,20);      
                };  
                ctx.drawImage(img,-35,20);  
            };
            if(text.indexOf(turnplate.restaraunts[1])>=0){
                var img= document.getElementById("shan-img");
                img.onload=function(){  
                    ctx.drawImage(img,-35,20);      
                }; 
                ctx.drawImage(img,-35,20);  
            };
            if(text.indexOf(turnplate.restaraunts[2])>=0){
                var img= document.getElementById("diy5-img");                   
                img.onload=function(){  
                    ctx.drawImage(img,-25,35);      
                };  
                ctx.drawImage(img,-30,35);  
            };
            if(text.indexOf(turnplate.restaraunts[3])>=0){
                var img= document.getElementById("shan-img");
                img.onload=function(){  
                    ctx.drawImage(img,-35,20);      
                };  
                ctx.drawImage(img,-35,20);  
            };
            if(text.indexOf(turnplate.restaraunts[4])>=0){
                var img= document.getElementById("diy3-img");
                img.onload=function(){  
                    ctx.drawImage(img,-30,20);      
                };  
                ctx.drawImage(img,-30,20);  
            };
            if(text.indexOf(turnplate.restaraunts[5])>=0){
                var img= document.getElementById("shan-img");
                img.onload=function(){  
                    ctx.drawImage(img,-35,20);      
                };  
                ctx.drawImage(img,-35,20);  
            };
            if(text.indexOf(turnplate.restaraunts[6])>=0){
                var img= document.getElementById("diy2-img");                     
                img.onload=function(){  
                    ctx.drawImage(img,-30,20);      
                };  
                ctx.drawImage(img,-30,20);  
            };
            
            if(text.indexOf(turnplate.restaraunts[7])>=0){
                var img= document.getElementById("shan-img");
                img.onload=function(){  
                    ctx.drawImage(img,-35,20);      
                };  
                ctx.drawImage(img,-35,20);  
            };
            */
            
            //把当前画布返回（调整）到上一个save()状态之前 
            ctx.restore();
            //----绘制奖品结束----
        }     
    } 
};
