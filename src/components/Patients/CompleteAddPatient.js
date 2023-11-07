import React, {} from 'react';
import {View, Text, StyleSheet} from 'react-native';
//import CaseFileIcon from '../../../assets/svg/caseFolder'; 
//import {patient as PatientIcon} from '../../../assets/svg/newCasePatient'; 

const CompleteAddPatient=({name})=>{
    <View style={styles.container}>

        <View style={styles.icon}>
            
        </View>

        <View style={styles.textBox}>
            <Text style={styles.text}>
                Tap <Text style={{color: '#3182CE'}}>CONTINUE</Text> to finish adding procedure 
            </Text>
        </View>

    </View>
} 

export default CompleteAddPatient 

const styles = StyleSheet.create({
    container: {
        height: 260,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    icon: {
        backgroundColor: '#EEF2F6',
        height: 124,
        borderRadius: 62,
        padding: 30,
        marginBottom: 20
    },
    textBox: {
        borderWidth: 1,
        borderColor: '#CCD6E0',
        borderRadius: 8,
        height: 64,
        width: 304,
        padding: 12,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#4E5664',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    }
});