import React,{ useState  } from "react";
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TextInput} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import DropDownIcon from "../../../../assets/svg/dropDown";
import RemoveIcon from "../../../../assets/svg/removeIcon";
import AddIcon from "../../../../assets/svg/addIcon";
import IconButton from "../Buttons/IconButton";
import CheckBoxComponent from '../Checkbox';
import { checkboxItemPress } from '../../../helpers/caseFilesHelpers';
import { createFilter } from 'react-native-search-filter';
import SearchableContainer from '../SearchableContainer';

const MultipleSelectionsField = ({onOptionsSelected, label, options, keysToFilter = ['name']}) => {

    const [selectedOption, setSelectedOption] = useState("")
    const [searchText, setSearchText] = useState("")
    const [checkedList, setCheckedList] = useState([])

    const onSearchChangeText = (text) =>{
        setSearchText(text)
    }

    const onCheckboxPress = (item) => () => {
        let updatedList = [...checkedList]
        if (checkedList.includes(item)){
            updatedList = updatedList.filter( filterItem => filterItem !== item)
        }else{
            updatedList = [...updatedList,item]
        }

        setCheckedList(updatedList)
        setSelectedOption(updatedList[0].name)
        
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
                onClose = {()=>{onOptionsSelected(checkedList)}}
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
                                <Text style={{
                                    fontSize:14,
                                    color:'#3182CE',
                                    paddingLeft:4
                                }}>
                                    +{checkedList.length - 1} more
                                </Text>
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
    )
}

MultipleSelectionsField.propTypes = {};
MultipleSelectionsField.defaultProps = {};

export default MultipleSelectionsField;


const optionsStyles = {
    optionsContainer: {
        backgroundColor:"rgba(255, 255, 255, 0)"
    }
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

