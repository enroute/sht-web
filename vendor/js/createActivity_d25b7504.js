 var session = getSession();
 var chooseLi = null; //选择奖品的li元素；
 var pageSize = 10;
 var isFirstSearchCoupon = true; //是否第一搜索奖券

 $(function() {
   $(window).bind("hashchange", function(e) {
     if (this.location.hash != "#couponPage" && $("#couponPage").is(":visible")) {
       jumpMain();
     }
     if (this.location.hash != "#selfCouponPage" && $("#selfCouponPage").is(":visible")) {
       jumpMain();
     }
   });


   var reqLotteryKey = getUrlPara(location.href, "key"); //活动key
   if (reqLotteryKey && reqLotteryKey.length > 0) {
     document.title = "修改活动";
     $(".btn-create").text("保存修改");
     $("#txt_name").attr("disabled", true);
     $(".chooseDate").removeAttr("onclick");
     //获取活动数据
     $.ajax({
       url: globalData.apiBusiness + 'LotteryView.aspx',
       dataType: 'json',
       data: {
         "session": session,
         "LotteryKey": reqLotteryKey
       },
       success: function(res) {
         if (res.status == 0) {
           $("#hid_LotteryKey").val(reqLotteryKey);
           $("#txt_name").val(res.LotteryName);
           $("#sel_startDate").text(res.StartTime);
           $("#sel_endDate").text(res.EndTime);

           if (res.data.CouponList && res.data.CouponList.length > 0) {
             $.each(res.data.CouponList, function(index, value) {
               var chLi = $(".imgWrap li:eq(" + index + ")");
               chLi.find(".uploadExample").html('<img src="' + value.Image + '"/>');
               chLi.find(".name").text(value.coupon_name);
               chLi.find(".hid_key").val(value.CouponKey);
             });
           }
         } else {
           alert(res.message || "系统异常");
           return;
         }
       }
     });
   }

   //获取form中提交的输入框值
   var reqKeyWord = getUrlPara(location.href, "KeyWord");
   $("#txt_key").val(reqKeyWord);

   var page = 1; //页码
   var loading = false; //状态标记

   //滚动加载消息
   $("#couponPage").infinite().on("infinite", function() {
     var type = $("#hid_type").val();
     if (loading) return;
     page++;
     loading = true;
     setTimeout(function() {
       loadData(reqKeyWord, type, page);
       loading = false;
     }, 1200); //模拟延迟
   });

   //本地奖券选择奖品
   $(document).on("click", "#selfCouponPage .couponList li", function() {
     var ckey = $(this).attr("data-key");
     var name = $(this).attr("data-name");
     var selfSelImg = $(this).find("#hid_selfSelImg").val();
     if (!ckey || ckey.length <= 0) {
       showTip("关联失败，未获取到奖品值");
       return;
     } else {
       var flag=true;
       $(".hid_key").each(function() {
         var val = $(this).val();
         if (val == ckey) {
           flag=false;
           return;
         }
       });
       if(!flag){
        showTip("不能重复选择相同奖券");
        return;
       }
       chooseLi.find(".hid_key").attr("data-type", "IsSelf").val(ckey); //该选择奖品下赋值选中的值
       chooseLi.find(".name").css("color", "red").text(name);
       chooseLi.find(".uploadExample").html('<img src="' + selfSelImg + '"/>');
       jumpMain();
     }
   });
   //券市场选择奖品
   $(document).on("click", "#couponPage .relateBtn", function() {
     var parentObj = $(this).parents("li");
     var name = parentObj.attr("data-name");
     var ckey = parentObj.attr("data-key");
     var otherImg = parentObj.find("#hid_otherImg").val();
     if (!ckey || ckey.length <= 0) {
       showTip("关联失败，未获取到奖品值");
       return;
     } else {
       var flag=true;
       $(".hid_key").each(function() {
         var val = $(this).val();
         if (val == ckey) {
           flag=false;
           return;
         }
       });
       if(!flag){
        showTip("不能重复选择相同奖券");
        return;
       }
       chooseLi.find(".hid_key").val(ckey); //该选择奖品下赋值选中的值
       chooseLi.find(".name").css("color", "red").text(name);
       chooseLi.find(".uploadExample").html('<img src="' + otherImg + '"/>');
       jumpMain();
     }
   });

   //类型搜索
   $(".typeList li").click(function() {
     $(".typeList li").removeClass("active");
     $(this).addClass("active");
     var type = $(this).attr("data-type");
     $("#hid_type").val(type);
     var keyword = $("#txt_key").val();
     loadData(keyword, type, 1);
   });


   $(".cancelBtn").click(function() {
     $("#txt_key").val("");
   });

   $(".imgWrap li").click(function() {
     chooseLi = $(this);
     popShow();
   });

   $(".pop-cancel").click(function() {
     popHide();
   });

   $("ul.couponList").on("click", ".detailBtn", function(e) {
     $(this).parent(".header").next().slideDown();
     $(this).hide();
     $(this).prev(".state").show();
     event.stopPropagation(); //阻止事件冒泡
   });

   $(".btn-relateSelf").click(function() {
     var selfCounts = $(".imgWrap input[class='hid_key'][data-type='IsSelf']");
     if (selfCounts.length >= 2) {
       showMsg("本店奖券最多关联2张");
       return;
     }
     popHide();
     jumpSelfList();
   });

   $(".btn-relateOther").click(function() {
     popHide();
     jumpOtherList();
   });

   $(".btn-create").click(function() {
     var LotteryKey = $("#hid_LotteryKey").val();
     //相关奖券
     var ckeys = [];
     $(".hid_key").each(function() {
       var val = $(this).val();
       if (val && typeof(val) != "undefined") {
         ckeys.push(val);
       }
     });

     if (LotteryKey && LotteryKey.length > 0) {
       editActivity(LotteryKey, ckeys);
     } else {
       createActivity(ckeys);
     }
   });
 });

 function createActivity(ckeys) {
   var name = $("#txt_name").val();
   var stime = $("#hid_startDate").val();
   var etime = $("#hid_endDate").val();
   if (name.length == 0) {
     showTip("请输入活动名称");
     return;
   }
   if (!stime || stime.length == 0) {
     showTip("请选择活动开始时间");
     return;
   }
   if (!etime || etime.length == 0) {
     showTip("请选择活动结束时间");
     return;
   }
   if (ckeys.length < 6) {
     showTip("抽奖奖品个数必须为6个，请填写完整");
     return;
   }
   var CouponKey = ckeys.join(";");
   $.ajax({
     url: globalData.apiBusiness + 'CreateLottery.aspx',
     dataType: 'json',
     data: {
       "session": session,
       "LotteryName": name,
       "StartTime": stime,
       "EndTime": etime,
       "CouponKey": CouponKey
     },
     success: function(res) {
       if (res.status == 0) {
         if (res.data.Result == "0") {
           showMsg(res.message || "创建失败");
           return;
         } else {
           showTip('创建成功', 2500, function() {
             location.href = "huodong/index.html";
           });
         }
       } else {
         alert(res.message || "系统异常");
         return;
       }
     }
   });
 }

 function editActivity(LotteryKey, ckeys) {
   if (ckeys.length < 6) {
     showTip("抽奖奖品个数必须为6个，请填写完整");
     return;
   }
   var CouponKey = ckeys.join(";");
   $.ajax({
     url: globalData.apiBusiness + 'LotteryUpdate.aspx',
     dataType: 'json',
     data: {
       "session": session,
       "CouponKey": CouponKey,
       "LotteryKey": LotteryKey
     },
     success: function(res) {
       if (res.status == 0) {
         if (res.data.Result == "0") {
           showMsg(res.message || "编辑失败");
           return;
         } else {
           showTip('编辑成功', 2500, function() {
             location.href = "huodong/index.html";
           });
         }

       } else {
         alert(res.message || "系统异常");
         return;
       }
     }
   });
 }

 function loadData(key, type, page) {
   loading(true);
   $.ajax({
     url: globalData.apiBusiness + 'GetCouponList.aspx',
     dataType: 'json',
     data: {
       "session": session,
       "IsSelf": 0, //周围商家
       "KeyWord": key,
       "Type": type,
       "page": page,
       "page_size": pageSize
     },
     success: function(res) {
       loading(false);
       if (res.status == 0) {
         if (res.data.CouponList.length < pageSize) {
           $(document.body).destroyInfinite();
         }
         var html = template('tpl-list', res.data);
         if (page == 1) {
           $('#couponPage .couponList').html(html);
         } else {
           $('#couponPage .couponList').append(html);
         }
         var mySwiper = new Swiper('.swiper-container', {
           //自动播放
           autoplay: 3000,
           loop: true,
           // 如果需要分页器
           pagination: '.swiper-pagination',
         });
       } else {
         $(document.body).destroyInfinite();
         alert(res.message || "系统异常");
         return;
       }
     },
     complete: function() {
       setTimeout(function() {
         loading(false);
       }, 5000);
     }
   });
 }

 //獲取本地獎券列表
 function getCouponList(couponType) {
   loading(true);
   $.ajax({
     url: globalData.apiBusiness + 'getCouponListAvailable.aspx',
     dataType: 'json',
     data: {
       "Session": session,
       "page": 1,
       "page_size": 500,
       "Available": couponType
     },
     success: function(res) {
       if (res.status == 0) {
         loading(false);
         var html = template("couponItem", res.data);
         $("#selfCouponPage .couponList").html(html);
       } else {
         showMsg(res.message || "获取奖券信息失败");
         return;
       }
     },
     complete: function() {
       setTimeout(function() {
         loading(false);
       }, 5000);
     }
   });
 }

 function selectStartDate() {
   var now = new Date();
   var pluginDate = null;
   pluginDate = {
     plugdatetime: function($dateTxt, type) {
       var opt = {}
       opt.time = {
         preset: type
       };
       opt.date = {
         preset: type
       };
       opt.datetime = {
         preset: type,
         minDate: now,
         stepMinute: 1
       };
       $dateTxt.val('').mobiscroll('destroy').mobiscroll(
         $.extend(opt[type], {
           theme: "android-holo-light",
           mode: "scroller",
           display: "modal",
           lang: "zh",
           dateFormat: 'yy-mm-dd',
           onSelect: function(valueText, inst) {
             $("#hid_startDate").val(valueText);
             $("#sel_startDate").text(valueText);

             var strEndTime = $("#hid_endDate").val();
             if (strEndTime.length > 0) {
               var bTime = new Date(valueText.replace("-", "/").replace("-", "/"));
               var eTime = new Date(strEndTime.replace("-", "/").replace("-", "/"));
               if (bTime > eTime) {
                 $("#hid_endDate").val("");
                 $("#sel_endDate").text("");
               }
             }
           }
         })
       );
     }
   }
   pluginDate.plugdatetime($("#hid_startDate"), "datetime")
   $("#hid_startDate").trigger("click");
 }

 function selectEndDate() {
   var now = new Date();
   var nowFormat = now.Format("yyyy-MM-dd");
   var startDate = $.trim($("#sel_startDate").text());

   var pluginDate = null;
   pluginDate = {
     plugdatetime: function($dateTxt, type) {
       var opt = {}
       opt.time = {
         preset: type
       };
       opt.date = {
         preset: type
       };
       opt.datetime = {
         preset: type,
         stepMinute: 1
       };
       var beginTime = $.trim($("#hid_startDate").val());
       if (beginTime.length > 0) {
         var _now = new Date(beginTime.replace("-", "/").replace("-", "/"));
         var _end = _now.addDays(60);
         var _now2 = new Date(_now.getTime() + 1000 * 60);
         $dateTxt.val('').mobiscroll('destroy').mobiscroll(
           $.extend(opt[type], {
             theme: "android-holo-light",
             mode: "scroller",
             display: "modal",
             lang: "zh",
             dateFormat: 'yy-mm-dd',
             minDate: _now2,
             maxDate: _end,
             onSelect: function(valueText, inst) {
               $("#hid_endDate").val(valueText);
               $("#sel_endDate").text(valueText);
             }
           })
         );
       } else {
         $dateTxt.val('').mobiscroll('destroy').mobiscroll(
           $.extend(opt[type], {
             theme: "android-holo-light",
             mode: "scroller",
             display: "modal",
             lang: "zh",
             dateFormat: 'yy-mm-dd',
             minDate: now,
             onSelect: function(valueText, inst) {
               $("#hid_endDate").val(valueText);
               $("#sel_endDate").text(valueText);
             }
           })
         );
       }

     }
   }
   pluginDate.plugdatetime($("#hid_endDate"), "datetime")
   $("#hid_endDate").trigger("click");

 }


 function popShow() {
   $(".popUpOver").show();
   $(".tu-popUp").show();
 }

 function popHide() {
   $(".popUpOver").hide();
   $(".tu-popUp").hide();
 }

 function jumpMain() {
   $("#couponPage").hide();
   $("#selfCouponPage").hide();
   $("#mainPage").show();
 }

 function jumpSelfList() {
   getCouponList(1);
   $("#mainPage").hide();
   $("#selfCouponPage").show();
   location.href = "#selfCouponPage";
 }

 function jumpOtherList() {
   if (isFirstSearchCoupon) {
     loadData(null, null, 1);
   }
   isFirstSearchCoupon = false;
   $("#mainPage").hide();
   $("#couponPage").show();
   location.href = "#couponPage";
 }

 function SearchCoupon() {
   var strKey = $.trim($("#txt_key").val());
   var type = $("#hid_type").val();
   var page = 1;
   loadData(strKey, type, page);
   return false;
 }