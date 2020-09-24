import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, YellowBox} from 'react-native';
import _ from 'lodash';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import InputField2 from '../common/Input Fields/InputField2';
import DropdownInputField from '../common/Input Fields/DropdownInputField';
import InputUnitField from '../common/Input Fields/InputUnitFields';
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';
import Row from '../common/Row';
import {getPhysicians, getTheatres, getProcedures, getCategories} from '../../api/network';
import OptionSearchableField from '../common/InputFields/OptionSearchableField';
import OptionsField from '../common/Input Fields/OptionsField';
import MultipleSelectionsField from '../common/Input Fields/MultipleSelectionsField';
import FieldContainer from '../common/FieldContainerComponent';
import AutoFillField from '../common/Input Fields/AutoFillField';

function DialogDetailsTab({onFieldChange, fields, handlePopovers, popoverList, errorFields, errors}) {
    const templateText = {
        true: 'Yes',
        false: 'No'
    };

    const {serviceFee = 0} = fields;

    // Physicians Search
    const [searchValue, setSearchValue] = useState();
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    // Procedures Search
    const [searchProcedureValue, setSearchProcedureValue] = useState();
    const [searchProcedureResults, setSearchProcedureResult] = useState([]);
    const [searchProcedureQuery, setSearchProcedureQuery] = useState({});

    // Category Search
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);
    const [categorySearchQuery, setCategorySearchQuery] = useState({});

    const [fee, setFee] = useState(serviceFee);
    const [selectedPhysician, setSelectedPhysician] = useState();

    // ######

    // Handle physicians search
    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchPhysicians, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
    }, [searchValue]);

    // Handle procedures search
    useEffect(() => {
        if (!searchProcedureValue) {
            // empty search values and cancel any out going request.
            setSearchProcedureResult([]);
            if (searchProcedureQuery.cancel) searchProcedureQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchProcedures, 300);

        setSearchProcedureQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
    }, [searchProcedureValue]);

    // Handle category search
    useEffect(() => {
        if (!categorySearchValue) {
            // empty search values and cancel any out going request.
            setCategorySearchResult([]);
            if (categorySearchQuery.cancel) categorySearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchCategory, 300);

        setCategorySearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
    }, [categorySearchValue]);

    const fetchPhysicians = () => {
        getPhysicians(searchValue, 5)
            .then((physicianResult = {}) => {
                const {data = [], pages = 0} = physicianResult;
                const results = data.map(item => ({
                    name: `Dr. ${item.surname}`,
                    ...item
                }));
                console.log('Results: ', results);
                setSearchResult(results || []);
            })
            .catch(error => {
                // TODO handle error
                console.log('failed to get theatres');
                setSearchValue([]);
            });
    };

    const fetchProcedures = () => {
        getProcedures(searchProcedureValue, 5)
            .then((proceduresResult = {}) => {
                const {data = [], pages = 0} = proceduresResult;
                const results = data.map(item => ({...item}));

                setSearchProcedureResult(results || []);
            })
            .catch(error => {
                // TODO handle error
                console.log('failed to get procedures');
                setSearchProcedureValue([]);
            });
    };

    const fetchCategory = () => {
        getCategories(categorySearchValue, 5)
            .then((categoryResults = {}) => {
                const {data = [], pages = 0} = categoryResults;
                const results = data.map(item => ({
                    _id: item,
                    name: item
                }));
                setCategorySearchResult(results || []);
            })
            .catch(error => {
                console.log('failed to get categories: ', error);
                setCategorySearchResult([]);
            });
    };

    const handlePrice = price => {
        const updatedPrice = price.replace(/[^0-9.]/g, '');
        // console.log("Price: ", price.replace(/[^0-9.]/g, ""))
        if (/^\d+(\.\d{1,2})?$/g.test(updatedPrice) || /^\d+$/g.test(updatedPrice) || !updatedPrice) {
            console.log('Service Fee: ', updatedPrice);
            onFieldChange('serviceFee')(parseFloat(updatedPrice));
        }
        if (/^\d+(\.){0,1}(\d{1,2})?$/g.test(updatedPrice) || !updatedPrice) {
            setFee(updatedPrice);
        }
    };

    const handlePhysician = value => { 
        const physician = value ? {
            _id: value._id,
            name: value.name
        } : value;

        if (value === undefined || null) {
            delete fields.physician;
        } else {
            onFieldChange('physician')(physician);
            setSearchValue(value.name);
        }

        // setSearchValue()
        setSearchResult([]);
        setSearchQuery(undefined);
    };

    const refPop = popoverList.filter(item => item.name === 'reference');
    const physPop = popoverList.filter(item => item.name === 'physician');
    const catPop = popoverList.filter(item => item.name === 'category');

    return (
        <>
            <Row>

                <AutoFillField
                    label="Reference"
                    value={fields.procedureReferenceName || '--'}
                    flex={2}
                />
                {/* <SearchableOptionsField
                        label={"Reference"}
                        text={searchProcedureValue}
                        oneOptionsSelected={(item) => {
                            onFieldChange('reference')(item._id)
                        }}
                        onChangeText={value => setSearchProcedureValue(value)}
                        onClear={() => {
                            onFieldChange('reference')('');
                            setSearchProcedureValue('');
                        }}
                        options={searchProcedureResults}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {searchProcedureQuery}
                    /> */}

            </Row>

            <Row>
                <FieldContainer>
                    <InputField2
                        label="Procedure"
                        onChangeText={onFieldChange('name')}
                        value={fields.name}
                        onClear={() => onFieldChange('name')('')}
                        hasError={errors.name}
                        errorMessage="Name must be assigned"
                    />
                </FieldContainer>
                <FieldContainer>
                    <SearchableOptionsField
                        label="Physician"
                        value={fields.physician}
                        text={searchValue}
                        oneOptionsSelected={item => handlePhysician(item)}
                        onChangeText={value => setSearchValue(value)}
                        onClear={handlePhysician}
                        options={searchResults}
                        handlePopovers={() => {
                        }}
                        isPopoverOpen={searchQuery}
                        hasError={errors.physician}
                        errorMessage="Physician must be assigned"
                    />
                </FieldContainer>
            </Row>

            <Row zIndex={-1}>
                <FieldContainer>
                    <InputUnitField
                        label="Duration"
                        onChangeText={value => {
                            if (/^\d{9}/g.test(value)
                                .toString() || !value) {
                                onFieldChange('duration')(value);
                            }
                        }}
                        value={fields.duration}
                        units={['hrs']}
                        keyboardType="number-pad"
                        hasError={errors.duration}
                        errorMessage="Input estimated time (hours)."
                    />
                </FieldContainer>
                <FieldContainer>
                    <InputField2
                        label="Category"
                        onChangeText={onFieldChange('category')}
                        value={fields.category}
                        onClear={() => onFieldChange('category')('')}
                    />
                </FieldContainer>
            </Row>

            <Row zIndex={-2}>
                <FieldContainer>
                    <OptionsField
                        label="Recovery"
                        text={templateText[fields.hasRecovery]}
                        oneOptionsSelected={onFieldChange('hasRecovery')}
                        menuOption={(
                            <MenuOptions>
                                <MenuOption value={true} text="Yes"/>
                                <MenuOption value={false} text="No"/>
                            </MenuOptions>
                        )}
                    />
                </FieldContainer>
                <FieldContainer>
                    <InputField2
                        label="Service Fee"
                        onChangeText={value => handlePrice(value)}
                        value={`$ ${fee.toString()}`}
                        keyboardType="number-pad"
                        onClear={() => handlePrice('')}
                        hasError={errors.serviceFee}
                        errorMessage="Cost is required."
                    />
                </FieldContainer>
            </Row>

            {/* <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Reference"}
                        text={searchProcedureValue}
                        oneOptionsSelected={(item) => {
                            onFieldChange('reference')(item._id)
                        }}
                        onChangeText={value => setSearchProcedureValue(value)}
                        onClear={() => {
                            onFieldChange('reference')('');
                            setSearchProcedureValue('');
                        }}
                        options={searchProcedureResults}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {searchProcedureQuery}
                    />
                </View>

            </View>

            <View
                style={{
                    height: 2,
                    backgroundColor: '#CCD6E0',
                    marginBottom: 20,
                    zIndex:-1
                }}
            />

            <View style={[styles.row,{zIndex:-1}]}>

                <View style={[styles.inputWrapper,{zIndex:-2}]}>
                    <InputField2
                        label={"Procedure"}
                        onChangeText={onFieldChange('name')}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                        // hasError = {errorFields['name']}
                        hasError = {errors['name']}
                        errorMessage = "Name must be assigned"
                    />
                </View>

                <View style={[styles.inputWrapper]}>
                    <SearchableOptionsField
                        label={"Physician"}
                        value = {fields['physician']}
                        text={searchValue}
                        oneOptionsSelected={(item) => {
                            handlePhysician(item)
                            // onFieldChange('physician')(item);
                        }}
                        onChangeText={value => setSearchValue(value)}
                        onClear={handlePhysician}
                            // onFieldChange('physician')('');
                            // setSearchValue('');
                        // }}
                        options={searchResults}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {searchQuery}
                        hasError = {errors['physician']}
                        errorMessage = "Physician must be assigned"
                    />

                </View>

            </View>

            <View style={[styles.row, {zIndex:-2}]}>

                <View style={[styles.inputWrapper, {zIndex:-3}]}>
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
                        hasError = {errors['duration']}
                        errorMessage = "Input estimated time (hours)."
                    />
                </View>

                <View style={[styles.inputWrapper,{zIndex:-3}]}>
                    <MultipleSelectionsField
                        label={"Category"}
                        onOptionsSelected={onFieldChange('category')}
                        options = {categorySearchResults}
                        searchText = {categorySearchValue}
                        onSearchChangeText = {(value)=> setCategorySearchValue(value)}
                        onClear={()=>{setCategorySearchValue('')}}
                        handlePopovers = {(value)=>handlePopovers(value)('category')}
                        isPopoverOpen = {catPop[0].status}
                    />
                </View>
            </View>

            <View style={[styles.row, {zIndex:-3}]}>

                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Recovery ?"}
                        text={templateText[fields['hasRecovery']]}
                        oneOptionsSelected={onFieldChange('hasRecovery')}
                        menuOption={<MenuOptions>
                            <MenuOption value={true} text='Yes'/>
                            <MenuOption value={false} text='No'/>
                        </MenuOptions>}
                    />
                </View>

                <View style={[styles.inputWrapper]}>
                    <InputField2
                        label={"Service Fee"}
                        onChangeText={(value) => {
                            handlePrice(value)
                        }}
                        value={`$ ${fee.toString()}`}
                        keyboardType={'number-pad'}
                        onClear={() => handlePrice('')}
                        hasError = {errors['serviceFee']}
                        errorMessage = "Cost is required."
                    />
                </View>

            </View> */}

        </>
    );
}

DialogDetailsTab.propTypes = {};
DialogDetailsTab.defaultProps = {};

export default DialogDetailsTab;

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
