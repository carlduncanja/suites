import React, {useState, useEffect, useContext} from 'react';
import {View, ScrollView} from 'react-native';
import styled, {css} from '@emotion/native';
import { useTheme } from 'emotion-theming';

import { getCategories, addCategory, deleteCategory, updateCategory } from '../../../api/network';

import DetailsPage from '../../common/DetailsPage/DetailsPage';
import TabsContainer from '../../common/Tabs/TabsContainerComponent';
import ConfirmationComponent from '../../ConfirmationComponent';
import ConfirmationCheckBoxComponent from '../../ConfirmationCheckBoxComponent';
import {PageContext} from '../../../contexts/PageContext';
import { useModal } from 'react-native-modalfy';

import FrameCard from '../../common/Frames/FrameCards/FrameCard';

const ContentContainer = styled.View`
    height: 32px;
    flex-direction: row;
    /* margin-top: 24px; */
`;

const HeaderContainer = styled.View`
    border-bottom-color: ${({theme}) => theme.colors['--color-gray-400']};
    border-bottom-width: 1px;
    border-bottom-style: solid;
    margin-bottom: 24px;
`;

function CategoryPage({navigation, route}) {
    const theme = useTheme();
    const modal = useModal();
    const {item} = route?.params || {};
    const currentTabs = ['Details'];

    // ##### States
    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [pageState, setPageState] = useState({});
    
    const [categoryItems, setCategoryItems] = useState ([]);
    const [categoryIds, setCategoryIds] = useState ([]);
  

    const { isEditMode = false} = pageState;

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories =  () => {
        getCategories(item.categoryType, 1000)
        .then(data => {
            setCategoryItems(data.data.map( item => {return item.name}));
            setCategoryIds(data.data.map( item => {return item._id}))
        })
        .catch(error => {
            console.log('Unable to retrieve iventory category items: ', error);
        });
    }

    const handleEdit = (id, name) => {
        updateCategory(id, {name: name})
        .then(data => {
            successModal();
            fetchCategories();
        })
        .catch(error => {
            errorModal();
            console.log(error);
        })
    }

    const handleDelete = (data) => {
        openDeletionConfirm(data);

    }

    const handleAdd = (name) => {
        addCategory({name: name, type: item.categoryType})
            .then(data => {
                fetchCategories();
                successModal();
            })
            .catch(error => {
                errorModal();
                console.log(error);
            })
    }

    const successModal = () => {
        modal.openModal(
            'ConfirmationModal', {
            content: <ConfirmationComponent
                isError={false}
                isEditUpdate={false}
                onAction={() => {
                    modal.closeModals('ConfirmationModal');
                }}
                onCancel={() => {
                    modal.closeModals('ConfirmationModal');
                }}
            />,
            onClose: () => {
                modal.closeModal('ConfirmationModal')
            }
        }
        );
    }

    const errorModal = () => {
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
    }

    const removeItem = (item) => {
        deleteCategory([item])
        .then(() => {
            fetchCategories();
            successModal();
        } 
        ).catch(error => {
            errorModal();
            console.log(error);
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
                        removeItem(data)
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

    const details = (
        <>
           <ScrollView>
            <View>
                <FrameCard
                    frameColor={item.frameColor}
                    titleBackgroundColor={item.titleBackgroundColor}
                    frameBorderColor={item.frameBorderColor}
                    frameTitle={item.frameTitle}
                    cardInformation={categoryItems}
                    icon={item.frameIcon}
                    isEditMode={isEditMode}
                    normalInput={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    idArray={categoryIds}
                    onAction={handleAdd}
                />
            </View>
            </ScrollView>  
         </>
    );

    const getTabContent = selectedTab => {
        switch (selectedTab) {
            case 'Details':
                return details;
            default:
                return <View/>;
        }
    };

    const getIsEditable = () => {
        switch (currentTab) {
            case 'Details':
                return false;
            default:
                return false;
        }
    };

    return (
        <PageContext.Provider value={{
            pageState,
            setPageState
        }}
        >
             <DetailsPage
                isEditable={true}
                headerChildren={['Custom types', item.categoryTitle]}
                onBackPress={() => {
                    navigation.navigate('Settings');
                }}
                isArchive={getIsEditable()}
                pageTabs={(
                    <TabsContainer
                        tabs={currentTabs}
                        selectedTab={currentTab}
                    />
                )}
            >
                {getTabContent(currentTab)}
            </DetailsPage>
            
        </PageContext.Provider>
    );
}

CategoryPage.propTypes = {};
CategoryPage.defaultProps = {};

export default CategoryPage;