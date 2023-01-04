import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import moment from 'moment';
import {forEach} from 'lodash';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import SlideOverlay from '../../components/common/SlideOverlay/SlideOverlay';
import InventoryGeneralTabContent from '../../components/OverlayTabs/InventoryGeneralTabContent';
import TheatresDetailsTab from '../../components/OverlayTabs/TheatresDetailsTab';
import {getTheatreById} from '../../api/network';
import ProceduresEquipmentTab from '../../components/OverlayTabs/ProceduresEquipmentTab';
import EquipmentsTab from '../../components/OverlayTabs/EquipmentsTab';
import PaginatedSchedule from '../../components/PaginatedSchedule';
import StorageLocationsTab from '../../components/OverlayTabs/StorageLocationsTab';
import HistoryTabs from '../../components/OverlayTabs/HistoryTabs';
import {formatDate} from '../../utils/formatter';
import BottomSheetContainer from '../../components/common/BottomSheetContainer';
import {PageContext} from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';

function TheatresPage({route, navigation}) {
    const theme = useTheme();
    const currentTabs = [
        'Details',
        'History',
        'Storage',
        'Equipment',
        'Schedule',
    ];
    const {theatre, reloadTheatres} = route.params;
    // ##### States
    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedTheatre, setTheatre] = useState(theatre);
    const [pageState, setPageState] = useState({});

    const {isEditMode} = pageState;
    // ##### Lifecycle Methods

    useEffect(() => {
        setTimeout(() => {
            fetchTheatre(theatre._id);
        }, 200);
    }, []);

    // ##### Event Handlers

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
        console.log('tapped the back arrow');
        navigation.navigate('Theatres');
    };

    const onDetailsUpdated = updates => {
        // hello???
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
                // console.log("Cases: ", selectedTheatre.cases)
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

                    // get the total stock and levels
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

                        if (equipmentTypeIndex < 0) { // add to equipments array
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

                const array = [
                    {
                        appointmentId: '5f75e79e488941fbfe16fcf3',
                        equipmentTypeId: '5ea059269c2d1f6e55deb714',
                        equipmentTypeName: 'Stethoscope',
                        equipments: [
                            {
                                endTime: '2020-10-05T14:28:43.065Z',
                                equipmentId: '5ea0736698454a945321009d',
                                equipmentName: 'Stethoscopes 3',
                                startTime: '2020-10-02T14:28:43.065Z',
                                status: 'Available',
                                equipmentTypeId: '5ea059269c2d1f6e55deb714'
                            },
                        ],
                    },
                    {
                        appointmentId: '5f75e787488941fbfe16fcf1',
                        equipmentTypeId: '5ea058fb706b105f13cc93d2',
                        equipmentTypeName: 'MRI',
                        equipments: [
                            {
                                endTime: '2020-10-05T14:28:16.504Z',
                                equipmentId: '5ea07336dfb0da52b0ebd730',
                                equipmentName: 'MRI 2',
                                startTime: '2020-10-02T14:28:16.504Z',
                                status: 'Available',
                                equipmentTypeId: '5ea058fb706b105f13cc93d2'
                            },
                            {
                                endTime: '2020-10-04T05:00:00.000Z',
                                equipmentId: '5ea0733121bc5060f5317006',
                                equipmentName: 'MRI 1',
                                startTime: '2020-10-01T05:00:00.000Z',
                                status: 'Available',
                                equipmentTypeId: '5ea058fb706b105f13cc93d2'
                            },
                        ],
                    },
                ];

                return <EquipmentsTab equipments={equipments}/>;
            }
            case 'Schedule':
                return <PaginatedSchedule ID={theatre._id} details = {theatre} isPhysician={false}/>;
            default:
                return <View/>;
        }
    };

    const getIsEditable = () => {
        switch (currentTab) {
            case 'Details':
                return false;
            case 'History':
                return false;
            case 'Storage':
                return false;
            case 'Equipment':
                return false;
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
                //TODO handle error cases.
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

TheatresPage.propTypes = {};
TheatresPage.defaultProps = {};

export default TheatresPage;
