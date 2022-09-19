const BASE_URL = "http://deckofcardsapi.com/api/deck"
const $drawButton = $('#draw')
const $cardArea = $('#card-area')

//1.
async function DrawOneCard(){
    let res = await axios.get(`${BASE_URL}/new/draw/`, { params: { count: 1 } });
    let { value, suit } = res.data.cards[0];
        console.log(`${value} of ${suit}`);
}
DrawOneCard()


//2.
async function drawTwoCards(){
    let {data} = await axios.get(`${BASE_URL}/new/draw/`, { params: { count: 1 } });
    const card1 = data.cards[0];
    const deck_id = data.deck_id;
    ({data} = await axios.get(`${BASE_URL}/${deck_id}/draw/`, { params: { count: 1 } }));
    const card2 = data.cards[0];
    for (card of [card1, card2]) {
        console.log(`${card.value} of ${card.suit}`);
    }
}
drawTwoCards()


        
        

        


// //3. 
let cards = []
async function drawCards(){
    
    let res = await axios.get(`${BASE_URL}/new/shuffle/`, { params: { deck_count: 1 } })
    
    let deck_id = res.data.deck_id;
    res = await axios.get(`${BASE_URL}/${deck_id}/draw/`, { params: { count: 52 } })

    for (let card of res.data.cards) {
        cards.push(card)
    }
}
drawCards();


$drawButton.on('click', handleClick)

function handleClick() {
    if (cards.length > 0) {
        displayCard()
    }
    else {
        $drawButton.hide()
    }

}

function displayCard() {
    let card = drawCard()
    let src = card.image
    const $img = `<img alt="drawn card" src="${src}" >`;
    $cardArea.append($img)
}

function drawCard() {
    let index = Math.floor(Math.random() * cards.length)
    const card = cards.splice(index, 1)
    return card[0]
}