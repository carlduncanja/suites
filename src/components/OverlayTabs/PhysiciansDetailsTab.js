import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import EmergencyContact from '../common/EmergencyContact';
import Contact from '../common/Contact';
import ColumnSectionsList from '../common/ColumnsSectionsList';
import Record from '../common/Information Record/Record';
import ColumnSection from '../common/ColumnSection';
import {transformToSentence, formatDate, calcAge, formatTrn} from '../../utils/formatter';
import ResponsiveRecord from '../common/Information Record/ResponsiveRecord';
import InputField2 from '../common/Input Fields/InputField2';
import Footer from '../common/Page/Footer';

const PhysiciansDetailsTab = ({physician}) => {
    const {
        firstName,
        middleName,
        surname,
        dob,
        gender,
        trn,
        emails,
        address,
        phones,
        emergencyContact
    } = physician;

    const phoneObject = {};
    const emailObject = {};
    const addressObject = {};

    phones.map(phone => {
        if (phone.type === 'cell') {
            Object.assign(phoneObject, {cell: phone.phone});
        } else if (phone.type === 'work') {
            Object.assign(phoneObject, {work: phone.phone});
        } else if (phone.type === 'home') {
            Object.assign(phoneObject, {home: phone.phone});
        } else {
            Object.assign(phoneObject, {});
        }
    });

    emails.map(email => {
        if (email.type === 'primary') {
            Object.assign(emailObject, {primary: email.email});
        } else if (email.type === 'work') {
            Object.assign(emailObject, {work: email.email});
        } else if (email.type === 'other') {
            Object.assign(emailObject, {other: email.email});
        } else {
            Object.assign(emailObject, {});
        }
    });

    address.map(addressObj => {
        Object.assign(addressObject, {
            address1: addressObj.line1,
            address2: addressObj.line2
        });
    });

    const personalData = [
        <Record
            recordTitle="First Name"
            recordValue={firstName}
        />,
        <Record
            recordTitle="Middle Name"
            recordValue={middleName}
        />,
        <Record
            recordTitle="Surname"
            recordValue={surname}
        />,
        <Record
            recordTitle="Age"
            recordValue={calcAge(dob) || ''}
        />,
        <Record
            recordTitle="Gender"
            recordValue={transformToSentence(gender)}
        />,
        <Record
            recordTitle="Date Of Birth"
            recordValue={formatDate(dob, 'DD/MM/YYYY')}
        />,
        <Record
            recordTitle="TRN"
            recordValue={formatTrn(trn)}
        />
    ];

    const contactData = [
        <ResponsiveRecord
            recordTitle="Cell Phone Number"
            recordValue={phoneObject.cell}
            handleRecordPress={() => {
            }}
        />,
        <ResponsiveRecord
            recordTitle="Home Phone Number"
            recordValue={phoneObject.home}
            handleRecordPress={() => {
            }}
        />,
        <ResponsiveRecord
            recordTitle="Work Phone Number"
            recordValue={phoneObject.work}
            handleRecordPress={() => {
            }}
        />,
        <ResponsiveRecord
            recordTitle="Primary Email"
            recordValue={emailObject.primary}
            handleRecordPress={() => {
            }}
        />,
        <ResponsiveRecord
            recordTitle="Alternate Email"
            recordValue={emailObject.other}
            handleRecordPress={() => {
            }}
        />,
        <Record
            recordTitle="Work Email"
            recordValue={emailObject.work}
        />,
        <Record
            recordTitle="Address 1"
            recordValue={addressObject.address1}
        />,
        <Record
            recordTitle="Address 2"
            recordValue={addressObject.address2}
        />
    ];

    const emergencyContacts = () => (emergencyContact.length === 0 ? (
        <ColumnSection
            data={[
                <Record
                    recordTitle="Emergency Name 1"
                />,
                <ResponsiveRecord
                    recordTitle="Emergency Number 1"
                    handleRecordPress={() => {
                    }}
                />,
                <ResponsiveRecord
                    recordTitle="Emergency Email 1"
                    handleRecordPress={() => {
                    }}
                />
            ]}
            numOfColumns={3}
        />
    ) : emergencyContact.map((contact, index) => (
        <View key={index}>
            <ColumnSection
                data={[
                    <Record
                        recordTitle={`Emergency Name ${index + 1}`}
                        recordValue={`${contact.name} (${contact.relation})`}
                    />,
                    <ResponsiveRecord
                        recordTitle={`Emergency Number ${index + 1}`}
                        recordValue={contact.phone}
                        handleRecordPress={() => {
                        }}
                    />,
                    <ResponsiveRecord
                        recordTitle={`Emergency Email ${index + 1}`}
                        recordValue={contact.email}
                        handleRecordPress={() => {
                        }}
                    />
                ]}
                numOfColumns={3}
            />
        </View>
    )));

    const sections = [
        <ColumnSection
            data={personalData}
            numOfColumns={3}
        />,
        <ColumnSection
            data={contactData}
            numOfColumns={3}
        />,
        emergencyContacts()
    ];

    return (
        <>
            <ColumnSectionsList
                sections={sections}
            />
            <Footer
                hasActions={false}
                hasPaginator={false}
            />
        </>
    );
};

export default PhysiciansDetailsTab;
