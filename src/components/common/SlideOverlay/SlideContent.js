import React,{ useContext} from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function SlideContent({overlayContent = ()=>{} }){
    
    const theme = useTheme();
    const SlideContentWrapper = styled.View`
        flex:1;
        margin : 0px;
        padding-top: ${theme.space['--space-32']};
   
        padding-left: ${theme.space['--space-24']};
        padding-right: ${theme.space['--space-24']};
    `

    const SlideContentContainer = styled.View`
        display: flex;
        flex:1;
    `
    return ( 
        <SlideContentWrapper>
            <SlideContentContainer>
                {overlayContent}
            </SlideContentContainer>
        </SlideContentWrapper>
            
       
    ); 
}
 
export default SlideContent;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //width:'100%',
        backgroundColor: '#fff',
    }
    
})
