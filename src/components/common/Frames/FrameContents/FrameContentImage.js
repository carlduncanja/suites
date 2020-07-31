import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FrameImageItem from '../FrameItems/FrameImageItem';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function FrameContentImage({cardInformation = []}){ 

  const theme = useTheme();
  const testImage = [{name : "XRAY-1"}];
  const FrameContentImageWrapper = styled.ScrollView`
    width: 100%;
    height : ${ testImage.length > 0 ? '374px' : null};
  `;

  const FrameContentImageContainer = styled.View`
    width : 100%;
    height : 100%;
    border-width : 1px;
    background-color: ${theme.colors['--color-gray-100']};
    border-color : ${theme.colors['--color-gray-400']};
    border-top-width : 0px;
    border-bottom-left-radius : 8px;
    border-bottom-right-radius : 8px;
    padding-top: ${theme.space['--space-16']};
    padding-bottom : ${theme.space['--space-4']};
    padding-left: ${theme.space['--space-16']};
    padding-right: ${theme.space['--space-16']};
  `;

  
    return (
      <FrameContentImageWrapper bounces = {false} contentContainerStyle = {{flex:1}}>
        <FrameContentImageContainer>
            {testImage.map((image,index)=>
                <FrameImageItem image={image} key = {index}/>
            )}
        </FrameContentImageContainer> 
      </FrameContentImageWrapper>
    );
  
}

export default FrameContentImage

const styles = StyleSheet.create({
  container:{
    borderWidth:1,
    borderColor:'#CCD6E0',
    borderTopWidth:0,
    borderBottomWidth:0,
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8
  }
})