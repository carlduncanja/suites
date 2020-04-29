import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Switch, Picker} from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import {useModal} from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField2 from "../common/Input Fields/InputField2";
import {connect} from "react-redux";
import ArrowRightIcon from "../../../assets/svg/arrowRightIcon";


/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addTheatre
 * @returns {*}
 * @constructor
 */
function CreateTheatreDialogContainer({onCancel, onCreated, addTheatre}) {

    const modal = useModal();
    const dialogTabs = ['Details', 'Configuration'];
    const [selectedIndex, setSelectedTabIndex] = useState(0);

    const [fields, setFields] = useState({
        name: "",
        unitPrice: 300.95,
        category: "",
        referenceName: "",
        sku: "",
        barCode: "",
    });

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveClick = () => {
        if (selectedIndex < dialogTabs.length - 1) {
            setSelectedTabIndex(selectedIndex + 1)
        } else {

        }
    };

    const onTabChange = (tab) => {
        setSelectedTabIndex(dialogTabs.indexOf(tab))
    };

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    const createInventoryCall = () => {
    };

    const getTabContent = () => {
        switch (dialogTabs[selectedIndex]) {
            case "Configuration":
                return configTab;
            case "Details":
                return detailsTab;
            default:
                return <View/>
        }
    };

    const detailsTab = (
        <View style={styles.sectionContainer}>
            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Reference"}
                        onChangeText={onFieldChange('referenceName')}
                        value={fields['referenceName']}
                        onClear={() => onFieldChange('referenceName')('')}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Item Name"}
                        onChangeText={onFieldChange('name')}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>


                    <InputField2
                        label={"Category"}
                        onChangeText={onFieldChange('category')}
                        value={fields['category']}
                        onClear={() => onFieldChange('category')('')}
                    />


                </View>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Supplier"}
                        onChangeText={onFieldChange('supplier')}
                        value={fields['supplier']}
                        onClear={() => onFieldChange('supplier')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"SKU"}
                        onChangeText={onFieldChange('sku')}
                        value={fields['sku']}
                        onClear={() => onFieldChange('sku')('')}
                    />
                </View>

                <View style={styles.inputWrapper}/>

            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Barcode"}
                        onChangeText={onFieldChange('barcode')}
                        value={fields['barcode']}
                        onClear={() => onFieldChange('barcode')('')}
                    />
                </View>

                <View style={styles.inputWrapper}/>
            </View>

        </View>
    );

    const configTab = (
        <View style={styles.sectionContainer}>
            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Unit"}
                        onChangeText={onFieldChange('referenceName')}
                        value={fields['referenceName']}
                        onClear={() => onFieldChange('referenceName')('')}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Unit Of Measure"}
                        onChangeText={onFieldChange('name')}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Unit Price"}
                        onChangeText={onFieldChange('category')}
                        value={fields['category']}
                        onClear={() => onFieldChange('category')('')}
                    />
                </View>

                <View style={styles.inputWrapper}/>
            </View>
        </View>
    );

    return (
        <OverlayDialog
            title={"New Location"}
            onPositiveButtonPress={onPositiveClick}
            onClose={handleCloseDialog}
            positiveText={selectedIndex === (dialogTabs.length - 1) ? "DONE" : "NEXT"}
            // buttonIcon={<ArrowRightIcon/>}
        >

            <View style={styles.container}>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                    onTabPress={onTabChange}
                />
                {getTabContent()}
            </View>


        </OverlayDialog>
    );
}

CreateTheatreDialogContainer.propTypes = {};
CreateTheatreDialogContainer.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    sectionContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    inputField: {
        // flex: 1,
        width: 64,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
    },
    inputWrapper: {
        // flex: 1,
        width: 260,
        flexDirection: 'row',
        // backgroundColor: 'blue'
    },
    textLabel: {
        marginRight: 20,
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
});

const mapDispatcherToProps = {};

export default connect(null, mapDispatcherToProps)(CreateTheatreDialogContainer);
