import React, { useState, useEffect } from 'react';
import { View, Text, DatePickerIOS } from 'react-native';
import styled, { css } from '@emotion/native';
import { withModal } from 'react-native-modalfy';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import _, { isEmpty } from 'lodash';
import { Divider } from 'react-native-paper';
import moment from 'moment';
import Record from '../common/Information Record/Record';
import ListTextRecord from '../common/Information Record/ListTextRecord';
import Row from '../common/Row';
import InputField2 from '../common/Input Fields/InputField2';
import DropdownField from '../common/Input Fields/DropdownField';
import DropdownInputField from '../common/Input Fields/DropdownInputField';
import OptionsField from '../common/Input Fields/OptionsField';
import { getTheatres, getPhysicians, getStorage } from '../../api/network';

import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';

import InputUnitField from '../common/Input Fields/InputUnitFields';
import DateInputField from '../common/Input Fields/DateInputField';
import MultipleSelectionsField from '../common/Input Fields/MultipleSelectionsField';

const InputWrapper = styled.View`
height:30px;
width:380px;
margin-right:30px;

`;
const DateWrapper = styled.View`
height:30px;
width:260px;
margin-top:5px;

`;

const ViewBreaker = styled.View`
flex-direction:row;
align-items:center;
justify-content:space-between;
margin-top:25px;
`;
const DoneButtonWrapper = styled.TouchableOpacity`
width:616px;
border-radius:8px;
height:48px;
margin-top:20px;
align-self:center;
align-items:center;
justify-self:flex-end;
justify-content:center;
background-color:${({ theme }) => theme.colors['--color-blue-500']};
`;

const DoneButtonText = styled.Text`
font:${({ theme }) => theme.font['--text-base-bold']};
color:${({ theme }) => theme.colors['--default-shade-white']};
`;

function AssignEquipmentDetailsTab({
    data,
    errors = {},
    onFieldChange,
    locations,
    physicians,
    theatres,
    onLocationUpdate,
    onTheatreUpdate,
    onPhysicianUpdate,
    equipmentDetails,
    onDonePress,
    setErrors
}) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState();

    const today = new Date();

    useEffect(() => {
        if (!isEmpty(searchValue)) {
            const evalSearchFunction = assignment => {
                if (assignment === 'Location') return fetchStorageLocations;
                if (assignment === 'Theatre') return fetchTheatres;
                if (assignment === 'Person') return fetchPhysicians;
                return () => console.log('search.function.missing');
            };

            const searchFunction = evalSearchFunction(data.assignment);

            const search = _.debounce(searchFunction, 300);

            setSearchQuery(prevSearch => {
                if (prevSearch && prevSearch.cancel) {
                    prevSearch.cancel();
                }
                return search;
            });
            search();
        } else setSearchResults([]);
    }, [searchValue]);

    const fetchStorageLocations = () => {
        getStorage(searchValue, 5)
            .then((storageLocationResult = []) => {
                const { data = [], pages = 0 } = storageLocationResult;
                const results = data.map(item => ({
                    name: item.name,
                    ...item
                }));
                setSearchResults(results || []);
            })
            .catch(error => {
                // TODO handle error
                console.log('failed to get storage locations');
                setSearchResults([]);
            });
    };

    const fetchTheatres = () => {
        getTheatres(searchValue, 5)
            .then((theatreResult = []) => {
                const { data = [], pages = 0 } = theatreResult;
                const results = data.map(item => ({
                    name: item.name,
                    ...item
                }));
                setSearchResults(results || []);
            })
            .catch(error => {
                // TODO handle error
                console.log('failed to get theatres');
                setSearchResults([]);
            });
    };

    const fetchPhysicians = () => {
        getPhysicians(searchValue, 5)
            .then((physicianResult = []) => {
                const { data = [], pages = 0 } = physicianResult;
                const results = data.map(item => ({
                    name: `Dr. ${item.surname}`,
                    ...item
                }));
                setSearchResults(results || []);
            })
            .catch(error => {
                // TODO handle error
                console.log('failed to get physicians', error);
                setSearchResults([]);
            });
    };

    const onDateChange = date => {
        onFieldChange('date')(date);
    };

    const validateFields = () => {
        let errors = {};
        let isValid = true;
        const requiredFields = data.assignment === "Location" ?  ['assignment', 'assigned'] :  ['assignment', 'assigned', 'date', 'duration']
        for (const requiredField of requiredFields) {
            if (!data[requiredField]) {
                errors = {
                    ...errors,
                    [requiredField]: "Value is Required"
                }
                isValid = false;
            }
        }

        setErrors(errors)
        if (isValid) onDonePress();
    }

    return (
        <>
            <View style={{
                padding: 32,
                flexDirection: 'column',
                height: '88%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}>

                <Row style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <InputWrapper>
                        <InputField2
                            value=""
                            labelWidth={80}
                            placeholder={equipmentDetails?.name}
                            label="Equipment"
                            enabled={false}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <OptionsField
                            key={data.assignment}
                            labelWidth={80}
                            label="Assignment"
                            text={data.assignment}
                            oneOptionsSelected={
                                    onFieldChange('assignment')
                                }
                            menuOption={(
                                <MenuOptions>
                                    <MenuOption value="Location" text="Location" />
                                    <MenuOption value="Theatre" text="Theatre" />
                                    <MenuOption value="Person" text="Person" />
                                </MenuOptions>
                            )}
                            hasError={errors['assignment']}
                            errorMessage={errors['assignment']}

                        />
                    </InputWrapper>
                </Row>
                <Row>
                    <InputWrapper>
                        <SearchableOptionsField
                            label="Assigned"
                            labelWidth={80}
                            value={data.assignment === 'Location' ? locations : data.assignment === 'Theatre' ? theatres : physicians}
                            text={searchValue}
                            hasError={errors['assigned']}
                            errorMessage={errors['assigned']}
                            oneOptionsSelected={value => {
                                const location = {
                                    _id: value._id,
                                    name: value.name,
                                };

                                const physician = {
                                    _id: value._id,
                                    name: value.name
                                };

                                const theatre = {
                                    _id: value._id,
                                    name: value.name
                                };

                                data.assignment === 'Location' ? onLocationUpdate(location) :
                                    data.assignment === 'Theatre' ? onTheatreUpdate(theatre) :
                                        onPhysicianUpdate(physician);
                            }}
                            onChangeText={value => setSearchValue(value)}
                            onClear={() => setSearchValue('')}
                            options={searchResults}
                        />
                    </InputWrapper>

                    {
                        data.assignment !== 'Location' && <InputWrapper>
                            <DateInputField
                                label="From"
                                labelWidth={80}
                                value={data.date}
                                errorMessage={errors['date']}
                                hasError={errors['date']}
                                onClear={() => onFieldChange('date')('')}
                                mode="datetime"
                                keyboardType="number-pad"
                                placeholder="YYYY/MM/DD"
                                minDate={moment().add(1, 'days').toDate()}
                                maxDate={null}
                                onDateChange={onDateChange}
                                borderColor={errors['date'] ? '--color-red-700' : '--color-gray-300'}
                            />
                        </InputWrapper>
                    }
                </Row>
                <Row>
                    {
                        data.assignment !== 'Location' && <InputWrapper>
                            <InputUnitField
                                label="Duration"
                                labelWidth={80}
                                hasError={errors['duration']}
                                errorMessage={errors['duration']}
                                onChangeText={value => {
                                    if (/^\d+$/g.test(value) || !value) {
                                        onFieldChange('duration')(value);
                                    }
                                }}
                                value={data.duration}
                                units={['hrs']}
                                keyboardType="number-pad"
                            />
                        </InputWrapper>
                    }
                </Row>

            </View>
            <Divider />
            <DoneButtonWrapper onPress={validateFields}>
                <DoneButtonText>DONE</DoneButtonText>
            </DoneButtonWrapper>
        </>
    );
}

export default withModal(AssignEquipmentDetailsTab);
