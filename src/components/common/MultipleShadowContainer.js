import React, {useEffect, useState} from 'react';
import MultipleShadows from 'react-native-multiple-shadows';

function MultipleShadowsContainer({shadows = [], children, hasShadow = true}){
    let count = shadows.length
 
    return(
        hasShadow ?
            <MultipleShadows count = {count} shadowStyles = {shadows}>
                {children}
            </MultipleShadows>
            :
            <>
                {children}
            </>
    )
}

export default MultipleShadowsContainer