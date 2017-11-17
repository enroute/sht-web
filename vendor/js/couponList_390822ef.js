var pageIndex = 1;
var pageSize = 10;
var isLoading = false;
var couponType = 1; //1可用（在线）;0过期（历史)
var session = getSession();
$(function() {

  getCouponList();

  $(".navbar").on("click", "li", function() {
    couponType = $(this).attr("data-type");
    $(".navbar li").removeClass("active");
    $(this).addClass("active");
    pageIndex = 1;
    getCouponList();
  });

  //滚动加载消息
  $(document.body).infinite().on("infinite", function() {
    if (isLoading) return;
    pageIndex++;
    getCouponList();
  });

  $("ul.couponList").on("click", ".detailBtn", function(e) {
    $(this).parent(".header").next().slideDown();
    $(this).hide();
    $(this).prev(".state").show();
  });

});

function del(key) {
  showConfirm("确定要删除吗？", function() {
    $.ajax({
      url: globalData.apiBusiness + 'CouponDelete.aspx',
      dataType: 'json',
      data: {
        "Session": session,
        "CouponKey": key
      },
      success: function(res) {
        if (res.status == 0) {
          if (res.data.Result == "1") {
            showTip("删除成功", 2000, function() {
              getCouponList();
            })
          } else {
            showMsg("删除失败");
          }
        } else {
          showMsg(res.message || "系统异常");
          return;
        }
      },
      complete: function() {
        setTimeout(function() {
          loading(false);
        }, 2000);
      }
    });
  });

}

function getCouponList() {
  loading(true);
  isLoading = true;
  $.ajax({
    url: globalData.apiBusiness + 'getCouponListAvailable.aspx',
    dataType: 'json',
    data: {
      "Session": session,
      "page": pageIndex,
      "page_size": pageSize,
      "Available": couponType
    },
    success: function(res) {
      isLoading = false;
      loading(false);
      if (res.status == 0) {
        if (res.data && res.data.CouponList && res.data && res.data.CouponList.length > 0) {
          if (res.data.CouponList.length < pageSize) {
            $(document.body).destroyInfinite();
          }
          res.data.CouponList.Available = couponType;
          var html = template("couponItem", res.data);
          if (pageIndex == 1)
            $(".couponList").html(html);
          else {
            $(".couponList").append(html);
          }
        }
      } else {
        $(".couponList").html("");
        //showMsg(res.message || "获取奖券信息失败");
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