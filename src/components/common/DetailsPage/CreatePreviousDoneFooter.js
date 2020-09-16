import React, {useState} from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from "emotion-theming";
import Button from '../Buttons/Button';
import BackIcon from '../../../../assets/svg/paginationLeft';
import NextIcon from '../../../../assets/svg/paginationRight';

const FooterWrapper = styled.View`
    display: flex;
    height: 84px;
    width: 100%;
    padding-left : ${ ({theme}) => theme.space['--space-24']};
    padding-right : ${ ({theme}) => theme.space['--space-24']};
`;

const FooterContainer = styled.View`
    flex-direction : row;
    height : 100%;
    width : 100%;
    border-top-color : ${ ({theme}) => theme.colors['--color-gray-300']};
    border-top-width : 1px;
    align-items : center;
    justify-content : space-between;
`;

const ButtonContainer = styled.View`
    height : 48px;
    width  : 128px;
    justify-content: center;
    align-items: center;
    background-color : ${({theme, isDisabled}) => isDisabled ? theme.colors["--color-gray-200"] : theme.colors["--color-blue-500"]};
    border-radius : 8px;
`;

const IconButtonContainer= styled.TouchableOpacity`
    height : 48px;
    width  : 128px;
    padding-left : ${ ({theme}) => theme.space["--space-10"]} ;
    padding-right : ${ ({theme}) => theme.space["--space-10"]} ;
    flex-direction : row;
    justify-content: space-between;
    align-items: center;
    background-color : ${({theme, isDisabled}) => isDisabled ? theme.colors["--default-shade-white"] : theme.colors["--color-blue-500"]};
    border-radius : 8px;
    border : ${ ({theme, isDisabled}) => isDisabled ? `1px solid ${theme.colors['--color-gray-300']}` : null };
`

const ButtonText = styled.Text`
    font:${({theme}) => theme.font["--text-base-bold"]};
    color:${({theme, isDisabled}) => isDisabled ? theme.colors['--color-gray-300'] : theme.colors["--default-shade-white"]};
`;


function CreatePageDoneFooter ({
    isFinished = true, 
    isPreviousDisabled = true ,
    onFooterPress = ()=>{},
    onFooterPreviousPress = () => {}
}){

    const theme = useTheme();
    let disabledBorder = !isPreviousDisabled ? `1px solid ${theme.colors['--color-blue-500']}` : null;
    let disabledColor = !isPreviousDisabled ? theme.colors['--color-blue-500'] : null;
    return(
        <FooterWrapper theme={theme} onPress = {onFooterPress}>
            <FooterContainer theme={theme}>

                <IconButtonContainer
                    onPress = {()=>onFooterPreviousPress()}
                    disabled = {isPreviousDisabled}
                    isDisabled = {isPreviousDisabled}
                    style = {css`
                        border : ${disabledBorder};
                        background-color : ${theme.colors['--default-shade-white']};
                    `}
                >
                    
                        <BackIcon strokeColor = {isPreviousDisabled ? theme.colors['--color-gray-300'] : theme.colors['--color-blue-500']}/>
                    <ButtonText style = {css`color : ${disabledColor}`} isDisabled = {isPreviousDisabled}>PREVIOUS</ButtonText>
                </IconButtonContainer>
                {
                    isFinished ?
                        <ButtonContainer isDisabled = {false}>
                            <Button
                                title = "DONE"
                                backgroundColor = {'--color-blue-500'}
                                buttonPress = {onFooterPress}
                                color = {theme.colors['--default-shade-white']}
                                font = {'--text-base-bold'}
                            />
                        </ButtonContainer>
                        :
                        <IconButtonContainer
                            style = {css`padding-left : 30px; padding-right: 30px;`}
                            onPress = {()=>{onFooterPress()}}
                        >
                            <ButtonText>NEXT</ButtonText>
                            <NextIcon strokeColor = {theme.colors['--default-shade-white']}/>
                        </IconButtonContainer>
                }
                

            </FooterContainer>
        </FooterWrapper>
    )
}

CreatePageDoneFooter.propTypes = {};
CreatePageDoneFooter.defaultProps = {};

export default CreatePageDoneFooter