import React from 'react';

function WordBox(props) {

    const{pos, surface_form, reading, meaningKey} = props
    let setCurrentMeaninkgKey = (event) => {
        props.setCurrentMeaninkgKey(meaningKey)
    }
    
    return(
        <span onClick={setCurrentMeaninkgKey} className="word"> 
            <ruby>
                <abbr title={pos}>{surface_form}</abbr>
                <rt>{reading}</rt>
            </ruby>
            &nbsp;&nbsp;
        </span>
    )
}

export default WordBox;