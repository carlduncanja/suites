import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";

const PatientContactTab = ({onFieldChange, fields}) => {

    return (
        <View style={styles.sectionContainer}>

            <View style={[styles.row, {zIndex: 0}]}>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Cell"}
                        onChangeText={onFieldChange('cell')}
                        value={fields['cell']}
                        onClear={() => onFieldChange('cell')('')}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Work"}
                        onChangeText={onFieldChange('work')}
                        value={fields['work']}
                        onClear={() => onFieldChange('work')('')}
                    />
                </View>

            </View>

            <View style={[styles.row, {zIndex: -1}]}>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Personal Email"}
                        onChangeText={onFieldChange('primaryEmail')}
                        value={fields['primaryEmail']}
                        onClear={() => onFieldChange('primaryEmail')('')}
                    />
                </View>
                
            </View>

            <View style={{marginBottom:20}}>
                <Text style={{fontWeight:'500', fontSize:14, color:"#323843"}}>Emergency Contact</Text>
            </View>
            

            <View style={[styles.row, {zIndex: -2}]}>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Name"}
                        onChangeText={onFieldChange('emergencyName')}
                        value={fields['emergencyName']}
                        onClear={() => onFieldChange('emergencyName')('')}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Relationship"}
                        onChangeText={onFieldChange('relationship')}
                        value={fields['relationship']}
                        onClear={() => onFieldChange('relationship')('')}
                    />
                </View>

            </View>

            <View style={[styles.row, {zIndex: -2}]}>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Cell"}
                        onChangeText={onFieldChange('emergencyCell')}
                        value={fields['emergencyCell']}
                        onClear={() => onFieldChange('emergencyCell')('')}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Home"}
                        onChangeText={onFieldChange('emergencyHome')}
                        value={fields['emergencyHome']}
                        onClear={() => onFieldChange('emergencyHome')('')}
                    />
                </View>

            </View>

        </View>
    )
}

export default PatientContactTab

const styles = StyleSheet.create({
    sectionContainer: {
        height: 260,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputWrapper: {
        width: 260,
        flexDirection: 'row',
    }
});

