import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";
import { isValidNumber, currencyFormatter } from "../../../utils/formatter";

const PatientInsuranceTab = ({ onFieldChange, fields }) => {

    const { insurance = {} } = fields

    const {
        name = "",
        coverage = 0,
        policyNumber = ""
    } = insurance

    const [insuranceValues, setInsurance] = useState({
        name,
        coverage,
        policyNumber
    })

    const handleInsurance = (type) => (value) => {
        let updatedInsurance = {
            ...insuranceValues,
            [type] : value
        }
        // if(type === 'policyNumber'){
        //     (isValidNumber(parseInt(value)) || !value) && onFieldChange('insurance')({...insurance,policyNumber:parseInt(value)})
        if(type === 'coverage'){
            (/\d+((\.){1}(\d{2})){0,1}$/g.test(value) ) && onFieldChange('insurance')({...insuranceValues, coverage : parseInt(value)})
        }else{
            onFieldChange('insurance')(updatedInsurance)
        }
        setInsurance(updatedInsurance)
    }

    return ( 
        <View style={styles.sectionContainer}>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Primary Insurer"}
                        onChangeText={(value)=>handleInsurance('name')(value)}
                        value={insuranceValues['name']}
                        onClear={() => handleInsurance('name')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Policy Number"}
                        onChangeText={(value)=>handleInsurance('policyNumber')(value)}
                        value={insuranceValues['policyNumber']}
                        onClear={() => handleInsurance('policyNumber')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Coverage Limit"}
                        onChangeText={(value)=>handleInsurance('coverage')(value)}
                        value={insuranceValues['coverage'].toString()}
                        onClear={() => handleInsurance('coverage')('')}
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