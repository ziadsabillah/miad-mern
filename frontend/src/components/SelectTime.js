import React from 'react';
const SelectTime = ({nextStep, previousStep}) => {
    return (
        <>

        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        }}>
            Select Time
        </div>

        <button onClick={nextStep}>Continue</button>
        <button onClick={previousStep}>Previous</button>
        </>
    )
}

export default SelectTime;