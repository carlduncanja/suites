import React from 'react';
import Record from './Record';

export function PersonalRecord({recordTitle,recordValue}){
    return(
        <Record 
            valueColor="#1D2129" 
            recordTitle={recordTitle}
            recordValue={recordValue}
        />
    )
}

export function MissingValueRecord({recordTitle}){
    return(
        <Record 
            valueColor="#1D2129" 
            recordTitle={recordTitle}
            recordValue = "--"
        />
    )
}

export function ContactRecord({recordTitle,recordValue}){
    return(
        <Record 
            valueColor="#3182CE" 
            recordTitle={recordTitle}
            recordValue={recordValue}
        />
    )
}