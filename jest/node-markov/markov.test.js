const { MarkovMachine } = require('./markov');
// installed via: npm install --save-dev lodash
const { uniq } = require("lodash");

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

    // TODO: test full chains object (good code documentation)

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
        for (let i = 0; i < 10; i++){
            let result = mm.makeText(10);
            resultsArr.push(result);
        }

        const duplicate = resultsArr.slice(1).some((r)=> r === resultsArr[0])

        expect(duplicate).toBe(false);

        // TODO: rework test to be a more robust proxy for random-ness, 
        // rather than just checking that first result is not duplicated.
        // One (not perfect) alternative:
        const outputs = [];
        for (let i = 0; i < 10; i++) {
           outputs.push(mm.makeText(1000))
        }
        const uniqueOutputs = uniq(outputs)
        // WARNING: this test will be flaky! occasionally it will fail
        // Testing for randomness is a hard problem :) 
        expect(uniqueOutputs.length >= 7).toBe(true)
    })
})