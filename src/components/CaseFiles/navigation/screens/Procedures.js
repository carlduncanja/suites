import React from 'react';
import ProcedureDetailsContainer from '../../OverlayPages/Procedures/ProcedureDetailsContainer';
import { ScrollView, View } from 'react-native';

const Procedures = ({procedures, caseId, proceduresBillableItems}) => {

    console.log(" this is the Procedures for this case : ", procedures);
    return (

        <ProcedureDetailsContainer
            tabDetails={procedures}
            caseId={caseId}
            proceduresBillableItems={proceduresBillableItems}
        />
   
    );
};

export default Procedures;
