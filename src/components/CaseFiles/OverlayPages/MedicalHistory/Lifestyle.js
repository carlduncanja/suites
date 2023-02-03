import React from 'react';
import { View, Picker, ScrollView, StyleSheet, Text } from "react-native";
import { DrugUse, AlcoholUse, TobaccoUse } from '../../OverlayCardFrames'

import TobaccoIcon from '../../../../../assets/svg/tobacco';
import DrugIcon from '../../../../../assets/svg/drug';
import AlcoholIcon from '../../../../../assets/svg/alcohol';

import FrameLifestyleCard from '../../../common/Frames/FrameCards/FrameLifestyleCard'
import DisabledSectionComponent from '../../../DisabledSectionComponent';
import FrameTitle from '../../../common/Frames/FrameTitle';
const Lifestyle = ({ tabDetails, isEditMode, patient, fetchCase = () => { } }) => {



    const getTypeData = (lifestyleType) => {
        return tabDetails.filter(item => {
            const { type = { name: "Molly" } } = item
            const { name = "Alcohol Use" } = type
            return name === lifestyleType && item
        }) || []
    }


    const drugs = getTypeData("Drug Use")
    const alcohol = getTypeData("Alcohol Use")
    const tobacco = getTypeData("Tobacco Use")

    return (
        tabDetails.length != 0 ?
            <ScrollView style={{ marginBottom: 80 }}>
                {drugs.length != 0 ?

                    <View style={styles.frameContainer} >
                        <View style={styles.container}>

                            <FrameLifestyleCard
                                frameColor="#805AD5"
                                titleBackgroundColor="#FAF5FF"
                                frameBorderColor="#D6BCFA"
                                frameTitle="Drug Use"
                                cardInformation={drugs}
                                updateData={tabDetails}
                                icon={DrugIcon}
                                isEditMode={isEditMode}
                                patient={patient}
                                fetchCase={fetchCase}

                            />
                        </View>

                    </View>
                    :
                    null
                }

                {alcohol.length != 0 ?


                    <View style={styles.frameContainer} >
                        <View style={styles.container}>
                            <FrameLifestyleCard
                                frameColor="#E53E3E"
                                titleBackgroundColor="#FFF5F5"
                                frameBorderColor="#FEB2B2"
                                frameTitle="Alcohol Use"
                                cardInformation={alcohol}
                                icon={AlcoholIcon}
                                updateData={tabDetails}
                                isEditMode={isEditMode}
                                patient={patient} 
                                fetchCase={fetchCase}
                            />
                        </View>
                    </View>
                    :
                    null
                }
                {tobacco.length != 0 ?

                    <View style={styles.frameContainer}>

                        <View style={styles.container} >
                            <FrameLifestyleCard
                                frameColor="#4E5664"
                                titleBackgroundColor="#EEF2F6"
                                frameBorderColor="#A0AEC0"
                                frameTitle="Tobacco Use"
                                cardInformation={tobacco}
                                icon={TobaccoIcon}
                                updateData={tabDetails}
                                isEditMode={isEditMode}
                                patient={patient} 
                                fetchCase={fetchCase}
                            />
                        </View>
                    </View>
                    :
                    null

                }
            </ScrollView>
            :

            <DisabledSectionComponent />


    );
}

export default Lifestyle;

const styles = StyleSheet.create({
    frameContainer: {
        marginBottom: 20
    },
    container: {
        backgroundColor: '#F8FAFB',
    },
})
