import React from 'react';
import Word from "./Word"

function WordList(props) {
    const wordList = props.wordList; 
    let words

    if (wordList !== null){
        words = []
        for (const [key, value] of Object.entries(wordList)) {
            words.push(<Word word={value}/>)
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