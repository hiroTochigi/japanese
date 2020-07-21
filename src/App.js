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
      wordList: {},
      keys: [],
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

  setList = (list, keySet) => {
    this.setState((state) => {
      return {wordList: list,
              keys: keySet
      }
    });
  }

  setMeaning = (meaning, key) => {
    var wordList = this.state.wordList
    wordList[key]["meaning"] = meaning 
    this.setState({
      wordList: Object.assign(wordList) 
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
      var wordList = {}
      var keys = []
      for (let i=0; i<resolve.length; i++){
        wordList[resolve[i]["basic_form"] + resolve[i]["word_position"]] = resolve[i]
        keys.push(resolve[i]["basic_form"] + resolve[i]["word_position"])
      }
      this.setList(wordList, keys)
      return resolve }
    )
    .then(allWords => 
      allWords.map(word => { 
      if(word.pos !== "記号" && !(word.pos === "名詞" && word.pos_detail_1 === "固有名詞")) 
        {
          let key = word.basic_form + word.word_position
          const data = {
            pos: word.pos,
            word: word.basic_form
          }
          fetch("http://localhost:3002/getMeaning", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
          })
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
    const keys = this.state.keys
    
    return (
      <div className="App">
        <h1>Japanese Learning Center</h1>
        <Form
        sentnece={sentence} 
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}/>
        <WordList 
          wordList={wordList}
          keys={keys}
        />
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

