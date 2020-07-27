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
    //console.log(props.word)
    let { basic_form, 
        conjugated_form,
        conjugated_type,
        pos,
        pos_detail_1,
        pos_detail_2,
        pos_detail_3,
        pronunciation,
        reading,
        surface_form,
        meaning,
        word_type} = props.word

        let key = props.props.meaningKey
    
        reading = changeKanaToRoma(reading)
        console.log(key)
                    
        return(
            <WordBox
            pos={pos}
            surface_form={surface_form}
            reading={reading} 
            />
        )
    }

export default Word;

/*
<tr>
            <td>{basic_form}</td>
            <td>{conjugated_form}</td>
            <td>{conjugated_type}</td>
            <td>{pos}</td>
            <td>{pos_detail_1}</td>
            <td>{pos_detail_2}</td>
            <td>{pos_detail_3}</td>
            <td>{pronunciation}</td>
            <td>{reading}</td>
            <td>{surface_form}</td>
            <td>{word_type}</td>
            <td></td>
        </tr>
*/