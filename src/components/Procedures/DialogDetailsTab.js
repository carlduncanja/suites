import React,{  } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../common/Input Fields/InputField2";
import DropdownInputField from "../common/Input Fields/DropdownInputField";
import InputUnitField from "../common/Input Fields/InputUnitFields";

const DialogDetailsTab = ({ onFieldChange, fields }) =>{
    return (
        <View style={styles.sectionContainer}>
            
            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputField2 
                        label={"Reference"}
                        onChangeText={onFieldChange('reference')}
                        value={fields['reference']}
                        onClear={() => onFieldChange('reference')('')}
                    />
                </View>
                <View style={[styles.inputWrapper]}>
                    <DropdownInputField 
                        label={"Template ?"}
                        onSelectChange={onFieldChange('isTemplate')}
                        value={fields['isTemplate']}
                        dropdownOptions = {["Yes","No"]}
                    />
                </View>

            </View>

            <View
            style={{
                height:2,
                backgroundColor:'#CCD6E0',
                marginBottom:20
            }}
            />

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputField2 
                        label={"Procedure"}
                        onChangeText={onFieldChange('name')}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <InputField2 
                        label={"Physician"}
                        onChangeText={onFieldChange('physician')}
                        value={fields['physician']}
                        onClear={() => onFieldChange('physician')('')}
                    />
                </View>

            </View>

            <View style={styles.row}>

                {/* <View style={styles.inputWrapper}>
                    <DropdownInputField 
                        label={"Location"}
                        onSelectChange={onFieldChange('location')}
                        value={fields['location']}
                        dropdownOptions = {["Operating Room 1","Operating Room 2", "Operating Room 3", "Operating Room 4", "Operating Room 5"]}
                    />
                </View> */}

                <View style={styles.inputWrapper}>
                    <InputField2 
                        label={"Category"}
                        onChangeText={onFieldChange('category')}
                        value={fields['category']}
                        onClear={() => onFieldChange('category')('')}
                    />
                </View>

            </View>

            <View style={[styles.row]}>

                <View style={styles.inputWrapper}>
                    <InputUnitField 
                        label={"Duration"}
                        onChangeText={onFieldChange('duration')}
                        value={fields['duration']}
                        units = {['hrs']}
                        keyboardType = "number-pad"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <DropdownInputField 
                        label={"Recovery ?"}
                        onSelectChange={onFieldChange('hasRecovery')}
                        value={fields['hasRecovery']}
                        dropdownOptions = {["Yes","No"]}
                    />
                </View>

            </View>

        </View>
    )
}

DialogDetailsTab.propTypes = {}
DialogDetailsTab.defaultProps = {}

export default DialogDetailsTab

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
})