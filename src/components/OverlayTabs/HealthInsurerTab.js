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
import { RowWrapper } from "../common/Frames/FrameContents/FrameInsurerContent";
import InputField2 from "../common/Input Fields/InputField2";
import { ButtonContainer, ModalText, CancelButtonContainer, FrameContent } from "../common/Frames/FrameItems/FrameEditItem";
import { formatPhoneNumber, isValidEmail } from "../../utils/formatter";
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

const HealthInsurer = ({ insurer, isEditMode = false, addMode, handleEdit = () => { }, setAddMode, handleAdd = () => {}, handleDelete = () => {}  }) => {
    const theme = useTheme();
    const [localEditMode, setLocalEditMode] = useState(addMode ? true : false);
    const [errors, setErrors] = useState({});
    const [validEmail, setValidEmail] = useState(true);

    const {
        _id,
        name = '',
        email = '',
        representative = [],
        contactInfo = {},
        address = {},
    } = insurer;

    const [fields, setFields] = useState({
        name,
        email,
        address: address[0]?.line1,
        phoneOne: contactInfo?.phones && contactInfo?.phones[0]?.phone,
        phoneTwo: contactInfo?.phones && contactInfo?.phones[1]?.phone,
        repName: representative[0]?.name,
        repExt: representative[0]?.contactInfo?.phones[0]?.phone,
        repEmail: representative[0]?.contactInfo?.emails[0]?.email
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
        if (number === '') onFieldChange(field);
        else if (/^\d+$/g.test(formattedNumber) || !number) onFieldChange(field)(formatPhoneNumber(formattedNumber));
    };

    const handleEmailChange = (email, field) => {
        let fieldErrors = {};
         if (!isValidEmail(email) && email){
            fieldErrors = {...errors, [field]: 'Invalid email' };
            setValidEmail(false);
         }else{
            delete fieldErrors[field];
            setValidEmail(true);
         }       
         onFieldChange(field);
         setErrors(fieldErrors);      
    };

    const validateFields = () => {
        let errors = {};
        let isValid = true;
        const requiredFields = [ 
            'name',
            'email',
            'address',
            'phoneOne',
            'repName',
            'repEmail']

        for (const requiredField of requiredFields) {
            if (!fields[requiredField]) {
                errors = {
                    ...errors,
                    [requiredField]: "Value is required"
                }
                isValid = false;
            }
        }

        setErrors(errors)
        const insurer = {
            name: fields.name,
            email: fields.email,
            address: {line1: fields.address},
            contactInfo: {
                phones: [{phone: fields.phoneOne}, fields.phoneTwo && {phone: fields.phoneTwo}],
            },
            representative: [{name: fields.repName, contactInfo: {phones: [{phone: fields.repExt}], emails: [{email: fields.repEmail}]}}],
        }
        
        if(validEmail && isValid) {
           addMode ? handleAdd(insurer) : handleEdit(_id, insurer);
        }
    }

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
                                    isEditMode && !localEditMode ? <EditIcon /> : <WasteIcon strokeColor={!isEditMode ? theme.colors['--color-gray-500'] : "#C53030"} />}
                                onPress={() => { localEditMode ? handleDelete(_id) :  setLocalEditMode(!localEditMode) }}
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
                                    onChangeText={(value) => { onFieldChange('name')(value)}}
                                    onClear={onFieldChange('name')}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                    hasError={errors["name"]}
                                    errorMessage={errors["name"]}
                                />
                            </RowWrapper>
                            <RowWrapper theme={theme}>
                                <InputField2
                                    enabled={localEditMode}
                                    value={fields.email}
                                    label="Email"
                                    onChangeText={(value) => { onFieldChange('email')(value)}}
                                    onClear={onFieldChange('email')}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                    hasError={errors["email"]}
                                    errorMessage={errors["email"]}
                                    onEndEditing={() => {handleEmailChange(fields.email, 'email')}}
                                    autoCapitalize={'none'}
                                />
                            </RowWrapper>
                            <RowWrapper theme={theme}>
                                <InputField2
                                    enabled={localEditMode}
                                    value={fields.address}
                                    label="Address"
                                    onChangeText={(value) => { onFieldChange('address')(value)}}
                                    onClear={onFieldChange('address')}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                    hasError={errors["address"]}
                                    errorMessage={errors["address"]}
                                    
                                />
                            </RowWrapper>

                            <RowWrapper theme={theme}>
                                <InputField2
                                    enabled={localEditMode}
                                    value={fields.phoneOne}
                                    label="Phone"
                                    placeholder={'876-000-0000'}
                                    onChangeText={(value) => {handlePhoneChange(value, 'phoneOne') }}
                                    onClear={onFieldChange('phoneOne')}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                    hasError={errors["phoneOne"]}
                                    errorMessage={errors["phoneOne"]}
                                />
                                <Seperator />
                                <InputField2
                                    enabled={localEditMode}
                                    value={fields.phoneTwo}
                                    label="Phone"
                                    placeholder={'876-000-0000'}
                                    onChangeText={(value) => {handlePhoneChange(value, 'phoneTwo') }}
                                    onClear={onFieldChange('phoneTwo')}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                />

                            </RowWrapper>
                            <Accent />
                            <RowWrapper theme={theme}>
                                <InputField2
                                    enabled={localEditMode}
                                    value={fields.repName}
                                    label="Rep."
                                    onChangeText={(value) => {onFieldChange('repName')(value)}}
                                    onClear={onFieldChange('repName')}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                    hasError={errors["repName"]}
                                    errorMessage={errors["repName"]}
                                />
                                <Seperator />
                                <InputField2
                                    enabled={localEditMode}
                                    value={fields.repExt}
                                    label="Ext."
                                    placeholder={'1111'}
                                    onChangeText={(value) => {onFieldChange('repExt')(value)}}
                                    onClear={onFieldChange('repExt')}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                />

                            </RowWrapper>

                            <RowWrapper theme={theme}>
                                <InputField2
                                    enabled={localEditMode}
                                    value={fields.repEmail}
                                    label="Email"
                                    onChangeText={(value) => {onFieldChange('repEmail')(value)}}
                                    onClear={onFieldChange('repEmail')}
                                    backgroundColor='--default-shade-white'
                                    labelWidth={50}
                                    labelFont={'--text-base-regular'}
                                    hasError={errors["repEmail"]}
                                    errorMessage={errors["repEmail"]}
                                    onEndEditing={() => {handleEmailChange(fields.repEmail, 'repEmail')}}
                                    autoCapitalize={'none'}
                                />
                            </RowWrapper>
                            {
                                (addMode || localEditMode) &&
                                <>
                                <Accent />
                                <FrameContent style={[{marginBottom: 10}]}>
                                    <CancelButtonContainer theme={theme} background='--color-gray-300'
                                        onPress={() => addMode ? setAddMode(false) : setLocalEditMode(!localEditMode)}
                                    >
                                        <ModalText theme={theme} textColor="--color-blue-600" font="--text-base-bold">Cancel</ModalText>
                                    </CancelButtonContainer>

                                    <ButtonContainer
                                        onPress={() => {
                                            validateFields();
                                        }}
                                        theme={theme}
                                        background={"--color-blue-600"}
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