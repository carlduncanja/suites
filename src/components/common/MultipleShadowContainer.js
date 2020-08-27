import React, {useEffect, useState} from 'react';
import MultipleShadows from 'react-native-multiple-shadows';

function MultipleShadowsContainer({shadows = [], children}){
    let count = shadows.length
    return(
        <MultipleShadows count = {count} shadowStyles = {shadows}>
            {children}
        </MultipleShadows>
    )
}

export default MultipleShadowsContainer