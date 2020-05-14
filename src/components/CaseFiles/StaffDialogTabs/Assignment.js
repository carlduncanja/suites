import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import OptionsField from "../../common/Input Fields/OptionsField";
import SearchableOptionsField from "../../common/Input Fields/SearchableOptionsField";
import { MenuOptions, MenuOption } from 'react-native-popup-menu';

const Assignment = ({onFieldChange, fields}) => {
    
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState()
    const [selectedType, setSelectedType] = useState("Physician")

    return (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Type"}
                        text={fields['type']}
                        oneOptionsSelected={(value)=>{onFieldChange('type')(value); setSelectedType(value)}}
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
                    <SearchableOptionsField
                        label={"Select"}
                        text={searchValue}
                        // oneOptionsSelected={(item) => {
                        //     onFieldChange('physician')(item._id)
                        // }}
                        oneOptionsSelected = {()=>{}}
                        onChangeText={value => setSearchValue(value)}
                        onClear={() => {
                            onFieldChange('physician')('');
                            setSearchValue('');
                        }}
                        options={searchResults}
                        // handlePopovers = {(value)=>handlePopovers(value)('physician')}
                        // isPopoverOpen = {physPop[0].status}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {false}
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