import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'emotion-theming';
import { getLifeStyles, addLifeStyleItems, deleteLifeStyleItems, getHealthInsurers, createHealthInsurer, deleteHealthInsurer, updateHealthInsurer, updateLifeStyleItems } from '../../../api/network';
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
import ActionItem from '../../common/ActionItem';
import ActionContainer from '../../common/FloatingAction/ActionContainer';

function CaseFilesPage({ navigation, route }) {

    const theme = useTheme();
    const modal = useModal();
    const currentTabs = ['LifeStyle', 'Health Insurer'];

    const [pageState, setPageState] = useState({});
    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [lifeStyleData, setLifeStyleData] = useState([])
    const [healthInsurers, setHealthInsurers] = useState([])
    const [addMode, setAddMode] = useState(false);
    const { isEditMode = false } = pageState;


    useEffect(() => {
        fetchLifeStyleData();
        fetchHealthInsurers();
    }, []);

    useEffect(() => {
        !isEditMode && setAddMode(false);
    }, [isEditMode])

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




    }
    const openDeletionConfirm = (data, deleteInsurer) => {
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
                        deleteInsurer ? deleteHealthInsurerLocal(data) : deleteItem(data)
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

    const handleAddInsurer = () => {
        setAddMode(true);
        modal.closeAllModals();
    }

    const handleCreateHealthInsurer = (insurer) => {
        createHealthInsurer(insurer)
            .then(_ => {
                setAddMode(false);
                modal.openModal(
                    'ConfirmationModal', {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={false}
                        onAction={() => {
                            setHealthInsurers([]);
                            fetchHealthInsurers();
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
                openErrorConfirmation();
                console.log('Failed to create health insurer', error)
            })
    }

    const handleDeleteInsurer = (id) => {
        openDeletionConfirm(id, true)
    }

    const deleteHealthInsurerLocal = (id) => {
        deleteHealthInsurer({ids: [id], status: 'removed'})
        .then(_ => {
            modal.openModal(
                'ConfirmationModal', {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={false}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                        setHealthInsurers([]);
                        fetchHealthInsurers();
                    }}
                />,
                onClose: () => {
                    modal.closeModal('ConfirmationModal')
                }
            }
            );
        })
        .catch(error => {
            openErrorConfirmation();
            console.log('Failed to delete health insurer', error)
        })
    }

    const handleEditInsurer = (id, data) => {
        updateHealthInsurer(id, data)
        .then(_ => {
            modal.openModal(
                'ConfirmationModal', {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={false}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                        setHealthInsurers([]);
                        fetchHealthInsurers();
                    }}
                />,
                onClose: () => {
                    modal.closeModal('ConfirmationModal')
                }
            }
            );
        })
        .catch(error => {
            openErrorConfirmation();
            console.log('Failed to update health insurer', error)
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
    console.log("the life style data of a patient",lifeStyleData)
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
                        handleEdit={(id, data) => {
                            updateItems(id, data)
                        }}
                    />
                )
            case 'Health Insurer':
                return <>
                <ScrollView> 
                    { addMode &&  <HealthInsurer insurer={{}} addMode={true} isEditMode={true} setAddMode = {setAddMode} handleAdd={handleCreateHealthInsurer}/>}
                    {
                        healthInsurers.map((insurer, key) => {
                           return <HealthInsurer key={key} insurer={insurer} isEditMode={isEditMode} handleDelete={handleDeleteInsurer} handleEdit={handleEditInsurer}/>
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