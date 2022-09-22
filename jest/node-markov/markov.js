/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    for (let i = 0; i < this.words.length; i++){
      const word  = this.words[i];
      const nextWord = this.words[i + 1] ? this.words[i + 1] : null;
      if (!(word in this.chains)){
        this.chains[word] = [];
        this.chains[word].push(nextWord);
      } else {
        this.chains[word].push(nextWord);
      }
    }
  }




  /** return random text from chains */

  makeText(numWords = 100) {
    let returnText = "";

    let nextWords = Object.keys(this.chains);
    let nextIndex = Math.floor(Math.random() * nextWords.length);
    let nextWord = nextWords[nextIndex];

    for (let i = 0; i < numWords; i++){
      // TODO: only add a space if i != 0
      returnText += " " + nextWord;
      nextWords = this.chains[nextWord];
      nextIndex = Math.floor(Math.random() * nextWords.length);
      nextWord = nextWords[nextIndex];
      if (nextWord === null) break;
    }
    
    return returnText;
  }
}

module.exports ={
  MarkovMachine:MarkovMachine
};

