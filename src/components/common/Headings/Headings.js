import React, { useContext } from 'react';
import Heading from './Heading';
import { EditButton,DoneButton } from '../OverlayButtons/OverlayButtonStyles'
import { SuitesContext } from '../../../contexts/SuitesContext';

export function EditModeHeading(){ 
    const [state] = useContext(SuitesContext)
    return( 
        <Heading 
            headerId={state.selectedListItem.selectedListItemId}
            headerName={state.selectedListItem.selectedListObject.caseFileDetails.title}
            backgroundColor="#83AED1"
            headerIdColor="#104587"
            headerNameColor="#FFFFFF"
            editMessage="now in edit mode"
            button={<DoneButton/>}
        />
    )
}

export function ViewModeHeading(){
    const [state] = useContext(SuitesContext)
    return(
        <Heading 
            headerId={state.selectedListItem.selectedListItemId}
            headerName={state.selectedListItem.selectedListObject.caseFileDetails.title}
            backgroundColor="#EEF2F6"
            headerIdColor="#104587"
            headerNameColor="#0CB0E7"
            button={<EditButton/>}
        />
    )
}