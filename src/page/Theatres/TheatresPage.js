import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getTheatreById } from '../../api/network';
import EquipmentsTab from '../../components/OverlayTabs/EquipmentsTab';
import HistoryTabs from '../../components/OverlayTabs/HistoryTabs';
import StorageLocationsTab from '../../components/OverlayTabs/StorageLocationsTab';
import TheatresDetailsTab from '../../components/OverlayTabs/TheatresDetailsTab';
import PaginatedSchedule from '../../components/PaginatedSchedule';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';
import { PageContext } from '../../contexts/PageContext';
import { formatDate } from '../../utils/formatter';

function TheatresPage({route, navigation}) {
    const currentTabs = [
        'Details',
        'History',
        'Storage',
        'Equipment',
        'Schedule',
    ];
    const {theatre, reloadTheatres, tab} = route.params;

    const updateTheatre =  route.params.updateTheatre;

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedTheatre, setTheatre] = useState(theatre);
    const [pageState, setPageState] = useState({});

    const {isEditMode} = pageState;
   
    tab ? useEffect(() => {
        setTimeout(() => {
            fetchTheatre(theatre._id);
        }, 200);
        setCurrentTab(currentTabs[4])
    }, [tab]) : ''


    useEffect(() => {
        setTimeout(() => {
            fetchTheatre(theatre._id);
        }, 200);
    }, []);

    const onTabPress = selectedTab => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const setPageLoading = value => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        });
    };

    const onBackTapped = () => {
        navigation.navigate('Theatres');
    };

    const onDetailsUpdated = updates => {
        setTheatre({
            ...selectedTheatre,
            name: updates.name,
            description: updates.description
        });
        if (reloadTheatres) reloadTheatres();
    };

    // ##### Helper functions

    const isInUse = (appointments = []) => {
        const now = moment();

        if (!Array.isArray(appointments)) return {
            isActive: false,
            isRecovery: false
        };

        for (const appointment of appointments) {
            const startTime = moment(appointment.startTime);
            const endTime = moment(appointment.endTime);

            const isActive = now.isBetween(startTime, endTime);

            if (isActive) {
                return {
                    isActive: true,
                    isRecovery: false
                };
            }
        }

        return {
            isActive: false,
            isRecovery: false
        };
    };

    const getOverlayScreen = selectedOverlay => {
        switch (selectedOverlay) {
            case 'Details': {
                console.log('Theatre:', selectedTheatre);
                const appointments = selectedTheatre.appointments || [];

                const {isActive, isRecovery} = isInUse(selectedTheatre.appointments || []);
                const availableOn = (appointments && appointments.length) ?
                    formatDate(appointments[0].endTime, 'DD/MM/YYYY @ hh:mm a') :
                    '--';

                const theatreDetails = {
                    description: selectedTheatre.description,
                    id: selectedTheatre.theatreNumber,
                    name: selectedTheatre.name,
                    status: isActive ? 'In-Use' : 'Available', // TODO calculate status
                    statusColor: 'black',
                    physician: '--',
                    availableOn: isActive ? availableOn : '--'
                };

                return <TheatresDetailsTab
                    {...theatreDetails}
                    theatreId={selectedTheatre._id}
                    onUpdated={onDetailsUpdated}
                    isEditMode={isEditMode}
                />;
            }
            case 'History': {
                
                const cases = selectedTheatre.cases.map(caseItem => {
                    const end = caseItem.endTime;
                    const start = caseItem.startTime;
                    let duration = moment.duration(moment(end)
                        .diff(moment(start)));
                    duration = duration.asHours();
                    return {
                        name: caseItem.title,
                        duration,
                        date: caseItem.startTime,
                        isRecovery: caseItem.isRecovery || false
                    };
                });

                return <HistoryTabs cases={cases}/>;
            }
            case 'Storage': {
                const storageLocations = selectedTheatre.storageLocations.map(item => {
                    const {_id, inventoryLocations = []} = item;

                    let stock = 0;
                    const levels = {
                        ideal: 0,
                        max: 0,
                        low: 0,
                        min: 0,
                        critical: 0
                    };

                    inventoryLocations.map(inventoryLocation => {
                        stock += inventoryLocation.stock;

                        levels.ideal += inventoryLocation.levels.ideal;
                        levels.max += inventoryLocation.levels.max;
                        levels.low += inventoryLocation.levels.low;
                        levels.critical += inventoryLocation.levels.critical;

                        inventoryLocation.storageLocationId = item._id;
                    });

                    return {
                        _id,
                        locationName: item.name,

                        stock,
                        levels,
                        inventoryLocations
                    };
                });
                return <StorageLocationsTab storageLocations={storageLocations}/>;
            }
            case 'Equipment': {
                const equipments = [];

                selectedTheatre.appointments.forEach(appointment => {
                    const {_id: appointmentId, item = {}, title: equipmentTitle, startTime, endTime} = appointment;
                    const {equipment = {}, equipmentType: equipmentTypeId} = item;
                    const {name: equipmentName, _id: equipmentId, status} = equipment;

                    if (item.equipment) {
                        const equipmentTypeName = equipmentTitle.substring(0, equipmentTitle.indexOf('/'));

                        const equipmentTypeIndex = equipments.findIndex(e => e._id === equipmentTypeId);
                        const equipmentObj = {
                            _id: equipmentId,
                            equipmentTypeId,
                            equipmentTitle,
                            equipmentName,
                            status,
                            startTime,
                            endTime
                        };

                        if (equipmentTypeIndex < 0) { 
                            equipments.push({
                                _id: equipmentTypeId,
                                appointmentId,
                                equipmentTypeName,
                                equipments: [equipmentObj]
                            });
                        } else {
                            equipments[equipmentTypeIndex].equipments = [...equipments[equipmentTypeIndex].equipments, equipmentObj];
                        }
                    }
                });

                return <EquipmentsTab equipments={equipments}/>;
            }
            case 'Schedule':
                return <PaginatedSchedule updateTheatre={updateTheatre} tab = {tab} ID={theatre._id} details = {theatre} isTheatre = {true} isPhysician={false}/>;
            default:
                return <View/>;
        }
    };

    const getIsEditable = () => {
        switch (currentTab) {
            case 'Details':
                return false;
            case 'History':
                return true;
            case 'Storage':
                return true;
            case 'Equipment':
                return true
            case 'Schedule':
                return true;
            default:
                return false;
        }
    };

    const fetchTheatre = id => {
        setPageLoading(true);
        getTheatreById(id)
            .then(data => {
                setTheatre(data);
            })
            .catch(error => {
                console.log('Failed to get theatre', error);
                
            })
            .finally(_ => {
                setPageLoading(false);
            });
    };

    const {_id, name, theatreNumber} = selectedTheatre;

    return (
        <>
            <PageContext.Provider value={{
                pageState,
                setPageState
            }}
            >
                <DetailsPage
                    headerChildren={[name, `${theatreNumber}`]}
                    onBackPress={onBackTapped}
                    isEditable={updateTheatre}
                    isArchive={getIsEditable()}
                    pageTabs={(
                        <TabsContainer
                            tabs={currentTabs}
                            selectedTab={currentTab}
                            onPressChange={onTabPress}
                        />
                    )}
                >
                    {getOverlayScreen(currentTab)}
                </DetailsPage>
            </PageContext.Provider>
        </>
    );
}

export default TheatresPage;
