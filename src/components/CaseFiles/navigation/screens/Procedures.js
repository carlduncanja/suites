import React from 'react';
import ProcedureDetailsContainer from '../../OverlayPages/Procedures/ProcedureDetailsContainer'

const Procedures = ({procedures, caseId}) => {
    return (
        <ProcedureDetailsContainer tabDetails={procedures} caseId={caseId} />
    );
}

export default Procedures;

