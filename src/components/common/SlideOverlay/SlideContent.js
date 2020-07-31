import React,{ useContext} from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function SlideContent({overlayContent = ()=>{} }){
    
    const SlideContentWrapper = styled.View`
        flex:1;
        margin : 0px;
        padding-top: 32px;
        padding-bottom: 32px;
        padding-left: 24px;
        padding-right: 24px;
        background-color: red;
    `

    const SlideContentContainer = styled.View`
        display: flex;
        flex:1;
        background-color: green;
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