import React from 'react';
import Word from "./Word"

function WordList(props) {
    const { wordList, keys} = props 
    let words = wordList ? 
        keys.map(key => <Word word={wordList[key]} />) 
        : 
        "Enter new sentences"
    return( 
        <div id="overFlowBox">
            <p>{words}</p>
        </div>
    )
}

export default WordList;