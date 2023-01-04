import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import styled, { css } from "@emotion/native";
import _ from "lodash";
import { useTheme } from "emotion-theming";
import InputUnitField from "../../Input Fields/InputUnitFields";
import OptionsField from "../../Input Fields/OptionsField";
import InputField2 from "../../Input Fields/InputField2";
import Row from '../../Row';
import { MenuOption, MenuOptions } from "react-native-popup-menu";
import TextButton from "../../Buttons/TextButton";
import BrokenLineDivider from "../../BrokenLineDivider";
import { PageContext } from '../../../../contexts/PageContext';
import { currencyFormatter } from '../../../../utils/formatter';
import { useModal } from "react-native-modalfy";
import ConfirmationComponent from '../../../ConfirmationComponent';
import { updatePatient } from '../../../../api/network';

const ContentWrapper = styled.View`
    width : 100%;
`;

const ContentContainer = styled.View`
    width : 100%;
    border-width : 1px;
    background-color: ${({ theme }) => theme.colors['--default-shade-white']};
    border-color : ${({ theme }) => theme.colors['--color-gray-300']};
    border-top-width : 0px;
    border-bottom-left-radius : 8px;
    border-bottom-right-radius : 8px;
    padding : ${({ theme }) => theme.space['--space-16']};
    padding-bottom : ${({ theme }) => theme.space['--space-32']};

`;

export const RowWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom : ${({ theme }) => theme.space['--space-16']};
`
export const ReverceRowWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    
`
export const FieldContainer = styled.View` 
    flex : 1;
    margin-right: ${({ theme }) => theme.space['--space-16']};
`


const FrameInsurerContent = ({
    fields = {},
    setFields = () => {
    },
    updateInsuranceData = () => {

    },
    isEditMode,
    patientID,
    onUpdated = () => { }
}) => {


    //console.log("Edit mode: ", isEditMode);
    const theme = useTheme();
    const modal = useModal();

    const {
        name = "",
        patient = "",
        policyNumber = "",
        coverageLimit = 0
    } = fields

    const [data, setData] = useState({
        "name": name,
        "patient": patient,
        "policyNumber": policyNumber,
        "coverageLimit": coverageLimit
    });



    const [isUpdated, setIsUpdated] = useState(false)

    function formatNumberField(value) {
        return value.toString().replace(/[^\d.]/g, '');
    }

    const onFieldChange = (fieldName) => (value) => {

        let finalValue = value;

        if (fieldName === 'coverageLimit') {
            const formattedValue = formatNumberField(value);
            finalValue = formattedValue;
        }
        setIsUpdated(true)
        setData({
            ...data,
            [fieldName]: finalValue
        });
        console.log(isUpdated)
    };

    const updatePatientAction = (updatedData) => {

       
        updatePatient(patientID, updatedData)
            .then(_ => {
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false} // boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals()
                                onUpdated()
                            }}
                            onAction={() => {
                                modal.closeAllModals() 
                                onUpdated()
                            }}
                            message="Changes were successful." // general message you can send to be displayed
                            action="Yes"
                        />
                    ),
                    onClose: () => onUpdated(),
                });
            })
            .catch(error => {
                console.log('Failed to update Patient', error);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            error={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            message="Something went wrong when applying changes."//general message you can send to be displayed
                            action="Yes"
                        />
                    ),
                    onClose: () => console.log('Modal closed'),
                });
            })
    };

    const onSavePress = () => {
        console.log(isUpdated)
        console.log("Object 2", data)
        let formatData = {
            "insurance": {
                "name": data['name'],
                "policyNumber": data['policyNumber']
            }
        }
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    isError={false} // boolean to show whether to show an error icon or a success icon
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeAllModals();

                    }}
                    onAction={() => {
                        modal.closeAllModals();
                        updatePatientAction(formatData)
                    }}
                    message="Do you want to save changes?" // general message you can send to be displayed
                    action="Yes"
                />
            ),
            onClose: () =>  modal.closeAllModals(),
        });


    }


    return (
        <ContentWrapper theme={theme}>
            <ContentContainer theme={theme}>

                <RowWrapper theme={theme}>
                    <InputField2
                        enabled={isEditMode}
                        value={data['name']}
                        label="Insurer"
                        onChangeText={(value) => {
                            onFieldChange('name')(value)
                        }}
                        onClear={() => { onFieldChange('name')('') }}
                        backgroundColor='--default-shade-white'
                    />
                </RowWrapper>

                <RowWrapper theme={theme}>

                    <FieldContainer theme={theme}>
                        <InputField2
                            enabled={false}
                            value={data['patient']}
                            label="Insured"
                            onChangeText={(value) => {
                                onFieldChange('patient')(value)
                            }}
                            onClear={() => { onFieldChange('patient')('') }}
                            backgroundColor='--default-shade-white'
                        />
                    </FieldContainer>

                    <InputField2
                        enabled={isEditMode}
                        value={data['policyNumber']}
                        label="Policy #"
                        onChangeText={(value) => {
                            onFieldChange('policyNumber')(value)
                        }}
                        onClear={() => { onFieldChange('policyNumber')('') }}
                        backgroundColor='--default-shade-white'

                    />
                </RowWrapper>

                <RowWrapper theme={theme}>

                    <InputField2
                        enabled={isEditMode}
                        value={isEditMode
                            ? data.coverageLimit.toString()
                            : `$ ${currencyFormatter(data['coverageLimit'])}`}
                        label="Coverage"
                        onChangeText={(value) => { onFieldChange('coverageLimit')(value) }}
                        onClear={() => { onFieldChange('coverageLimit')('') }}
                        backgroundColor='--default-shade-white'
                    />

                    <FieldContainer />

                </RowWrapper>
                {isEditMode && isUpdated &&
                    < ReverceRowWrapper>
                        <View style={{ height: 10 }}>
                            <TextButton
                                title="Save"
                                buttonPress={onSavePress}
                            />
                        </View>
                    </ ReverceRowWrapper>
                }
            </ContentContainer>


        </ContentWrapper>

    );
}

export default FrameInsurerContent;




