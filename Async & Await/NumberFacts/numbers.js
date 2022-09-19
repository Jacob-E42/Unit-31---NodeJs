const BASE_URL = "http://numbersapi.com";
const $factSpan = $('#fact')



// 1.
const favoriteNumber = 55;
async function getNumberFact(favoriteNumber){
    let res = await axios.get(`${BASE_URL}/${favoriteNumber}?json`)
    console.log("1. Favorite Number Fact: ", res.data.text)
}
getNumberFact(favoriteNumber)

//2. 
const numbers = [1,2,3,4,5,6,7,8,9,10];
async function getMultipleNumberFacts(numbers){
    const res = await axios.get(`${BASE_URL}/${numbers}/?json`)
    for (let fact in res.data){
        console.log("2. ", res.data[fact])
    }
}
getMultipleNumberFacts(numbers)

//3. 
async function getFourFacts(number){
    let facts = await Promise.all([
        axios.get(`${BASE_URL}/${number}/?json`),
        axios.get(`${BASE_URL}/${number}/?json`),
        axios.get(`${BASE_URL}/${number}/?json`),
        axios.get(`${BASE_URL}/${number}/?json`)]
    );
    for (let fact of facts){
        console.log("3. ", fact.data.text)
    }
}

getFourFacts(favoriteNumber);


