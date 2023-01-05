import React, {Component, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import FrameTitle from '../FrameTitle'
import FrameInsurerContent from '../FrameContents/FrameInsurerContent';
import styled from "@emotion/native/";
import IconButton from "../../Buttons/IconButton";
import WasteIcon from "../../../../../assets/svg/wasteIcon";
import InsurerIcon from "../../../../../assets/svg/insurerIcon";
import {updateCaseProcedureAppointmentCall} from "../../../../api/network";
import ConfirmationComponent from "../../../ConfirmationComponent";
import {useModal} from "react-native-modalfy";
import moment from "moment";
import LoadingComponent from "../../../LoadingComponent";
import {useTheme} from "emotion-theming";

const InsuranceCardWrapper = styled.View`
   flex: 1;
`

const InsuranceCardHeader = styled.View`
  height: 41px;
  width: 100%;
`

const InsuranceCardContent = styled.View`
  background-color: ${({theme}) => {
    theme.colors['--color-default-white']
}};
`


function FrameInsuranceCard ({
    insuranceDetails = {},
    isEditMode
        }) {
    const modal = useModal();
    const theme = useTheme();

    const [fields, setFields] = useState({...insuranceDetails});

    return (
        <InsuranceCardWrapper>
           
            <InsuranceCardHeader>
                <FrameTitle
                    color={theme.colors['--color-gray-600']}
                    borderColor={theme.colors['--color-gray-400']}
                    backgroundColor={theme.colors['--color-gray-100']}
                    icon={InsurerIcon}
                    frameTitle={"Insurer"}
                    ActionComponent={
                        <IconButton
                            Icon={<WasteIcon strokeColor={!isEditMode ? theme.colors['--color-gray-500'] : "#C53030"}/>}
                            onPress={()=>{}}
                            disabled={!isEditMode}
                        />
                    }
                />
            </InsuranceCardHeader>

                <InsuranceCardContent>
                    <FrameInsurerContent
                        fields = {fields}
                        setFields = {setFields}
                    />
                </InsuranceCardContent>

        </InsuranceCardWrapper>
    );
}

export default FrameInsuranceCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFB',
    },
    title: {
        width: '100%'
    },
    content: {
        width: '100%'
    }
})
