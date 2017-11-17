$(function(){
    var session = getSession();
    if (!session||session=="undefined"){
    	var currentUrl=location.href;
        if(currentUrl.indexOf("hexiao")>-1||currentUrl.indexOf("huodong")>-1||currentUrl.indexOf("wlsq")>-1){
           location.href = "../login.html";
        }else{
           location.href = "login.html";
        }
    }
});
