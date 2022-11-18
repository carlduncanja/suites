import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

import { getLifeStyles, addLifeStyleItems, deleteLifeStyleItems, updateLifeStyleItems } from '../../../api/network';

import DetailsPage from '../../common/DetailsPage/DetailsPage';
import TabsContainer from '../../common/Tabs/TabsContainerComponent';
import Table from '../../common/Table/Table';
import DataItem from '../../common/List/DataItem';
import InputUnitFields from '../../common/Input Fields/InputUnitFields';
import ContentDataItem from '../../common/List/ContentDataItem';
import ConfirmationComponent from '../../ConfirmationComponent';
import ConfirmationCheckBoxComponent from '../../ConfirmationCheckBoxComponent'
import LifeStyleTabs from '../../../components/OverlayTabs/LIfeStyleTabs';

import { PageContext } from '../../../contexts/PageContext';
import Header from '../../common/Table/Header';
import { useModal } from 'react-native-modalfy';


function CaseFilesPage({ navigation, route }) {

    const theme = useTheme();
    const modal = useModal();
    const currentTabs = ['LifeStyle', 'Health Insurer'];

    const [pageState, setPageState] = useState({});
    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [lifeStyleData, setLifeStyleData] = useState([])

    const { isEditMode = false } = pageState;


    useEffect(() => {
        fetchLifeStyleData()
    }, []);


    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const fetchLifeStyleData = () => {
        getLifeStyles()
            .then(data => {

                setLifeStyleData(data.data)
            })
            .catch(error => {
                console.error('fetch.user.failed', error);
            })
            .finally();
    }

    const addItems = (caseID, items) => {
        addLifeStyleItems(caseID, { name: items })
            .then(data => {
                modal.openModal(
                    'ConfirmationModal', {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={false}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');

                            fetchLifeStyleData()
                        }}
                    />,
                    onClose: () => {
                        modal.closeModal('ConfirmationModal')
                        fetchLifeStyleData()
                    }
                }
                );
            })
            .catch(error => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals('ActionContainerModal');
                }, 200)
                console.log('failed to delete these item(s)', error)
            })




    }
    const openDeletionConfirm = data => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationCheckBoxComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeModals('ConfirmationModal');
                        setTimeout(() => {
                            modal.closeModals('ActionContainerModal')
                        }, 200)
                    }}
                    onAction={() => {
                        deleteItem(data)
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

    const deleteItem = (id) => {
        let ids = []
        ids.push(id)
        deleteLifeStyleItems(ids)
            .then(data => {
                modal.openModal(
                    'ConfirmationModal', {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={false}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                            fetchLifeStyleData()
                        }}
                    />,
                    onClose: () => {
                        modal.closeModal('ConfirmationModal')
                        navigation.navigate('Settings')
                    }
                }
                );
            })
            .catch(error => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals('ActionContainerModal');
                }, 200)
                console.log('failed to delete these item(s)', error)
            })
    }

    const updateItems = (itemId, data) => {
        updateLifeStyleItems(itemId, { name: data })
            .then(data => {
                modal.openModal(
                    'ConfirmationModal', {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={false}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');

                            fetchLifeStyleData()
                        }}
                    />,
                    onClose: () => {
                        modal.closeModal('ConfirmationModal')
                        fetchLifeStyleData()
                    }
                }
                );
            })
            .catch(error => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals('ActionContainerModal');
                }, 200)
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

    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case 'LifeStyle':
                return (
                    <LifeStyleTabs
                        LifestyleData={lifeStyleData}
                        isEditMode={isEditMode}
                        modal={modal}
                        onAction={(data) => {
                            console.log(data)
                            addItems(data.id, data.data)
                        }}
                        onDelete={(data) => {
                            openDeletionConfirm(data)
                        }}
                        handleEdit={(id, data) => {
                            updateItems(id, data)
                        }}
                    />
                )
            case 'Health Insurer':
                return <View></View>;
            default:
                return <View />;
        }
    }


    return (
        <PageContext.Provider value={{ pageState, setPageState }}>
            <DetailsPage
                headerChildren={['Custom types', 'Case Files']}
                onBackPress={() => {
                    navigation.navigate('Settings');
                }}
                //isArchive={getIsEditable()}
                pageTabs={(
                    <TabsContainer
                        tabs={currentTabs}
                        selectedTab={currentTab}
                        onPressChange={onTabPress}
                    />
                )}
            >
                {getTabContent(currentTab)}
            </DetailsPage >
        </PageContext.Provider>
    );
}
CaseFilesPage.propTypes = {};
CaseFilesPage.defaultProps = {};

export default CaseFilesPage