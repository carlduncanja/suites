import React, { useState, useEffect } from 'react';
import { View, Text, DatePickerIOS } from 'react-native';
import styled, { css } from '@emotion/native';
import { withModal } from "react-native-modalfy";
import Record from '../common/Information Record/Record';
import ListTextRecord from '../common/Information Record/ListTextRecord';
import Row from '../common/Row';
import InputField2 from '../common/Input Fields/InputField2';
import DropdownField from '../common/Input Fields/DropdownField';
import DropdownInputField from '../common/Input Fields/DropdownInputField';
import OptionsField from '../common/Input Fields/OptionsField';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import { getTheatres } from "../../api/network";
import { getPhysicians } from "../../api/network";
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';
import { isEmpty } from 'lodash';
import { Divider } from 'react-native-paper';
import _ from "lodash";
import InputUnitField from '../common/Input Fields/InputUnitFields';
import DateInputField from '../common/Input Fields/DateInputField';
import moment from 'moment';
import MultipleSelectionsField from '../common/Input Fields/MultipleSelectionsField';

const InputWrapper = styled.View`
height:30px;
width:260px;
margin-right:30px;

`
const DateWrapper = styled.View`
height:30px;
width:260px;
margin-top:5px;

`

const ViewBreaker = styled.View`
flex-direction:row;
align-items:center;
justify-content:space-between;
margin-top:25px;
`
const DoneButtonWrapper = styled.TouchableOpacity`
width:616px;
border-radius:8px;
height:48px;
margin-top:20px;
align-self:center;
align-items:center;
justify-self:flex-end;
justify-content:center;
background-color:${({ theme }) => theme.colors["--color-blue-500"]}
`;

const DoneButtonText = styled.Text`
font:${({ theme }) => theme.font["--text-base-bold"]};
color:${({ theme }) => theme.colors["--default-shade-white"]};
`


function AddEquipmentDetailsTab({ data, onFieldChange, onLocationUpdate, locations, physcians, onPhysicianUpdate, equipmentDetails, onDonePress }) {

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState();

    const today = new Date();

    useEffect(() => {

        if (!isEmpty(searchValue)) {
            const searchFunction = data['Assignment'] === "Location" ? fetchTheatres : fetchPhysicians;

            const search = _.debounce(searchFunction, 300);

            setSearchQuery(prevSearch => {
                if (prevSearch && prevSearch.cancel) {
                    prevSearch.cancel();
                }
                return search;
            });
            search();
        } else setSearchResults([])




    }, [searchValue])


    const fetchTheatres = () => {
        getTheatres(searchValue, 5)
            .then((theatreResult = []) => {
                const { data = [], pages = 0 } = theatreResult
                const results = data.map(item => ({
                    name: item.name,
                    ...item
                }));
                setSearchResults(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get Theatres");
                setSearchResults([]);
            })
    }

    const fetchPhysicians = () => {
        getPhysicians(searchValue, 5)
            .then((physicianResult = []) => {
                const { data = [], pages = 0 } = physicianResult
                const results = data.map(item => ({
                    name: `Dr. ${item.surname}`,
                    ...item
                }));
                setSearchResults(results || []);

            })
            .catch(error => {
                // TODO handle error

                console.log("failed to get physicians", error);
                setSearchResults([]);
            })
    }

    const onDateChange = (date) => {

        onFieldChange('date')(date)

    }




    return (
        <>
            <View style={{ flexDirection: "column", height: "88%", width: "100%", alignItems: "center", justifyContent: "flex-start" }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <InputWrapper>
                        <InputField2
                            value=""
                            labelWidth={98}
                            placeholder={equipmentDetails?.name}
                            label="Equipment"
                            enabled={false}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <MultipleSelectionsField
                            disabled={true}
                            onOptionsSelected={() => { }}
                            label={"Category"}
                            value={!equipmentDetails?.categories ? "--" : equipmentDetails.categories}

                        />
                    </InputWrapper>
                </View>
                <ViewBreaker>
                    <InputWrapper>
                        <OptionsField
                            key={data['Assignment']}
                            labelWidth={98}
                            label="Assignment"
                            text={data['Assignment']}
                            oneOptionsSelected={onFieldChange('Assignment')}
                            menuOption={<MenuOptions>
                                <MenuOption value={"Location"} text='Location' />
                                <MenuOption value={"Person"} text='Person' />
                            </MenuOptions>}

                        />
                    </InputWrapper>

                    <InputWrapper>
                        <SearchableOptionsField
                            label="Assigned"
                            labelWidth={98}
                            value={data['Assignment'] === "Location" ? locations : physcians}
                            text={searchValue}
                            oneOptionsSelected={(value) => {
                                const location = {
                                    _id: value._id,
                                    name: value.name,

                                }
                                const physician = {
                                    _id: value._id,
                                    name: value.name
                                }


                                data['Assignment'] === "Location" ? onLocationUpdate(location) : onPhysicianUpdate(physician)

                            }}
                            onChangeText={(value) => setSearchValue(value)}
                            onClear={() => setSearchValue('')}
                            options={searchResult}
                        />
                    </InputWrapper>


                </ViewBreaker>
                <ViewBreaker>
                    <InputWrapper>
                        <DateInputField
                            label={"From"}
                            labelWidth={98}
                            value={data['date']}
                            onClear={() => onFieldChange('date')('')}
                            mode={'date'}
                            format={"YYYY-MM-DD"}
                            keyboardType="number-pad"
                            placeholder="YYYY/MM/DD"
                            minDate={new Date(moment().add(1, 'days'))}
                            maxDate={null}
                            onDateChange={onDateChange}
                        // hasError={errors['dob']}
                        // errorMessage={errors['dob']}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <InputUnitField
                            label={"Duration"}
                            labelWidth={98}
                            onChangeText={(value) => {
                                if (/^\d+$/g.test(value) || !value) {
                                    onFieldChange('Usage')(value)
                                }
                            }}
                            value={data['Usage']}
                            units={['hrs']}
                            keyboardType="number-pad"
                        />
                    </InputWrapper>





                </ViewBreaker>




            </View >
            <Divider />
            <DoneButtonWrapper onPress={onDonePress}>
                <DoneButtonText>DONE</DoneButtonText>
            </DoneButtonWrapper>
        </>
    )
}

export default withModal(AddEquipmentDetailsTab)
