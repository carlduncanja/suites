import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";

const PatientAddressTab = ({ onFieldChange, fields }) => {

    return (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Address Line 1"}
                        onChangeText={onFieldChange('address1')}
                        value={fields['address1']}
                        onClear={() => onFieldChange('address1')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Address Line 2"}
                        onChangeText={onFieldChange('address2')}
                        value={fields['address2']}
                        onClear={() => onFieldChange('address2')('')}
                    />
                </View>
            </View>

        </View>
    )
}

export default PatientAddressTab

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
        width: 460,
        flexDirection: 'row',
    }
})

