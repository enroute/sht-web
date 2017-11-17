  var TypeArray=[{'id':1,'name':'餐饮美食'},
                 {'id':2,'name':'休闲娱乐'},
                 {'id':3,'name':'教育培训'},
                 {'id':4,'name':'美体健康'},
                 {'id':5,'name':'便利超市'},
                 {'id':6,'name':'汽车旅游'},
                 {'id':7,'name':'上门服务'},
                 {'id':8,'name':'其他服务'}];
  var shopType = 0;
  var searchService, markers = [],
      pageIndex = 1,
      map;
  var imgType="";
  var registerMoible="";
  var infoFillState=0;//资料是否填写完成，0：资料不全，1：资料完整
  var token="";//用户登陆之后凭证，即用户完善免费开店资料
  var timerId;

  $(function() {
      registerMoible=getArgs("mobile");
      token=getArgs("token");
      renderShopInfo();
      clearHashPart("#mapPage");
      $(window).bind("hashchange", function(e) {
          if (this.location.hash != "#mapPage" && $("#mapPage").is(":visible")) {
              var strAddress=$("#span_addr").text()+" "+$.trim($("#addrdetail").val());
              $("#dv_addrdetail").removeClass("gray");
              $("#dv_addrdetail").text(strAddress);
              $("#mapPage").hide();
              $("#mainPage").show();
          }
          if (this.location.hash != "#personPage" && $("#personPage").is(":visible")) {
              $("#personPage").hide();
              $("#mainPage").show();
          }

          if (this.location.hash != "#businessPage" && $("#businessPage").is(":visible")) {
              $("#businessPage").hide();
              $("#mainPage").show();
          }

          if (this.location.hash != "#licensePage" && $("#licensePage").is(":visible")) {
              $("#licensePage").hide();
              $("#mainPage").show();
          }
      });
      // document.addEventListener('visibilitychange',() =>{  
      //   if(document.visibilityState === 'hidden' ){  
      //     //localStorage.visibilitychange="unloaded";
      //     SubmitShop(0);
      //   } 
      //   if(document.visibilityState === 'unloaded' ){  
      //     //localStorage.visibilitychange="unloaded";
      //     SubmitShop(0);
      //   } 
      // });  

      $("#mainPage").on("click", "#dv_addr", function() {
          $("#mainPage").hide();
          $("#mapPage").show();
          location.href = "#mapPage";
          var options = { timeout: 8000 };
          var geolocation = new qq.maps.Geolocation("VJWBZ-TIJ3K-QIEJV-AL7UI-OV4NQ-F6F3Q", "myapp");
          geolocation.getLocation(showPosition, showErr, options);
          var center = new qq.maps.LatLng(39.916527, 116.397128);
          var myOptions = {
              zoom: 8,
              center: center,
              mapTypeId: qq.maps.MapTypeId.ROADMAP
          }
          map = new qq.maps.Map(document.getElementById("mapWrap"), myOptions);
          var latlngBounds = new qq.maps.LatLngBounds();
          //设置Poi检索服务，用于本地检索、周边检索
          searchService = new qq.maps.SearchService({
              //设置搜索范围为北京
              location: "北京",
              //设置搜索页码为1
              pageIndex: pageIndex,
              //设置每页的结果数为5
              pageCapacity: 10,
              //设置展现查询结构到infoDIV上
              //panel: document.getElementById('regionList'),
              //设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
              autoExtend: true,
              //检索成功的回调函数
              complete: function(results) {
                  //设置回调函数参数
                  var strHtml = "";
                  var pois = results.detail.pois;
                  for (var i = 0, l = pois.length; i < l; i++) {
                      var poi = pois[i];
                      //扩展边界范围，用来包含搜索到的Poi点
                      latlngBounds.extend(poi.latLng);
                      if (i == 0 && pageIndex == 1) {
                          var marker = new qq.maps.Marker({
                              map: map,
                              position: poi.latLng
                          });
                          //marker.setTitle(i + 1);

                          // var anchor = new qq.maps.Point(0, 49);
                          // var size = new qq.maps.Size(52, 73);
                          // var origin = new qq.maps.Point(0, 0);
                          // var markerIcon = new qq.maps.MarkerImage("../images/marker.png", size, origin, anchor);
                          // marker.setIcon(markerIcon);
                          markers.push(marker);
                      }
                      if(i==0)
                         strHtml += "<li class='active' data-position='" + JSON.stringify(poi.latLng) + "'><i class='icon_addr'></i>" + pois[i].name + "</li>";
                       else
                         strHtml += "<li data-position='" + JSON.stringify(poi.latLng) + "'><i class='icon_addr'></i>" + pois[i].name + "</li>";
                  }
                  //调整地图视野
                  map.fitBounds(latlngBounds);
                  $("#regionList").html(strHtml);
              },
              //若服务请求失败，则运行以下函数
              error: function() {
                  alert("出错了。");
              }
          });
      })

      $("#mainPage").on("click", "#dv_person", function() {
          $("#mainPage").hide();
          $("#personPage").show();
          location.href = "#personPage";

      })

      $("#mainPage").on("click", "#dv_business", function() {
          $("#mainPage").hide();
          $("#businessPage").show();
          location.href = "#businessPage";

      })

      $("#mainPage").on("click", "#dv_license", function() {
          $("#mainPage").hide();
          $("#licensePage").show();
          location.href = "#licensePage";

      });

      $(document).on("click", "ul.typeItems li", function() {
          shopType = $(this).val();
          $("#dv_shoptype").removeClass("gray");
          $("#dv_shoptype").html($(this).text());
          $(".mLayer").remove();
      });

      $(document).on("click", "ul.regionList li", function() {
          var strPostion = $(this).attr("data-position");
          var strName=$(this).text();
          var postion=JSON.parse(strPostion);
          var center=new qq.maps.LatLng(postion.lat,postion.lng);
          clearOverlays(markers);
          //showMsg(strPostion);
          var marker = new qq.maps.Marker({
              map: map,
              position: center
          });
          markers.push(marker);
          marker.setMap(map);
          $("ul.regionList li").removeClass("active");
          $(this).addClass("active");
          $("#span_addr").text(strName);
          //marker.setTitle(i + 1);

          // var anchor = new qq.maps.Point(0, 29);
          // var size = new qq.maps.Size(32, 53);
          // var origin = new qq.maps.Point(0, 0);
          // var markerIcon = new qq.maps.MarkerImage("../images/home_icon_cenc@2x.png", size, origin, anchor);
          // marker.setIcon(markerIcon);
          // markers.push(marker);
      });

      $(".picWrap").on("click",function(e){
         var type=$(this).attr("data-type");
         imgType=type;
         if(type=="pimg1"||type=="pimg2"){
            $(".permodel").show();
         }
         if(type=="bimg"){
            $(".bumodel").show();
         }
         if(type="limg"){
            $(".licmodel").show();
         }
         e.stopPropagation();
      });

      $(".permodel .bottom").on("click",function(e){
        $(".permodel").hide();
        userUpload(function(res) {
          if (res) {
            var strHtml = "<img src='" + res[0] + "'/>";
            if(imgType=="pimg1"){
              $("#personImg1").val(res[0]);
              $(".picWrap[data-type='pimg1']").html(strHtml);
            }
            if(imgType=="pimg2"){
              $("#personImg2").val(res[0]);
              $(".picWrap[data-type='pimg2']").html(strHtml);
            }
          }
        });
        e.stopPropagation();
      });

      $(".bumodel .bottom").on("click",function(e){
        $(".bumodel").hide();
        userUpload(function(res) {
          if (res) {
            var strHtml = "<img src='" + res[0] + "'/>";
            $("#businessImg").val(res[0]);
            $(".picWrap[data-type='bimg']").html(strHtml);
           
          }
        });
        e.stopPropagation();
      });

       $(".licmodel .bottom").on("click",function(e){
        $(".licmodel").hide();
        userUpload(function(res) {
          if (res) {
            var strHtml = "<img src='" + res[0] + "'/>";
            $("#licenseImg").val(res[0]);
            $(".picWrap[data-type='limg']").html(strHtml);
           
          }
        });
        e.stopPropagation();
      });

     //定时保存页面信息
     timerId=setInterval(saveShopInfo,300);
  });

  function saveShopInfo(){
     var temp=validateInfoState();
     var shopInfo=temp.data;
     localStorage.shoptempinfo=JSON.stringify(shopInfo);
  }

  function renderShopInfo(){
    getShopInfo();

    if(token&&token.length>0&&registerMoible&&registerMoible.length>0){
      var strInfo=localStorage.shoptempinfo;
      if(strInfo){
        tempInfo=JSON.parse(strInfo);
        $("#shopname").val(tempInfo.shopName);
        shopType=tempInfo.shopType;
        var typeName="";
        $.each(TypeArray,function(index,item){
          if(item.id==tempInfo.shopType){
              typeName=item.name;
              return false;
          }
        });
        $("#dv_shoptype").removeClass("gray");
        $("#dv_shoptype").text(typeName);
        $("#dv_addrdetail").removeClass("gray");
        $("#dv_addrdetail").text(tempInfo.address);
        $("#name").val(tempInfo.personName);
        $("#mobile").val(tempInfo.mobile);
        $("#bName").val(tempInfo.bName);
        $("#bPersonName").val(tempInfo.bPersonName);
        $("#bNum").val(tempInfo.bNum);
        $("#bAddr").val(tempInfo.bAddr);
        $("#bDate").val(tempInfo.bDate);
      }
    }
  }

  //清除地图上的marker
  function clearOverlays(overlays) {
      var overlay;
      while (overlay = overlays.pop()) {
          overlay.setMap(null);
      }
  }
  //设置搜索的范围和关键字等属性
  function searchKeyword(keyword) {
      //var keyword = document.getElementById("keyword").value;
      clearOverlays(markers);
      //根据输入的城市设置搜索范围
      // searchService.setLocation("北京");
      //根据输入的关键字在搜索范围内检索
      searchService.search(keyword);
  }

  function showPosition(position) {
      $("#span_addr").text(position.addr);
      //searchService.search(position.addr);
      searchKeyword(position.addr);
      map.panTo(new qq.maps.LatLng(position.lat, position.lat));
  }

  function SearchMap() {
      var strKey=$.trim($("#region").val());
      clearOverlays(markers);
      searchKeyword(strKey);
      return false;
  }

  function showErr() {
      showTip("定位失败");
  }

  function getCurLocation() {   
      geolocation.getLocation(showPosition, showErr, options);
  }

  function getShopInfo() {
     if(token){
       $.ajax({
         url: globalData.apiBusiness + 'getShopInfo.aspx',
         type: 'get',
         dataType: 'JSON',
         data: { "Session": token },
         async:false,
         success: function(res2) {
             if (res2.status == 0) {
                $("#shopname").val(res2.data.name);
                shopType=res2.data.TYPE;
                var typeName="";
                $.each(TypeArray,function(index,item){
                  if(item.id==res2.data.TYPE){
                    typeName=item.name;
                    return false;
                  }
                });
                $("#dv_shoptype").removeClass("gray");
                $("#dv_shoptype").text(typeName);
                $("#dv_addrdetail").removeClass("gray");
                $("#dv_addrdetail").text(res2.data.address);
                $("#mobile").val(res2.data.Mobile);
                $("#name").val(res2.data.Responsible);
                $("#bName").val(res2.data.BLName);
                $("#bPersonName").val(res2.data.BLLegalPerson);
                $("#bNum").val(res2.data.BLRegisterName);
                $("#bAddr").val(res2.data.BLLocation);
                $("#bDate").val(res2.data.BLAvaiablePeriod);
                if(res2.data.BLPicture&&res2.data.BLPicture.length>0){
                  $("#businessPage .picWrap").html("<img src='"+res2.data.BLPicture+"'/>");
                  $("#dv_business .row-r").html("<span class='pass'>审核通过</span>");
                }
              } 
          }
        });
     }
  }

  function ShowShopTypes() {
      //template.config("escape", false);
      var html = template('typeList');
      showLayer(html);
  }
  
  function SaveBusiness(){
    var bName=$.trim($("#bName").val());
    var bPersonName=$.trim($("#bPersonName").val());
    var bNum=$.trim($("#bNum").val());
    var bAddr=$.trim($("#bAddr").val());
    var bDate=$.trim($("#bDate").val());
    var businessImg=$("#businessImg").val();
    if(!registerMoible||registerMoible.length<=0){
      showTip("注册的手机号为空");
      return;
    }
    if(bName.length==0){
      showTip("请输入营业执照名称");
      return;
    }
    if(bPersonName.length==0){
      showTip("请输入法人代表姓名");
      return;
    }
    if(bNum.length==0){
      showTip("请输入执照注册号");
      return;
    }
    if(bAddr.length==0){
      showTip("请输入执照注册地");
      return;
    }
    if(bDate.length==0){
      showTip("请输入执照有效期");
      return;
    }
    if(businessImg.length==0){
      showTip("请上传营业执照");
      return;
    }
    loading(true);
    $.ajax({
        url: globalData.apiBusiness+'SaveBusinessLicense.aspx',
        type: 'get',
        dataType: 'json',
        data: {MobileNum:registerMoible,BLName:bName,BLLegalPerson:bPersonName,BLRegisterName:bNum,BLLocation:bAddr,BLAvaiablePeriod:bDate,BLPicture:businessImg},
        success: function (res) {
          loading(false);
            if (res.status == 0) {
               if(res.data.Result==1){
                  $("#businessImg").val(businessImg);
                  $("#dv_business .row-r").html("<span class='pass'>审核通过</span>");
                  clearHashPart("#businessPage");
                  $("#businessPage").hide();
                  $("#mainPage").show();
               }else{
                  $("#businessImg").val("");
                  $("#dv_business .row-r").html("<span class='unpass'>未通过</span>");
                  showMsg("保存失败");
               }
            } else {
                $("#businessImg").val("");
                $("#dv_business .row-r").html("<span class='unpass'>未通过</span>");
                showMsg(res.message||"保存失败");
                return;
            }
        }
    });
  }

  function SavePerson() {
    var pName=$.trim($("#pName").val());
    var pCardnum=$.trim($("#pCardnum").val());
    var personImg1=$("#personImg1").val();
    var personImg2=$("#personImg2").val(); 
    if(!registerMoible||registerMoible.length<=0){
      showTip("注册的手机号为空");
      return;
    }
    if(pName.length==0){
      showTip("请输入姓名");
      return;
    }
    if(pCardnum.length==0){
      showTip("请输入身份证号");
      return;
    }
    if(personImg1.length==0){
      showTip("请上传身份证正面照");
      return;
    }
    if(personImg2.length==0){
      showTip("请上传身份证反面照");
      return;
    }
    loading(true);
    $.ajax({
        url: globalData.apiBusiness+'SaveIDCard.aspx',
        type: 'get',
        dataType: 'json',
        data: {MobileNum:registerMoible,IDCardName:pName,IDCardNum:pCardnum,IDCardFrontPicture:personImg1,IDCardBackPicture:personImg2},
        success: function (res) {
          loading(false);
            if (res.status == 0) {
               if(res.data.Result==1){
                    $("#personImg1").val(personImg1);
                    $("#personImg2").val(personImg2); 
                    $("#dv_person .row-r").html("<span class='pass'>审核通过</span>");
                    clearHashPart("#personPage");
                    $("#personPage").hide();
                    $("#mainPage").show();
               }else{
                  $("#personImg1").val("");
                  $("#personImg2").val(""); 
                  $("#dv_person .row-r").html("<span class='unpass'>未通过</span>");
                  showMsg("保存失败");
               }
            } else {
                $("#personImg1").val("");
                $("#personImg2").val("");
                $("#dv_person .row-r").html("<span class='unpass'>未通过</span>");
                showMsg(res.message||"保存失败");
                return;
            }
        }
    });
  }

  function SaveLicense() {
    var lName=$.trim($("#lName").val());
    var lPersonName=$.trim($("#lPersonName").val());
    var lNum=$.trim($("#lNum").val());
    var lAddr=$.trim($("#lAddr").val());
    var lDate=$.trim($("#lDate").val());
    var licenseImg=$("#licenseImg").val();
    if(!registerMoible||registerMoible.length<=0){
      showTip("注册的手机号为空");
      return;
    }
    if(lName.length==0){
      showTip("请输入许可证名称");
      return;
    }
    if(lPersonName.length==0){
      showTip("请输入法人代表");
      return;
    }
    if(lNum.length==0){
      showTip("请输入许可证注册号");
      return;
    }
    if(lAddr.length==0){
      showTip("请输入许可证所在地");
      return;
    }
    if(lDate.length==0){
      showTip("请输入许可证有效期");
      return;
    }
    if(licenseImg.length==0){
      showTip("请上传餐饮服务许可证");
      return;
    }
    loading(true);
    $.ajax({
        url: globalData.apiBusiness+'SaveCateringLicense.aspx',
        type: 'get',
        dataType: 'json',
        data: {MobileNum:registerMoible,CLName:lName,CLRegisterName:lNum,CLLegalPerson:lPersonName,CLLocation:lAddr,CLAvaiablePeriod:lDate,CLPicture:licenseImg},
        success: function (res) {
          loading(false);
            if (res.status == 0) {
               if(res.data.Result==1){
                    $("#licenseImg").val(licenseImg);
                    $("#dv_license .row-r").html("<span class='pass'>审核通过</span>");
                    clearHashPart("#licensePage");
                    $("#licensePage").hide();
                    $("#mainPage").show();
               }else{
                  $("#licenseImg").val("");
                  $("#dv_license .row-r").html("<span class='unpass'>未通过</span>");
                  showMsg("保存失败");
               }
            } else {
                $("#licenseImg").val("");
                $("#dv_license .row-r").html("<span class='unpass'>未通过</span>");
                showMsg(res.message||"保存失败");
                return;
            }
        }
    });
  }

 function validateInfoState(){
    var returnObj={};
    returnObj.data={};
    returnObj.data.registerMoible=registerMoible;
    returnObj.data.shopType=shopType;
    var count=$("#dv_business .row-r span").length;
    var licensePass=$("#dv_business .row-r span").hasClass("pass");
    var mobile=$.trim($("#mobile").val());
    returnObj.data.mobile=mobile;
    var shopName=$.trim($("#shopname").val());
    returnObj.data.shopName=shopName;
    var shopAddr=$("#dv_addrdetail").text();
    returnObj.data.address=shopAddr;
    var personName=$.trim($("#name").val());
    returnObj.data.personName=personName;
    var bName=$.trim($("#bName").val());
    var bPersonName=$.trim($("#bPersonName").val());
    var bNum=$.trim($("#bNum").val());
    var bAddr=$.trim($("#bAddr").val());
    var bDate=$.trim($("#bDate").val());
    var businessImg=$.trim($("#businessImg").val());
    returnObj.data.bName=bName;
    returnObj.data.bPersonName=bPersonName;
    returnObj.data.bNum=bNum;
    returnObj.data.bAddr=bAddr;
    returnObj.data.bDate=bDate;
    returnObj.data.businessImg=businessImg;
    if(businessImg.length==0){
          returnObj.data.businessImg=$(".picWrap[data-type='bimg'] img").attr("src");
    }


     if(!registerMoible||registerMoible.length<=0){
        returnObj.errorMsg="注册的手机号为空";
        return returnObj;
     }
     if(count==0){
        returnObj.errorMsg="请先上传营业执照";
        return returnObj;
     }
     if(!licensePass){
       returnObj.errorMsg="营业执照审核未通过";
       return returnObj;
     }
     if(shopName.length==0){
        returnObj.errorMsg="请输入店铺名称";
        return returnObj;
     }
     if(shopAddr.length==0){
        returnObj.errorMsg="请输入店铺地址";
        return returnObj;
     }
     if(personName.length==0){
        returnObj.errorMsg="请输入负责人姓名";
        return returnObj;
     }
     if(mobile.length==0){
        returnObj.errorMsg="请输入负责人联系方式";
        return returnObj;
     }
     returnObj.errorMsg="";
     return returnObj;
 }

  function SubmitShop(submitType){
    var tempObj=validateInfoState();
    var erroMsg=tempObj.errorMsg;
    var fillState=0;
    if(submitType==0){//资料完整或者不完整可以提交
      if(!tempObj.data.registerMoible||tempObj.data.registerMoible.length<=0){
        return;
      }
      if(erroMsg.length>0){//资料不完整
          fillState=0;
      }
      else{//资料完整
          fillState=1;
      }
    }else{//资料完整才可以
      fillState=1;
      if(erroMsg.length>0){
        showTip(erroMsg);
        return;
      }
    }
    if(submitType==1){
      loading(true);
    }
    $.ajax({
        url: globalData.apiBusiness+'SaveShopInfo.aspx',
        type: 'get',
        dataType: 'json',
        data: {"MobileNum":tempObj.data.registerMoible,"Name":tempObj.data.shopName,"TYPE":tempObj.data.shopType,
          "Address":tempObj.data.address,"Responsible":tempObj.data.personName,"ResponsibleMobileNum":tempObj.data.mobile
          ,"InfoFillState":fillState},
        success: function (res) {
            if(submitType==0){
               localStorage.fillState="submitType:0,return:"+JSON.stringify(res);
            }
            if(submitType==1){
               loading(false);
            }
            if (res.status == 0) {
               if(res.data.Result==1){
                  if(submitType==1){
                    location.replace("applyFinish.html?m="+parseInt(Math.random() * 1000000));
                  }
               }else{
                 if(submitType==1){
                    showMsg("保存失败");
                 }
               }
            } else {
              if(submitType==1){
                showMsg(res.message||"保存失败");
              }
              return;
            }
        }
    });
  }