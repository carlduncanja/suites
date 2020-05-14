import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputUnitField from "../../common/Input Fields/InputUnitFields";
import SearchableOptionsField from "../../common/Input Fields/SearchableOptionsField";
import MultipleSelectionsField from "../../common/Input Fields/MultipleSelectionsField";

import { MenuOptions, MenuOption } from 'react-native-popup-menu';

const ProcedureTab = ({ onFieldChange, fields}) => {

    const [searchProcedureValue, setSearchProcedureValue] = useState('')
    const [searchProcedureResult, setSearchProcedureResult] = useState([])
    const [searchProcedureQuery, setSearchProcedureQuery] = useState()

    const [searchLocationValue, setSearchLocationValue] = useState('')
    const [searchLocationResult, setSearchLocationResult] = useState([])
    const [searchLocationQuery, setSearchLocationQuery] = useState()

    const [searchCategoryValue, setSearchCategoryValue] = useState('')
    const [searchCategoryResult, setSearchCategoryResult] = useState([])
    const [searchCategoryQuery, setSearchCategoryQuery] = useState()

    return (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Procedure"}
                        text={searchProcedureValue}
                        // oneOptionsSelected={(item) => {
                        //     onFieldChange('physician')(item._id)
                        // }}
                        oneOptionsSelected={() => {}}
                        onChangeText={value => setSearchProcedureValue(value)}
                        onClear={() => {
                            onFieldChange('procedure')('');
                            setSearchValue('');
                        }}
                        options={searchProcedureResult}
                        // handlePopovers = {(value)=>handlePopovers(value)('physician')}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {false}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Location"}
                        text={searchLocationValue}
                        // oneOptionsSelected={(item) => {
                        //     onFieldChange('physician')(item._id)
                        // }}
                        oneOptionsSelected={() => {}}
                        onChangeText={value => setSearchLocationValue(value)}
                        onClear={() => {
                            onFieldChange('location')('');
                            setSearchValue('');
                        }}
                        options={searchLocationResult}
                        // handlePopovers = {(value)=>handlePopovers(value)('physician')}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {false}
                    />
                </View>

            </View>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputUnitField
                        label={"Duration"}
                        onChangeText={(value) => {
                            if (/^\d{9}/g.test(value).toString() || !value) {
                                onFieldChange('duration')(value)
                            }
                        }}
                        value={fields['duration']}
                        units={['hrs']}
                        keyboardType="number-pad"
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <MultipleSelectionsField
                        label={"Category"}
                        onOptionsSelected={onFieldChange('category')}
                        options = {searchCategoryResult}
                        searchText = {searchCategoryValue}
                        onSearchChangeText = {(value)=> setSearchCategoryValue(value)}
                        onClear={()=>{setSearchCategoryValue('')}}
                        // handlePopovers = {(value)=>handlePopovers(value)('category')}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {false}
                    />
                </View>
                
            </View>

        </View>
    )
}

export default ProcedureTab

const styles = StyleSheet.create({
    sectionContainer: {
        height: 260,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputWrapper: {
        width: 260,
        flexDirection: 'row',
    }
});