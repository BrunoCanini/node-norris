const http = require("http"); 

const dotenv = require("dotenv");
dotenv.config();

const loadAjaxData = require ("./utility/loadAjaxData.js");

const fs = require('fs');
const path = require("path");
const { isUtf8 } = require("buffer");

const port = +process.env.PORT || 3000;

const server = http.createServer(function(req, res){
    
    if(req.url == "/favicon.ico"){
        res.writeHead(404).end();
    } else {
            // specifichiamo come risponde il server
            loadAjaxData(function(data){
                const arrayNorris = readNorris();
                console.log(data);
                arrayNorris.push(data.value)
                console.log(arrayNorris)

                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8"});
                res.end(data.value);

                fs.writeFileSync("./data/norrisDb.json", JSON.stringify(arrayNorris));
            });

    }
})

server.listen(port, function(){
    console.log("server is running on port http://localhost:" + port);
})

function readNorris(){

    const norrisPath = path.join(__dirname, "data", "norrisDb.json");

    try{
        const norris = fs.readFileSync(norrisPath, "utf-8");
        // converto il jason in un array di oggetti javascript
        return JSON.parse(norris);
    }catch(err){
        console.log(err)
        return []
    }

};