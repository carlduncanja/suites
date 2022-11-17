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

const HealthInsurer = ({insurer}) => {
    const theme = useTheme();
    const isEditMode = false;

    console.log("Insurer", insurer);
    const [insurerInfo, setInsurerInfo] = useState(insurer);
    return (
        <View style={styles.frameContainer}>
        <FrameCardWrapper theme = {theme}>
            <FrameCardContainer>
                <FrameTitle
                    color={"#718096"}
                    borderColor = {"#CCD6E0"}
                    backgroundColor={"#EEF2F6"}
                    icon={InsurerIcon}
                    frameTitle={"Insurer"}
                    ActionComponent={
                        <IconButton
                            Icon={
                            isEditMode ? <EditIcon/> :  <WasteIcon strokeColor={!isEditMode ? theme.colors['--color-gray-500'] : "#C53030"}/>}
                            onPress={()=>{}}
                            disabled={!isEditMode}
                        />
                    }
                />
                <FrameContentListWrapper>
                    <FrameContentListContainer theme={theme}>
                    <RowWrapper theme = {theme}>
                        <InputField2
                            enabled = {isEditMode}
                            value = {insurer.name}
                            label = "Insurer"
                            onChangeText = {() => {}}
                            onClear = {()=>{}}
                            backgroundColor = '--default-shade-white'
                            labelWidth={50}
                            labelFont={'--text-base-regular'}
                        />
                    </RowWrapper>
                    <RowWrapper theme = {theme}>
                        <InputField2
                            enabled = {isEditMode}
                            value = {insurer.email}
                            label = "Email"
                            onChangeText = {() => {}}
                            onClear = {()=>{}}
                            backgroundColor = '--default-shade-white'
                            labelWidth={50}
                            labelFont={'--text-base-regular'}
                        />
                    </RowWrapper>
                    <RowWrapper theme = {theme}>
                        <InputField2
                            enabled = {isEditMode}
                            value = {insurer.address[0].line1}
                            label = "Address"
                            onChangeText = {() => {}}
                            onClear = {()=>{}}
                            backgroundColor = '--default-shade-white'
                            labelWidth={50}
                            labelFont={'--text-base-regular'}
                        />
                    </RowWrapper>

                    <RowWrapper theme = {theme}>
                        <InputField2
                            enabled = {isEditMode}
                            value = {insurer.contactInfo.phones[0] && insurer.contactInfo.phones[0].phone}
                            label = "Phone"
                            onChangeText = {() => {}}
                            onClear = {()=>{}}
                            backgroundColor = '--default-shade-white'
                            labelWidth={50}
                            labelFont={'--text-base-regular'}
                        />
                        <Seperator/>
                        <InputField2
                            enabled = {isEditMode}
                            value = {insurer.contactInfo.phones[1] && insurer.contactInfo.phones[1].phone}
                            label = "Phone"
                            onChangeText = {() => {}}
                            onClear = {()=>{}}
                            backgroundColor = '--default-shade-white'
                            labelWidth={50}
                            labelFont={'--text-base-regular'}
                        />
                         
                    </RowWrapper>
                    <Accent/>
                    <RowWrapper theme = {theme}>
                        <InputField2
                            enabled = {isEditMode}
                            value = { insurer.representative[0] && `${insurer.representative[0].firstName} ${insurer.representative[0].lastName}`}
                            label = "Rep."
                            onChangeText = {() => {}}
                            onClear = {()=>{}}
                            backgroundColor = '--default-shade-white'
                            labelWidth={50}
                            labelFont={'--text-base-regular'}
                        />
                        <Seperator/>
                        <InputField2
                            enabled = {isEditMode}
                            value = {insurer.representative[0] && insurer.representative[0].contactInfo.phones[0] && insurer.representative[0].contactInfo.phones[0].phone}
                            label = "Ext."
                            onChangeText = {() => {}}
                            onClear = {()=>{}}
                            backgroundColor = '--default-shade-white'
                            labelWidth={50}
                            labelFont={'--text-base-regular'}
                        />
                         
                    </RowWrapper>

                    <RowWrapper theme = {theme}>
                        <InputField2
                            enabled = {isEditMode}
                            value = {insurer.representative[0] && insurer.representative[0].contactInfo.emails[0] && insurer.representative[0].contactInfo.emails[0].email }
                            label = "Email"
                            onChangeText = {() => {}}
                            onClear = {()=>{}}
                            backgroundColor = '--default-shade-white'
                            labelWidth={50}
                            labelFont={'--text-base-regular'}
                        />
                    </RowWrapper>
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