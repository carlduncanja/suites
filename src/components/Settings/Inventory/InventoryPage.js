import React, {useState, useEffect, useContext} from 'react';
import {View, ScrollView} from 'react-native';
import styled, {css} from '@emotion/native';
import { useTheme } from 'emotion-theming';

import { getCategories, updateBuffer, addCategory } from '../../../api/network';

import DetailsPage from '../../common/DetailsPage/DetailsPage';
import TabsContainer from '../../common/Tabs/TabsContainerComponent';
import Table from '../../common/Table/Table';
import DataItem from '../../common/List/DataItem';
import InputUnitFields from '../../common/Input Fields/InputUnitFields';
import ContentDataItem from '../../common/List/ContentDataItem';
import ConfirmationComponent from '../../ConfirmationComponent';

import {PageContext} from '../../../contexts/PageContext';
import Header from '../../common/Table/Header';
import { useModal } from 'react-native-modalfy';

import FrameCard from '../../common/Frames/FrameCards/FrameCard';
import ShoppingTag from '../../../../assets/svg/ShoppingTag';

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

function InventoryPage({navigation, route}) {
    const theme = useTheme();
    const modal = useModal();
    const {edited, onRefresh} = route?.params || {};
    const currentTabs = ['Details'];
    const headers = [
        {
            name: 'Item',
            alignment: 'flex-start',
            flex: 2.5
        },
        {
            name: 'Time',
            alignment: 'flex-start',
            flex: 1
        },
    ];
    // ##### States
    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [pageState, setPageState] = useState({});
    
    const [inventoryItems, setInventoryItems] = useState ([]);
    const [inventoryIds, setInventoryIds] = useState ([]);
  

    const { isEditMode = edited ? true : false} = pageState;

    useEffect(() => {
        getCategories('inventory')
            .then(data => {
                setInventoryItems(data.data.map( item => {return item.name}));
                setInventoryIds(data.data.map( item => {return item._id}))
            })
            .catch(error => {
                console.log('Unable to retrieve iventory category items: ', error);
            });

            edited ? setPageState({
                ...pageState,
                isEditMode: true
            }) : null
    }, []);

   

    const handleEdit = () => {
        console.log("handle edit")
    }

    const handleDelete = (data) => {
        openDeletionConfirm(caseId, data);

    }

    const handleAdd = (name) => {
        addCategory({name: name, type: 'inventory'})
            .then(data => {
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
                    setTimeout(() => {
                    }, 200)
                    onRefresh();
                }}
            />,
            onClose: () => {
                modal.closeModal('ConfirmationModal')
                onRefresh();
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

    const details = (
        inventoryItems.length > 0 ?
        <>
           <ScrollView>
            <View>
                <FrameCard
                    frameColor="#718096"
                    titleBackgroundColor="#EEF2F6"
                    frameBorderColor="#D6BCFA"
                    frameTitle="Categories"
                    cardInformation={inventoryItems}
                    icon={ShoppingTag}
                    isEditMode={isEditMode}
                    normalInput={true}
                    handleEdit={handleEdit}
                    onDelete={handleDelete}
                    idArray={inventoryIds}
                    onAction={handleAdd}
                />
            </View>
            </ScrollView>  
        </>
        :
        <></>
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
                headerChildren={['Custom types', 'Inventory']}
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

InventoryPage.propTypes = {};
InventoryPage.defaultProps = {};

export default InventoryPage;