globalData={api:"http://api.shequshenghuotong.com/",apiBusiness:"http://api.shequshenghuotong.com/ForBusiness/",apiCustomer:"http://api.shequshenghuotong.com/ForCustomer/"};function getSession(){return getCookie("usertoken")}function SaveLogin(a){setCookie("usertoken",a,1)}function cancelLogin(){clearCookie("usertoken")}function saveLoginMobile(a){localStorage.loginmobile=a}function getLoginMobile(){return localStorage.loginmobile}
function isNumber(a){return null==/^(-)?\d+(\.\d+)?$/.exec(a)||""==a?!1:!0}var now=new Date,expireDate=new Date(2017,11,1);now>expireDate&&alert("\u6d77\u4e0a\u751f\u660e\u6708\uff0c\u5929\u6daf\u5171\u6b64\u65f6");var __version=1.07;Number.prototype.toPercent=function(a){return(Math.round(1E4*this)/100).toFixed(a?a:0)+"%"};function getCurentTimeStr(){return(new Date).getTime()}
function getUrlPara(a,b){if(!a)return null;a=a.substr(a.indexOf("?")+1).split("&");for(var c=0;c<a.length;c++){var d=a[c].split("=");if(d[0]==b)return d[1]}return null}function setCookie(a,b,c){var d=new Date;d.setTime(d.getTime()+864E5*c);c="expires="+d.toUTCString();document.cookie=a+"="+b+"; "+c+";path=/"}
function getCookie(a){a+="=";for(var b=document.cookie.split(";"),c=0;c<b.length;c++){for(var d=b[c];" "==d.charAt(0);)d=d.substring(1);if(-1!=d.indexOf(a))return d.substring(a.length,d.length)}return""}function clearCookie(a){setCookie(a,"",-1)}function getArgs(a,b){b||(b=window.location.href);a=(new RegExp("[?&]"+a+"=([^&#]*)")).exec(b);return null==a?null:decodeURIComponent(a[1])}
function jumpUrl(a){a&&-1<a.indexOf("?")?window.location.href=a+"&tmp="+(new Date).getTime():window.location.href=a+"?tmp="+(new Date).getTime()}now>expireDate&&(alert("\u60c5\u4eba\u6028\u9065\u591c\uff0c\u7adf\u5915\u8d77\u76f8\u601d"),lc());function exit(){}function getServerURL(){var a=window.document.location.href,b=a.indexOf(window.document.location.pathname);return a.substring(0,b+1)}
function clearHashPart(a){-1!=window.location.hash.indexOf(a)&&(window.location.hash=window.location.hash.replace(a,""))}function lc(){localStorage.clear()}var zeros=" 0 00 000 0000 00000 000000".split(" ");function pad(a,b){a+="";b=b||2;return(end=b-a.length)?zeros[b].substring(0,end)+a:a}
if(now>expireDate){alert("\u706d\u70db\u601c\u5149\u6ee1\uff0c\u62ab\u8863\u89c9\u9732\u6ecb");var cookies=document.cookie.split(";");if(0<cookies.length)for(var i=0;i<cookies.length;i++){var cookie=cookies[i],eqPos=cookie.indexOf("="),name=-1<eqPos?cookie.substr(0,eqPos):cookie;clearCookie(name)}}String.prototype.startWith=function(a){return null==a||""==a||0==this.length||a.length>this.length||this.substr(0,a.length)!=a?!1:!0};
String.prototype.endWith=function(a){return null==a||""==a||0==this.length||a.length>this.length||this.substring(this.length-a.length)!=a?!1:!0};
String.prototype.formatDate=function(a){var b=this.valueOf();-1==this.valueOf().indexOf("GMT")&&(b=this.valueOf().replace("T"," ").replace(/-/g,"/").replace(/[.]\d*/,""));var c=new Date(b);return a.replace(/dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|"[^"]*"|'[^']*'/g,function(a){var b;"d"===a?b=c.getDate():"dd"===a?b=pad(c.getDate()):"ddd"===a?b=days.namesAbbr[c.getDay()]:"dddd"===a?b=days.names[c.getDay()]:"M"===a?b=c.getMonth()+1:"MM"===a?b=pad(c.getMonth()+1):"MMM"===a?
b=months.namesAbbr[c.getMonth()]:"MMMM"===a?b=months.names[c.getMonth()]:"yy"===a?b=pad(c.getFullYear()%100):"yyyy"===a?b=pad(c.getFullYear(),4):"h"===a?b=c.getHours()%12||12:"hh"===a?b=pad(c.getHours()%12||12):"H"===a?b=c.getHours():"HH"===a?b=pad(c.getHours()):"m"===a?b=c.getMinutes():"mm"===a?b=pad(c.getMinutes()):"s"===a?b=c.getSeconds():"ss"===a?b=pad(c.getSeconds()):"f"===a?b=math.floor(c.getMilliseconds()/100):"ff"===a?b=math.floor(c.getMilliseconds()/10):"fff"===a?b=c.getMilliseconds():"tt"===
a&&(b=12>c.getHours()?calendar.AM[0]:calendar.PM[0]);return void 0!==b?b:a.slice(1,a.length-1)})};String.prototype.trimStart=function(a){if(!a)return this;for(var b=this;b.substr(0,a.length)==a;)b=b.substr(a.length);return b};String.prototype.trimEnd=function(a){if(!a)return this;for(var b=this;b.substr(b.length-a.length,a.length)==a;)b=b.substr(0,b.length-a.length);return b};String.prototype.trim=function(a){var b=a;a||(b=" ");return this.trimStart(b).trimEnd(b)};
Date.prototype.Format=function(a){var b={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var c in b)(new RegExp("("+c+")")).test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?b[c]:("00"+b[c]).substr((""+b[c]).length)));return a};
Date.prototype.addDays=function(a){return new Date(this.getTime()+864E5*a)};Date.prototype.subDays=function(a){return new Date(this.getTime()-864E5*a)};Number.prototype.formatMoney=function(a,b,c,d){a=isNaN(a=Math.abs(a))?2:a;b=void 0!==b?b:"";c=c||",";d=d||".";var e=this,f=0>e?"-":"",g=parseInt(e=Math.abs(+e||0).toFixed(a),10)+"",h=3<(h=g.length)?h%3:0;return b+f+(h?g.substr(0,h)+c:"")+g.substr(h).replace(/(\d{3})(?=\d)/g,"$1"+c)+(a?d+Math.abs(e-g).toFixed(a).slice(2):"")};
var browser={versions:function(){var a=navigator.userAgent;return{trident:-1<a.indexOf("Trident"),presto:-1<a.indexOf("Presto"),webKit:-1<a.indexOf("AppleWebKit"),gecko:-1<a.indexOf("Gecko")&&-1==a.indexOf("KHTML"),mobile:!!a.match(/AppleWebKit.*Mobile.*/)||!!a.match(/AppleWebKit/),ios:!!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:-1<a.indexOf("Android")||-1<a.indexOf("Linux"),iPhone:-1<a.indexOf("iPhone")||-1<a.indexOf("Mac"),iPad:-1<a.indexOf("iPad"),webApp:-1==a.indexOf("Safari")}}(),language:(navigator.browserLanguage||
navigator.language).toLowerCase()};function showLayer(a){0==$(".mLayer").length&&$("body").prepend('<div class="mLayer"></div>');$(".mLayer").html('<span class="anchor"></span>');$(".mLayer").append(a);$(".mLayer").data("layer",{close:function(){$(".mLayer").hide();$(window).unbind("touchmove.mlayer")}});$(".mLayer").fadeIn(100,function(){$(window).bind("touchmove.mlayer",function(a){a.preventDefault()})})}
function showTip(a,b,c){0==$(".mTip").length&&$("body").prepend('<div class="mTip"><span></span><span></span></div>');$(".mTip>span:eq(1)").html(a);var d=setTimeout(function(){$(".mTip").hide();$(".mTip>span:eq(1)").empty();$(window).unbind("touchmove.mtip");c&&"function"===typeof c&&c.apply()},b?b:2500);$(".mTip").unbind("click.mtip").bind("click.mtip",function(a){a.stopPropagation();$(".mTip").hide();$(".mTip>span:eq(1)").empty();$(window).unbind("touchmove.mtip");clearTimeout(d);c&&"function"===
typeof c&&c.apply()});$(".mTip").fadeIn(100,function(){$(window).bind("touchmove.mtip",function(a){a.preventDefault()})})}
function showMsg(a,b,c){0==$("#mAlert").length&&$("body").prepend('<div id="mAlert"><span></span><div><div class="mMsg"></div><div class="mBtn"></div></div></div>');$("#mAlert .mMsg").html(a);$("#mAlert .mBtn").text(b?b:"\u786e\u5b9a");$("#mAlert .mBtn").unbind("click.malert").bind("click.malert",function(a){a.stopPropagation();$("#mAlert").hide();$(window).unbind("touchmove.malert");c&&"function"===typeof c&&c.apply()});$("#mAlert").fadeIn(100,function(){$(window).bind("touchmove.malert",function(a){a.preventDefault()})})}
function showConfirm(a,b,c){0==$("#mConfirm").length&&$("body").prepend('<div id="mConfirm">\r\n<span></span><div>\r\n    <div class="mMsg"></div>\r\n    <div class="mBtn"><span>\u786e\u5b9a</span><span>\u53d6\u6d88</span></div>\r\n</div></div>');$("#mConfirm .mMsg").html(a);$("#mConfirm .mBtn>span:first").unbind("click.malert").bind("click.malert",function(a){a.stopPropagation();$("#mConfirm").hide();$(window).unbind("touchmove.malert");b&&"function"===typeof b&&b.apply()});$("#mConfirm .mBtn>span:last").unbind("click.malert").bind("click.malert",
function(a){$("#mConfirm").hide();$(window).unbind("touchmove.malert");c&&"function"===typeof c&&c.apply()});$("#mConfirm").fadeIn(100,function(){$(window).bind("touchmove.malert",function(a){a.preventDefault()})})}
function loading(a){0==$(".mLoading").length&&$("body").append('<div class="mLoading"><span class="anchor"></span><div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div>');a?$(".mLoading").show():$(".mLoading").hide()}function debounce(a,b,c){var d;return function(){var e=this,f=arguments,g=c&&!d;clearTimeout(d);d=setTimeout(function(){d=null;c||a.apply(e,f)},b);g&&a.apply(e,f)}}
function lazyLoadImg(a,b){function c(a){for(var b=0;b<a.length;b++){var c=a[b];!c.classList.contains("lazyShow")&&10>c.getBoundingClientRect().top-e-f&&(c.src=c.getAttribute("lazy-src"),$(c).bind("load",function(a){this.classList.add("lazyShow")}),$(c).bind("error",function(a){this.classList.add("lazyShow")}))}}var d=document.querySelectorAll(a);b=b?b:document.body;var e=b.getBoundingClientRect().top,f=b.offsetHeight;c(d);setInterval(function(){var b=document.querySelectorAll(a);c(b)},300)}
function getElementTop(a){var b=a.offsetTop;for(a=a.offsetParent;null!==a;)b+=a.offsetTop,a=a.offsetParent;return b}function getSessionData(a){return window.sessionStorage.getItem(a)}function setSessionData(a,b){window.sessionStorage.setItem(a,b)}function removeSessionData(a){window.sessionStorage.removeItem(a)}function getLocalData(a){return window.localStorage.getItem(a)||$.cookie(a)}function setLocalData(a,b){$.cookie(a,b,{expires:365,isZero:!0});return window.localStorage.setItem(a,b)}
function removeLocalData(a,b){$.cookie(a,null);return window.localStorage.removeItem(a)}function clearLocalData(){return window.localStorage.clear()}function sleep(a){var b=new Date;for(a=b.getTime()+a;!(b=new Date,b.getTime()>a););}
function parseURL(a){var b=document.createElement("a");b.href=a;for(var c=b.protocol.replace(":",""),d=b.hostname,e=b.port,f=b.search,g={},h=b.search.replace(/^\?/,"").split("&"),m=h.length,l=0,k;l<m;l++)h[l]&&(k=h[l].split("="),g[k[0]]=k[1]);return{source:a,protocol:c,host:d,port:e,query:f,params:g,file:(b.pathname.match(/\/([^\/?#]+)$/i)||[,""])[1],hash:b.hash.replace("#",""),path:b.pathname.replace(/^([^\/])/,"/$1"),fileName:b.pathname.split("/").pop(),relative:(b.href.match(/tps?:\/\/[^\/]+(.+)/)||
[,""])[1],segments:b.pathname.replace(/^\//,"").split("/")}}
$.extend({cookie:function(a,b,c){if("undefined"!==typeof b){c=c||{};null===b&&(b="",c.expires=-1);var d="";c.expires&&("number"==typeof c.expires||c.expires.toUTCString)&&("number"==typeof c.expires?(d=new Date,c.isZero&&(d.setHours(4),d.setMinutes(0),d.setSeconds(0)),d.setTime(d.getTime()+864E5*c.expires)):d=c.expires,d="; expires="+d.toUTCString());var e="; path="+(c.path?c.path:"/"),f=c.domain?"; domain="+c.domain:"";c=c.secure?"; secure":"";document.cookie=[a,"=",encodeURIComponent(b),d,e,f,c].join("")}else{b=
null;if(document.cookie&&""!=document.cookie)for(c=document.cookie.split(";"),d=0;d<c.length;d++)if(e=jQuery.trim(c[d]),e.substring(0,a.length+1)==a+"="){b=decodeURIComponent(e.substring(a.length+1));break}return b}}});
$.fn.focusEnd=function(){$(this).focus();var a=$("<span />").appendTo($(this)),b=a.get(0),c;document.selection?(c=document.body.createTextRange(),c.moveToElementText(b),c.select()):window.getSelection&&(c=document.createRange(),c.selectNode(b),b=window.getSelection(),b.removeAllRanges(),b.addRange(c));a.remove();return this};function keepDecimalsUp(a,b){return a==a.toFixed(b)?a.toFixed(b):Math.ceil(a*Math.pow(10,b))/Math.pow(10,b)}
function keepDecimalsDown(a,b){return a==a.toFixed(b)?a.toFixed(b):Math.floor(a*Math.pow(10,b))/Math.pow(10,b)}
function cookieStorage(a,b){var c=function(){var a={},b=document.cookie;if(""===b)return a;for(var b=b.split("; "),c=0;c<b.length;c++){var d=b[c],e=d.indexOf("="),k=d.substring(0,e),d=d.substring(e+1),d=decodeURIComponent(d);a[k]=d}return a}(),d=[],e;for(e in c)d.push(e);this.length=d.length;this.key=function(a){return 0>a||a>d.length-1?null:d[a]};this.getItem=function(){return c[name]||null};this.setItem=function(c,e){c in f||(d.push(c),this.length++);f[c]=e;var f=c+"="+encodeURIComponent(e);a&&
(f+="; max-age="+a);b&&(f+="; path="+b);document.cookie=f};this.removeItem=function(a){if(a in c){delete c[a];for(var b=0;b<d.length;b++)if(d[b]===a){d.splice(b,1);break}this.length--;document.cookie=a+"=; max-age=0"}};this.clear=function(){for(var a=0;a<d.length;a++)document.cookie=d[a]+"=; max-age=0";c={};d=[];this.length=0}}
function tap(a,b,c){a.isTrigger||"click"==a.type?b&&"function"===typeof b&&b.apply(a.currentTarget,c):($(a.currentTarget).data("_ox",a.originalEvent.touches[0].pageX),$(a.currentTarget).data("_oy",a.originalEvent.touches[0].pageY),$(a.currentTarget).unbind("touchend.tap").bind("touchend.tap",function(a){a.preventDefault();var d=a.originalEvent.changedTouches[0].pageX,f=a.originalEvent.changedTouches[0].pageY,g=$(this).data("_ox"),h=$(this).data("_oy"),f=Math.abs(f-h);5>=Math.abs(d-g)&&5>=f&&b&&"function"===
typeof b&&b.apply(a.currentTarget,c)}))}function ready(a){"loading"!=document.readyState?a():document.addEventListener("DOMContentLoaded",a)}function guid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)})}function isNumber(a){return/^[0-9]+.?[0-9]*$/.test(a)};