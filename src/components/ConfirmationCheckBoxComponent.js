import React, { Component, useState } from 'react';
import { Modal, Text, StyleSheet } from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native-animatable';
import ClearIcon from '../../assets/svg/clearIcon';
import IconButton from './common/Buttons/IconButton';
import ErrorIcon from '../../assets/svg/ErrorIcon';
import TickIcon from '../../assets/svg/tickIcon';
import MultipleShadowsContainer from './common/MultipleShadowContainer';
import CheckBoxComponent from '../components/common/Checkbox';
import DateInputField from './common/Input Fields/DateInputField';
import moment from 'moment';

const ModalWrapper = styled.View`
    width: 440px;
    /*height: 400px;*/
    position: relative;
    background-color: white;
    border-radius: 8px;
    /* padding-bottom: 100px; */
    /* box-shadow: ${({ theme }) => theme.shadow['--shadow-lg']}; */
`;

const ModalContainer = styled.View`
    display: flex;
    height: 100%;
`;

const HeaderWrapper = styled.View`
    height: 40px;
    width: 100%;
    border-bottom-width: 0.25px;
    border-bottom-color: ${({ theme }) => theme.colors['--color-gray-1000']};
`;

const HeadingContainer = styled.View`
    height : 100%;
    align-items:center;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 12px;
    /* padding-top: 10px; */
    padding-right: 2px;
    /* padding-bottom: 10px; */
    
`;

const ModalText = styled.Text(({ textColor = '--color-gray-600', theme, font = '--confirm-title' }) => ({
    ...theme.font[font],
    color: theme.colors[textColor],
    paddingTop: 2,
    textAlign: 'center',
}));

const ClearIconContainer = styled.View`
    align-items:flex-end;
`;

const TextHeaderContainer = styled.Text`
    font-size:16px;
    font-weight:600;
    line-height: 16px;
    color: ${({ theme }) => theme.colors['--color-gray-600']};
  
  `;

const MessageWrapper = styled.View`
    height: 88px;
    width: 392px;
    justify-content:center;
    align-self:center;
    margin-top : ${({ theme }) => theme.space['--space-32']};
    margin-bottom : ${({ theme }) => theme.space['--space-32']};
   
`;
const MessageContainer = styled.View`
    display:flex;
    height: 100%;
    width: 318px;
    
    background-color: ${({ theme }) => theme.colors['--default-shade-white']};

    /* border-bottom-left-radius :8px;
    border-bottom-right-radius :8px; */
`;

const IconMessageContainer = styled.View`
    height: 128px;
    width: 100%;
    justify-content:space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.colors['--default-shade-white']};
    margin-top : ${({ theme }) => theme.space['--space-20']};
    margin-bottom : ${({ theme }) => theme.space['--space-20']};
    padding-top:8px;
    padding-bottom:8px;
`;

const MessageText = styled.Text`
    
    line-height: 20px;
    font-size: 17px;
    font-weight: normal;
    color: ${({ theme }) => theme.colors['--color-gray-700']};
`;

const ButtonView = styled.View`
    position : absolute;
    bottom: 0;
    left:0;
    right:0;
    height:40px;
    margin: ${({ theme }) => theme.space['--space-16']};
    margin-top: 0;
    flex-direction: row;
    justify-content:space-between;
`;

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

const ActionButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors['--color-blue-600']};
    color: ${({ theme }) => theme.colors['--default-shade-white']};
    width: 76px;
    height: 40px;
    padding: 5px;
    padding-top:7px;
    justify-content:center;
    border-radius: 10px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors['--default-shade-white']};
`;

const ActionButtonContainer = styled.View`
    align-items:flex-end;
    width:75%;
 `;

const GeneralText = styled.Text`
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
    align-self:center;
`;

const IconContainer = styled.View`
    align-self:center;
`;

const DeciderButtonContainer = styled.TouchableOpacity`
    height:45%;
    justify-content:flex-end;
`;

const DeciderButton = styled.View`
    align-self:center;
    border-radius: 10px;
    padding:15px;
    background-color:${({ theme }) => theme.colors['--color-blue-600']};
    color:${({ theme }) => theme.colors['--default-shade-white']};
    width:409px;
    height:46px;
`;

const AlertText = styled.Text`
    align-self:center;
    justify-content:center;
    font-size:18px;
    font-weight:bold;
    color:${({ theme }) => theme.colors['--color-gray-800']};
`;

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 15
    },
    {
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 6
    },
];

function ConfirmationCheckBoxComponent({
    isEditUpdate,
    isError,
    setEndTime ,
    onCancel = () => {
    },
    onAction = () => {
    },
    titleText = 'Confirm Action',
    message = '',
    confirmMessage="Yes, I want to delete",
    action = 'Save',
    type = '',
    caseFileActions,
    timeStamp,
    endTime
}) {
    const theme = useTheme();
    const [end, setEnd] = useState(endTime)
    const [isChecked, setIsChecked] = useState(false)
    const [isChecked1, setIsChecked1] = useState(false)
    const [isChecked2, setIsChecked2] = useState(false)
    const [isChecked3, setIsChecked3] = useState(false)

    let actions = [
       { 
            id: 1,
            name: 'Consumables updated',
            time: "" , 
        }, 
        {
            id: 2,
            name: 'Equioment used updated',
            time: '',
            isChecked: false   
        }, 
        {
            id: 3,
            name: "Procedure End Time",
            time: endTime,
            isChecked: false   
        }
    ]

    const [actionsData, setActionsData] = useState(actions)

    const onCheckBoxPress = () => {
            setIsChecked(!isChecked)
        
    }

    const onCheckBoxPress1 = (index) => {
        if(index == 0){   
            setIsChecked1(!isChecked1)
        } 
        if(index == 1){        
            setIsChecked2(!isChecked2)
        } 
        if(index == 2){        
            setIsChecked3(!isChecked3)
        } 
        
    }


    const onTimeUpdate =  (dateTime) => {
        let newTime = moment(dateTime);
        setEnd(newTime)
        setEndTime(newTime)
        
    };

    const typeDecipher = () => {

        return (<>
            <MessageWrapper>
                <MessageContainer theme={theme}>
                    <ModalText theme={theme} color="--color-gray-700" font="--confirm-message">{message}</ModalText>

                    { !caseFileActions ? <View style={styles.rowContianer}> 
                        
                        <View style={styles.sideBox}></View>
                        
                        <View style={styles. centerCheckBox}>
                            <CheckBoxComponent
                                isCheck={isChecked}
                                onPress={onCheckBoxPress}
                            />
                        </View >
                        <View style={styles.centerContent}>
                            <Text>{confirmMessage}</Text>
                        </View>
                    </View>
                    : 
                    <>
                    {actionsData.map((message, index) => {
                        return (
                        <View style={styles.rowContianer}> 
                        
                            <View style={styles.sideBox}></View>
                            
                           { index == 0 && <View style={styles. centerCheckBox}>
                                <CheckBoxComponent
                                    isCheck={isChecked1}
                                    onPress={() =>onCheckBoxPress1(index)}
                                />
                            </View >}

                            { index == 1 && <View style={styles. centerCheckBox}>
                                <CheckBoxComponent
                                    isCheck={isChecked2}
                                    onPress={() => onCheckBoxPress1(index)}
                                />
                            </View >}

                            { index == 2 && <View style={styles. centerCheckBox}>
                                <CheckBoxComponent
                                    isCheck={isChecked3}
                                    onPress={() => onCheckBoxPress1(index)}
                                />
                            </View >}


                            <View style={{flexDirection: "row", marginVertical: 10}}>
                                <Text>{message.name}</Text>
                                {message.time != "" && 
                                
                                <View style={styles.inputWrapper}>
                                    <DateInputField
                                        onDateChange={(data) => onTimeUpdate(data)}
                                        value={end}
                                        mode={"time"}
                                        format={"hh:mm A"}
                                        onClear={() => setEnd(undefined)}
                                        placeholder="HH:MM"
                                    />
                            </View>}
                            </View>
                        </View>

                    );
                    })}
                    
                    </>

                }

                </MessageContainer>
            </MessageWrapper>

            <ButtonView theme={theme}>
                <CancelButtonContainer onPress={onCancel} theme={theme} background='--color-gray-300'>
                    <ModalText theme={theme} textColor="--color-blue-600" font="--text-base-bold">CANCEL</ModalText>

                </CancelButtonContainer>
                {(isChecked || (isChecked1 && isChecked2 && isChecked3)) ?
                    <ButtonContainer
                        onPress={onAction}
                        theme={theme}
                        background="--color-blue-600"
                    >
                        <ModalText theme={theme} textColor="--default-shade-white" font="--text-base-bold">CONFIRM</ModalText>
                    </ButtonContainer>
                    :
                    <ButtonContainer
                        onPress={()=>{}}
                        theme={theme}
                        background='--color-gray-300'
                    >
                        <ModalText theme={theme} textColor="--default-shade-white" font="--text-base-bold">CONFIRM</ModalText>
                    </ButtonContainer>
                }

            </ButtonView>
        </>);

    };

    //add a wrapper for header

    return (
        <MultipleShadowsContainer shadows={shadows}>
            <ModalWrapper theme={theme} style={{height : !caseFileActions ? 250 : 400}}>
                <ModalContainer>
                    <HeaderWrapper theme={theme}>
                        <HeadingContainer theme={theme}>
                            <ModalText theme={theme}>{titleText}</ModalText>
                            <ClearIconContainer>
                                <IconButton Icon={<ClearIcon />} onPress={onCancel} />
                            </ClearIconContainer>
                        </HeadingContainer>
                    </HeaderWrapper>
                    {typeDecipher()}
                </ModalContainer>
            </ModalWrapper>
        </MultipleShadowsContainer>

    );
}

const styles = StyleSheet.create({

    rowContianer: {
        flexDirection: 'row',
        backgroundColor: '#FFFAF0',
        width: 392,
        height: 48,
        marginTop: 20,
        padding: 5

    },

    inputWrapper: {
        // flex: 1,
        width: '52%',
        flexDirection: 'row',
        marginLeft: 15
        // backgroundColor: 'blue'
    },


    centerContent: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',

    },
    centerCheckBox:{
       alignSelf:'center' 
    },
    sideBox:{
        backgroundColor:"#D69E2E",
        width:5
    }
});   

export default ConfirmationCheckBoxComponent;
