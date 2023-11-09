const http = require("http"); 

const dotenv = require("dotenv");
dotenv.config();

const loadAjaxData = require ("./utility/loadAjaxData.js");

const fs = require('fs');

const port = +process.env.PORT || 3000;

const server = http.createServer(function(req, res){
    
    if(req.url == "/favicon.ico"){
        res.writeHead(404).end();
    } else {
            // specifichiamo come risponde il server
            loadAjaxData(function(data){
                console.log(data);

                fs.appendFile("./data/norrisDb.json", JSON.stringify(data.value) ,function (err) {
                    if (err) throw err;
                    console.log("Saved!");
                    });

                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8"});
                res.end(data.value);
            });

    }
})

server.listen(port, function(){
    console.log("server is running on port http://localhost:" + port)
})