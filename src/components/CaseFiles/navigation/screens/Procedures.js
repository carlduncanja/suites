import React from 'react';
import ProcedureDetailsContainer from '../../OverlayPages/Procedures/ProcedureDetailsContainer';

const Procedures = ({procedures, caseId, proceduresBillableItems}) => {
    return (
        <ProcedureDetailsContainer
            tabDetails={procedures}
            caseId={caseId}
            proceduresBillableItems={proceduresBillableItems}
        />
    );
};

export default Procedures;
