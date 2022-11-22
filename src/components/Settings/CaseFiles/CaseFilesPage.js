import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'emotion-theming';
import { getLifeStyles, addLifeStyleItems, deleteLifeStyleItems, getHealthInsurers, createHealthInsurer, deleteHealthInsurer } from '../../../api/network';
import DetailsPage from '../../common/DetailsPage/DetailsPage';
import TabsContainer from '../../common/Tabs/TabsContainerComponent';
import ConfirmationComponent from '../../ConfirmationComponent';
import ConfirmationCheckBoxComponent from '../../ConfirmationCheckBoxComponent'
import LifeStyleTabs from '../../../components/OverlayTabs/LIfeStyleTabs';
import HealthInsurer from '../../../components/OverlayTabs/HealthInsurerTab';
import { PageContext } from '../../../contexts/PageContext';
import { useModal } from 'react-native-modalfy';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../../common/Page/Footer';
import AddIcon from '../../../../assets/svg/addIcon';
import TransferIcon from '../../../../assets/svg/transferIcon';
import ActionItem from '../../common/ActionItem';
import ActionContainer from '../../common/FloatingAction/ActionContainer';
import DefaultScheduleContent from '../../../page/Schedule/SchedulePage/DefaultScheduleContent';

function CaseFilesPage({ navigation, route }) {

    const theme = useTheme();
    const modal = useModal();
    const currentTabs = ['LifeStyle', 'Health Insurer'];

    const [pageState, setPageState] = useState({});
    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [lifeStyleData, setLifeStyleData] = useState([])
    const [healthInsurers, setHealthInsurers] = useState([])
    const [deleteInsurer, setDeleteInsurer] = useState(false)
    const [addMode, setAddMode] = useState(false);
    const { isEditMode = false } = pageState;


    useEffect(() => {
        fetchLifeStyleData();
        fetchHealthInsurers();
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
                console.error('Fetching lifestyle data failed', error);
            });
    }

    const fetchHealthInsurers = () => {
        getHealthInsurers()
            .then(data => {
                setHealthInsurers(data.data);
            })
            .catch(error => {
                console.error('Fetching health insurer data failed', error);
            });
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
            .finally



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
                        // deleteInsurer ? deleteHealthInsurerLocal(data) : deleteItem(data)
                        deleteHealthInsurerLocal(data);
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

    const handleAddInsurer = () => {
        setAddMode(true);
        modal.closeAllModals();
    }

    const handleCreateHealthInsurer = (insurer) => {
        createHealthInsurer(insurer)
            .then(_ => {
                setAddMode(false);
                fetchHealthInsurers();
                modal.openModal(
                    'ConfirmationModal', {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={false}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                    />,
                    onClose: () => {
                        modal.closeModal('ConfirmationModal')
                    }
                }
                );
            })
            .catch(error => {
                modal.closeModals('ConfirmationModal');
                console.log('Failed to create health insurer', error)
            })
    }

    const handleDeleteInsurer = (id) => {
        setDeleteInsurer(true);
        openDeletionConfirm(id)
    }

    const deleteHealthInsurerLocal = (id) => {
        console.log("IDS", [id]);
        deleteHealthInsurer({ids: [id], status: 'removed'})
        .then(_ => {
            setHealthInsurers([]);
            fetchHealthInsurers();
            setDeleteInsurer(false);
            modal.openModal(
                'ConfirmationModal', {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={false}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                    }}
                />,
                onClose: () => {
                    modal.closeModal('ConfirmationModal')
                }
            }
            );
        })
        .catch(error => {
            modal.closeModals('ConfirmationModal');
            console.log('Failed to delete health insurer', error)
        })
    }

    const floatingActions = () => {
        const addLocation = (
            <ActionItem
                title="New Insurer"
                icon={<AddIcon/>}
                onPress={() => handleAddInsurer()}
                disabled={false}
                touchable={true}
            />
        );

        return <ActionContainer
            floatingActions={[
                addLocation,
            ]}
            title="HEALTH INSURER ACTIONS"
        />;
    };

    const toggleActionButton = () => {
        modal.openModal('ActionContainerModal',
            {
                actions: floatingActions(),
            });
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
                            addItems(data.id, data.data)
                        }}
                        onDelete={(data) => {
                            openDeletionConfirm(data)
                        }}
                    />
                )
            case 'Health Insurer':
                return <>
                <ScrollView> 
                    { addMode &&  <HealthInsurer insurer={{}} addMode={true} isEditMode={true} setAddMode = {setAddMode} handleAdd={handleCreateHealthInsurer}/>}
                    {
                        healthInsurers.map(insurer => {
                            console.log(insurer);
                           return <HealthInsurer insurer={insurer} isEditMode={isEditMode} handleDelete={handleDeleteInsurer} />
                        })
                    }
                 
                </ScrollView>
                <Footer
                hasPaginator={false}
                hasActionButton={isEditMode}
                hasActions={true}
                isDisabled={!isEditMode}
                toggleActionButton={toggleActionButton}
            />
                </>
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