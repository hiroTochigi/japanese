import React from 'react';
import Word from "./Word"

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