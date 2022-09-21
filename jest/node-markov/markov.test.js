const { MarkovMachine } = require('./markov');

describe("Markov Machine creates chains", function () {
    let mm;
    beforeAll(function () {
        mm = new MarkovMachine('the cat in the hat is extremely silly in the cat hat extremely');
    })

    test('chains are made correctly', function () {
        let length = Object.keys(mm.chains).length;
        expect(length).toEqual(7);
        expect(mm.chains['the'].length).toEqual(3);
        expect(mm.chains['extremely'][1]).toBe(null);
    });
    test('constuctor makes correct amount of words', function(){
        expect(mm.words.length).toEqual(13);
    })

    
})
describe("Markov Machine .makeText() produces random text", function(){
    let mm;
    beforeAll(function () {
        mm = new MarkovMachine('the cat in the hat is extremely silly in the cat hat extremely');
    })

    test('num of words returned is proper', function(){
        let result = mm.makeText(1)
        expect(result.length).toBeLessThanOrEqual(10);
    })
    test('Results are random', function(){
    
        let resultsArr = [];
        let bool;
        for (let i = 0; i < 10; i++){
            let result = mm.makeText(10);
            resultsArr.push(result);
        }
        for (let result of resultsArr){
            bool = result === resultsArr[0];
            if (!bool) break;
        }
        expect(bool).toBeFalsy();
    })
})