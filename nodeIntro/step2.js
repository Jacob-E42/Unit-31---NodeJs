const fs = require("fs");
const axios = require("axios");


function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.log(err);
            process.exit(1);
        }
        console.log(data)
    })
    
}
async function webCat(url){
    try{
        const resp = await axios.get(url)
         console.log(resp.data)
    } catch(err){
        console.log("Error fetching ", err.hostname)
        process.exit(404)
    }
}

function printPath(){
    let path = process.argv[2];
    if (path.includes("http")) webCat(path);
    else cat(path);
}

printPath()