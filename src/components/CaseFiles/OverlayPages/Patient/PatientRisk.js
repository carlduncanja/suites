import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Low, Moderate, High, VeryHigh } from '../../RiskFrames/RiskLevels'
import RiskLevel from '../../RiskFrames/RiskLevel';
import { PageContext } from '../../../../contexts/PageContext';
import { updatePatientRisk } from '../../../../api/network'
import { useTheme } from 'emotion-theming';
import { useModal, withModal } from 'react-native-modalfy';
import ConfirmationComponent from '../../../ConfirmationComponent';

const PateintRisk = ({ tabDetails = [], fields, onFieldChange, patientId,onPatientUpdated }) => {

    const theme = useTheme();
    const modal = useModal();

    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;

    const [risks, setRisks] = useState(tabDetails)

    const onRiskChange = (id) => (newLevelData) => {

        console.log("we in here", newLevelData)
        updatePatientRisk(id, newLevelData)
            .then(_ => {
                //setUpdated(false);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false} // boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => {
                                onPatientUpdated()
                                modal.closeAllModals()
                                
                            }}
                            message="Changes were successful." // general message you can send to be displayed
                            action="Yes"
                        />
                    ),
                    onClose: () => console.log('Modal closed'),
                });
            })
            .catch(error => {
                console.log('Failed to update Patient', error);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => {
                                modal.closeAllModals();
                                //resetState();
                            }}
                            message="Something went wrong when applying changes."//general message you can send to be displayed
                            action="Yes"
                        />
                    ),
                    onClose: () => console.log('Modal closed'),
                });
            })


    }


    return (
        <ScrollView>
            {
                risks.length === 0 &&
                <>
                    <RiskLevel
                        isEditMode={isEditMode}
                        onRiskChange={onRiskChange(patientId)}
                    />
                </>
            }
            {risks.map((risk, index) => {
                const { status = 'low', notes = [], _id = "" } = risk
                return (
                    <View key={index}>
                        {
                            status === 'low' ?
                                <View>
                                    <RiskLevel
                                        titleBackground="#EBF8FF"
                                        borderColor="#90CDF4"
                                        levelColor="#4299E1"
                                        cardColor="--color-gray-600"
                                        riskLevel={status}
                                        itemContent={notes}
                                        isEditMode={isEditMode}
                                        fields={fields}
                                        onFieldChange={onFieldChange}
                                        onRiskChange={onRiskChange(patientId)}
                                    />
                                </View>
                                :
                                status === 'moderate' ?
                                    <View>
                                        <RiskLevel
                                            titleBackground="#FFFAF0"
                                            borderColor="--color-gray-400"
                                            levelColor="#ED8936"
                                            cardColor="--color-gray-600"
                                            riskLevel={status}
                                            itemContent={notes}
                                            isEditMode={isEditMode}
                                            fields={fields}
                                            onFieldChange={onFieldChange}
                                            onRiskChange={onRiskChange(patientId)}
                                        />
                                    </View>
                                    :
                                    status === 'high' ?
                                        <View>
                                            <RiskLevel
                                                titleBackground="#FFF5F5"
                                                borderColor="--color-gray-400"
                                                levelColor="#F56565"
                                                cardColor="--color-gray-600"
                                                riskLevel={status}
                                                itemContent={notes}
                                                isEditMode={isEditMode}
                                                fields={fields}
                                                onFieldChange={onFieldChange}
                                                onRiskChange={onRiskChange(patientId)}
                                            />
                                        </View>
                                        :

                                        <View>
                                            <RiskLevel
                                                titleBackground="#FAF5FF"
                                                borderColor="--color-gray-400"
                                                levelColor="#9F7AEA"
                                                cardColor="--color-gray-600"
                                                riskLevel={status}
                                                itemContent={notes}
                                                isEditMode={isEditMode}
                                                fields={fields}
                                                onFieldChange={onFieldChange}
                                                onRiskChange={onRiskChange(patientId)}
                                            />
                                        </View>
                        }
                    </View>

                )
            })
            }
        </ScrollView>
    );
}

export default PateintRisk;