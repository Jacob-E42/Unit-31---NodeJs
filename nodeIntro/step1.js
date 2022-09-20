const fs = require("fs");


function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.log(err);
            process.exit(1);
        }
        console.log(data)
    })
    
}

function printPath(){
    let path = process.argv[2];
    cat(path);
}

printPath()