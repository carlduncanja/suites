import React from 'react';
import {View, Text, StyleSheet} from 'react-native'; 

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const HeaderContainer = styled.View`
    margin-bottom : 24px;
`;
    
const Title = styled.Text( ({theme}) =>({
    ...theme.font['--text-2xl-medium'],
    color:theme.colors['--company']
}))

function PageTitle ({pageTitle = ""}){ 

    const theme = useTheme()

    

    return ( 
        <>
            <HeaderContainer>
                <Title theme = {theme}>
                    {pageTitle}
                </Title>
            </HeaderContainer>
        </>
    );
}
 
export default PageTitle;
