import React from "react";
import OverlayButton from './OverlayButton'

export function EditButton (){
    return(
        <OverlayButton
            backgroundColor="#0CB0E7"
            color="#FFFFFF"
            title="Edit"
        />
    )
}

export function DoneButton (){
    return(
        <OverlayButton
            backgroundColor="#FFFFFF"
            color="#0CB0E7"
            title="Done"
        />
    )
}

export function DisabledEditButton (){
    return(
        <OverlayButton
            backgroundColor="#FFFFFF"
            color="#A0AEC0"
            title="Edit"
        /> 
    )
}