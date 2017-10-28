var IS_DEBUG = true;

var API_VERSION = "1";
var API_PREFIX = "http://api.shequshenghuotong.com/ForCustomer/";
var API_URL_OAUTH = "http://api.shequshenghuotong.com/Oauth.aspx";

var API_URL_FAVORITE               = API_PREFIX + "favorite.aspx";
var API_URL_UNFAVORITE             = API_PREFIX + "favorite.aspx?favorite=0";
//var API_URL_UNFAVORITE             = API_PREFIX + "favorite?unfavorite=1";

var API_URL_GET_BANNER_LIST_HOME   = API_PREFIX + "getBannerList.aspx?level=1";
var API_URL_GET_BANNER_LIST_CATE   = API_PREFIX + "getBannerList.aspx?level=2";
var API_URL_GET_BANNER_LIST        = API_PREFIX + "getBannerList.aspx?level=1";

var API_URL_GET_COUPON_DETAIL      = API_PREFIX + "getCouponDetail.aspx";

var API_URL_GET_COUPON_LIST        = API_PREFIX + "getCouponList.aspx";
var API_URL_GET_COUPON_LIST_VALID  = API_PREFIX + "getCouponList.aspx?type=0";
var API_URL_GET_COUPON_LIST_EXPIRED= API_PREFIX + "getCouponList.aspx?type=1";
var API_URL_GET_COUPON_LIST_USED   = API_PREFIX + "getCouponList.aspx?type=2";


var API_URL_GET_FAVORITE_SHOP_LIST = API_PREFIX + "getFavoriteShopList.aspx";
var API_URL_GET_LUCKY_DRAW         = API_PREFIX + "getLuckyDraw.aspx";
var API_URL_GET_LUCKY_DRAW_RESULT  = API_PREFIX + "getLuckyDrawResult.aspx";
var API_URL_GET_SCORE_INFO         = API_PREFIX + "getScoreInfo.aspx";
var API_URL_GET_SHOP_DETAIL        = API_PREFIX + "getShopDetail.aspx";

var API_URL_GET_SHOP_LIST          = API_PREFIX + "getShopList.aspx";
var API_URL_GET_SHOP_LIST_NEAREST  = API_PREFIX + "getShopList.aspx?tag=2";
var API_URL_GET_SHOP_LIST_RATING   = API_PREFIX + "getShopList.aspx?tag=3";
var API_URL_GET_SHOP_LIST_HOTTEST  = API_PREFIX + "getShopList.aspx?tag=4";
var API_URL_GET_SHOP_LIST_FAVORITE = API_PREFIX + "getFavoriteShopList.aspx";

 // index
var API_URL_GET_SHOP_LIST_NEARBY = API_PREFIX + "getShopList.aspx?category=8&tag=0";
var API_URL_GET_SHOP_LIST_PREFER = API_PREFIX + "getShopList.aspx?category=8&tag=1";


// var API_URL_GET_SHOP_LIST_PLAY     = API_PREFIX + "getShopList?type=1";
var API_URL_GET_WECHAT_INFO        = API_PREFIX + "getWechatInfo.aspx";
var API_URL_GET_USER_BASIC_INFO    = API_PREFIX + "getBasicUserInfo.aspx";

var API_URL_SIGN_IN                = API_PREFIX + "signIn.aspx";


function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]);
    return null;
}

var useLocalApi = getQueryString("useLocalApi");
console.log("useLocalApi=" + useLocalApi);

if(useLocalApi) {
    API_VERSION = "1";
    API_PREFIX = "api/v" + API_VERSION + "/";
    API_URL_FAVORITE               = API_PREFIX + "favorite";
    API_URL_UNFAVORITE             = API_PREFIX + "unfavorite";
    // API_URL_UNFAVORITE             = API_PREFIX + "favorite?unfavorite=1";

    API_URL_GET_BANNER_LIST_HOME   = API_PREFIX + "getBannerList1";
    API_URL_GET_BANNER_LIST_CATE   = API_PREFIX + "getBannerList2";
    API_URL_GET_BANNER_LIST        = API_PREFIX + "getBannerList";

    API_URL_GET_COUPON_DETAIL      = API_PREFIX + "getCouponDetail";

    API_URL_GET_COUPON_LIST        = API_PREFIX + "getCouponList";
    API_URL_GET_COUPON_LIST_VALID  = API_PREFIX + "getCouponList?type=0";
    API_URL_GET_COUPON_LIST_EXPIRED= API_PREFIX + "getCouponList?type=1";
    API_URL_GET_COUPON_LIST_USED   = API_PREFIX + "getCouponList?type=2";


    API_URL_GET_FAVORITE_SHOP_LIST = API_PREFIX + "getFavoriteShopList";
    API_URL_GET_LUCKY_DRAW         = API_PREFIX + "getLuckyDraw";
    API_URL_GET_LUCKY_DRAW_RESULT  = API_PREFIX + "getLuckyDrawResult";
    API_URL_GET_SCORE_INFO         = API_PREFIX + "getScoreInfo";
    API_URL_GET_SHOP_DETAIL        = API_PREFIX + "getShopDetail";

    API_URL_GET_SHOP_LIST          = API_PREFIX + "getShopList";
    API_URL_GET_SHOP_LIST_NEAREST  = API_PREFIX + "getShopList2";
    API_URL_GET_SHOP_LIST_RATING   = API_PREFIX + "getShopList3";
    API_URL_GET_SHOP_LIST_HOTTEST  = API_PREFIX + "getShopList2";
    API_URL_GET_SHOP_LIST_FAVORITE = API_PREFIX + "getShopList2";

    // index
    API_URL_GET_SHOP_LIST_NEARBY = API_PREFIX + "getShopList2";
    API_URL_GET_SHOP_LIST_PREFER = API_PREFIX + "getShopList3";


    // API_URL_GET_SHOP_LIST_PLAY     = API_PREFIX + "getShopList?type=1";
    API_URL_GET_WECHAT_INFO        = API_PREFIX + "getWechatInfo";
    API_URL_GET_USER_BASIC_INFO    = API_PREFIX + "getUserBasicInfo";

    API_URL_SIGN_IN                = API_PREFIX + "signIn";
}

var IMG = {
    "footer":[
        {//home
            "normal":"home_icon_hp",
            "focus":"home_icon_hpc"
        },
        {//favorite
            "normal":"home_icon_att",
            "focus":"home_icon_attc"
        },
        {//myself
            "normal":"home_icon_cen",
            "focus":"home_icon_cenc"
        }
    ],

    "nav":[
        "home_icon_food",
        "home_icon_drink",
        "home_icon_edu",
        "home_icon_sing",
        "home_icon_fruits",
        "home_icon_play",
        "home_icon_bea",
        "home_icon_move"
    ],

    "couponBackground":[
        "mycenter_img_yhq",     // valid
        "mycenter_img_yhq31",   // used
        "mycenter_img_yhq31"    // expired
    ],

    "myself":{
        "headerBackground":"mycontent_img_bg"
    }

};

var NAV_INDEX_FOOD = 0;
var NAV_INDEX_DRINK = 1;
var NAV_INDEX_EDUCATION = 2;
var NAV_INDEX_SING = 3;
var NAV_INDEX_FRUIT = 4;
var NAV_INDEX_PLAY = 5;
var NAV_INDEX_BEAUTY = 6;
var NAV_INDEX_LOGISTICS = 7;


var FOOTER_INDEX_HOME = 0;
var FOOTER_INDEX_FAVORITE = 1;
var FOOTER_INDEX_MYSELF = 2;
var FOOTER_ACTIVE_INDEX = -1;
var FOOTER_SHOPDETAIL = -2;
function setActiveFooterIndex(index){
    FOOTER_ACTIVE_INDEX = index;
}

function getImage(file){
    var url = "static/images/" + file + "@3x.png";
    return url;
}

function getRequestParameterString(){
    var indexOfQuestionMark = window.location.href.indexOf('?');
    return indexOfQuestionMark == -1 ? "" : window.location.href.substring(indexOfQuestionMark);
}

var requestParameterString = getRequestParameterString();
var session = getQueryString('session');
//var sessionParameterString = "session=" + session;

function buildRequestUrl(url, param) {
    var params = param;
    if(isNull(params)){
        params = "";
    }
    
    if(session != "" && url.indexOf("session=" + session) == -1){
        params += "&session=" + session;
    }

    if(useLocalApi && url.indexOf("useLocalApi") == -1){
	params += "&useLocalApi=" + useLocalApi;
    }

    if(url.indexOf("?") == -1){
        // url does not contain "?"
        return url + "?" + params;
    }else{
        // url contains "?"
        return url + params;
    }
}

function formatDistance(d) {
    // d, the distance in meter
    if (d <= 1000) {
        return "" + d + "m";
    }else {
        return "" + (d / 1000.0).toFixed(2) + "km";
    }
}

// template render
function render(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/mg;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\',  '');
        }

        var variables = token.replace( /\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;

        for (i =  0, length = variables.length, variable = variables[i]; i < length; ++ i) {
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }

        return currentObject;
    })
}

String.prototype.reander = function(context) {
    return render(this, context);
}

function includeAllHtmlFile() {
    var includes = $('[data-include]');
    jQuery.each(includes, function() {
        var file = 'include/' + $(this).data('include') + '.html';
        console.log($(this).data('include'));
        // POST XHR http://mobile.shequshenghuotong.com/include/footer.html not allowed in nginx
        // if ($(this).data('include') == 'footer'){
        //     file += "?active=" + FOOTER_ACTIVE_INDEX; // javascript could not retrieve this parameter?
        //     console.log(file);

        //     // So I have to do it this way
        //     $(this).load(file, {}, function(response, status, request){
                
        //     });
        // }else{
        //     $(this).load(file);
        // }
        $(this).load(file);
    });
}

function isNull(a){
    return typeof a == 'undefined' || a == undefined || a == null;
}

function isEmpty(a){
    return isNull(a) || a == "";
}

// fill template
function formatTemplate(dta, tmpl){
    var format = {
        name:function(x){ return x; }
    };

    return tmpl.replace(/{(\w+)}/g, function(m1, m2){
        if(!m2) return "";
        return (format && format[m2]) ? format[m2](dta[m2]) : dta[m2];
    });
}

$(window).on("load", function(){
    console.log("" + $(this).scrollTop() + ", " + $(this).height() + ", " + $(document).height());
});

function swipeDetect(el, callback){
    var touchsurface = el;
    var swipedir, startX, startY, distX, distY,
    threshold = 150,
    restraint = 100,
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,

    handleswipe = callback || function(swipedir,dx,dy){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        //e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        //e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        //if (elapsedTime <= allowedTime){ // first condition for swipe met
        if (1){
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
            //if (Math.abs(distX) >= Math.abs(distY)){
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            //else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
            else {
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        // Fixme: sometimes scrollTop is much smaller than expected when called immediately
        handleswipe(swipedir,distX,distY);
        var a = {"distX":distX, "distY":distY, "elapsedTime":elapsedTime, "allowedTime":allowedTime};
        console.log(a);
        //e.preventDefault()
    }, false)
}

function isRefresh(dy){
    return ($(window).scrollTop() + $(window).height() + 300 >= $(document).height() && dy < -10) ||
        ($(window).scrollTop() + $(window).height() + 100 >= $(document).height() && dy <= 0);
}

function setCookie(c_name,value,expiredays){
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(c_name){
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        { 
            c_start=c_start + c_name.length+1 
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        } 
    }
    return ""
}

function getPageFileName(){
    var s=location.href;
    s=s.replace(/\?.*$/,'');
    s=s.replace(/^.*\//,'');
    return s;
}

function getLocationWithSessionRemoved(){
    var file = location.href.replace(/\?.*$/,'');

    var param = window.location.search;
    param = param.replace(/^\?/,"");
    console.log(param);
    param = param.replace(/(^|&)session=[^&]*/,'');
    param = param.replace(/^&+/,"");

    if(!isEmpty(param) && !isNull(param) && param != "undefined"){
        file += "?" + param;
    }

    console.log(file);

    return file;
}

function redirectIfNecessary(){
    var redirectLoc = getLocationWithSessionRemoved();

    if(!isEmpty(session)){
        setCookie("session",session,1);
        window.location.href = redirectLoc;
        return;
    }

    var cookieSession = getCookie("session");
    if(isEmpty(cookieSession)){
        //TODO:should redirect to authority page
        console.log("no session, should redirect to authority page");
        window.location.href = API_URL_OAUTH;
    }else{
        // update session from cookie
        session=cookieSession;
    }

    console.log("session = " + session);
}
        
redirectIfNecessary();
