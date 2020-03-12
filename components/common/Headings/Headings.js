import React, { useContext } from 'react';
import Heading from './Heading';
import { EditButton,DoneButton } from '../OverlayButtons/OverlayButtonStyles'
import { SuitesContext } from '../../../contexts/SuitesContext';



export function EditModeHeading({caseFile}){
    return(
        <Heading 
            caseFile={caseFile}
            backgroundColor="#83AED1"
            headerIdColor="#104587"
            headerNameColor="#FFFFFF"
            editMessage="now in edit mode"
            button={<DoneButton/>}
        />
    )
}

export function ViewModeHeading({headerId, headerName}){
    const suitesState = useContext(SuitesContext).state
    return(
        <Heading 
            headerId={suitesState.slideOverlay.slideOverlayHeader.id}
            headerName={suitesState.slideOverlay.slideOverlayHeader.name}
            backgroundColor="#EEF2F6"
            headerIdColor="#104587"
            headerNameColor="#0CB0E7"
            button={<EditButton/>}
        />
    )
}