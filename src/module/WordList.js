import React from 'react';
import Word from "./Word"

// If wordList is empty, render Enter new sentences
// Otherwise, render words.

function WordList(props) {
    const { wordList, keys, setCurrentMeaninkgKey } = props 
    let words = wordList ? 
        keys.map(key => <Word 
                        word={wordList[key]}
                        meaningKey={key}
                        setCurrentMeaninkgKey={setCurrentMeaninkgKey}/>) 
        : 
        "Enter new sentences"
    return( 
        <div id="overFlowBox">
            <p>{words}</p>
        </div>
    )
}

export default WordList;