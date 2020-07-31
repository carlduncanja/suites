import React from 'react';
import {View, Text, StyleSheet} from 'react-native'; 

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function PageTitle ({pageTitle = ""}){ 

    const theme = useTheme()

    const HeaderContainer = styled.View`
        margin-bottom : 24px;
    `;
    
    const Title = styled.Text({...theme.font['--text-2xl-medium'],color:theme.colors['--company']})

    return ( 
        <>
            <HeaderContainer>
                <Title>
                    {pageTitle}
                </Title>
            </HeaderContainer>
        </>
    );
}
 
export default PageTitle;
