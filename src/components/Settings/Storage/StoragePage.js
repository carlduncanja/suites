import { getCategories, getStorage, updateBuffer } from '../../../api/network';

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
import { useState } from 'react';


const StoragePage = ({navigation, route}) => {
    const {edited, onRefresh} = route?.params || {};
    const theme = useTheme();
    const modal = useModal();
    const currentTabs = ['Details'];

    const [storageItems, setStorageItems] = useState ([]);
    const [storageItemsIds, setStorageItemsIds] = useState([]);
    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [pageState, setPageState] = useState({});    
  
    const [error, setError] = useState(false);

    const { isEditMode = edited ? true : false} = pageState;

    useEffect(() => {
        getCategories('storage')
            .then(data => {
                setStorageItems(data.data.map( item => {return item.name}));
                setStorageItemsIds(data.data.map( item => {return item._id}))
            })
            .catch(error => {
                console.log('Unable to retrieve storage items: ', error);
            });

            edited ? setPageState({
                ...pageState,
                isEditMode: true
            }) : null
    }, []);

    //add items
    const handleAdd = (name) => {
        addCategory({name: name, type: 'storage'})
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
        storageItems.length > 0 ?
        <>
           <ScrollView>
            <View>
                <FrameCard
                    frameColor="#718096"
                    titleBackgroundColor="#EEF2F6"
                    frameBorderColor="#D6BCFA"
                    frameTitle="Categories"
                    cardInformation={storageItems}
                    icon={ShoppingTag}
                    isEditMode={isEditMode}
                    handleEdit={handleEdit}
                    idArray={storageItemsIds}
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
                headerChildren={['Custom types', 'Storage']}
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
export default StoragePage;