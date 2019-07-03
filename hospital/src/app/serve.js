const http = require('http');

http.createServe((req,res)=>{
	res.writeHead(200,{'content-type':'text/html'});
	res.write("hello");
	res.end();
}).listen(8080,'127.0.0.1',()=>{ console.log("work");});