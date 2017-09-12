var API_VERSION = "1";
var API_PREFIX = "api/v" + API_VERSION + "/";
var API_URL_FAVORITE               = API_PREFIX + "favorite";
var API_URL_                       = API_PREFIX + "favorite";
var API_URL_GET_BANNER_LIST        = API_PREFIX + "getBannerList";
var API_URL_GET_COUPON_LIST        = API_PREFIX + "getCouponList";
var API_URL_GET_FAVORITE_SHOP_LIST = API_PREFIX + "getFavoriteShopList";
var API_URL_GET_LUCKY_DRAW         = API_PREFIX + "getLuckyDraw";
var API_URL_GET_LUCKY_DRAW_RESULT  = API_PREFIX + "getLuckyDrawResult";
var API_URL_GET_SCORE_INFO         = API_PREFIX + "getScoreInfo";
var API_URL_GET_SHOP_DETAIL        = API_PREFIX + "getShopDetail";
var API_URL_GET_SHOP_LIST          = API_PREFIX + "getShopList";
// var API_URL_GET_SHOP_LIST_PLAY     = API_PREFIX + "getShopList?type=1";
var API_URL_GET_WECHAT_INFO        = API_PREFIX + "getWechatInfo";
var API_URL_SIGN_IN                = API_PREFIX + "signIn";

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
    ]
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
function setActiveFooterIndex(index){
    FOOTER_ACTIVE_INDEX = index;
}

function getImage(file){
    var url = "static/images/3x/" + file + ".png";
    return url;
}

function getRequestParameterString(){
    var indexOfQuestionMark = window.location.href.indexOf('?');
    return indexOfQuestionMark == -1 ? "" : window.location.href.substring(indexOfQuestionMark);
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]);
    return null;
}

var requestParameterString = getRequestParameterString();
var session = getQueryString('session');
var sessionParameterString = "session=" + session;

function buildRequestUrl(url, param) {
    var params = param;
    if(sessionParameterString != ""){
        params += "&" + sessionParameterString;
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
    return a == undefined || a == null || typeof(a) == 'undefined';
}

