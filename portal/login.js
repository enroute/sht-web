var http = require('http');
var url = require('url');

var appid = 'wxb100c6cb25bec484';
var appsecret = '634b53eb40b6985745ce962861f25f51';

var access_token = '';

http.createServer(function(request, response){
    var pathname = url.parse(request.url).pathname;

    if (access_token == ''){
    }

    response.writeHead(200, {'Content-Type': 'text/plain'});
    if (pathname == '/requestauth'){
        re
    } else {
        response.end('{"status":0}\n');
    }

    console.log(pathname);
}).listen(8080);