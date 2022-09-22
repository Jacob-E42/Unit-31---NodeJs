/** Command-line tool to generate Markov text. */
const {MarkovMachine} = require("./markov");
const fs = require("fs");
const axios = require("axios");

function handleOutPut(data) {
    const mm = new MarkovMachine(data);
    console.log(mm.makeText())
}

function cat(file) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        else {
            handleOutPut(data)
        }
    })
}

async function webCat(url) {
    try {
        const resp = await axios.get(url)
        handleOutPut(resp.data)
    } catch (err) {
        console.log("Error fetching ", err.hostname)
        process.exit(1)
    }
}

function parsePath() {
    // TODO: use a CLI argument parser to help parse/validate args
    // https://openbase.com/categories/js/best-nodejs-cli-arguments-libraries
    let sourceType = process.argv[2];
    let source = process.argv[3];
    
    if (sourceType  === "file"){
        cat(source)
    }
    else if (sourceType === "url") {
        webCat(source)
    }
    else{
        console.log("Error: Please enter either 'file' or 'url' before source location")
    }
}

parsePath()

