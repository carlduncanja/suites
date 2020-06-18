import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";


//     "line1": "23 Ruthven Road",
//     "line2": "",
//     "city": "Kingston",
//     "parish": "Kingston 8"
const PatientAddressTab = ({ onFieldChange, fields, errors}) => {
    // const { addressInfo = {} } = fields
    // const createdAddres = addressInfo || {}
    // const {
    //     line1 = "",
    //     line2 = "",
    //     city = "",
    //     parish = ""
    // } = createdAddres
    //
    // const [addressValues, setAddress] = useState({
    //     line1,
    //     line2,
    //     city,
    //     parish
    // })
    //
    // const handleAddress = (type) => (value) =>{
    //     const updatedAddress = {
    //         ...addressValues,
    //         [type] : value
    //     }
    //     onFieldChange('addressInfo')([updatedAddress])
    //     setAddress(updatedAddress)
    // }


    return (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Address Line 1"}
                        onChangeText={onFieldChange('line1')}
                        value={fields['line1']}
                        onClear={() => onFieldChange('line1')('')}
                        hasError={errors['line1']}
                        errorMessage={errors['line1']}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Address Line 2"}
                        onChangeText={onFieldChange('line2')}
                        value={fields['line2']}
                        onClear={() => onFieldChange('line2')('')}

                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"City"}
                        onChangeText={onFieldChange('city')}
                        value={fields['city']}
                        onClear={() => onFieldChange('city')('')}
                        hasError={errors['city']}
                        errorMessage={errors['city']}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Parish"}
                        onChangeText={onFieldChange('parish')}
                        value={fields['parish']}
                        onClear={() => onFieldChange('parish')('')}
                        hasError={errors['parish']}
                        errorMessage={errors['parish']}
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

