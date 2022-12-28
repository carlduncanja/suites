import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";
import { isValidNumber, currencyFormatter } from "../../../utils/formatter";
import styled from "@emotion/native";
import {useTheme} from "emotion-theming";


const RowWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-bottom: ${({theme}) => theme.space['--space-20']};
    z-index: ${({zIndex}) => zIndex};
`

const InputWrapper = styled.View`
    width: 400px;
    flex-direction: row;
    align-items: center;
    z-index: ${({zIndex}) => zIndex};
`

const PatientInsuranceTab = ({ onFieldChange, fields }) => {
    const theme = useTheme()
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

        if(type === 'coverage'){
            (/\d+((\.){1}(\d{2})){0,1}$/g.test(value) ) && onFieldChange('insurance')({...insuranceValues, coverage : parseInt(value)})
        }else{
            onFieldChange('insurance')(updatedInsurance)
        }

        setInsurance(updatedInsurance)
    }

    return (
        <View style={styles.sectionContainer}>

            <RowWrapper theme={theme} >
                <InputWrapper >
                    <InputField2
                        label={"Primary Insurer"}
                        labelWidth={98}
                        onChangeText={(value)=>handleInsurance('name')(value)}
                        value={insuranceValues['name']}
                        onClear={() => handleInsurance('name')('')}
                    />
                </InputWrapper>
            </RowWrapper>

            <RowWrapper theme={theme}>
                <InputWrapper >
                    <InputField2
                        label={"Policy Number"}
                        labelWidth={98}
                        onChangeText={(value)=>handleInsurance('policyNumber')(value)}
                        value={insuranceValues['policyNumber']}
                        onClear={() => handleInsurance('policyNumber')('')}
                    />
                </InputWrapper>
            </RowWrapper>

            <RowWrapper theme={theme}>
                <InputWrapper >
                    <InputField2
                        label={"Coverage Limit"}
                        labelWidth={98}
                        onChangeText={(value)=>handleInsurance('coverage')(value)}
                        value={insuranceValues['coverage'].toString()}
                        onClear={() => handleInsurance('coverage')('')}
                    />
                </InputWrapper>
            </RowWrapper>

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
