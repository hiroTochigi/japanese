import React from 'react';
import './App.css';
import Form from "./module/Form"
import WordList from "./module/WordList"
import MeaningBox from "./module/MeaningBox"
import kuromoji from "../node_modules/kuromoji/build/kuromoji"

class App extends React.Component{

  constructor(props) {
    super(props);
  
    this.state = {
      sentence: '',
      wordList: {},
      keys: [],
      currentMeaningKey: "",
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
    "助動詞": "Auxiliary verb",
    "形容詞": "I-adjective",
    "形容動詞": "Na-adjective",
    "助詞": "particle", }
    return posList[pos]
  }
  
  changeValue = (list) => {
    for (let key in list){
      console.log(key)
      console.log(list[key])
      list[key].pos = this.getPos(list[key].pos) 
    }
    return list
  }

  setList = (list, keySet) => {
    list = this.changeValue(list)
    this.setState((state) => {
      return {wordList: list,
              keys: keySet
      }
    });
  }

  setCurrentMeaninkgKey = (clickedKey) =>{
    this.setState({currentMeaningKey:clickedKey})
  }

  getSuitableMeaning = (basic_form, meaning) => {
    let suitableMeaning = ""
    meaning["data"].forEach(element => {
        if (element.slug === basic_form){
            suitableMeaning = element
        }         
    });

    if (suitableMeaning === ""){
        return meaning["data"][0]
    }
    return suitableMeaning
  }

  setMeaning = (meaning, key, basic_form) => {
    var wordList = this.state.wordList
    wordList[key]["meaning"] = this.getSuitableMeaning(basic_form, meaning) 
    this.setState({
      wordList: Object.assign(wordList) 
    })
  }

  shouldGetMeaning = (word) => {
    return word.basic_form !== "*"
           && word.pos !== "記号" &&
           !(word.pos === "名詞" && word.pos_detail_1 === "固有名詞")
  }

  handleSubmit = (event) => {
    const mySentence = this.state.sentence

    let kuromojiPromise = new Promise((res, err) => {
      kuromoji.builder({ dicPath: "/dict" }).build((error, tokenizer) =>{
        const path = tokenizer.tokenize(mySentence)
        if(path){
          res(path)
        }
          err(error)     
      }) 
    })

    kuromojiPromise
    .then(resolve => {
      var wordList = {}
      var keys = []
      for (let i=0; i<resolve.length; i++){
        let key = resolve[i]["basic_form"] + resolve[i]["word_position"]
        wordList[key] = resolve[i]
        keys.push(key)
      }
      this.setList(wordList, keys)
      return resolve }
    )
    .then(allWords => 
      allWords.map(word => { 
      if(this.shouldGetMeaning(word)) 
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
        .then(data => this.setMeaning(data, key, word.basic_form))
        }
      })
    )
    .catch(error => console.log(error))
  }

  render(){
    let meaning;
    const {sentence, wordList, keys, currentMeaningKey} = this.state;
    const haveMeaning = (wordList[currentMeaningKey] !== undefined)
    
    if (haveMeaning){
      meaning = wordList[currentMeaningKey].meaning
    }

    console.log(haveMeaning)

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
          setCurrentMeaninkgKey={this.setCurrentMeaninkgKey}
        />
        {(haveMeaning && meaning !== undefined) ? 
        <MeaningBox
          meaning={meaning}
        />
         : null}
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

