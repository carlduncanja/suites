import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import { useModal } from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputUnitFields from "../common/Input Fields/InputUnitFields";
import InputField2 from "../common/Input Fields/InputField2";
import { addCategory, createStorageLocation, getCategories, getTheatres } from "../../api/network";
// import NumberInputField from "../common/Input Fields/NumberInputField";

import { addStorageLocation } from "../../redux/actions/storageActions";
import { connect } from "react-redux";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import _ from "lodash";
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import OverlayDialogContent from '../common/Dialog/OverlayContent';
import ConfirmationComponent from '../ConfirmationComponent';
import MultipleSelectionsField from '../common/Input Fields/MultipleSelectionsField';
/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addStorageLocation
 * @returns {*}
 * @constructor
 */

const DialogContent = styled.View`
    flex:1;
    width : 100%;
    height : 160px;
    padding-top : ${({ theme }) => theme.space['--space-40']};
    padding-bottom : ${({ theme }) => theme.space['--space-40']};
    padding-right : ${({ theme }) => theme.space['--space-24']};
    padding-left : ${({ theme }) => theme.space['--space-24']};
`;

function CreateStorageDialogContainer({ onCancel, onCreated, addStorageLocation }) {

    const modal = useModal();
    const theme = useTheme();
    const dialogTabs = ['Details'];
    const selectedIndex = 0;

    const [fields, setFields] = useState({
        capacity: '0'
    });
    const [popoverList, setPopoverList] = useState([
        {
            name: "assigned",
            status: false
        }
    ])
    const [isPopoverOpen, setIsPopoverOpen] = useState(true)

    const [theatresSearchValue, setTheatreSearchValue] = useState();
    const [theatreSearchResults, setTheatreSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    // Category Search
    const [categories, setCategories] = useState([])
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);

    // Handle theatres search
    useEffect(() => {

        if (!theatresSearchValue) {
            // empty search values and cancel any out going request.
            setTheatreSearchResult([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        const search = _.debounce(fetchTheatres, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [theatresSearchValue]);

    const handlePopovers = (popoverValue) => (popoverItem) => {

        if (!popoverItem) {
            setIsPopoverOpen(popoverValue)
            let updatedPopovers = popoverList.map(item => {
                return {
                    ...item,
                    status: false
                }
            })

            setPopoverList(updatedPopovers)
        } else {
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue };
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
            .then((theatresResult = {}) => {
                const { data = [], pages = 0 } = theatresResult
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

        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    message={`Do you want to add this new location? "${fields?.name}"`}
                    titleText={'Add new location'}
                    action={'Add'}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                    onAction={() => {
                        setTimeout(() => {
                            modal.closeModals('ConfirmationModal');
                            createStorageCall();

                        }, 200);
                    }}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );


    };



    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };


    const createStorageCall = () => {
        createStorageLocation(fields)
            .then(data => {
                console.log("Data: ", data);
                modal.closeAllModals();
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isEditUpdate={false}
                            isError={false}
                            onAction={() => {
                                onCreated(data);
                                // addStorageLocation(data);
                                modal.closeAllModals();
                            }}
                        />
                    ),
                    onClose: () => {
                        modal.closeAllModals();
                        console.log('Modal closed');
                    },
                })
            })
            .catch(error => {
                // todo handle error
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isEditUpdate={false}
                            isError={true}
                            onAction={() => {
                                modal.closeModals();
                                onCancel();
                            }}
                            onCancel={() => {
                                modal.closeAllModals();
                                onCancel();
                            }}
                        />
                    ),
                    onClose: () => {
                        modal.closeModals();
                        onCancel();
                    }
                })

                console.log("failed to create storage location", error)
            })
            .finally(_ => {
            });
    };

    const handleCategorySelected = (checkCategories) => {
        const categoryIds = [];

        checkCategories.map((name) => {
            const value = categories.find(item => item.name === name);
            value && categoryIds.push(value._id);
        });

        console.log(categoryIds);
        onFieldChange('categories')(categoryIds);
    }

    const fetchCategories = () => {
        getCategories("storage", 1000, categorySearchValue)
            .then(data => {
                setCategorySearchResult(data.data.map(item => { return item.name }));
                categories.length == 0 && setCategories(data.data);
            })
            .catch(error => {
                console.log('Unable to retrieve storage category items: ', error);
            });
    }

    useEffect(() => {
        fetchCategories();
    }, [categorySearchValue, categories]);

    const createCategory = (name) => {
        if(!name) return;
        addCategory({ name: name, type: "storage" })
            .then(_ => {
                setCategories([]);
                setCategorySearchValue('');
                fetchCategories();
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={false}
                        onCancel={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    },
                });
            })
            .catch(error => {
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={true}
                        onCancel={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    },
                });
                console.log(error);
            })
    };

    const [isOpen, setIsOpen] = useState(false);

    return (
        <OverlayDialog
            title={"New Location"}
            onPositiveButtonPress={onPositiveClick}
            onClose={handleCloseDialog}
            positiveText={"DONE"}
            isOpen={isOpen}
        >
            <View>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                />
                <DialogContent theme={theme}>
                    
                    <Row>
                        <FieldContainer>
                            <InputField2
                                label={"Location Name"}
                                onChangeText={onFieldChange('name')}
                                value={fields['name']}
                                onClear={() => onFieldChange('name')('')}
                            // labelWidth = {98}
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <InputUnitFields
                                label={"Capacity"}
                                onChangeText={(value) => {
                                    if (/^\d+$/g.test(value) || !value) {
                                        onFieldChange('capacity')(value)
                                    }
                                }}
                                value={fields['capacity']}
                                keyboardType={'number-pad'}
                                onClear={() => onFieldChange('name')('')}
                                units={['units']}
                            />
                        </FieldContainer>
                    </Row>
                    <View style={{width: 10, height: 35}}>
                    </View>
                    <Row>
                        <FieldContainer maxWidth='50%'>
                            <MultipleSelectionsField
                                    setOpen={setIsOpen}
                                    label={"Category"}
                                    onOptionsSelected={(value) => handleCategorySelected(value)}
                                    options={categorySearchResults}
                                    createNew={() => createCategory(categorySearchValue)}
                                    searchText={categorySearchValue}
                                    onSearchChangeText={(value) => setCategorySearchValue(value)}
                                    onClear={() => { setCategorySearchValue('') }}
                                    handlePopovers={() => {}}
                                    isPopoverOpen={true}
                                />
                        </FieldContainer>
                    </Row>
                </DialogContent>

                
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
    rightRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        display: 'flex',
        marginLeft: 'auto',
        zIndex: 10

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
