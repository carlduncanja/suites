import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';
import styled, {css} from '@emotion/native';
import { useTheme } from 'emotion-theming';

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

function AppointmentBufferPage({navigation}) {
    const theme = useTheme();
    const modal = useModal();
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
    const [isUpdated, setIsUpdated] = useState(false);

    const [bufferTime, setBufferTime] = useState(1);
    const [error, setError] = useState(false);

    const { isEditMode = false } = pageState;

    useEffect(() => {
        if (isUpdated && isEditMode === false) {
            onFinishEdit();
        }
    }, [isEditMode]);

    const onFinishEdit = () => {
        if (bufferTime < 1) {
            setError(true);
            setPageState({...pageState, isEditMode: true});
            return;
        }
        
        goToConfirmationScreen();
        console.log("Buffer time: ", bufferTime);
    };

    const onBufferTimeChange = time => {
        setBufferTime(time);
        setIsUpdated(true);
        if (time > 1) { setError(false); }
    };
   
    const setPageLoading = value => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        });
    };

    const goToConfirmationScreen = () => {
        modal.openModal('ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isEditUpdate = {true}
                    onCancel = {()=> {
                        modal.closeModals('ConfirmationModal');
                        setPageState({
                            ...pageState,
                            isEditMode: true
                        });
                    }}
                    onAction={() => updateBufferTime()}
                    message="Do you want to save your changes?"
                />,
                onClose: () => { modal.closeModals('ConfirmationModal'); }
            });
    };

    const updateBufferTime = () => {
        modal.closeAllModals();
    }

    const itemFormat = () => (
        
        <ContentContainer>
            <DataItem color="--color-gray-800" fontStyle="--text-base-medium" flex={2.5} text="Buffer time"/>
           
            <ContentDataItem
                flex={1}
                content={(
                    <InputUnitFields
                        value={bufferTime}
                        units={['hrs']}
                        enabled={isEditMode}
                        onChangeText={value => {
                            if (/^\d+$/g.test(value) || !value) {
                                onBufferTimeChange(value);
                            }
                        }}
                        keyboardType="number-pad"
                        hasError={error}
                        errorMessage="! Input a value excluding 0"
                    />
                )}
            />
        </ContentContainer>
        
    );

    const details = (
        <>
            <HeaderContainer theme={theme}>
                <Header
                    headers={headers}
                    isCheckbox={false}
                />
            </HeaderContainer>
           
            {itemFormat()}
            
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
                headerChildren={['Custom types', 'Appointment Buffer-time']}
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

AppointmentBufferPage.propTypes = {};
AppointmentBufferPage.defaultProps = {};

export default AppointmentBufferPage;
