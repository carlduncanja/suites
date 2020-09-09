import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
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
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';
import { isEmpty } from 'lodash';
import { Divider } from 'react-native-paper';


const InputWrapper = styled.View`
height:30px;
width:230px;
margin:40px;

`

const ViewBreaker = styled.View`
flex-direction:row;
align-items:center;
padding:10px;
justify-content:space-between;
margin-top:-50px;
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


function AddEquipmentDetailsTab({ data, onFieldChange, onLocationUpdate, locations, equipmentDetails }) {

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResults] = useState([]);

    useEffect(() => {


        !isEmpty(searchValue) ? fetchTheatres() : setSearchResults([]);


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

    const handleQuantityValidation = (value) => {
        !isNaN(value) ? onFieldChange('Quantity')(value) : ""
    }
    return (
        <>
            <View style={{ flexDirection: "column", height: "88%", width: "100%", alignItems: "center", justifyContent: "flex-start" }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <InputWrapper>
                        <InputField2
                            value=""
                            labelWidth={30}
                            placeholder={equipmentDetails?.name}
                            label="Equipment"
                            backgroundColor="--color-gray-200"
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <InputField2
                            value={""}
                            labelWidth={30}
                            placeholder={isEmpty(equipmentDetails?.categories[0]) ? "--" : equipmentDetails.categories[0]}
                            label="Category"
                            backgroundColor="--color-gray-200"
                        />
                    </InputWrapper>
                </View>
                <ViewBreaker>
                    <InputWrapper>
                        <OptionsField
                            key={data['Assignment']}
                            labelWidth={50}
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
                        <InputField2
                            key={data['Quantity']}
                            value={data['Quantity']}
                            labelWidth={30}
                            onChangeText={(value) => { handleQuantityValidation(value) }}
                            onFieldChange={onFieldChange('Quantity')}
                            onClear={() => onFieldChange('Quantity')('')}
                            label="Quantity"
                            keyboardType="number-pad"
                        />
                    </InputWrapper>
                </ViewBreaker>
                <ViewBreaker>
                    <InputWrapper>
                        <SearchableOptionsField
                            label="Assigned"
                            labelWidth={30}
                            value={locations}
                            text={searchValue}
                            oneOptionsSelected={(value) => {
                                const location = {
                                    _id: value._id,
                                    name: value.name,

                                }

                                onLocationUpdate(location)

                            }}
                            onChangeText={(value) => setSearchValue(value)}
                            onClear={() => setSearchValue('')}
                            options={searchResult}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <OptionsField
                            key={data['Status']}
                            label="Status"
                            text={data['Status']}
                            oneOptionsSelected={onFieldChange('Status')}
                            menuOption={<MenuOptions>
                                <MenuOption value={"Available"} text='Available' />
                                <MenuOption value={"Unavailable"} text='Unavailable' />
                            </MenuOptions>}

                        />
                    </InputWrapper>


                </ViewBreaker>


            </View >
            <Divider />
            <DoneButtonWrapper>
                <DoneButtonText>DONE</DoneButtonText>
            </DoneButtonWrapper>
        </>
    )
}

export default withModal(AddEquipmentDetailsTab)
