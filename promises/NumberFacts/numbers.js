const BASE_URL = "http://numbersapi.com";
let favoriteNumber = 55;


// 1.
axios.get(`${BASE_URL}/${favoriteNumber}?json`)
    .then(resp => {
        let res = resp.data.text
        $('#fact').text(res)
    })

//2. 
const $list = $("#list")
const numberFacts = axios.get(`${BASE_URL}/1..10/?json`)
.then(resp => {
    
    for (let fact in resp.data){
        const $newLi = generateHTML(resp.data[fact]);
        $list.append($newLi);
    }
})

//3. 
const $fourFactsList = $('#four-facts');
repeatedNumber = 4
const responses = []

for (let i = 0; i < repeatedNumber; i++){
    responses.push(axios.get(`${BASE_URL}/${repeatedNumber}/?json`)) 
}

Promise.all(responses)
.then(responses => {

        responses.forEach(resp => {
            text = resp.data.text
            const $newLi = generateHTML(text);
            $fourFactsList.append($newLi)
        })

    })



function generateHTML(fact){
    return `<li><div>${fact}</div></li>`;
}
