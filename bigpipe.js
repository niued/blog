var http = require('http');
http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type" : "text/html"});
    response.write("<!DOCTYPE html>");
    response.write("<head><script>function arrived(id,text) { var b=document.getElementById(id); b.innerHTML = text; }</script>");
    response.write("</head><body><div>需要加载的模块");
    for(var i = 0; i < 20; i++) {
        response.write("<div id='" + i + "'>正在被加载！</div>");
    }
    response.write("</div>");
    
    var n = 0;
    for (i = 0; i <20; i++) {
    	(function(q){
	        setTimeout(function(){
	        	
				response.write('<script>arrived('+q+', "内容'+(new Date())+'");</script>')
				if(n++ == 19) response.end('</body></html>');
			}, Math.random()*5000);
		})(i);
    }
 
}).listen(3000);
