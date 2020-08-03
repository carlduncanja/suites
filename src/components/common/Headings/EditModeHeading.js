import React, { useContext } from 'react';
import Heading from './Heading';
import DoneButton from '../OverlayButtons/DoneButton';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming'; 

function EditModeHeading({id = '',title = '', onButtonPress = ()=>{}}){ 
    const theme = useTheme();

    return(
        <Heading 
            headerId={id}
            headerName={title}
            headerIdColor={theme.colors['--company']}
            headerNameColor={theme.colors['--default-shade-white']}
            message="now in edit mode"
            button={<DoneButton onPress={onButtonPress}/>}
        />
    )
}

export default EditModeHeading
