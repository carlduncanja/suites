import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TextInput} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import DropDownIcon from "../../../../assets/svg/dropDown";
import RemoveIcon from "../../../../assets/svg/removeIcon";
import IconButton from "../Buttons/IconButton";
import CheckBoxComponent from '../Checkbox';
import { checkboxItemPress } from '../../../helpers/caseFilesHelpers';
import SearchInput,{ createFilter } from 'react-native-search-filter';
import SearchableContainer from '../SearchableContainer';


function MultipleOptionsField ({oneOptionsSelected, text, label, menuOption, options}) {

    const  KEYS_TO_FILTER = ['value']

    const [selectedOption, setSelectedOption] = useState("")
    const [searchText, setSearchText] = useState("")
    const [checkedList, setCheckedList] = useState([])

    const onSearchChangeText = (text) =>{
        setSearchText(text)
    }

    const onCheckboxPress = (item) => () => {
        const { id } = item;
        let updatedCheckboxList = checkboxItemPress(item, id, checkedList)
        const filterSelected = options.filter( item => item.id === updatedCheckboxList[0])
        
        setCheckedList(updatedCheckboxList)
        setSelectedOption(filterSelected[0].text)
    }

    const filteredOptions = searchText === '' ? [] : options.filter(createFilter(searchText, KEYS_TO_FILTER))
    return (
        <View style={styles.container}>
            <Text style={[
                styles.textLabel, {
                    marginRight: label ? 20 : 0
                }
            ]}>
                {label}
            </Text>
            <Menu 
                onSelect={oneOptionsSelected} 
                style={{flex: 1,position:"relative"}} 
            >
                <MenuTrigger>
                    <View style={styles.inputField}>
                        {
                            checkedList.length > 0 &&
                                <View style={styles.valueBox}>
                                    <Text style={{padding:3,paddingLeft:5, marginRight:5}}>{selectedOption}</Text>
                                    <IconButton
                                        Icon = {<RemoveIcon/>}
                                        onPress = {()=>{}}
                                    />
                                </View>
                        }
                            
                        {
                            checkedList.length - 1 > 0 &&
                                <Text style={{color:'#3182CE', fontSize:14}}>+ {checkedList.length - 1} more</Text>
                        }

                        <View style={{flex:1,justifyContent:"flex-end", alignItems:"flex-end"}}>
                            <DropDownIcon/>
                        </View>
                            
                    </View>
                </MenuTrigger>
                
                <MenuOptions customStyles={optionsStyles}>
                    <View style={styles.menuOptionsContainer}>
                        <SearchableContainer
                            options = {options}
                            keysToFilter = {['value']}
                            onCheckboxPress = {onCheckboxPress}
                            checkedList = {checkedList}
                        />
                        {/* <View style={styles.footer}> */}
                            {/* <View style={{flexDirection:"row", justifyContent:"space-evenly", }}>
                                <AddIcon/>
                                <Text style={{paddingLeft:10}}>Create New</Text>
                            </View>
                            <View>
                                <Text>"{searchText}"</Text>
                            </View> */}
                        {/* </View> */}
                    </View>
                </MenuOptions> 
            </Menu>
        </View>
    );
}

MultipleOptionsField.propTypes = {};
MultipleOptionsField.defaultProps = {};

const optionsStyles = {
    optionsContainer: {
        backgroundColor:"rgba(255, 255, 255, 0)"
    }
}

const optionStyle = {
    optionWrapper : {
        flexDirection : 'row',
        padding:10
    },
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
    inputWrapper: {
        alignItems: 'center',
    },
    inputField: {
        // flex: 1,
        width: '100%',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#E3E8EF',
        borderRadius: 4,
        paddingRight:4,
        paddingLeft:4,
        height: 32,
    },
    menuOptionsContainer:{
        // flex:1,
        height:180,
        backgroundColor:"#FFFFFF", 
        top:32, 
        borderRadius:8,
        borderColor:'#CCD6E0',
        borderWidth:1
    },
    valueBox:{
        flexDirection:'row',
        alignSelf:'center',
        alignItems:'center',
        paddingRight:3,
        borderColor:'#FEB2B2',
        borderWidth:1,
        backgroundColor:'#FFF5F5',
        borderRadius:2
    },
    footer:{
        padding:10,
        backgroundColor:"red",
        alignSelf:'flex-end'
    }
});

export default MultipleOptionsField;
