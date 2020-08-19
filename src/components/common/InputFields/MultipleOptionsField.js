import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TextInput} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import DropDownIcon from "../../../../assets/svg/dropDown";
import RemoveIcon from "../../../../assets/svg/removeIcon";
import AddIcon from "../../../../assets/svg/addIcon";
import IconButton from "../Buttons/IconButton";
import CheckBoxComponent from '../Checkbox';
import { checkboxItemPress } from '../../../helpers/caseFilesHelpers';
import SearchInput,{ createFilter } from 'react-native-search-filter';
import SearchableContainer from '../SearchableContainer';


function MultipleOptionsField ({onOptionsSelected, label, options, keysToFilter = ['value']}) {

    const [selectedOption, setSelectedOption] = useState("")
    const [searchText, setSearchText] = useState("")
    const [checkedList, setCheckedList] = useState([])

    const onSearchChangeText = (text) =>{ 
        setSearchText(text)
    } 

    const handleIsCheck = (item) =>{
        const {_id} = item
        return checkedList.includes(item)
    }

    const onCheckboxPress = (item) => () => {
        const { _id = "" } = item;
        
        // let updatedList = checkboxItemPress(item, id, checkedList)
        // const filterSelected = options.filter( item => item._id === updatedList[0])
        
        let updatedList = [...checkedList];
        if (updatedList.includes(_id)){
            console.log("Includes")
            updatedList = updatedList.filter( id => id !==  _id )
        }else{
            updatedList = [...updatedList, _id]
        }
        console.log("Checked List: ", updatedList)
        setCheckedList(updatedList)
        onOptionsSelected(updatedList)
        // setSelectedOption(filterSelected[0].name)
    }

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
                // onSelect={oneOptionsSelected} 
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
                            keysToFilter = {keysToFilter}
                            onCheckboxPress = {onCheckboxPress}
                            checkedList = {checkedList}
                            searchText = {searchText}
                            onSearchChangeText = {onSearchChangeText}
                            handleIsCheck = {handleIsCheck}
                        />
                        
                        <View style={styles.footer}>
                            <View style={{flexDirection:"row", justifyContent:"space-evenly", }}>
                                <AddIcon/>
                                <Text style={{paddingLeft:10}}>Create New</Text>
                            </View>
                            <View>
                                <Text style={{color:'#4299E1', fontSize:12}}>"{searchText}"</Text>
                            </View>
                        </View>
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
        // top:34, 
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
        // flex:1,
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        // alignSelf:'flex-end',
        height:40,
        borderBottomColor:'#CCD6E0',
        borderBottomWidth:1,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8,
        // alignSelf:'flex-end',
        flexDirection:'row',
        justifyContent:"space-between",
        padding:10,
        backgroundColor:'#F8FAFB'
    }
});

export default MultipleOptionsField;
