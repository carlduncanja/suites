import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from "react-native";
import moment from "moment";
import {formatDate} from '../../utils/formatter';
import InputField2 from "../common/Input Fields/InputField2";
import TextArea from "../common/Input Fields/TextArea";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import {updatedTheatreCall} from "../../api/network";
import ConfirmationComponent from "../ConfirmationComponent";
import {useModal} from "react-native-modalfy";
import {PageContext} from "../../contexts/PageContext";

const UiData = {
    description: "",
    id: "ST0921",
    name: "ICU Theatre 3",
    status: "In Use",
    statusColor: "#ED8936",

    physician: "Dr. H. Mansingh",
    availableOn: new Date(2020, 12, 13, 23, 0),
};
 
function TheatresDetailsTab({ 
                                description = "",
                                theatreId,
                                id = "--",
                                name = "--",
                                status = "Available",
                                statusColor = "black",
                                // isEditMode = false,
                                physician = "--", 
                                availableOn = "--",
                                onUpdated = () => {},
                            }) {

    const baseStateRef = useRef();
    const modal = useModal();
    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode} = pageState;

    const [fields, setFields] = useState({
        description,
        id,
        name,
        status,
        physician,
        availableOn,
    });

    const [isLoading, setLoading] = useState(false);
    const [isUpdated, setUpdated] = useState(false)

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
        setUpdated(true)
    };

    useEffect(() => {
        baseStateRef.current = {
            description,
            id,
            name,
            status
        }
        return () => {
            baseStateRef.current = {}
        }
    }, [])

    useEffect(() => {
        if (isUpdated && !isEditMode) {
            modal.openModal('ConfirmationModal', {
                content: (
                    <ConfirmationComponent
                        error={false}//boolean to show whether an error icon or success icon
                        isEditUpdate={true}
                        onCancel={() => {
                            // resetState()
                            setPageState({...pageState, isEditMode: true})
                            modal.closeAllModals();
                        }}
                        onAction={() => {
                            modal.closeAllModals();
                            updateTheatre()
                        }}
                        message="Do you want to save changes?"//general message you can send to be displayed
                        action="Yes"
                    />
                ),
                onClose: () => {
                    console.log('Modal closed');
                },
            });
        }
    },[isEditMode])

    const resetState = () => {
        setFields(baseStateRef.current);
        setUpdated(false);
    }

    const updateTheatre = () => {
        const data = {...fields}

        console.log("params", theatreId, data);

        setLoading(true)
        updatedTheatreCall(theatreId, data)
            .then( _ => {
                onUpdated(data)
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            error={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            message="Changes were successful."//general message you can send to be displayed
                            action="Yes"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .catch(error => {
                console.log("Failed to update theatre", error)
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            error={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                                resetState()
                            }}
                            message="Something went wrong when applying changes."//general message you can send to be displayed
                            action="Yes"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .finally(_ => {
                setLoading(false)
            })
    }

    return (
        <View style={styles.container}>
            <View style={[styles.row]}>
                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Description</Text>


                    {
                        !isEditMode
                            ? <Text
                                style={[styles.textDefault, {color: description ? "#1D2129" : "#A0AEC0"}]}>
                                {fields['description'] ? fields['description'] : "No description available."}
                            </Text>
                            : <View style={{height: 70, justifyContent: 'center'}}>
                                <TextArea
                                    onChangeText={onFieldChange('description')}
                                    value={fields['description']}
                                    multiline={true}
                                    numberOfLines={4}
                                    onClear={() => onFieldChange('description')('')}
                                />
                            </View>
                    }

                </View>
                <View style={{flex: 1}}/>
            </View>

            <View style={styles.row}>
                <View style={[styles.item]}>

                    <Text style={styles.textLabel}>ID</Text>
                    {
                        !isEditMode
                            ? <Text style={styles.textDefault}>{fields['id']}</Text>
                            : <InputField2
                                value={fields['id']}
                                enabled={false}
                            />
                    }


                </View>

                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Theatre Name</Text>

                    {
                        !isEditMode
                            ? <Text style={styles.textDefault}>{fields['name']}</Text>
                            : <InputField2
                                value={fields['name']}
                                onChangeText={onFieldChange('name')}
                                enabled={true}
                            />
                    }

                </View>

                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Status</Text>
                    {
                        !isEditMode
                            ? <Text style={[styles.textDefault, {color: statusColor}]}>{fields['status']}</Text>
                            : <InputField2
                                value={fields['status']}
                                enabled={false}
                            />
                    }
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Physician</Text>

                    {
                        !isEditMode
                            ? <Text style={[styles.textDefault, styles.textLink]}>{fields['physician']}</Text>
                            : <InputField2
                                value={fields['physician']}
                                enabled={false}
                            />
                    }
                </View>

                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Available On</Text>

                    {
                        !isEditMode
                            ? <Text style={styles.textDefault}>{fields['availableOn']}</Text>
                            : <InputField2
                                value={fields['availableOn']}
                                enabled={false}
                            />
                    }
                </View>

                <View style={styles.item}/>
            </View>
        </View>
    );
}

TheatresDetailsTab.propTypes = {};
TheatresDetailsTab.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        // paddingTop: 32
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 20,
        marginTop: 10,
    },
    textLabel: {
        color: "#718096",
        marginBottom: 12,
        fontSize: 16,
        fontWeight: 'normal',
    },
    textDefault: {
        color: "#323843",
        fontSize: 16,
        fontWeight: 'normal',
    },
    textLink: {
        color: "#3182CE"
    }
});

export default TheatresDetailsTab;
