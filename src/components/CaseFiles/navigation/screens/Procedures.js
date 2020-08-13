import React from 'react';
import ProcedureDetailsContainer from '../../OverlayPages/Procedures/ProcedureDetailsContainer'

const Procedures = ({procedures}) => {
    return (
        <ProcedureDetailsContainer tabDetails={procedures}/>
    );
}

export default Procedures;

