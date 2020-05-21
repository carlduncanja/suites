import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import {useModal} from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField from "../common/Input Fields/InputField";
import InputField2 from "../common/Input Fields/InputField2";
import {createStorageLocation, getTheatres} from "../../api/network";
import NumberInputField from "../common/Input Fields/NumberInputField";

import {addStorageLocation} from "../../redux/actions/storageActions";
import {connect} from "react-redux";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import _ from "lodash";

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addStorageLocation
 * @returns {*}
 * @constructor
 */
function CreateStorageDialogContainer({onCancel, onCreated, addStorageLocation}) {

    const modal = useModal();
    const dialogTabs = ['Details'];
    const selectedIndex = 0;

    const [fields, setFields] = useState({
        capacity: '0'
    });
    const [popoverList, setPopoverList] = useState([
        {
            name : "assigned",
            status : false
        }
    ])
    const [isPopoverOpen, setIsPopoverOpen] = useState(true)

    // useEffect(() => {
    // }, []);

    const [theatresSearchValue, setTheatreSearchValue] = useState();
    const [theatreSearchResults, setTheatreSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});


    // ######

    // Handle theatres search
    useEffect(() => {

        if (!theatresSearchValue) {
            // empty search values and cancel any out going request.
            setTheatreSearchResult([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchTheatres, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [theatresSearchValue]);

    const handlePopovers = (popoverValue) => (popoverItem) =>{
        
        if(!popoverItem){
            setIsPopoverOpen(popoverValue)
            let updatedPopovers = popoverList.map( item => {return {
                ...item,
                status : false
            }})
            
            setPopoverList(updatedPopovers)
        }else{
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue};
            const updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ]; 
            setPopoverList(updatedPopovers)
        }
    
    }


    const fetchTheatres = () => {
        getTheatres(theatresSearchValue, 5)
            .then(data => {
                console.log("theatres search", data);
                setTheatreSearchResult(data || []);
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get theatres");
                setTheatreSearchValue([]);
            })
    };


    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveClick = () => {
        createStorageCall()
    };

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };


    const createStorageCall = () => {
        console.log(fields);
        createStorageLocation(fields)
            .then(data => {
                modal.closeAllModals();
                setTimeout(() => {
                    onCreated(data)
                }, 200);
                addStorageLocation(data);
            })
            .catch(error => {
                // todo handle error
                console.log("failed to create storage location", error)
            })
            .finally(_ => {
            });
    };

    let assignedPop = popoverList.filter( item => item.name === 'assigned')

    return (
        <OverlayDialog
            title={"New Location"}
            onPositiveButtonPress={onPositiveClick}
            onClose={handleCloseDialog}
            positiveText={"DONE"}
            // handlePopovers = {handlePopovers}
        >

            <View style={styles.container}>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                />
                
                <TouchableOpacity
                    onPress = {()=>handlePopovers(false)()}
                    activeOpacity = {1}
                >

                    <View style={styles.sectionContainer}>
                        <View style={styles.row}>
                            <View style={styles.inputWrapper}>
                                <InputField2 label={"Location Name"}
                                    onChangeText={onFieldChange('name')}
                                    value={fields['name']}
                                    onClear={() => onFieldChange('name')('')}
                                />
                            </View>

                            <View style={styles.inputWrapper}>
                                <InputField2
                                    label={"Capacity"}
                                    onChangeText={(value) => {
                                        if (/^\d+$/g.test(value) || !value) {
                                            onFieldChange('capacity')(value)
                                        }
                                    }}
                                    value={fields['capacity']}
                                    keyboardType={'number-pad'}
                                    onClear={() => onFieldChange('name')('')}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.inputWrapper}>
                                <SearchableOptionsField
                                    label={"Assigned"}
                                    text={theatresSearchValue}
                                    oneOptionsSelected={(item) => {
                                        onFieldChange('theatre')(item._id)
                                    }}
                                    onChangeText={value => setTheatreSearchValue(value)}
                                    onClear={() => {
                                        onFieldChange('theatre')('');
                                        setTheatreSearchValue('');
                                    }}
                                    options={theatreSearchResults}
                                    handlePopovers = {(value)=>handlePopovers(value)('assigned')}
                                    isPopoverOpen = {assignedPop[0].status}
                                />
                            </View>
                            {/* <View style={styles.inputWrapper}/> */}
                        </View>
                    </View>

                </TouchableOpacity>
                
            </View>


        </OverlayDialog>
    );
}

CreateStorageDialogContainer.propTypes = {};
CreateStorageDialogContainer.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    sectionContainer: {
        height: 160,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    inputWrapper: {
        // flex: 1,
        width: 260,
        flexDirection: 'row',
        // backgroundColor: 'blue'
    }
});

const mapDispatcherToProps = {
    addStorageLocation
};

export default connect(null, mapDispatcherToProps)(CreateStorageDialogContainer);
