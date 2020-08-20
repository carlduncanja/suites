import React, { Component, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, CheckBox } from 'react-native';
import InputText from '../InputText';
import SvgIcon from '../../../../assets/SvgIcon';
import { RadioButton } from 'react-native-paper';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import SearchBox from './SearchBox';
import SearchControls from './SearchControls';
import SearchComplete from './SearchComplete';
import DropDown from "../../../../assets/svg/dropdownIcon";

/**
 *
 * @param changeText
 * @param inputText
 * @param matchesFound
 * @param onPressNextResult
 * @param onPressPreviousResult
 * @param onPressNewSerch
 * @param onPressSubmit
 * @returns {*}
 * @constructor
 */
const SearchInputWrapper = styled.View`
margin:0; 
height: 60px;
padding:${({ theme }) => theme.space['--space-14']};
background-color: #FAFAFA;
`;
const SearchInputContainer = styled.View`
height: 100%;
width: 100%;
align-items: center;
flex-direction: row;
justify-content: space-between;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
`
const FilterBox = styled.View`
flex-direction:row;
width:70px;
height:40px;
background-color:${({ theme }) => theme.colors["--color-blue-500"]};
alignItems:center;
margin-right:7px;
margin-left:-7px;
justifyContent:center;
color:${({ theme }) => theme.colors["--default-shade-white"]};
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);

`

const FilterText = styled.Text`
font:${({ theme }) => theme.colors["--text-sm-medium"]};
color:${({ theme }) => theme.colors["--default-shade-white"]};
align-self:center;
margin-right:5px;

`

const PopUp = styled.View`
width:180px;
align-self:center;
align-items:flex-start;
position:absolute;
padding:5px;
top:50px;
height:180px;
background-color:${({ theme }) => theme.colors["--default-shade-white"]};
z-index:10;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);

`

const PopupContainer = styled.View`
align-items:center;
flex-direction:row;
margin:2px;

`

const RadioContainer = styled.View`
background-color:${({ checkedButton, name, theme }) => checkedButton === name ? theme.colors["--color-blue-600"] : "white"};
border-color:${({ theme }) => theme.colors["--color-neutral-gray-300"]};
border-width:1px;
width:15px;
height:15px;
border-radius:7.5px;
margin-right:10px;
`;



function SearchInput({ changeText, inputText, matchesFound, onPressNextResult, onPressPreviousResult, onPressNewSerch, onPressSubmit }) {
    const theme = useTheme();

    const optionList = [
        {
            name: "Delivery",
            color: "#38A169"

        },
        {
            name: "Inventory Re-Stock",
            color: "#D69E2E"
        },
        {
            name: "Inventory Audit",
            color: "#D53F8C"
        },
        {
            name: "Payment Due",
            color: "#3182CE"
        },
        {
            name: "Procedure",
            color: "#C53030"
        }

    ]

    const [showDropDown, setShowDropDown] = useState(false);
    const [checkedRadioButton, setcheckedButton] = useState("Delivery");


    const renderDropDown = () => {
        console.log(checkedRadioButton)

        const options = [...optionList];
        return (

            <PopUp theme={theme}>

                {options.map((item, index) => {
                    return (<PopupContainer>
                        <RadioContainer theme={theme} checkedButton={checkedRadioButton} name={item.name}>
                            <RadioButton
                                value={item.name}
                                status={checkedRadioButton === item.name ? 'checked' : 'unchecked'}
                                onPress={() => setcheckedButton(item.name)}
                                color="blue"
                            />

                        </RadioContainer>
                        <View key={index} style={{ backgroundColor: `${item.color}`, borderRadius: 4, height: 30, alignItems: "center", justifyContent: "center" }}>

                            <Text style={{ color: "white", fontSize: 16 }}>{item.name}</Text>
                        </View>
                    </PopupContainer>




                    )

                })}</PopUp>

        )
    }



    return (
        <SearchInputWrapper theme={theme}>
            <SearchInputContainer>

                <SearchBox
                    onChangeText={changeText}
                    inputText={inputText}
                    matchesFound={matchesFound}
                    onPressNewSerch={onPressNewSerch}
                />
                <TouchableOpacity onPress={() => { setShowDropDown(!showDropDown) }}>
                    <FilterBox theme={theme}>

                        <FilterText theme={theme}>Filter</FilterText><DropDown fillColor="#FFFFFF" />

                    </FilterBox>
                    {showDropDown ? renderDropDown() : <View />}
                </TouchableOpacity>
                <SearchControls
                    onPressNextResult={onPressNextResult}
                    onPressPreviousResult={onPressPreviousResult}
                />

                <SearchComplete
                    onSubmit={onPressSubmit}
                />

                {/* <View style={[styles.container, styles.searchContent]}>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={{paddingRight: 15, alignSelf: 'flex-start'}}>
                        <SvgIcon iconName="search" strokeColor="#A0AEC0"/>
                    </View>
                    <View style={{flex: 1, position:'relative'}}>
                        <InputText
                            onChangeText={changeText}
                            inputText={inputText}
                            placeholderTextColor="#A0AEC0"
                            placeholder=""
                        />
                    </View>

                </View>
                <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                    <Text style={{color: '#3182CE', fontSize: 12, paddingRight: 8}}>{matchesFound} matches found</Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => onPressNewSerch()}
                    >
                        <SvgIcon iconName="searchExit" strokeColor="#718096"/>
                    </TouchableOpacity>

                </View>
            </View> */}

                {/* <View style={[styles.container, styles.control]}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{padding: 8, paddingLeft: 6}}
                    onPress={() => onPressPreviousResult()}
                >
                    <SvgIcon iconName="scheduleMonthLeft" strokeColor="#718096"/>
                </TouchableOpacity>

                <View style={{borderWidth: 1, borderColor: '#E3E8EF'}}/>

                <TouchableOpacity
                    activeOpacity={1}
                    style={{padding: 8, paddingRight: 6}}
                    onPress={() => onPressNextResult()}
                >
                    <SvgIcon iconName="scheduleMonthRight" strokeColor="#718096"/>
                </TouchableOpacity>
            </View> */}


            </SearchInputContainer>
        </SearchInputWrapper>
    )
}
export default SearchInput

const styles = StyleSheet.create({
    searchBar: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FAFAFA',
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 8,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: "#F8FAFB",
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 8,
        padding: 8,
        paddingLeft: 6,
        paddingRight: 6,
    },
    searchContent: {
        flex: 1,
        //alignItems:'center',
        //justifyContent:'space-between'
    },
    control: {
        backgroundColor: '#FFFFFF',
        marginLeft: 10,
        padding: 0,
    },
})
