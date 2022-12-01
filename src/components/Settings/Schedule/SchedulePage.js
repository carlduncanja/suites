import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, Touchable } from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

import { getAppointmentTypes, updateAppointmentTypes } from '../../../api/network';

import DetailsPage from '../../common/DetailsPage/DetailsPage';
import TabsContainer from '../../common/Tabs/TabsContainerComponent';
import Table from '../../common/Table/Table';
import Item from '../../common/Table/Item';
import Footer from '../../common/Page/Footer';
import DataItem from '../../common/List/DataItem';
import InputUnitFields from '../../common/Input Fields/InputUnitFields';
import ContentDataItem from '../../common/List/ContentDataItem';
import ConfirmationComponent from '../../ConfirmationComponent';
import ConfirmationCheckBoxComponent from '../../ConfirmationCheckBoxComponent'
import DropDownIcon from "../../../../assets/svg/dropDown";
import CollapsedIcon from "../../../../assets/svg/closeArrow";
import { PageContext } from '../../../contexts/PageContext';
import Header from '../../common/Table/Header';
import { useModal } from 'react-native-modalfy';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ColorDropDown from './ColorDropDown';

const headers = [
    {
        name: 'Item',
        alignment: 'flex-start',
        flex: 5
    },
    {
        name: 'Colour',
        alignment: 'flex-start',
        flex: 1
    }
]

function SchedulePage({ navigation, route }) {
    const theme = useTheme();
    const modal = useModal();
    const currentTabs = ['Detsils'];

    const [pageState, setPageState] = useState({});
    const [appointmentType, setAppointmentTypes] = useState([])
    const [selectedId, setSelectedID] = useState('')
    const [reRenderer, setReRender] = useState(false)

    const { isEditMode = false } = pageState;

    useEffect(() => {
        fetchAppointmentTypes()
    }, [])

    const fetchAppointmentTypes = () => {
        getAppointmentTypes()
            .then(data => {
                setAppointmentTypes(data)
            })
            .catch(error => {
                console.log('failed to get appointment types', error)
            })
    }

    const updateItem = (itemId, data) => {
        updateAppointmentTypes(itemId, { color: data })
            .then(data => {
                modal.openModal(
                    'ConfirmationModal', {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={false}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');

                            fetchAppointmentTypes()
                        }}
                    />,
                    onClose: () => {
                        modal.closeModal('ConfirmationModal')
                        fetchAppointmentTypes()
                    }
                }
                );
            })
            .catch(error => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals('ActionContainerModal');
                },200)
                fetchAppointmentTypes()
                console.log('failed to delete these item(s)', error)
            })
    }

    const openErrorConfirmation = () => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={true}
                    isEditUpdate={false}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    };

    const FlatLIstActivator = (id, index) => {
        let option = ''
        if (selectedId !== '' && id > index) {
            option = true
        }
        else {
            option = false
        }
        return option
    }

    const renderItem = item => {
        let zIndecator = appointmentType.length - parseInt(item._id)
        let flatListActivator = FlatLIstActivator(item._id, selectedId)

        return (
            <View style={{ flex: 1 }}>
                <ColorDropDown
                    FlatListActivator={flatListActivator}
                    isEditMode={isEditMode}
                    item={item}
                    zIndecator={zIndecator}
                    onUpdate={(color) => {
                        updateItem(item._id, color)
                        setSelectedID('')
                    }}
                    onSelect={(id) => {

                        setReRender(!reRenderer)
                        setSelectedID(id)
                    }}
                    selectedId={selectedId}
                />

            </View>
        )
    }



    return (
        <PageContext.Provider value={{ pageState, setPageState }}>
            <DetailsPage
                headerChildren={['Custom types', 'Schedule']}
                onBackPress={() => {
                    navigation.navigate('Settings');
                }}
                pageTabs={(
                    <TabsContainer
                        tabs={currentTabs}
                        selectedTab={currentTabs[0]}
                        onPressChange={currentTabs}

                    />
                )}
            >

                <Table
                    headers={headers}
                    isCheckbox={false}
                    data={appointmentType}
                    listItemFormat={renderItem}
                    extraData={reRenderer}
                />

                <Footer
                    hasActions={false}
                    hasPaginator={false}
                />

            </DetailsPage>
        </PageContext.Provider>
    )

}
SchedulePage.prototype = {}
SchedulePage.defaultProps = {}
export default SchedulePage

const styles = StyleSheet.create({
    itemContianer: {
        flexDirection: 'row',
        flex: 2,
        marginBottom: 24,
        justifyContent: "space-between"
    },
    container: {
        //flex: 1,
        borderColor: "#E3E8EF",
        borderWidth: 1,
        width: 134,
        height: 32,
        //justifyContent: "space-between",
        flexDirection: "row"

    },
    box: {
        top: 8,
        bottom: 8,
        right: 4,
        left: 4

    },
    iconContianer: {
        justifyContent: "center",
        paddingRight: 8
    }
})