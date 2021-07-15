import React from 'react';
const SelectDate = ({nextStep, previousStep}) => {
    return (
        <>
        Select Date Step
        <button onClick={nextStep}>Continue</button>
        <button onClick={previousStep}>Previous</button>
        </>
    )
}
export default SelectDate;