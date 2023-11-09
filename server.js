const http = require("http"); 

const dotenv = require("dotenv");
dotenv.config();

const port = +process.env.PORT || 3000;

const server = http.createServer(function(req, res){
    
    if(req.url == "/favicon.ico"){
        res.writeHead(404).end();
    } else {
            // specifichiamo come risponde il server
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8"});
            res.end("Ciao");
    }
})

server.listen(port, function(){
    console.log("server is running on port http://localhost:" + port)
})