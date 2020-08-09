import React from 'react';
import "./meaningCard.css"

function MeaningCard(prop){

    const getMeaningData = (meaning) => { return <div className="card">
    {Object.keys(meaning).map((key, i) =>  meaning[key].length > 0 && key !== "links" ? 
        <p>
            {key}: &nbsp; {meaning[key].map((el , i, arr) =>
            arr.length - 1 === i ? el : el + ", ")}
        </p>
        :
        null)} </div>}

    return (
        <div className="cardDisplay">
            {getMeaningData(prop.sense)}
        </div>
    )
}

export default MeaningCard;