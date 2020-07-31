import React, {Component, useState} from 'react';
import InputText from '../InputText';
import Close from '../../../../assets/svg/clearIcon';
import IconButton from '../Buttons/IconButton';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function MatchesFoundComponent({onPressNewSearch = ()=>{}, matchesFound = []}){

    const theme = useTheme();

    const MatchesFoundWrapper = styled.View`
        width: 125px;

        align-items: center;
        justify-content: space-between;
    `;

    const MatchesFoundContainer = styled.View`
        flex-direction: row;
        align-items: center;
        align-self: center;
        justify-content: center;
    `;

    const MatchesFoundTitle = styled.Text({
        ...theme.font['--text-xs-medium'],
        color: theme.colors['--color-blue-600']
    })

    return(
        <MatchesFoundWrapper>
            <MatchesFoundContainer>

                <MatchesFoundTitle>{matchesFound} matches found</MatchesFoundTitle>
                
                <IconButton
                    Icon = {<Close/>}
                    onPress = {onPressNewSearch}
                />
            
               
            </MatchesFoundContainer>
        </MatchesFoundWrapper>
    )

}

export default MatchesFoundComponent