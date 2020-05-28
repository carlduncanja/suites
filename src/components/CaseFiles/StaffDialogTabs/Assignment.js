import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import OptionsField from "../../common/Input Fields/OptionsField";
import SearchableOptionsField from "../../common/Input Fields/SearchableOptionsField";
import ChangeSearchableOptionsField from "../../common/Input Fields/ChangeSearchableOptionsField";

import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import _ from "lodash";
import {getPhysicians} from "../../../api/network";

const Assignment = ({onFieldChange, fields, index, onChangeSelect}) => { 
    // Fields is an object of arrays - Nurses and Physicians. 
    // To change the field - add the item object to the specific araay depending on type
    // Eg: Type is Physician, check if exists, if not add the physicians.

    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState({})

    const [nurseSearchValue, setNurseSearchValue] = useState('')
    const [nurseSearchResults, setNurseSearchResults] = useState([])
    const [nurseSearchQuery, setNurseSearchQuery] = useState({}) 

    const [selectedType, setSelectedType] = useState("Physician")
    const [selectedValue, setSelectedValue] = useState(false)
    // const [selectedObj, setSelectedObj] = useState({})

    useEffect(()=>{
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResults([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchPhysicians, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()

    },[searchValue])

    useEffect(()=>{
        if (!nurseSearchValue) {
            // empty search values and cancel any out going request.
            setNurseSearchResults([]);
            if (nurseSearchQuery.cancel) nurseSearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchNurses, 300);

        setNurseSearchQuery(prevSearch => {
            if (prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
        
    },[nurseSearchValue])

    const fetchPhysicians = () => {

        getPhysicians(searchValue, 5)
            .then((data = []) => {
                const results = data.map(item => ({
                    name: `Dr. ${item.surname}`,
                    ...item
                }));
                setSearchResults(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get physicians");
                setSearchResults([]);
            })
    };

    const fetchNurses = () => {
        setNurseSearchResults([
            {
                name : 'Nurse Hector',
                _id : '9824HIUAHFUIEH',
            },
            {
                name : 'Nurse John',
                _id : '67245HVAUYEGRV',
            }
        ])
    }

    const types = {
        Physician : 'physicians',
        Nurse : 'nurses'
    }

    const onSelectType = (type) => {
        setSelectedType(type)
        setSelectedValue(false)
        type === 'Physician' ? setSearchValue('') : setNurseSearchValue('')
    }
    
    // const onChangeSelect = (value) => {
    //     console.log("Fields: ", fields)
    //     const type = types[selectedType]
    //     const { _id } = value

    //     setSelectedValue(_id)

    //     if (type === 'physicians'){
    //         if(!fields[type].includes(_id)){
    //             (value !== "" || null) && onFieldChange('physicians')(_id)
    //         }
    //     }else{
    //         if(!fields[type].includes(_id)){
    //             (value !== "" || null) && onFieldChange('nurses')(_id)
    //         }
    //     }
    // }
    // const onChangeSelect = (value) => {
    //     const { _id = "" } = value
    //     const match = fields.filter( item => item.index === index)
    //     const updatedObj = { ...fields[match.index], selectedType, _id, index};
    //     console.log("Value:", updatedObj)
    //     setSelectedObj(updatedObj)
    //     // const updated = [
    //     //     ...risks.slice(0, findIndex),
    //     //     updatedObj,
    //     //     ...risks.slice(findIndex + 1),
    //     // ]; 
    //     // setRisks(updatedRisks)
    //     // if(match.length === 0){
    //     //     (value !== "" || null) && onFieldChange(updatedObj)
    //     // }
    //     // if(!fields.includes({selectedType, _id, index})){
    //     //     (value !== "" || null) && onFieldChange({selectedType, _id, index})
    //     // }
    // }

    const onSelectValue = (value) => {
        setSelectedValue(value)
    }

    return (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Type"}
                        text={selectedType}
                        oneOptionsSelected={(value)=>{onSelectType(value); onChangeSelect('')(selectedType)}}
                        menuOption={<MenuOptions>
                            <MenuOption value={"Physician"} text='Physician'/>
                            <MenuOption value={"Nurse"} text='Nurse'/>
                        </MenuOptions>}
                    />
                </View>
            </View>
            
            <View style={styles.row}>
                <View style={[styles.inputWrapper,{justifyContent:'flex-start'}]}>
                    <Text style={{fontWeight:'500', fontSize:14, color:'#323843'}}>{selectedType}</Text>
                </View>
            </View>
            

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <ChangeSearchableOptionsField
                        label={"Select"}
                        selectedValue = {selectedValue}
                        onSelectValue = {onSelectValue}
                        text={ selectedType === 'Physician' ? searchValue : nurseSearchValue}
                        oneOptionsSelected = {(value)=>{onChangeSelect(value)(selectedType)}}
                        onChangeText={value => {selectedType === 'Physician' ? setSearchValue(value) : setNurseSearchValue(value)}}
                        onClear={() => {
                            onChangeSelect('')(selectedType);
                            selectedType === 'Physician' ? setSearchValue('') : setNurseSearchValue('');
                        }}
                        options={selectedType === 'Physician' ? searchResults : nurseSearchResults}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {true}
                    />
                </View>
            </View>

        </View>
    )
}

export default Assignment

const styles = StyleSheet.create({
    sectionContainer: {
        height: 260,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        alignItems:'center'
    },
    inputWrapper: {
        width: 310,
        flexDirection: 'row',
    }
});