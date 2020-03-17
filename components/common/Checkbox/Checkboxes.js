import React from 'react';
import Checkbox from './Checkbox';
import SvgIcon from '../../../assets/SvgIcon'

export function CheckedBox(){
    return(
        <Checkbox icon={<SvgIcon iconName = "checkboxTick"/>} />
    )
}

export function PartialCheckbox(){
    return(
        <Checkbox icon={<SvgIcon iconName = "partialCheck"/>} />
    )
}