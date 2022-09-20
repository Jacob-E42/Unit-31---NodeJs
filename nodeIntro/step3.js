const fs = require("fs");
const axios = require("axios");

function handleOutPut(data, out) {
    if (out){
        fs.writeFile(out, data, 'utf8', err => {
            if (err){
                console.log(`Error writing to ${out}`);
                process.exit(1);
            }
            else console.log("Writing successfully!")
        })

    } else{
        console.log(data)
    }
}

function cat(path, out) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        else {
            handleOutPut(data, out)
        }
    })
}

async function webCat(url, out) {
    try {
        const resp = await axios.get(url)
        handleOutPut(resp.data, out)
    } catch (err) {
        console.log("Error fetching ", err.hostname)
        process.exit(404)
    }
}

function parsePath() {
    let path = process.argv[2];
    let out;
    if (path === "--out"){
        out = process.argv[3];
        path = process.argv[4];
    }
    if (path.includes("http")) webCat(path, out);
    else cat(path, out);
}

parsePath()