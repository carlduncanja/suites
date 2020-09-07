import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";
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


const PatientAddressTab = ({ onAddressInfoChange, fields, errors}) => {
    const { addressInfo = {} } = fields
    const theme = useTheme()

    const {
        line1 = "",
        line2 = "",
        city = "",
        parish = ""
    } = addressInfo

    return (
        <View style={styles.sectionContainer}>
            <RowWrapper theme={theme}>
                <InputWrapper >
                    <InputField2
                        label={"Address Line 1"}
                        labelWidth={98}
                        onChangeText={onAddressInfoChange('line1')}
                        value={line1}
                        onClear={() => onAddressInfoChange('line1')('')}
                        hasError={errors['line1']}
                        errorMessage={errors['line1']}
                    />
                </InputWrapper>
            </RowWrapper>

            <RowWrapper theme={theme} >
                <InputWrapper >
                    <InputField2
                        label={"Address Line 2"}
                        labelWidth={98}
                        onChangeText={onAddressInfoChange('line2')}
                        value={line2}
                        onClear={() => onAddressInfoChange('line2')('')}
                    />
                </InputWrapper>
            </RowWrapper>

            <RowWrapper theme={theme} >
                <InputWrapper >
                    <InputField2
                        label={"City"}
                        labelWidth={98}
                        onChangeText={onAddressInfoChange('city')}
                        value={city}
                        onClear={() => onAddressInfoChange('city')('')}
                        hasError={errors['city']}
                        errorMessage={errors['city']}
                    />
                </InputWrapper>
            </RowWrapper>

            <RowWrapper theme={theme} >
                <InputWrapper >
                    <InputField2
                        label={"Parish"}
                        labelWidth={98}
                        onChangeText={onAddressInfoChange('parish')}
                        value={parish}
                        onClear={() => onAddressInfoChange('parish')('')}
                        hasError={errors['parish']}
                        errorMessage={errors['parish']}
                    />
                </InputWrapper>
            </RowWrapper>
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

