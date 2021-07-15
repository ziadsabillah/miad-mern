import StepWizard from "react-step-wizard";
import SelectDate from "../components/SelectDate";
import SelectTime from "../components/SelectTime";
import React, { useState, useEffect } from 'react';

const AppointmentEdit = () => {



    return (
        <StepWizard>
            <SelectDate />
            <SelectTime />
        </StepWizard>
    )
}

export default AppointmentEdit;