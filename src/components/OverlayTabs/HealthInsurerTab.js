import React, { useRef, useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { addLifeStyleItems } from '../../api/network'
import _ from "lodash";
import styled from '@emotion/native';
import { FrameCardWrapper, FrameCardContainer } from "../common/Frames/FrameCards/FrameCard";
import FrameTitle from "../common/Frames/FrameTitle";
import InsurerIcon from "../../../assets/svg/insurerIcon";
import { useTheme } from 'emotion-theming';
import { FrameContentListWrapper, FrameContentListContainer } from "../common/Frames/FrameContents/FrameContentList";
import IconButton from "../common/Buttons/IconButton";
import EditIcon from "../../../assets/svg/editIcon";
import WasteIcon from "../../../assets/svg/wasteIcon";
import { RowWrapper, FieldContainer } from "../common/Frames/FrameContents/FrameInsurerContent";
import InputField2 from "../common/Input Fields/InputField2";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import { ButtonContainer, ModalText, CancelButtonContainer, FrameContent } from "../common/Frames/FrameItems/FrameEditItem";

const Seperator = styled.View`
    marginRight: 50;
`;

const Accent = styled.View`
background-color: ${({ theme }) => theme.colors['--color-gray-300']};
width: 100%;
height: 1px;
margin-top: 5px;
margin-bottom: 24px;
`;

const HealthInsurer = ({ insurer, isEditMode = false, addMode, onCancel = () => { }, setAddMode }) => {
    const theme = useTheme();
    console.log("ADD mode", addMode);
    const [localEditMode, setLocalEditMode] = useState(false);

    const {
        firstName = '',
        lastName = '',
        email = '',
        name = '',
        representative = [],
        contactInfo = {},
        address = {},
    } = insurer;
    const [fields, setFields] = useState({
        firstName,
        lastName,
        email,
        name,
        representative,
        contactInfo,
        address,
    });

    const onFieldChange = fieldName => value => {
        const updatedFields = {
            ...fields,
            [fieldName]: value
        };

        setFields(updatedFields);
    };

    const handlePhoneChange = (number, field) => {
        const formattedNumber = number.replace(/\s/g, ''); // remove whitespaces

        if (number === '') onFieldChange(field)(formattedNumber);
        else if (/^\d+$/g.test(formattedNumber) || !number) onFieldChange(field)(number);
    };

    const handleEmailChange = (email, emailType) => {
        const updatedEmails = updateEmail(email, emailType);

        if (email === '') onFieldChange('emails')(updatedEmails);
        else if (isValidEmail(email) || !email) onFieldChange('emails')(updatedEmails);
    };

    return (
        <View style={styles.frameContainer}>
            <FrameCardWrapper theme={theme}>
                <FrameCardContainer>
                    <FrameTitle
                        color={"#718096"}
                        borderColor={"#CCD6E0"}
                        backgroundColor={"#EEF2F6"}
                        icon={InsurerIcon}
                        frameTitle={"Insurer"}
                        ActionComponent={
                            isEditMode &&
                            <IconButton
                                Icon={
                                    isEditMode ? <EditIcon /> : <WasteIcon strokeColor={!isEditMode ? theme.colors['--color-gray-500'] : "#C53030"} />}
                                onPress={() => { setLocalEditMode(!localEditMode) }}
                                disabled={!isEditMode}
                            />
                        }
                    />
                    <FrameContentListWrapper>
                        <FrameContentListContainer theme={theme}>
                            <RowWrapper theme={theme}>
                                <InputField2
                                    enabled={localEditMode}
                                    value={fields.name}
                                    label="Insurer"
                                    onChangeText={() => { }}
                                    onClear={() => { }}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                />
                            </RowWrapper>
                            <RowWrapper theme={theme}>
                                <InputField2
                                    enabled={localEditMode}
                                    value={fields.email}
                                    label="Email"
                                    onChangeText={() => { }}
                                    onClear={() => { }}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                />
                            </RowWrapper>
                            <RowWrapper theme={theme}>
                                <InputField2
                                    enabled={localEditMode}
                                    value={fields.address[0]?.line1}
                                    label="Address"
                                    onChangeText={() => { }}
                                    onClear={() => { }}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                />
                            </RowWrapper>

                            <RowWrapper theme={theme}>
                                <InputField2
                                    enabled={localEditMode}
                                    value={fields.contactInfo?.phones && fields.contactInfo?.phones[0]?.phone}
                                    label="Phone"
                                    onChangeText={() => { }}
                                    onClear={() => { }}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                />
                                <Seperator />
                                <InputField2
                                    enabled={localEditMode}
                                    value={fields.contactInfo?.phones && fields.contactInfo?.phones[1]?.phone}
                                    label="Phone"
                                    onChangeText={() => { }}
                                    onClear={() => { }}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                />

                            </RowWrapper>
                            <Accent />
                            <RowWrapper theme={theme}>
                                <InputField2
                                    enabled={localEditMode}
                                    value={`${fields.representative[0]?.firstName} ${fields.representative[0]?.lastName}`}
                                    label="Rep."
                                    onChangeText={() => { }}
                                    onClear={() => { }}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                />
                                <Seperator />
                                <InputField2
                                    enabled={localEditMode}
                                    value={fields.representative[0]?.contactInfo?.phones[0]?.phone}
                                    label="Ext."
                                    onChangeText={() => { }}
                                    onClear={() => { }}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                />

                            </RowWrapper>

                            <RowWrapper theme={theme}>
                                <InputField2
                                    enabled={localEditMode}
                                    value={fields.representative[0]?.contactInfo?.emails[0]?.email}
                                    label="Email"
                                    onChangeText={() => { }}
                                    onClear={() => { }}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                />
                            </RowWrapper>
                            {
                                addMode &&
                                <>
                                <Accent />
                                <FrameContent style={[{marginBottom: 10}]}>
                                    <CancelButtonContainer theme={theme} background='--color-gray-300'
                                        onPress={() => setAddMode(false)}
                                    >
                                        <ModalText theme={theme} textColor="--color-blue-600" font="--text-base-bold">Cancel</ModalText>
                                    </CancelButtonContainer>

                                    <ButtonContainer
                                        // onPress={() => {
                                        //     actionButton ?
                                        //         normalInput ? buttonTitle === 'Add' ? onAction(name) : onEdit(id, name) : onAction(staffInfo[0]._id)
                                        //         :

                                        //         null
                                        //     toggleAddOption(false);
                                        //     setEditPress(false)
                                        // }}
                                        theme={theme}
                                        background={addMode ? "--color-blue-600" : '--color-gray-300'}
                                    >

                                        <ModalText theme={theme} textColor="--default-shade-white" font="--text-base-bold">Save</ModalText>
                                    </ButtonContainer>

                                </FrameContent>
                                </>
                            }
                        </FrameContentListContainer>
                    </FrameContentListWrapper>
                </FrameCardContainer>
            </FrameCardWrapper>

        </View>
    )
}
export default HealthInsurer

const styles = StyleSheet.create({
    frameContainer: {
        marginBottom: 10
    }
})