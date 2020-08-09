import React from 'react';
import Meaning from './MeaningCard'

function MeaningBox(prop){
    let {slug, is_common, tags, jlpt, senses} = prop.meaning
const meaningList = senses.map(sense => <Meaning sense={sense} />)

    return (
        <div>
            <p>{slug}</p>
            {meaningList}
        </div>
    )
}

export default MeaningBox;

/*
{slug, is_common, tags, jlpt, japanese, senses
*/