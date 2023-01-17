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
import { createMedicalHistory, getMedicalHistoryType, updatePatient } from '../../../../api/network';
import { useModal } from 'react-native-modalfy';
import ConfirmationComponent from '../../../ConfirmationComponent';

const General = ({tabDetails, isEditMode, fetchCase = () => {}, patient}) => {

    const modal = useModal();
    const getData = medicalType => {
        const container = [];
        tabDetails.map(item => {
            if (item?.type?.name === medicalType) {
                container.push(...item.notes)
            }
        });

        return container;
    };

    const handleAdd = async (notes, currentType) => {
        
        const patientId = patient._id;
        let type = await getMedicalHistoryType(currentType).then(res => res[0]._id);
        await createMedicalHistory(patientId, {notes, type}).then(response => {
            updatePatient(patientId, {"medicalInfo.medicalHistory": [...tabDetails, response]
            }).then(_ => {
                successModal();
                fetchCase();
            })
        })
    }

    const successModal = () => {
        modal.openModal(
            'ConfirmationModal', {
            content: <ConfirmationComponent
                isError={false}
                isEditUpdate={false}
                onAction={() => {
                    modal.closeModals('ConfirmationModal');
                }}
                onCancel={() => {
                    modal.closeModals('ConfirmationModal');
                }}
            />,
            onClose: () => {
                modal.closeModal('ConfirmationModal')
            }
        }
        );
    }
    
    const tabDetailIds = tabDetails.map(detail => {
        const {_id = ""} = detail;

        return _id
    });

    const generateIds = (target) => {
        const container = [];
        tabDetails.map(detail => {
            const {type, _id} = detail;
            if (type.name === target) {
                container.push(_id)
            };

            
        });
        return container;
    }

    const handleDelete = async (data) => {
        const patientId = patient._id;
        const container = [];
        tabDetails.filter(item => {
            if (item._id !== data) {
                container.push(item._id)
            }
        });

        await updatePatient(patientId, 
            {"medicalInfo.medicalHistory": container
        }).then(_ => {
            successModal();
            fetchCase();
        })
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
                    idArray={generateIds('Allergies')}
                    onDelete={handleDelete}
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
                    idArray={generateIds('Pre-Existing Conditions')}
                    onDelete={handleDelete}
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
                    idArray={generateIds('Immunisations')}
                    onDelete={handleDelete}
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
                    idArray={generateIds('Medications')}
                    onDelete={handleDelete}
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
                    idArray={generateIds('Procedures')}
                    onDelete={handleDelete}
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
                    idArray={generateIds('Procedures')}
                    onDelete={handleDelete}
                />
            </View>

        </ScrollView>
    );
};

export default General;

const styles = StyleSheet.create({frameContainer: {marginBottom: 20}});
