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
        $(this).load(file);
    });
}