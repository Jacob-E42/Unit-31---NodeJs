const BASE_URL = "http://deckofcardsapi.com/api/deck"
const $drawButton = $('#draw')
const $cardArea = $('#card-area')

//1.
let res = axios.get(`${BASE_URL}/new/draw/`, { params: { count: 1 } })
    .then(res => {
        let { value, suit } = res.data.cards[0]
        console.log(`${value} of ${suit}`)
    })

2.
res = axios.get(`${BASE_URL}/new/draw/`, { params: { count: 1 } })
    .then(res => {
        card1 = res.data.cards[0]
        deck_id = res.data.deck_id

        return res = axios.get(`${BASE_URL}/${deck_id}/draw/`, { params: { count: 1 } })
    })
    .then(res => {
        card2 = res.data.cards[0]
        for (card of [card1, card2]) {

            console.log(`${card.value} of ${card.suit}`)
        }
    })

//3. 
let cards = []
res = axios.get(`${BASE_URL}/new/shuffle/`, { params: { deck_count: 1 } })
    .then(res => {
        let deck_id = res.data.deck_id;
        return res = axios.get(`${BASE_URL}/${deck_id}/draw/`, { params: { count: 52 } })
    })
    .then(res => {
        // console.log(res.data.cards)
        for (let card of res.data.cards) {

            cards.push(card)
        }

    })


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