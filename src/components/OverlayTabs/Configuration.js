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
import {formatPhysician} from "../../utils";
import MultipleSelectionsField from '../common/Input Fields/MultipleSelectionsField';
import FieldContainer from '../common/FieldContainerComponent';

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
        physicians = {},
        description
    } = procedure;

    console.log("procedure dataaa", physicians)
    // const {
    //     firstName = '',
    //     surname = ''
    // } = physician || {};

    const BOOLOBJECT = {
        false: 'No',
        true: 'Yes'
    };

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});


    const [physiciansInfo, setPhysicians] = useState(procedure?.physicians || [])
    const [physicianSearchValue, setPhysicianSearchValue] = useState();
    const [physicianSearchResults, setPhysicianSearchResult] = useState([]);

    useEffect(() => {
        // if (!searchValue) {
        //     // empty search values and cancel any out going request.
        //     setSearchResults([]);
        //     if (searchQuery.cancel) searchQuery.cancel();
        //     return;
        // }

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
                const container=[]
                // const refinedResults = data.map(item => ({
                //     name: `Dr. ${item.firstName} ${item.surname}`

                //     container.push({
                //         name: `Dr. ${item.surname}`,
                //         ...item
                //     })
                    
                // }));

                const temp=[]
                const results = data.map(item => 
                    {
                        container.push(
                            `Dr. ${item.firstName} ${item.surname}`
                        )
                        
                        temp.push({
                            name: `Dr. ${item.firstName} ${item.surname}`,
                            ...item
                        })
                    });
                setSearchResults(container || []);
                setPhysicians(temp||[])

            })
            .catch(error => {
                // TODO handle error
                // console.log("failed to get theatres");
                setSearchResults([]);
            });
    };

    const [isUpdated, setUpdated] = useState(false);

    const handlePhysicianSelected = (checkPhysicians) => {
        const physicianIds = [];
       
        checkPhysicians.map((name) => {
            const value = physicians.find(item => item.name === name);
            value && physicianIds.push(value._id);
        })
       
        onFieldChange('physicians')(physicianIds)

    }

    const recovery = BOOLOBJECT[fields.hasRecovery];
    const customStatus = BOOLOBJECT[fields.custom];
    const physicianName = formatPhysician(fields.physicians);

    useEffect(() => {
        baseStateRef.current = {
            description,
            name,
            duration,
            hasRecovery,
            custom,
            physicians
        };
        return () => {
            baseStateRef.current = {};
        };
    }, []);

    const resetState = () => {
        setFields(baseStateRef.current);
        // setUpdated(false);
    };

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

                {isEditMode ? 
                    <MultipleSelectionsField
                    label={"Physicians"}
                    value={fields?.['physicians']?.map(x=> x.name)}
                    isPopoverOpen={true}
                    options={searchResults}
                    onOptionsSelected={(value) => handlePhysicianSelected(value)}
                    onSearchChangeText={(value) => setSearchValue(value)}
                    boxDirection={'column'}
                    boxAlign={''}
                    onClear={() => { setSearchValue('') }}
                    handlePopovers={() => { }}
                    
                /> :
                <Record
                        recordTitle="physicians"
                        recordValue={fields?.['physicians']?.map(x => x.name).join(', ')}
                        flex={0.8}
                    />
                }   
                
                <Record
                    recordValue=" "
                />

            </Row>

            <Footer
                hasActionButton={true}
                hasPaginator={false}
                hasActions={false}
            />
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
