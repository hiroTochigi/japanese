import React from 'react';
import WordBox from "./WordBox"
import kanaToRoman from "./kanaToRoman";

function changeKanaToRoma(reading){

    if (typeof reading === 'string' || typeof reading === 'number'){
        return kanaToRoman(reading)
    }
    return reading
}

function Word(props) {
    let { 
        pos,
        reading,
        surface_form,
        } = props.word
    let setCurrentMeaninkgKey = props.setCurrentMeaninkgKey
    let meaningKey = props.meaningKey
    
    reading = changeKanaToRoma(reading)
                
    return(
        <WordBox
        setCurrentMeaninkgKey={setCurrentMeaninkgKey}
        meaningKey={meaningKey}
        pos={pos}
        surface_form={surface_form}
        reading={reading} 
        />
        )
    }

export default Word;