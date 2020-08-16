import React from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator} from 'react-native'
import styled from '@emotion/native'
import {colors} from "../styles";
import {useTheme} from "emotion-theming";


const Wrapper = styled.View`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  position: absolute;
`

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({backgroundColor}) => backgroundColor};
`


function LoadingComponent({
                              color,
                              size = 'large',
                              backgroundColor = 'none',
                          }) {

    const theme = useTheme();

    return (
        <Wrapper>
            <Container theme={theme} backgroundColor={backgroundColor}>

                <ActivityIndicator style={{alignSelf: 'center'}} size={size} color={color}/>

            </Container>
        </Wrapper>
    );
}

LoadingComponent.propTypes = {};
LoadingComponent.defaultProps = {};

export default LoadingComponent;
