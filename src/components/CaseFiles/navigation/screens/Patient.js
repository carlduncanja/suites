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
        insurance = {},
        medicalInfo = {},
        nextVisit = getDate(dates) || null
    } = patient;

    const {diagnosis = [], risks = []} = medicalInfo;

    return (
        selectedTab === 'Details' ?
            (
                <Details
                    tabDetails={{
                        ...patient,
                        nextVisit
                    }}
                    onUpdated={() => {
                    }}
                />
            ) :
            selectedTab === 'Insurance' ?
                (
                    <Insurance tabDetails={{
                        ...insurance,
                        patient: `${firstName} ${surname}`
                    }}
                    />
                ) :
                selectedTab === 'Diagnosis' ?
                    (
                        <Diagnosis
                            tabDetails={diagnosis}
                            isEditMode={isEditMode}
                        />
                    ) :
                    (
                        <PatientRisk
                            tabDetails={risks}
                            isEditMode={isEditMode}
                        />
                    )
    );
};

export default Patient;
