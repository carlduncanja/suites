import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details, Diagnosis, Insurance, PatientRisk, EditablePatientDetails, CovidTestTab } from '../../OverlayPages/Patient';

const Patient = ({
    patient,
    procedures = [],
    selectedTab,
    onPatientUpdated = () => {
    },
    onRiskUpdate = () => {
    },
    isEditMode
}) => {


    const dates = procedures.map(item => {
        const { appointment } = item;
        //const {startTime} = appointment;

        const startTime = appointment?.startTime || "";

        return moment(startTime)

    }); 

    console.log("we are here to have fun",patient)

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
        surname = '',
        contactInfo = {},
        insurance = {},
        medicalInfo = {},
        address: addresses = [],
        nextVisit = getDate(dates) || null
    } = patient;

    const { phones = [], emails = [], emergencyContact: emergencyContacts = [] } = contactInfo;
    const { diagnosis = [], risks = [] } = medicalInfo;

    const handlePhones = () => {
        const cellPhone = phones.find(p => p.type === 'cell');
        const homePhone = phones.find(p => p.type === 'home');
        const workPhone = phones.find(p => p.type === 'work');

        return [
            {
                type: 'cell',
                phone: cellPhone ? cellPhone.phone : ''
            },
            {
                type: 'home',
                phone: homePhone ? homePhone.phone : ''
            },
            {
                type: 'work',
                phone: workPhone ? workPhone.phone : ''
            }
        ];
    };

    const handleEmails = () => {
        const primaryEmail = emails.find(e => e.type === 'primary');
        const otherEmail = emails.find(e => e.type === 'other');
        const workEmail = emails.find(e => e.type === 'work');

        return [
            {
                type: 'primary',
                email: primaryEmail ? primaryEmail.email : ''
            },
            {
                type: 'other',
                email: otherEmail ? otherEmail.email : ''
            },
            {
                type: 'work',
                email: workEmail ? workEmail.email : ''
            }
        ];
    };

    const handleAddresses = () => (addresses.length ? [...addresses] : [
        {
            line1: '',
            line2: ''
        }
    ]);

    const handleEmergencyContacts = () => (emergencyContacts.length ? [...emergencyContacts] : [
        {
            email: '',
            name: '',
            phone: '',
            relation: ''
        }
    ]);

    const updatedPatient = {
        ...patient,
        contactInfo: {
            ...contactInfo,
            phones: handlePhones(),
            emails: handleEmails(),
            emergencyContact: handleEmergencyContacts()
        },
        address: handleAddresses()
    };

    const renderPatientTab = () => {
        console.log('Tab: ', selectedTab);
        switch (selectedTab) {
            case 'Details':
                console.log('Details tab');
                return (
                    <Details
                        tabDetails={{
                            ...updatedPatient,
                            nextVisit,
                        }}
                        onUpdated={onPatientUpdated}
                    />
                );

            case 'Insurance':
                return (
                    <Insurance tabDetails={{
                        ...insurance,
                        patient: `${firstName} ${surname}`,
                        procedures
                    }}
                    />
                );

            case 'Diagnosis':
                return (
                    <Diagnosis
                        tabDetails={diagnosis}
                        isEditMode={isEditMode}
                    />
                );

            case 'Patient Risk':
                return (
                    <PatientRisk
                        tabDetails={risks}
                        patientId={patient._id}
                        isEditMode={isEditMode}
                        onRiskUpdate={onRiskUpdate}
                    />
                );

            case 'Covid Test':
                return (
                    <CovidTestTab
                        patientId={patient?._id}
                        covidResults={patient?.covid}
                        onPatientUpdated={onPatientUpdated}
                    />
                );

            default:
                return (<View />);
        }
    };

    return (
        <>
            {renderPatientTab()}
        </>
    );
};

export default Patient;
