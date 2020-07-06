import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";



const PatientAddressTab = ({ onAddressInfoChange, fields, errors}) => {
    const { addressInfo = {} } = fields

    const {
        line1 = "",
        line2 = "",
        city = "",
        parish = ""
    } = addressInfo

    // const [addressValues, setAddress] = useState({
    //     line1,
    //     line2,
    //     city,
    //     parish
    // })


    // const handleAddress = (type) => (value) =>{
    //     const updatedAddress = {
    //         ...addressInfo,
    //         [type] : value
    //     }
    //     onFieldChange('addressInfo')([updatedAddress])
    //
    // }


    return (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Address Line 1"}
                        onChangeText={onAddressInfoChange('line1')}
                        value={line1}
                        onClear={() => onAddressInfoChange('line1')('')}
                        hasError={errors['line1']}
                        errorMessage={errors['line1']}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Address Line 2"}
                        onChangeText={onAddressInfoChange('line2')}
                        value={line2}
                        onClear={() => onAddressInfoChange('line2')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"City"}
                        onChangeText={onAddressInfoChange('city')}
                        value={city}
                        onClear={() => onAddressInfoChange('city')('')}
                        hasError={errors['city']}
                        errorMessage={errors['city']}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Parish"}
                        onChangeText={onAddressInfoChange('parish')}
                        value={parish}
                        onClear={() => onAddressInfoChange('parish')('')}
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

