import React from 'react';
import Word from "./Word"

/*
class WordList extends React.Component {
    constructor(props) {
      super(props);

    }

    getMeaning(id, meaningDict) {
        var meaning = meaningDict[id]
        console.log(meaning) 
    }

    makeWordList(){
        const { wordList, meaningDict } = this.props 
        let words
        console.log(meaningDict)
        console.log(wordList)
        if (wordList !== null){
            words = []
            for (const [key, value] of Object.entries(wordList)) {
                this.getMeaning(value.meaningId, meaningDict)
                words.push(<Word word={value} />)
            }
        }else{
            words = "Enter new sentences"
        }
        return words
    }
    
  
    render() {
      return (
        <div id="overFlowBox">
            <p>{this.makeWordList()}</p>
        </div>
      );
    }
  }
*/


function getMeaning(id, meaningDict) {
    console.log(id)
    var meaning = meaningDict[id]
    console.log(meaning) 
}

function WordList(props) {
    const { wordList, keys} = props 
    let words
    console.log(wordList)
    if (wordList !== null){
        words = []
        
        for (const key of keys) {
            words.push(<Word word={wordList[key]} />)
          }
    }else{
         words = "Enter new sentences"
    }
    
    return( 
        <div id="overFlowBox">
            <p>{words}</p>
        </div>
    )
}

export default WordList;

/*

<table>
            <tr>
                <th>basic_form</th>
                <th>conjugated_form</th>
                <th>conjugated_type</th>
                <th>pos</th>
                <th>pos_detail_1</th>
                <th>pos_detail_2</th>
                <th>pos_detail_3</th>
                <th>pronunciation</th>
                <th>reading</th>
                <th>surface_form</th>
                <th>word_type</th>
                <th>Meaning</th>
            </tr>
            {words}
        </table>
*/