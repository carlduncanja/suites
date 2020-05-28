import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";

const PatientAddressTab = ({ onFieldChange, fields }) => {
    const { addressInfo = [] } = fields
    const createdAddres = addressInfo[0] || {}
    const { 
        line1 = "",
        line2 = "",
        city = "",
        parish = ""

    } = createdAddres

    const [addressValues, setAddress] = useState({
        line1,
        line2,
        city,
        parish
    })

    const handleAddress = (type) => (value) =>{
        const updatedAddress = {
            ...addressValues,
            [type] : value
        }
        onFieldChange('addressInfo')([updatedAddress])
        setAddress(updatedAddress)
    }
    return (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Address Line 1"}
                        onChangeText={(value)=>handleAddress('line1')(value)}
                        value={addressValues['line1']}
                        onClear={() => handleAddress('line1')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Address Line 2"}
                        onChangeText={(value)=>handleAddress('line2')(value)}
                        value={addressValues['line2']}
                        onClear={() => handleAddress('line2')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"City"}
                        onChangeText={(value)=>handleAddress('city')(value)}
                        value={addressValues['city']}
                        onClear={() => handleAddress('city')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Parish"}
                        onChangeText={(value)=>handleAddress('parish')(value)}
                        value={addressValues['parish']}
                        onClear={() => handleAddress('parish')('')}
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

