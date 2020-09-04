import React, {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";
import {isValidEmail} from "../../../utils/formatter";
import styled from "@emotion/native";
import Row from "../../common/Row";
import {useTheme} from "emotion-theming";


const Space = styled.View`
   width:  ${({theme}) => theme.space['--space-24']}
`;

const RowWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${({theme}) => theme.space['--space-20']};
    z-index: ${({zIndex}) => zIndex};
`

const InputWrapper = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: ${({zIndex}) => zIndex};

`

const PatientContactTab = ({onFieldChange, fields}) => {
    const theme = useTheme();
    const {contactInfo = {}} = fields
    const {
        phones = [],
        emails = [],
        emergencyContact = []
    } = contactInfo

    const cellObj = phones.filter(item => item.type === 'cell')[0] || {}
    const cellPhone = cellObj.phone || ""

    const workObj = phones.filter(item => item.type === 'work')[0] || {}
    const workPhone = workObj.phone || ""

    const primaryObj = emails.filter(item => item.type === 'primary')[0] || {}
    const primaryEmail = primaryObj.phone || ""

    const workEmailObj = emails.filter(item => item.type === 'work')[0] || {}
    const workEmail = workEmailObj.phone || ""

    const emergency = emergencyContact[0] || {}

    const [phoneValues, setPhones] = useState([
        {
            type: 'cell',
            phone: cellPhone
        },
        {
            type: 'work',
            phone: workPhone
        }
    ])

    const [emailValues, setEmails] = useState([
        {
            type: 'primary',
            email: primaryEmail
        },
        {
            type: 'work',
            email: workEmail
        },
    ])

    const [emergencyValues, setEmergency] = useState({
        name: emergency.name || "",
        relation: emergency.relation || "",
        phone: emergency.phone || "",
        email: emergency.email || ""
    })

    const formatNumber = (value) => {
        return value.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")
    }

    const handlePhone = (type) => (value) => {
        const objIndex = phoneValues.findIndex(obj => obj.type === type);
        const updatedObj = {...phoneValues[objIndex], phone: value};
        const updatedPhones = [
            ...phoneValues.slice(0, objIndex),
            updatedObj,
            ...phoneValues.slice(objIndex + 1),
        ];

        if (/^\d{10}$/g.test(value) || !value) {
            onFieldChange('contactInfo')({...fields['contactInfo'], phones: updatedPhones})
        }

        setPhones(updatedPhones)
    }

    const handleEmail = (type) => (value) => {

        const objIndex = emailValues.findIndex(obj => obj.type === type);
        const updatedObj = {...emailValues[objIndex], email: value};
        const updatedEmails = [
            ...emailValues.slice(0, objIndex),
            updatedObj,
            ...emailValues.slice(objIndex + 1),
        ];

        if (isValidEmail(value) || !value) {
            onFieldChange('contactInfo')({...fields['contactInfo'], emails: updatedEmails})
        }

        setEmails(updatedEmails)
    }

    const handleEmergency = (type) => (value) => {
        let updatedEmegency = {
            ...emergencyValues,
            [type]: value
        }
        if (type === 'email') {
            (isValidEmail(value) || !value) && onFieldChange('contactInfo')({
                ...fields['contactInfo'],
                emergencyContact: [updatedEmegency]
            })
        } else if (type === 'phone') {
            if (/^\d{10}$/g.test(value) || !value) onFieldChange('contactInfo')({
                ...fields['contactInfo'],
                emergencyContact: [updatedEmegency]
            })
        } else {
            onFieldChange('contactInfo')({...fields['contactInfo'], emergencyContact: [updatedEmegency]})
        }
        setEmergency(updatedEmegency)

    }

    return (
        <View style={styles.sectionContainer}>

            <RowWrapper theme={theme} zIndex={0}>

                <InputWrapper style={styles.inputWrapper}>
                    <InputField2
                        label={"Cell"}
                        labelWidth={98}
                        onChangeText={(value) => handlePhone('cell')(value)}
                        value={formatNumber(phoneValues.filter(item => item.type === 'cell')[0].phone)}
                        onClear={() => handlePhone('cell')('')}
                        keyboardType="number-pad"
                    />
                </InputWrapper>
                <Space/>
                <InputWrapper style={styles.inputWrapper}>
                    <InputField2
                        label={"Work"}
                        labelWidth={98}
                        onChangeText={(value) => handlePhone('work')(value)}
                        value={formatNumber(phoneValues.filter(item => item.type === 'work')[0].phone)}
                        onClear={() => handlePhone('work')('')}
                        keyboardType="number-pad"
                    />
                </InputWrapper>

            </RowWrapper>

            <RowWrapper theme={theme} zIndex={-1}>

                <InputWrapper style={styles.inputWrapper}>
                    <InputField2
                        label={"Primary Email"}
                        labelWidth={98}
                        onChangeText={(value) => handleEmail('primary')(value)}
                        value={emailValues.filter(item => item.type === 'primary')[0].email}
                        onClear={() => handleEmail('primary')('')}
                        keyboardType="email-address"
                    />
                </InputWrapper>
                <Space/>
                <InputWrapper style={styles.inputWrapper}>
                    <InputField2
                        label={"Work Email"}
                        labelWidth={98}
                        onChangeText={(value) => handleEmail('work')(value)}
                        value={emailValues.filter(item => item.type === 'work')[0].email}
                        onClear={() => handleEmail('work')('')}
                        keyboardType="email-address"
                    />
                </InputWrapper>

            </RowWrapper>

            <RowWrapper theme={theme}>
                <Text style={{fontWeight: '500', fontSize: 14, color: "#323843"}}>Emergency Contact</Text>
            </RowWrapper>


            <RowWrapper theme={theme} zIndex={-2}>

                <InputWrapper style={styles.inputWrapper}>
                    <InputField2
                        label={"Name"}
                        labelWidth={98}
                        onChangeText={(value) => handleEmergency('name')(value)}
                        value={emergencyValues['name']}
                        onClear={() => handleEmergency('name')('')}
                    />
                </InputWrapper>
                <Space/>
                <InputWrapper style={styles.inputWrapper}>
                    <InputField2
                        label={"Relationship"}
                        labelWidth={98}
                        onChangeText={(value) => handleEmergency('relation')(value)}
                        value={emergencyValues['relation']}
                        onClear={() => onFieldChange('relation')('')}
                    />
                </InputWrapper>

            </RowWrapper>

            <RowWrapper theme={theme} zIndex={-2}>

                <InputWrapper style={styles.inputWrapper}>
                    <InputField2
                        label={"Cell"}
                        labelWidth={98}
                        onChangeText={(value) => handleEmergency('phone')(value)}
                        value={formatNumber(emergencyValues['phone'])}
                        onClear={() => onFieldChange('phone')('')}
                        keyboardType="number-pad"
                    />
                </InputWrapper>
                <Space/>
                <InputWrapper style={styles.inputWrapper}>
                    <InputField2
                        label={"Email"}
                        labelWidth={98}
                        onChangeText={(value) => handleEmergency('email')(value)}
                        value={emergencyValues['email']}
                        onClear={() => onFieldChange('email')('')}
                        keyboardType="email-address"
                    />
                </InputWrapper>

            </RowWrapper>

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

