import React, { useContext } from 'react';
import Heading from './Heading';
import EditButtonStyle from '../OverlayButtons/EditButtonStyle';
import { EditButton } from '../OverlayButtons/OverlayButtonStyles';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function ViewModeHeading({id = '',title = '', onButtonPress = ()=>{}}){

    const theme = useTheme();

    return( 
        <Heading 
            headerId={id} 
            headerName={title}
            backgroundColor={theme.colors['--color-gray-200']}
            headerIdColor={theme.colors['--company']}
            headerNameColor={theme.colors['--accent-button']}
            button={<EditButtonStyle onPress={onButtonPress}/>}
        />
    )
}

export default ViewModeHeading
