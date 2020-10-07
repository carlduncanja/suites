import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styled, { css } from '@emotion/native';
import { withModal } from "react-native-modalfy";
import Record from '../common/Information Record/Record';
import ListTextRecord from '../common/Information Record/ListTextRecord';
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';
import InputField2 from '../common/Input Fields/InputField2';
import AutoFillField from '../common/Input Fields/AutoFillField';
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
import { useTheme } from 'emotion-theming';


const InputWrapper = styled.View`
height:30px;
width:230px;
margin:30px;

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
background-color:${({ theme }) => theme.colors["--color-blue-500"]};
`;

const DoneButtonText = styled.Text`
font:${({ theme }) => theme.font["--text-base-bold"]};
color:${({ theme }) => theme.colors["--default-shade-white"]};
`


function AddEquipmentDetailsTab({ data, onFieldChange, onLocationUpdate, locations, physcians, onPhysicianUpdate, equipmentDetails, onDonePress }) {
    const theme = useTheme();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState();

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


    const handleQuantityValidation = (value) => {
        !isNaN(value) && value > 0 ? onFieldChange('Quantity')(value) : ""
    }
    return (

        <>

            <Row>
                <FieldContainer>
                    <AutoFillField
                        label = "Equipment"
                        value = {equipmentDetails?.name}
                    />
                </FieldContainer>
                <FieldContainer>
                    <AutoFillField
                        label = "Category"
                        value = {isEmpty(equipmentDetails?.categories[0]) ? "--" : equipmentDetails.categories[0]}
                    />
                </FieldContainer>
            </Row>

            <Row zIndex = {-1}>
                <FieldContainer>
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
                </FieldContainer>
                <FieldContainer>
                    <InputField2
                        key={data['Quantity']}
                        value={data['Quantity']}
                        labelWidth={98}
                        onChangeText={(value) => { handleQuantityValidation(value) }}
                        onFieldChange={onFieldChange('Quantity')}
                        onClear={() => onFieldChange('Quantity')('')}
                        label="Quantity"
                        keyboardType="number-pad"
                    />
                </FieldContainer>
            </Row>

            <Row zIndex = {-2}> 
                <FieldContainer>
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
                </FieldContainer>
                <FieldContainer>
                    <OptionsField
                        key={data['Status']}
                        enabled={false}
                        label="Status"
                        text={data['Status']}
                        oneOptionsSelected={onFieldChange('Status')}
                        menuOption={<MenuOptions>
                            <MenuOption value={"Available"} text='Available' />
                            <MenuOption value={"Servicing"} text='Servicing' />
                            <MenuOption value={"Damaged"} text='Damaged' />
                            <MenuOption value={"In Use"} text='In Use' />
                        </MenuOptions>}
                    />
                </FieldContainer>
            </Row>

        </>

        // <>
        //     <View style={{ flexDirection: "column", height: "88%", width: "100%", alignItems: "center", justifyContent: "flex-start", backgroundColor:'red' }}>
        //         <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        //             <InputWrapper>
        //                 <InputField2
        //                     value=""
        //                     labelWidth={98}
        //                     placeholder={equipmentDetails?.name}
        //                     label="Equipment"
        //                     enabled={false}
        //                 />
        //             </InputWrapper>

        //             <InputWrapper>
        //                 <InputField2
        //                     value={""}
        //                     labelWidth={98}
        //                     placeholder={isEmpty(equipmentDetails?.categories[0]) ? "--" : equipmentDetails.categories[0]}
        //                     label="Category"
        //                     enabled={false}
        //                 />
        //             </InputWrapper>
        //         </View>
        //         <ViewBreaker>
        //             <InputWrapper>
        //                 <OptionsField
        //                     key={data['Assignment']}
        //                     labelWidth={98}
        //                     label="Assignment"
        //                     text={data['Assignment']}
        //                     oneOptionsSelected={onFieldChange('Assignment')}
        //                     menuOption={<MenuOptions>
        //                         <MenuOption value={"Location"} text='Location' />
        //                         <MenuOption value={"Person"} text='Person' />
        //                     </MenuOptions>}

        //                 />
        //             </InputWrapper>

        //             <InputWrapper>
        //                 <InputField2
        //                     key={data['Quantity']}
        //                     value={data['Quantity']}
        //                     labelWidth={98}
        //                     onChangeText={(value) => { handleQuantityValidation(value) }}
        //                     onFieldChange={onFieldChange('Quantity')}
        //                     onClear={() => onFieldChange('Quantity')('')}
        //                     label="Quantity"
        //                     keyboardType="number-pad"
        //                 />
        //             </InputWrapper>
        //         </ViewBreaker>
        //         <ViewBreaker>
        //             <InputWrapper>
        //                 <SearchableOptionsField
        //                     label="Assigned"
        //                     labelWidth={98}
        //                     value={data['Assignment'] === "Location" ? locations : physcians}
        //                     text={searchValue}
        //                     oneOptionsSelected={(value) => {
        //                         const location = {
        //                             _id: value._id,
        //                             name: value.name,

        //                         }
        //                         const physician = {
        //                             _id: value._id,
        //                             name: value.name
        //                         }


        //                         data['Assignment'] === "Location" ? onLocationUpdate(location) : onPhysicianUpdate(physician)

        //                     }}
        //                     onChangeText={(value) => setSearchValue(value)}
        //                     onClear={() => setSearchValue('')}
        //                     options={searchResult}
        //                 />
        //             </InputWrapper>
        //             <InputWrapper>
        //                 <OptionsField
        //                     labelWidth={98}
        //                     key={data['Status']}
        //                     enabled={false}
        //                     label="Status"
        //                     text={data['Status']}
        //                     oneOptionsSelected={onFieldChange('Status')}
        //                     menuOption={<MenuOptions>
        //                         <MenuOption value={"Available"} text='Available' />
        //                         <MenuOption value={"Servicing"} text='Servicing' />
        //                         <MenuOption value={"Damaged"} text='Damaged' />
        //                         <MenuOption value={"In Use"} text='In Use' />
        //                     </MenuOptions>}

        //                 />
        //             </InputWrapper>


        //         </ViewBreaker>


        //     </View >
        //     <Divider />
        //     <DoneButtonWrapper theme={theme} onPress={onDonePress}>
        //         <DoneButtonText theme={theme}>DONE</DoneButtonText>
        //     </DoneButtonWrapper>
        // </>
    
    )
}

export default withModal(AddEquipmentDetailsTab)
