import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";
import { isValidNumber, currencyFormatter } from "../../../utils/formatter";

const PatientInsuranceTab = ({ onFieldChange, fields }) => {
    const [insurance, setInsurance] = useState({
        name : '',
        coverageLimit : '',
        policyNumber : ''
    })

    const handleInsurance = (type) => (value) => {
        let updatedInsurance = {
            ...insurance,
            [type] : value
        }
        if(type === 'policyNumber'){
            (isValidNumber(parseInt(value)) || !value) && onFieldChange('insurance')({...insurance,policyNumber:parseInt(value)})
        }else if(type === 'coverageLimit'){
            (/\d+((\.){1}(\d{2})){0,1}$/g.test(value) || !value) && onFieldChange('insurance')(updatedInsurance)
        }else{
            onFieldChange('emergencyContact')(updatedInsurance)
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
                        value={insurance['name']}
                        onClear={() => handleInsurance('name')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Policy Number"}
                        onChangeText={(value)=>handleInsurance('policyNumber')(value)}
                        value={insurance['policyNumber']}
                        onClear={() => handleInsurance('policyNumber')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Coverage Limit"}
                        onChangeText={(value)=>handleInsurance('coverageLimit')(value)}
                        value={insurance['coverageLimit']}
                        onClear={() => handleInsurance('coverageLimit')('')}
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