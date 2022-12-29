import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Low, Moderate, High, VeryHigh } from '../../RiskFrames/RiskLevels'
import RiskLevel from '../../RiskFrames/RiskLevel';
import { PageContext } from '../../../../contexts/PageContext';
import { updatePatientRisk } from '../../../../api/network'

const PateintRisk = ({ tabDetails = [], fields, onFieldChange, patientId }) => {

    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;
    console.log(tabDetails)

    const [risks, setRisks] = useState(tabDetails)

    const onRiskChange = (id) => (newLevelData) => {
        console.log("we in here", newLevelData)
        updatePatientRisk(id, newLevelData)
            .then(_ => {
                setUpdated(false);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false} // boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => modal.closeAllModals()}
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
                            error={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => {
                                modal.closeAllModals();
                                resetState();
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
                const { level = 'low', notes = [], _id = "" } = risk
                return (
                    <View key={index}>
                        {
                            level === 'low' ?
                                <View>
                                    <RiskLevel
                                        titleBackground="#EBF8FF"
                                        borderColor="#90CDF4"
                                        levelColor="#4299E1"
                                        cardColor="#3182CE"
                                        riskLevel={level}
                                        itemContent={notes}
                                        isEditMode={isEditMode}
                                        fields={fields}
                                        onFieldChange={onFieldChange}
                                        onRiskChange={onRiskChange(_id)}
                                    />
                                </View>
                                :
                                level === 'moderate' ?
                                    <View>
                                        <RiskLevel
                                            titleBackground="#FFFAF0"
                                            borderColor="#FBD38D"
                                            levelColor="#ED8936"
                                            cardColor="#DD6B20"
                                            riskLevel={level}
                                            itemContent={notes}
                                            isEditMode={isEditMode}
                                            fields={fields}
                                            onFieldChange={onFieldChange}
                                            onRiskChange={onRiskChange(_id)}
                                        />
                                    </View>
                                    :
                                    level === 'high' ?
                                        <View>
                                            <RiskLevel
                                                titleBackground="#FFF5F5"
                                                borderColor="#FEB2B2"
                                                levelColor="#F56565"
                                                cardColor="#E53E3E"
                                                riskLevel={level}
                                                itemContent={notes}
                                                isEditMode={isEditMode}
                                                fields={fields}
                                                onFieldChange={onFieldChange}
                                                onRiskChange={onRiskChange(_id)}
                                            />
                                        </View>
                                        :

                                        <View>
                                            <RiskLevel
                                                titleBackground="#FAF5FF"
                                                borderColor="#D6BCFA"
                                                levelColor="#9F7AEA"
                                                cardColor="#805AD5"
                                                riskLevel={level}
                                                itemContent={notes}
                                                isEditMode={isEditMode}
                                                fields={fields}
                                                onFieldChange={onFieldChange}
                                                onRiskChange={onRiskChange(_id)}
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