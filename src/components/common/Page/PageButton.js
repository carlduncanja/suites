import React from 'react';
import {View, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';
import styled from "@emotion/native"
import {useTheme} from "emotion-theming";

const ButtonWrapper = styled.TouchableOpacity`
  flex: 1;
  display: flex;
  padding: ${({theme}) => theme.space['--space-16']};
  border-radius: 8px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background-color: ${({backgroundColor}) => backgroundColor || theme.colors['--color-blue-500']}
`


const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

const ButtonText = styled.Text(({theme, color}) => ({
    ...theme.font['--text-base-bold'],
    color: color || theme.colors['--default-shade-white'],
}))

const IconWrapper = styled.View`
   margin-bottom: 2px;
   margin-left: 8px;
   margin-right: 8px;
`


function PageButton({onPress, text, IconLeft, IconRight, backgroundColor, fontColor }) {
    const theme = useTheme();

    return (
        <ButtonWrapper theme={theme} backgroundColor={backgroundColor} onPress={onPress}>
            <ButtonContainer theme={theme}>

                <IconWrapper>
                    {
                        IconLeft
                    }
                </IconWrapper>

                <ButtonText color={fontColor}>{text}</ButtonText>

                <IconWrapper>
                {
                    IconRight
                }
                </IconWrapper>

            </ButtonContainer>
        </ButtonWrapper>
    );
}

PageButton.propTypes = {};
PageButton.defaultProps = {};

export default PageButton;
