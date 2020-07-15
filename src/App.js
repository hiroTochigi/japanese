import React from 'react';
import './App.css';
import Form from "./module/Form"
import WordList from "./module/WordList"
import kuromoji from "../node_modules/kuromoji/build/kuromoji"


class App extends React.Component{

  constructor(props) {
    super(props);
  
    this.state = {
      sentence: '',
      wordList: [],
      meaning: {}
    };
  }

  handleChange = (sentence) => {
    this.setState({sentence: sentence});
  }

  getPos = (pos) => {
    const posList = 
    {
    "名詞": "noun",
    "動詞": "verb", 
    "助動詞": "verb",
    "形容詞": "adjective",
    "形容動詞": "adjective",
    "助詞": "particle", }
    console.log(posList[pos])
    return posList[pos]
  } 

  setWordList = (resoleve) => {
    this.setState((state) => {
      return {wordList: resoleve}
    });
  }

  setMeaning = (meaning, key) => {
    this.setState({
      meaning: Object.assign(meaning[key] = meaning) 
    })
  }

  handleSubmit = (event) => {
    const mySentence = this.state.sentence

    let promise = new Promise((res, err) => {
      kuromoji.builder({ dicPath: "/dict" }).build((error, tokenizer) =>{
        const path = tokenizer.tokenize(mySentence)
        if(path){
          res(path)
        }
          err(error)     
      }) 
    })

    promise
    .then(resolve => {
      this.setWordList(resolve)
      return resolve }
    )
    .then(allWords => 
      allWords.map(word => { 
      if(word.pos !== "記号" && !(word.pos === "名詞" && word.pos_detail_1 === "固有名詞")) 
        {
          let key = word.basic_form + word.word_position
          fetch(`https://cors-anywhere.herokuapp.com/http://beta.jisho.org/api/v1/search/words?keyword=${word.basic_form}%20%23${this.getPos(word.pos)}`)
        .then(response => response.json())
        .then(data => this.setMeaning(data, key))
        }
      })
    )
    .catch(error => console.log(error))
  }

  render(){
    const sentence = this.state.sentence
    const wordList = this.state.wordList
    const meaning = this.state.meaning
    console.log(wordList)
    console.log(meaning)
    return (
      <div className="App">
        <h1>Japanese Learning Center</h1>
        <Form
        sentnece={sentence} 
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}/>
        <WordList wordList={wordList}/>
      </div>
    );
  }
}

export default App;

/*
basic_form: "の"
conjugated_form: "*"
conjugated_type: "*"
pos: "助詞"
pos_detail_1: "連体化"
pos_detail_2: "*"
pos_detail_3: "*"
pronunciation: "ノ"
reading: "ノ"
surface_form: "の"
word_id: 93100
word_position: 3
word_type: "KNOWN"

*/

