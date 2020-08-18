import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet,KeyboardAvoidingView, TextInput } from "react-native";
import InputField2 from '../common/Input Fields/InputField2';
import TextArea from '../common/Input Fields/TextArea';
import OptionsField from '../common/Input Fields/OptionsField';
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import InputUnitField from "../common/Input Fields/InputUnitFields";
import { isValidNumber } from '../../utils/formatter';
import { getPhysicians } from "../../api/network";
import _ from "lodash";
// import TextEditor from "../common/Input Fields/TextEditor";
// import TextEditor2 from "../common/Input Fields/TextEditor2";

const EditableProcedureConfig = ({fields, onFieldChange, popoverList, handlePopovers}) => {

    const recoveryText = { 
        true: "Yes", 
        false: "No"
    };

    const [physicianSearchValue, setPhysicianSearchValue] = useState();
    const [physicianSearchResults, setPhysicianSearchResult] = useState([]);
    const [physicianSearchQuery, setPhysicianSearchQuery] = useState({});

    // Hanlde physician search
    useEffect(() => {

        if (!physicianSearchValue) {
            // empty search values and cancel any out going request.
            setPhysicianSearchResult([]);
            if (physicianSearchQuery.cancel) physicianSearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchPhysician, 300);

        setPhysicianSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [physicianSearchValue]);

    const fetchPhysician = () => {
        getPhysicians(physicianSearchValue, 5)
            .then(data => {
                const refinedResults = data.map(item => ({
                    name: `Dr. ${item.firstName} ${item.surname}`,
                    ...item
                }));
                setPhysicianSearchResult(refinedResults || []);
            })
            .catch(error => {
                // TODO handle error
                // console.log("failed to get theatres");
                setPhysicianSearchResult([]);
            })
    };

    let isPhysicianOpen = popoverList.filter( item => item.name === 'physician')

    return(
        <KeyboardAvoidingView
            style={{ flex: 1}}
            enabled
            keyboardVerticalOffset={300}
            behavior={'padding'}
        >
            <View>

                <View style = {styles.row}>
                    <View style={styles.fieldWrapper}>
                        {/* <TextEditor
                            onFieldChange = {onFieldChange}
                        /> */}

                        <View style={{ marginBottom:5}}>
                            <Text style={styles.title}>Description</Text>
                        </View>

                        <View style={{height:70,justifyContent:'center'}}>
                            <TextArea
                                onChangeText = {onFieldChange('description')}
                                value = {fields['description']}
                                multiline = {true}
                                numberOfLines = {4}
                                onClear = {()=>onFieldChange('description')('')}
                            />
                        </View>
                        
                    </View>
                </View>

                <View style = {[styles.row,{zIndex:-1}]}>

                    <View style={styles.fieldWrapper}>
                        <View style={{ marginBottom:5}}>
                            <Text style={styles.title}>Procedure</Text>
                        </View>

                        <View style={styles.inputWrapper}>
                            <InputField2
                                onChangeText = {onFieldChange('name')}
                                value = {fields['name']}
                                onClear = {()=>onFieldChange('name')('')}
                            />
                        </View>
                    </View>

                    <View style={styles.fieldWrapper}>
                        <View style={{ marginBottom:5}}>
                            <Text style={styles.title}>Recovery</Text>
                        </View>

                        <View style={styles.inputWrapper}>
                            <OptionsField
                                text={recoveryText[fields['hasRecovery']]}
                                oneOptionsSelected={onFieldChange('hasRecovery')}
                                menuOption={<MenuOptions>
                                    <MenuOption value={true} text='Yes'/>
                                    <MenuOption value={false} text='No'/>
                                </MenuOptions>}
                            />
                        </View>
                    </View>

                    <View style={styles.fieldWrapper}>
                        <View style={{ marginBottom:5}}>
                            <Text style={styles.title}>Duration</Text>
                        </View>

                        <View style={styles.inputWrapper}>
                            <InputUnitField
                                onChangeText={(value)=>{
                                    if (/^\d+$/g.test(value) || !value) {
                                        onFieldChange('duration')(value)
                                    }
                                }}
                                value={fields['duration']}
                                units={['hrs']}
                                keyboardType="number-pad"
                            />
                        </View>
                    </View>

                </View>

                <View style = {[styles.row,{zIndex:-2}]}>

                    <View style={{width:"33%", marginBottom:30, paddingRight:35}}>
                        <View style={{ marginBottom:5}}>
                            <Text style={styles.title}>Custom</Text>
                        </View>

                        <View style={styles.inputWrapper}>
                            <OptionsField
                                text={recoveryText[fields['custom']]}
                                oneOptionsSelected={onFieldChange('custom')}
                                menuOption={<MenuOptions>
                                    <MenuOption value={true} text='Yes'/>
                                    <MenuOption value={false} text='No'/>
                                </MenuOptions>}
                            />
                        </View>
                    </View>

                    <View style={{width:"33%", marginBottom:30, paddingRight:35}}>
                        <View style={{ marginBottom:5}}>
                            <Text style={styles.title}>Assigned To</Text>
                        </View>

                        <View style={styles.inputWrapper}>
                            <SearchableOptionsField
                                value = {fields['physician']}
                                text={physicianSearchValue}
                                oneOptionsSelected={(item) => {
                                    onFieldChange('physician')(item)
                                }}
                                onChangeText={value => setPhysicianSearchValue(value)}
                                onClear={() => {
                                    onFieldChange('physician')();
                                    setPhysicianSearchValue('');
                                }}
                                options={physicianSearchResults}
                                handlePopovers = {()=>{}}
                                isPopoverOpen = {true}
                                handlePopovers = {(value)=>handlePopovers(value)('physician')}
                                isPopoverOpen = {isPhysicianOpen[0].status}
                            />
                        </View>
                    </View>


                </View>

            </View>

        </KeyboardAvoidingView>

    )
}

EditableProcedureConfig.propTypes = {};
EditableProcedureConfig.defaultProps = {};

export default EditableProcedureConfig

const styles = StyleSheet.create({
    section:{
    },
    row:{
        flexDirection:'row',
    },
    fieldWrapper:{
        flex:1,
        marginRight:35,
        marginBottom:30,
        flexDirection:'column'
    },
    inputWrapper:{
        height:30,
        justifyContent:'center'
    },
    title:{
        color:'#718096',
        fontSize:16,
        // marginBottom:5
    },
    modalContainer:{
        position:'absolute',
        padding:10,
        backgroundColor:'#FFFFFF',
        width:300,
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
    },
    inputField:{
        flex:1,
        justifyContent:'center',
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
        padding:10,
        paddingBottom:2,
        paddingTop:2
    }

})


