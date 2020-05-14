import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";

const PatientInsuranceTab = ({ onFieldChange, fields }) => {

    return ( 
        <View style={styles.sectionContainer}>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Primary Insurer"}
                        onChangeText={onFieldChange('primaryInsurer')}
                        value={fields['primaryInsurer']}
                        onClear={() => onFieldChange('primaryInsurer')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Policy Number"}
                        onChangeText={onFieldChange('policyNumber')}
                        value={fields['policyNumber']}
                        onClear={() => onFieldChange('policyNumber')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Coverage Limit"}
                        onChangeText={onFieldChange('coverageLimit')}
                        value={fields['coverageLimit']}
                        onClear={() => onFieldChange('coverageLimit')('')}
                    />
                </View>
            </View>

        </View>
    )
}

export default PatientInsuranceTab

const styles = StyleSheet.create({
    sectionContainer: {
        height: 260,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        alignItems:"center"
    },
    inputWrapper: {
        width: 320,
        flexDirection: 'row',
    }
})