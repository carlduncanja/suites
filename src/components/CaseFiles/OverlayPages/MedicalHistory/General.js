import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Allergies, PreExistingConditions, Immunisations, Medications, Procedures, MedicalHistoryImplantedDevices} from '../../OverlayCardFrames';

import AllergiesIcon from '../../../../../assets/svg/allergies';
import ConditionsIcon from '../../../../../assets/svg/preExistingConditions';
import ImmunisationsIcon from '../../../../../assets/svg/immunisations';
import MedicationsIcon from '../../../../../assets/svg/medications';
import ProceduresIcon from '../../../../../assets/svg/frameProcedures';
import DevicesIcon from '../../../../../assets/svg/implantedDevices';

import FrameCard from '../../../common/Frames/FrameCards/FrameCard';
import Search from '../../../common/Search';

const General = ({tabDetails, isEditMode}) => {
    const getData = medicalType => {
        const container = [];
        tabDetails.map(item => {
            if (item?.type?.name === medicalType) {
                container.push(...item.notes)
            }
        });

        return container;
    };

    const handleAdd = (value, type) => {
        const patientId = tabDetails[0]?.patient || "";
        console.log('here he');
        console.log(value);
        console.log(type);
        console.log(patientId)
    }
    
    return (
        <ScrollView>

            <View style={styles.frameContainer}>
                <FrameCard
                    isEditMode={isEditMode}
                    frameColor="#805AD5"
                    titleBackgroundColor="#FAF5FF"
                    frameBorderColor="#D6BCFA"
                    frameTitle="Allergies"
                    cardInformation={getData('Allergies')}
                    icon={AllergiesIcon}
                    physicianSelection={false}
                    normalInput={true}
                    onAction={(value) => {
                        handleAdd(value, 'Allergies')
                    }}
                />
            </View>

            <View style={styles.frameContainer}>
                <FrameCard
                    isEditMode={isEditMode}
                    frameColor="#DD6B20"
                    titleBackgroundColor="#FFFAF0"
                    frameBorderColor="#FBD38D"
                    frameTitle="Pre-Existing Conditions"
                    cardInformation={getData('Pre-Existing Conditions')}
                    icon={ConditionsIcon}
                    physicianSelection={false}
                    normalInput={true}
                    onAction={(value) => {
                        handleAdd(value, 'Pre-Existing Conditions')
                    }}
                />
            </View>

            <View style={styles.frameContainer}>
                <FrameCard
                    isEditMode={isEditMode}
                    frameColor="#3182CE"
                    titleBackgroundColor="#EBF4FF"
                    frameBorderColor="#A3BFFA"
                    frameTitle="Immunisations"
                    cardInformation={getData('Immunisations')}
                    icon={ImmunisationsIcon}
                    physicianSelection={false}
                    normalInput={true}
                    onAction={(value) => {
                        handleAdd(value, 'Immunisations')
                    }}
                />
            </View>

            <View style={styles.frameContainer}>
                <FrameCard
                    isEditMode={isEditMode}
                    frameColor="#E53E3E"
                    titleBackgroundColor="#FFF5F5"
                    frameBorderColor="#FEB2B2"
                    frameTitle="Medications"
                    cardInformation={getData('Medications')}
                    icon={MedicationsIcon}
                    physicianSelection={false}
                    normalInput={true}
                    onAction={(value) => {
                        handleAdd(value, 'Medications')
                    }}
                />
            </View>

            <View style={styles.frameContainer}>
                <FrameCard
                    isEditMode={isEditMode}
                    frameColor="#38A169"
                    titleBackgroundColor="#F0FFF4"
                    frameBorderColor="#9AE6B4"
                    frameTitle="Procedures"
                    cardInformation={getData('Procedures')}
                    icon={ProceduresIcon}
                    physicianSelection={false}
                    normalInput={true}
                    onAction={(value) => {
                        handleAdd(value, 'Procedures')
                    }}
                />
            </View>

            <View style={styles.frameContainer}>
                <FrameCard
                    isEditMode={isEditMode}
                    frameColor="#3182CE"
                    titleBackgroundColor="#EBF8FF"
                    frameBorderColor="#90CDF4"
                    frameTitle="Implanted Devices"
                    cardInformation={getData('Implanted Devices')}
                    icon={DevicesIcon}
                    physicianSelection={false}
                    normalInput={true}
                    onAction={(value) => {
                        handleAdd(value, 'Implanted Devices')
                    }}
                />
            </View>

        </ScrollView>
    );
};

export default General;

const styles = StyleSheet.create({frameContainer: {marginBottom: 20}});
