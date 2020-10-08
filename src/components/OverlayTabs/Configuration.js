import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {MenuOption, MenuOptions} from 'react-native-popup-menu';
import {withModal, useModal} from 'react-native-modalfy';
import _ from 'lodash';
import Record from '../common/Information Record/Record';
import Footer from '../common/Page/Footer';
import ResponsiveRecord from '../common/Information Record/ResponsiveRecord';
import ColumnSection from '../common/ColumnSection';
import FloatingActionButton from '../common/FloatingAction/FloatingActionButton';
import ActionContainer from '../common/FloatingAction/ActionContainer';

import {getPhysicians, updateProcedure} from '../../api/network';
import Row from '../common/Row';
import TextArea from '../common/Input Fields/TextArea';
import {PageContext} from '../../contexts/PageContext';

const Configuration = ({procedure, fields, onFieldChange, onDetailsUpdate}) => {
    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode} = pageState;

    const baseStateRef = useRef();
    const modal = useModal();

    console.log('Fields: ', fields);

    const {
        name,
        duration,
        hasRecovery,
        custom = false,
        physician = {},
        description
    } = procedure;

    const {
        firstName = '',
        surname = ''
    } = physician;

    const BOOLOBJECT = {
        false: 'No',
        true: 'Yes'
    };

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResults([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchPhysician, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
    }, [searchValue]);

    const fetchPhysician = () => {
        getPhysicians(searchValue, 5)
            .then(physicianResults => {
                const {data = [], pages = 0} = physicianResults;
                const refinedResults = data.map(item => ({
                    name: `Dr. ${item.firstName} ${item.surname}`,
                    ...item
                }));
                setSearchResults(refinedResults || []);
            })
            .catch(error => {
                // TODO handle error
                // console.log("failed to get theatres");
                setSearchResults([]);
            });
    };

    const [isUpdated, setUpdated] = useState(false);

    const recovery = BOOLOBJECT[fields.hasRecovery];
    const customStatus = BOOLOBJECT[fields.custom];
    const physicianName = `Dr. ${fields.physician?.firstName && fields.physician?.surname ? `${fields.physician?.firstName} ${fields.physician?.surname}` : fields.physician?.firstName || (fields.physician?.surname || '')}`;
    // console.log("Phys name:", physician);

    // const onFieldChange = (fieldName) => (value) => {
    //     setFields({
    //         ...fields,
    //         [fieldName]: value
    //     })
    //     setUpdated(true)
    // };

    useEffect(() => {
        baseStateRef.current = {
            description,
            name,
            duration,
            hasRecovery,
            custom,
            physician
        };
        return () => {
            baseStateRef.current = {};
        };
    }, []);

    // useEffect(() => {
    //     if (isUpdated && !isEditMode) {
    //         modal.openModal('ConfirmationModal', {
    //             content: (
    //                 <ConfirmationComponent
    //                     error={false}//boolean to show whether an error icon or success icon
    //                     isEditUpdate={true}
    //                     onCancel={() => {
    //                         // resetState()
    //                         setPageState({...pageState, isEditMode: true})
    //                         modal.closeAllModals();
    //                     }}
    //                     onAction={() => {
    //                         modal.closeAllModals();
    //                         updateProcedure();
    //                     }}
    //                     message="Do you want to save these changes?"//general message you can send to be displayed
    //                     action="Yes"
    //                 />
    //             ),
    //             onClose: () => {
    //                 console.log('Modal closed');
    //             },
    //         });
    //     }
    // },[isEditMode])

    const resetState = () => {
        setFields(baseStateRef.current);
        // setUpdated(false);
    };

    // const updateProcedure = () => {
    //     console.log("Update procedure: ", fields)
    // }
 
    return (
        <>
            <Row>
                <Record
                    recordTitle="Description"
                    recordValue={!isEditMode ? fields.description ? fields.description : 'No description available' : fields.description}
                    valueColor={!fields.description && '--color-gray-500'}
                    editMode={isEditMode}
                    editable={true}
                    useTextArea={true}
                    onRecordUpdate={onFieldChange('description')}
                    onClearValue={() => {
                        onFieldChange('description')('');
                    }}
                />
            </Row>

            <Row>
                <Record
                    recordTitle="Procedure"
                    recordValue={fields.name}
                    editMode={isEditMode}
                    editable={true}
                    onRecordUpdate={onFieldChange('name')}
                    onClearValue={() => {
                        onFieldChange('name')('');
                    }}
                />

                <Record
                    recordTitle="Recovery"
                    recordValue={recovery}
                    editMode={isEditMode}
                    editable={true}
                    useDropdown={true}
                    options={(
                        <MenuOptions>
                            <MenuOption value={true} text="Yes"/>
                            <MenuOption value={false} text="No"/>
                        </MenuOptions>
                    )}
                    onRecordUpdate={onFieldChange('hasRecovery')}
                />

                <Record
                    recordTitle="Duration"
                    recordValue={isEditMode ? fields.duration.toString() : `${duration} hours`}
                    editMode={isEditMode}
                    editable={true}
                    onRecordUpdate={value => {
                        if (/^\d+$/g.test(value) || !value) {
                            onFieldChange('duration')(value);
                        }
                    }}
                    onClearValue={() => {
                        onFieldChange('duration')('');
                    }}
                />
            </Row>

            <Row>
                <Record
                    recordTitle="Custom Procedure"
                    recordValue={customStatus}
                    editMode={isEditMode}
                    editable={true}
                    useDropdown={true}
                    options={(
                        <MenuOptions>
                            <MenuOption value={true} text="Yes"/>
                            <MenuOption value={false} text="No"/>
                        </MenuOptions>
                    )}
                    onRecordUpdate={onFieldChange('custom')}

                />

                <Record
                    recordTitle="Assigned to"
                    recordValue={isEditMode ? fields.physician : physicianName}
                    valueColor="--color-blue-600"
                    editMode={isEditMode}
                    editable={true}
                    useSearchable={true}
                    searchQuery={searchQuery}
                    searchResults={searchResults}
                    searchText={searchValue}
                    onRecordUpdate={onFieldChange('physician')}
                    onClearValue={() => {
                        setSearchValue('');
                    }}
                    onSearchChange={value => setSearchValue(value)}
                />

                <Record
                    recordValue=" "
                />

            </Row>

            <Footer
                hasActionButton={true}
                hasPaginator={false}
                hasActions={false}
            />
            
            {/* <View style={styles.description}>
                <Text style={{fontSize:16, color:'#718096', paddingBottom:10}}>Description</Text>
                {
                    description ?
                        <Text>{description}</Text>
                        :
                        <Text style={{fontSize:16, color:'#A0AEC0'}}>No description available</Text>

                }
            </View>
            <View style={styles.detailsContainer}>
                <ColumnSection
                    data = {section}
                    numOfColumns = {3}
                />
            </View>
            <View style={{marginTop:15}}>
                <Text style={{color:'#718096', fontSize:16 }}>This Procedure is available at these Locations</Text>
            </View>  */}
        </>
    );
};

export default Configuration;

const styles = StyleSheet.create({
    container: {backgroundColor: 'red'},
    description: {
        width: '60%',
        paddingBottom: 30,
    },
    detailsContainer: {},
});
