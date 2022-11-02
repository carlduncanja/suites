import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Physicians, Nurses } from '../../OverlayCardFrames';
import FramStaffIcon from '../../../../../assets/svg/frameMedicalStaff';
import FrameCard from '../../../common/Frames/FrameCards/FrameCard';


const Details = ({ tabDetails,
    isEditMode,
    handleEdit = () => { }
    
    }) => {
    
        const { physicians, nurses } = tabDetails

    const physicianNames = physicians.map(physician => {
        const { surname = "" } = physician
        return `Dr. ${surname}`
    })

    const nursesNames = nurses.map(nurse => {
        const { surname = "", firstName = "" } = nurse
        return `${firstName[0]}. ${surname}`
    })
    return (
        <ScrollView>

            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor="#3182CE"
                    titleBackgroundColor="#EBF8FF"
                    frameBorderColor="#90CDF4"
                    frameTitle="Physicians"
                    cardInformation={physicianNames}
                    icon={FramStaffIcon}
                    isEditMode={isEditMode}
                    handleEdit={handleEdit}
                />
            </View>

            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor="#E53E3E"
                    titleBackgroundColor="#FFF5F5"
                    frameBorderColor="#FEB2B2"
                    frameTitle="Nurses"
                    cardInformation={nursesNames}
                    icon={FramStaffIcon}
                    isEditMode={isEditMode}
                    handleEdit={handleEdit}
                />
            </View>


        </ScrollView>

    );
}

export default Details;

const styles = StyleSheet.create({
    frameContainer: {
        marginBottom: 20
    }
})