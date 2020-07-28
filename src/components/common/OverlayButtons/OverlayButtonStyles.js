import React from "react";
import OverlayButton from './OverlayButton'
import Button from "../Buttons/Button";

export function EditButton ({onPress}){
    return(
        <Button
            backgroundColor="#0CB0E7" 
            color="#FFFFFF"
            title="Edit"
            onPress={onPress}
        />
    )
}

export function DoneButton ({onPress}){
    return(
        <OverlayButton
            backgroundColor="#FFFFFF"
            color="#0CB0E7"
            title="Done"
            onPress={onPress}
        />
    )
}

export function DisabledEditButton (){
    return(
        <OverlayButton
            backgroundColor="#FFFFFF"
            color="#A0AEC0"
            title="Edit"
            onPress={onPress}
        />
    )
}
