import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconButton from '../../Buttons/IconButton';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import FrameTitle from '../FrameTitle'
import WasteIcon from '../../../../../assets/svg/wasteIcon'
import Record from '../../../common/Information Record/Record';
import Row from '../../../common/Row';

const FrameItemWrapper = styled.View`
    width: 100%;
    display:flex;
    margin-bottom : ${({ theme }) => theme.space['--space-12']};
`;
const FrameItemContainer = styled.View`

    width : 100%;
    height : 203px;
    border : 1px solid ${({ theme }) => theme.colors['--color-gray-400']};
    border-radius : 4px;
    background-color : ${({ theme }) => theme.colors['--default-shade-white']};
    
    
`;

const FrameItemContent = styled.Text(({ theme }) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-900']

}));

const FrameHeader = styled.View`
width: 100%;
height: 32px;
background-color : ${({ theme }) => theme.colors['--default-shade-white']};
padding-left : ${({ theme }) => theme.space['--space-16']};
padding-right : ${({ theme }) => theme.space['--space-16']};
justify-content : space-between;
align-items: center;
flex-direction : row;
border-top-left-radius : 4px;
border-top-right-radius : 4px;
border-width: 1px;
border-color : ${({ theme }) => theme.colors['--color-gray-400']};
`

const FrameBody = styled.View`
display: flex;
padding-left:25px;
padding-right:25px;
padding-bottom:25px;
height:171px;
justify-content:center;
`
const FrameContent = styled.View`
flex-direction : row;
justify-content : space-between;
`

const CancelButtonContainer = styled.TouchableOpacity`
    align-items: center;
    padding: 10px;
    padding-top : 12px;
    border-radius: 10px;
    border-width: 1px;
    background-color: #FFFFFFF;
    width: 99px;
    height: 40px;
    border-color:#3182CE;
    /* margin-left:5px; */
`;

const ModalText = styled.Text(({ textColor = '--color-gray-600', theme, font = '--confirm-title' }) => ({
    ...theme.font[font],
    color: theme.colors[textColor],
    paddingTop: 2,
    textAlign: 'center',
}));

const RecordContainer = styled.View` 
width:52px;
`

const ButtonContainer = styled.TouchableOpacity`
    height : 40px;
    width : ${({ fullWidth }) => fullWidth === true ? '100%' : null};
    display:flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => `0 ${theme.space['--space-16']}`};
    border-radius: 8px;
    background-color: ${({ background, theme }) => theme.colors[background]};
    border: ${({ theme, borderColor }) => borderColor ? `1px solid ${theme.colors[borderColor]}` : null};

`;

function FrameEditItem({ itemContent = {}, onPressButton = () => { }, onDelete = () => { } }) {

    const theme = useTheme();
    console.log('item content for edit page ', itemContent)
    return (
        <FrameItemWrapper theme={theme}>
            <FrameItemContainer theme={theme}>
                <FrameHeader>
                    <Text>Edit Items</Text>
                    <TouchableOpacity onPress={onDelete}>
                        <WasteIcon strokeColor={theme.colors['--color-red-700']} />
                    </TouchableOpacity>
                </FrameHeader>

                <FrameBody>
                    <FrameContent>

                        <Record
                            recordTitle="Name"
                            flex={.75}
                            recordValue={itemContent.name}
                            editMode={true}
                            useTextArea={true}
                        />


                        <Record
                            recordTitle="Type"
                            flex={.75}
                            recordValue={"Nuero Sergeon"}
                            editMode={true}
                            useTextArea={true}
                        />
                    </FrameContent>

                    <FrameContent>

                        <CancelButtonContainer theme={theme} background='--color-gray-300'>
                            <ModalText theme={theme} textColor="--color-blue-600" font="--text-base-bold">Cancel</ModalText>
                        </CancelButtonContainer>

                        <ButtonContainer
                            onPress={() => { }}
                            theme={theme}
                            background='--color-gray-300'
                        >
                            <ModalText theme={theme} textColor="--default-shade-white" font="--text-base-bold">Save</ModalText>
                        </ButtonContainer>

                    </FrameContent>

                </FrameBody>


            </FrameItemContainer>

        </FrameItemWrapper>
    )
}
export default FrameEditItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#CCD6E0',
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    text: {
        fontSize: 16,
        color: '#1D2129',
        //fontFamily:'Metropolis'
    }
})