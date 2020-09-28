import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import moment from 'moment';
import {SuitesContext} from '../../../../contexts/SuitesContext';
import {Details, Diagnosis, Insurance, PatientRisk, EditablePatientDetails} from '../../OverlayPages/Patient';

const Patient = ({patient, procedures = [], selectedTab, isEditMode}) => {
    const dates = procedures.map(item => {
        const {appointment} = item;
        const {startTime} = appointment;
        return moment(startTime);
    });

    const getDate = dates => {
        let updatedDates = [...dates];
        let dateIndex = 0;
        while (dateIndex < dates.length) {
            const earliestDate = moment.min(updatedDates);
            const isAfterToday = moment(earliestDate)
                .isSameOrAfter(new Date());

            if (isAfterToday) {
                return earliestDate;
            }
            updatedDates = updatedDates.filter(item => item !== earliestDate);

            dateIndex += 1;
        }
    };

    const {
        firstName = '',
        middleName = '',
        surname = '',
        trn = '',
        height = 0,
        weight = 0,
        bloodType = '',
        dob = '',
        gender = '',
        ethnicity = '',
        address = [],
        contactInfo = {},
        insurance = {},
        medicalInfo = {},
        nextVisit = getDate(dates) || null
    } = patient;

    const {diagnosis = [], risks = []} = medicalInfo;

    const [fields, setFields] = useState({
        firstName,
        middleName,
        surname,
        trn,
        height,
        weight,
        bloodType,
        dob,
        gender,
        ethnicity,
        contactInfo,
        address,
        risks,
        diagnosis,
        nextVisit
    });

    const onFieldChange = fieldName => value => {
        console.log('fieldname.value', fieldName, value);
        setFields({
            ...fields,
            [fieldName]: value
        });
    };

    return (
        selectedTab === 'Details' ?
            isEditMode ?
                <EditablePatientDetails
                    fields = {fields}
                    onFieldChange = {onFieldChange}
                />
                :
                (
                    <Details tabDetails={{
                        ...patient,
                        nextVisit
                    }}
                    />
                )
            :
            selectedTab === 'Insurance' ?
                <Insurance tabDetails = {{...insurance, patient: `${firstName} ${surname}`}}/>
                :
                selectedTab === 'Diagnosis' ?
                (
                    <Diagnosis
                        tabDetails = {diagnosis}
                        fields = {fields}
                        isEditMode = {isEditMode}
                    />
                ) 
                 :
                    (
                        <PatientRisk
                            tabDetails={risks}
                            isEditMode={isEditMode}
                            fields={fields}
                            onFieldChange={onFieldChange}
                        />
                    )
    );
};

export default Patient;
