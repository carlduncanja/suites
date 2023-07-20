import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FrameTitle from '../FrameTitle';
import FrameLifestyleContent from '../FrameContents/FrameLifestyleContent';
import FrameItem from '../FrameItems/FrameItem';
import { transformToSentence } from '../../../../hooks/useTextEditHook'
import { ScrollView } from 'react-native-gesture-handler';
import AddIcon from '../../../../../assets/svg/addIcon';
import WasteIcon from '../../../../../assets/svg/wasteIcon';
import FrameAddLifestyle from '../FrameItems/FrameAddLifestyle';
import { addLifeStyleItems, createPatientLifeStyle, updatePatient, updatePatientLifestyle } from '../../../../api/network';
import { useModal } from 'react-native-modalfy';
import { useTheme } from 'emotion-theming';
import ConfirmationComponent from '../../../ConfirmationComponent';
import ConfirmationCheckBoxComponent from '../../../ConfirmationCheckBoxComponent';

const FrameLifestyleCard = ({ fetchCase = () => { }, ...props }) => {

    const modal = useModal();
    const theme = useTheme();
    const patientId = props.patient._id;

    const [addMode, setAddMode] = useState(false)
    const [substances, setSubtances] = useState(props.cardInformation)
    const [newLifeStyle, setNewLifeStyleItems] = useState([])
    const [dataUpdated, setDataUpdated] = useState(false)

    const toggleAddOption = (value) => {
        setAddMode(value)
    }

    const createSubstanceAddition = (substance) => {

        let newLifeStyleItem = {
            "amount": 10,
            "frequency": "often",
            "measureValue": 0,
            "name": substance.name,
            "patient": patientId,
            "startDate": "1999-04-03T05:00:00.000Z",
            "type": substance.typeID,
            "unit": "",
            "usage": "",
        }

        let newSubstanceArray = substances.slice()
        newSubstanceArray.push(newLifeStyleItem)
        setSubtances(newSubstanceArray)

        let createNewEntry = newLifeStyle.slice()
        createNewEntry.push(newLifeStyleItem)
        setNewLifeStyleItems(createNewEntry)

        setDataUpdated(true)
    }
    const updateLifeStyle = (id, data) => {
        console.log('jsjj', data)
        updatePatientLifestyle(id, { pateintLifeStyle: data })
            .then(data => {
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={false}
                        onCancel={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                            fetchCase()
                        }}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    },
                    
                });
            })
            .catch(error => {
                console.log("failed to update", error)
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
            })
    }

    const addLifeStyleItems = () => {
        createPatientLifeStyle({ patientLifestyleItems: newLifeStyle })
            .then(data => {
                data.map((newLifeStyle, index) => {
                    updatePatient(patientId, {
                        medicalInfo: {
                            lifestyles: [...props.updateData, newLifeStyle]
                        }
                    }).then(result => {  
                    }
                    )
                })
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={false}
                        onCancel={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                            fetchCase()                            
                        }}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    },
                });

            }
            )
            .catch(error => {
                console.log("failed to update", error)
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
            }
            )
    }

    const confirmDelete = (id, index) => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationCheckBoxComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeModals('ConfirmationModal');
                    }}
                    onAction={() => {
                        deleteLifestyleItem(id, index)
                        fetchCase()
                        modal.closeModals('ConfirmationModal');
                    }}
                    message="Do you want to delete this item?"
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                    modal.closeModals('ActionContainerModal')

                }
            }
        );
    }

    const deleteLifestyleItem = async (id, index) => {
        let container = []
        let items = []

        substances.filter(item => {
            if (item._id !== id) {
                items.push(item)
                container.push(item._id)
            }
        });

        await updatePatient(patientId,
            {
                medicalInfo: {
                    lifestyles: container
                }
            })
            .then(data => {
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={false}
                        onCancel={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                            fetchCase()
                            setSubtances(items)
                        }}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    },
                });
            })
            .catch(
                error => {
                    console.log("failed to Delete", error)
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
                }
            )
    }

    useEffect(() => {
        dataUpdated ?
            modal.openModal('ConfirmationModal', {
                content: (
                    <ConfirmationComponent
                        isError={false} // boolean to show whether to show an error icon or a success icon
                        isEditUpdate={true}
                        onCancel={() => {

                            modal.closeAllModals();
                        }}
                        onAction={() => {
                            modal.closeAllModals();
                            addLifeStyleItems()
                            setDataUpdated(false)
                        }}
                        message="Do you want to save changes?" // general message you can send to be displayed
                        action="Yes"
                    />
                ),
                onClose: () => console.log('Modal closed'),
 
            })

            :
            null

    }, [addMode])



    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <FrameTitle
                    color={props.frameColor}
                    borderColor={props.frameBorderColor}
                    backgroundColor={props.titleBackgroundColor}
                    icon={props.icon}
                    frameTitle={props.frameTitle}
                />
            </View>

            {substances.length === 0 ? 
            <View style={{paddingHorizontal: 15, paddingBottom: 0, paddingTop: 20}}>  
            <FrameItem itemContent='None'/>
            </View>: <></>}
            
            <View style={styles.content} >
                {substances.map((categorieInformation, index) => {
                    return (
                        <View key={index}>
                            <View style={styles.headerContianer}>
                                <Text style={styles.titleName}>{transformToSentence(categorieInformation.name)}</Text>
                                {props.isEditMode ?
                                    <TouchableOpacity onPress={() => { confirmDelete(categorieInformation._id, index) }}>
                                        <WasteIcon strokeColor={theme.colors['--color-red-700']} />
                                    </TouchableOpacity>
                                    :
                                    <View></View>
                                }
                            </View>
                            <FrameLifestyleContent
                                cardInformation={categorieInformation}
                                isEditMode={props.isEditMode}
                                onSavePress={(value) => { updateLifeStyle(categorieInformation._id, value) }} />
                        </View>
                    )
                })}
                {props.isEditMode ?

                    addMode ?
                        <FrameAddLifestyle
                            title="New Item"
                            buttonTitle="Add"
                            selectMessage={"Select " + props.frameTitle + " type"}
                            onCancel={() => { toggleAddOption(false) }}
                            onAction={(substance) => {
                                createSubstanceAddition(substance)
                                toggleAddOption(false)
                            }}
                        />
                        :
                        <View>
                            <FrameItem itemContent="Add New item" icon={<AddIcon />} isEditMode={props.isEditMode} onPressButton={() => { toggleAddOption(true) }} />
                        </View>
                    :
                    null

                }
            </View>
        </View>
    );
}

export default FrameLifestyleCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFB',
    },
    title: {
        width: '100%'
    },
    content: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#CCD6E0',
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,


    },
    titleName: {
        marginLeft: 2,
        color: "#4E5664",
        fontSize: 16,
        fontWeight: 'bold'
    },

    headerContianer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginRight: 12
    }
})
