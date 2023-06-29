import React, { useState, useEffect } from 'react';
import styled, { css } from '@emotion/native';
import { Text, ScrollView } from 'react-native';
import _ from 'lodash';
import { useTheme } from 'emotion-theming';
import { useNextPaginator, usePreviousPaginator } from '../helpers/caseFilesHelpers';
import Page from '../components/common/Page/Page';
import AlertTypeComponent from '../components/Alerts/AlertTypeComponent';
import DataItem from '../components/common/List/DataItem';
import ContentDataItem from '../components/common/List/ContentDataItem';
import IconButton from '../components/common/Buttons/IconButton';
import CollapsedIcon from '../../assets/svg/closeArrow';
import ActionIcon from '../../assets/svg/dropdownIcon';
import DoneAlertsList from '../components/Alerts/DoneAlertsList';
import { getAlerts, closeAlert, closeAllAlerts } from '../api/network';
import RecentAlertsList from '../components/Alerts/RecentAlertsList';
import { useModal } from 'react-native-modalfy';
import CustomDateRangePicker from '../components/Alerts/CustomDateRangePicker';
import ConfirmationComponent from '../components/ConfirmationComponent';
import ConfirmationCheckBoxComponent from '../components/ConfirmationCheckBoxComponent';

const NumberContainer = styled.View`
    height: 20px;
    padding: ${({ theme }) => theme.space['--space-4']};
    padding-top:0;
    padding-bottom:0;
    border: ${({ theme }) => `1px solid ${theme.colors['--color-gray-300']}`};
    background-color: ${({ theme }) => theme.colors['--color-gray-100']};
    border-radius: 4px;
    align-items: center;
    justify-content: center;
`;

const TextItem = styled.Text(({ theme, color = '--color-gray-800', font = '--text-sm-regular' }) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 2
}));

const Space = styled.View`
    height: 20px;
`;

function Alerts(props) {

    const theme = useTheme();
    const modal = useModal();
    const recordsPerPage = 4;  
    const alertsPermissions = props.route.params.userPermissions.alerts;

    const [isCollapsed, setIsCollapsed] = useState([]);
    const [isFetchingData, setFetchingData] = useState(false);
    const [recentAlerts, setRecentAlerts] = useState([]);
    const [closedAlerts, setClosedAlerts] = useState([]);

    const [closedCount, setClosedCount] = useState(0);
    const [closedTotalPages, setClosedTotalPages] = useState(1);
    const [recentTotalPages, setRecentTotalPages] = useState(1);

    const [closedPageListMin, setClosedPageListMin] = useState(0);
    const [closedPageListMax, setClosedPageListMax] = useState(recordsPerPage);

    const [recentPageListMin, setRecentPageListMin] = useState(0);
    const [recentPageListMax, setRecentPageListMax] = useState(recordsPerPage);

    const [closedPagePosition, setClosedPagePosition] = useState(1);
    const [recentPagePosition, setRecentPagePosition] = useState(1);

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [recentSearchValue, setRecentSearchValue] = useState('');
    const [recentSearchResults, setRecentSearchResult] = useState([]);
    const [recentSearchQuery, setRecentSearchQuery] = useState({});

    const [closedStartDate, setClosedStartDate] = useState('');
    const [closedEndDate, setClosedEndDate] = useState('');

    const [recentStartDate, setRecentStartDate] = useState('');
    const [recentEndDate, setRecentEndDate] = useState('');

    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();

    const recentHeader = () => (
        <>
            <DataItem color="--color-gray-600" fontStyle="--text-base-regular" flex={1} text="Recent" />
            <ContentDataItem
                align="flex-end"
                flex={0.5}
                content={(
                    <IconButton
                        // Icon={<ActionIcon/>}
                        Icon={isCollapsed.includes('recent') ? <CollapsedIcon /> : <ActionIcon />}
                        disabled={true}
                    />
                )}
            />
        </>
    );

    const doneHeader = () => (
        <>
            <ContentDataItem
                flex={0.2}
                content={(
                    <IconButton
                        // Icon={<ActionIcon/>}
                        Icon={isCollapsed.includes('done') ? <CollapsedIcon /> : <ActionIcon />}
                        disabled={true}
                    />
                )}
            />
            <DataItem color="--color-gray-600" fontStyle="--text-base-regular" flex={2} text="Done" />
            <ContentDataItem
                align="flex-end"
                flex={0.5}
                content={(
                    <NumberContainer theme={theme}>
                        <TextItem>{closedCount}</TextItem>
                    </NumberContainer>
                )}
            />
        </>
    );

    const onCollapse = name => () => {
        let newList = [];
        isCollapsed.includes(name) ?
            newList = [...isCollapsed.filter(item => item !== name)] :
            newList = [...isCollapsed, name];

        setIsCollapsed(newList);
    };

    const goToNextPage = type => () => {
        console.log('Page: ', type);
        const pages = type === 'done' ? closedTotalPages : recentTotalPages;
        const pagePosition = type === 'done' ? closedPagePosition : recentPagePosition;
        const pageMin = type === 'done' ? closedPageListMin : recentPageListMin;
        const pageMax = type === 'done' ? closedPageListMax : recentPageListMax;

        if (pagePosition < pages) {
            let { currentPage, currentListMin, currentListMax } = useNextPaginator(pagePosition, recordsPerPage, pageMin, pageMax);
            if (type === 'done') {
                setClosedPagePosition(currentPage);
                setClosedPageListMin(currentListMin);
                setClosedPageListMax(currentListMax);
                fetchClosedAlert(currentPage);
            } else {
                setRecentPagePosition(currentPage);
                setRecentPageListMin(currentListMin);
                setRecentPageListMax(currentListMax);
                fetchOpenAlert(currentPage);
            }
        }
    };

    const goToPreviousPage = type => () => {
        const pages = type === 'done' ? closedTotalPages : recentTotalPages;
        const pagePosition = type === 'done' ? closedPagePosition : recentPagePosition;
        const pageMin = type === 'done' ? closedPageListMin : recentPageListMin;
        const pageMax = type === 'done' ? closedPageListMax : recentPageListMax;

        if (pagePosition > 1) {
            let { currentPage, currentListMin, currentListMax } = usePreviousPaginator(pagePosition, recordsPerPage, pageMin, pageMax);
            if (type === 'done') {
                setClosedPagePosition(currentPage);
                setClosedPageListMin(currentListMin);
                setClosedPageListMax(currentListMax);
                fetchClosedAlert(currentPage);
            } else {
                setRecentPagePosition(currentPage);
                setRecentPageListMin(currentListMin);
                setRecentPageListMax(currentListMax);
                fetchOpenAlert(currentPage);
            }
        }
    };

    const setDates = type => (start, end) => {
        if (type === 'recent') {
            setRecentEndDate(end);
            setRecentStartDate(start);
        } else {
            setClosedEndDate(end);
            setClosedStartDate(start);
        }
    };

    const onChangeDate = type => () => {
        modal.openModal('ConfirmationModal', {
            content: (
                <CustomDateRangePicker
                    getDates={(startDate, endDate) => {
                        setDates(type)(startDate, endDate);
                        type === 'recent' ? fetchOpenAlert(1, startDate, endDate) : fetchClosedAlert(1, startDate, endDate);
                        modal.closeModals('ConfirmationModal');
                    }}
                    onSelectDates={() => modal.closeAllModals()}
                    startDate={type === 'recent' ? recentStartDate : closedStartDate}
                    endDate={type === 'recent' ? recentEndDate : closedEndDate}
                />
            ),
            onClose: () => {
                // modal.closeAllModals();
                console.log('Modal closed');
            },
        });
    };

    const pageContent = (

        <>

            <AlertTypeComponent
                alertType="Recent"
                header={recentHeader}
                onItemPress={onCollapse('recent')}
                isCollapsed={isCollapsed.includes('recent')}
                currentPage={recentPagePosition}
                totalPages={recentTotalPages}
                goToNextPage={goToNextPage('recent')}
                goToPreviousPage={goToPreviousPage('recent')}
                searchValue={recentSearchValue}
                onChangeText={value => setRecentSearchValue(value)}
                onChangeDate={onChangeDate('recent')}
                startDate={recentStartDate}
                endDate={recentEndDate}
                onClearCalendarDates={() => { setRecentEndDate(''); setRecentStartDate(''); fetchOpenAlert(1, '', ''); }}
                onClearList={() => { openClearConfirm() }} 
                 showClearList={alertsPermissions.update}
                content={(
                    <RecentAlertsList
                          data={recentAlerts}
                          updateAlerts={() => { setFetchingData(true); fetchClosedAlert(1); fetchOpenAlert(1); }} 
                          permissions={alertsPermissions}
                    />
                )} 
                permissions={alertsPermissions}
            />

            <Space />

            <AlertTypeComponent
                alertType="Done"
                header={doneHeader}
                onItemPress={onCollapse('done')}
                isCollapsed={isCollapsed.includes('done')}
                currentPage={closedPagePosition}
                totalPages={closedTotalPages}
                goToNextPage={goToNextPage('done')}
                goToPreviousPage={goToPreviousPage('done')}
                searchValue={searchValue}
                onChangeText={value => setSearchValue(value)}
                onChangeDate={onChangeDate('done')}
                startDate={closedStartDate}
                endDate={closedEndDate}
                showClearList={false}
                onClearCalendarDates={() => { setClosedEndDate(''); setClosedStartDate(''); fetchClosedAlert(1, '', ''); }}
                content={(
                    <DoneAlertsList
                        data={closedAlerts}
                    />
                )}
                backgroundColor="--color-gray-100"
            />

        </>
    );

    const fetchClosedAlert = (page = 1, start = closedStartDate, end = closedEndDate) => {
        getAlerts('closed', recordsPerPage, page, searchValue, start.toString(), end.toString())
            .then(results => {
                const { data = [], totalPages = 0 } = results;
                setClosedAlerts(data);
                setClosedTotalPages(totalPages);
                setClosedCount(data.length);
            })
            .catch(error => {
                console.log('Error fetching alerts: ', error);
            });
    };

    const openClearConfirm = () => {
        {
            recentAlerts.length !== 0 ?
            modal.openModal(
                'ConfirmationModal',
                {
                    content: <ConfirmationCheckBoxComponent
                        isError={false}
                        isEditUpdate={true}
                        confirmMessage="Yes i want to clear this list"
                        onCancel={() => {
                            modal.closeModals('ConfirmationModal');

                        }}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                            clearRecentList()
                        }}
                        message="Do you want to clear all Alerts in the Recent List"
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    }
                }
            )
            :
            null
        }
    };

    const clearRecentList = () => {
        closeAllAlerts()
            .then(_ => {
                setFetchingData(true);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                                fetchClosedAlert(1);
                                fetchOpenAlert(1)
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                                fetchClosedAlert(1);
                                fetchOpenAlert(1)
                            }}
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });


            })
            .catch(_ => {
                // show modal fail
                console.log("Error");
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            });
    }

    const fetchOpenAlert = (page = 1, start = recentStartDate, end = recentEndDate) => {
        console.log("RECENT ALERTS");
        getAlerts('open', recordsPerPage, page, recentSearchValue, start.toString(), end.toString())
            .then(results => {
                const { data = [], totalPages = 0 } = results;
               
                setRecentAlerts(data);
                setRecentTotalPages(totalPages);

            })
            .catch(error => {
                console.log('Error fetching alerts: ', error);
            })
            .finally(_ => {
                setFetchingData(false);
            });
    };

    useEffect(() => {
        setFetchingData(true);
        fetchClosedAlert(closedPagePosition);
        fetchOpenAlert(recentPagePosition); 
        console.log("wewewewewewe",alertsPermissions)
    }, []);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.

            setSearchResult([]);
            fetchClosedAlert(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchClosedAlert, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setClosedPagePosition(1);
    }, [searchValue]);

    useEffect(() => {
        if (!recentSearchValue) {
            // empty search values and cancel any out going request.

            setRecentSearchResult([]);
            fetchOpenAlert(1);
            if (recentSearchQuery.cancel) recentSearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchOpenAlert, 300);

        setRecentSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setRecentPagePosition(1);
    }, [recentSearchValue]);

    return (
        <Page
            routeName="Alerts"
            hasSearch={false}
            hasList={false}
            pageContent={pageContent}
            isFetchingData={isFetchingData}
        />
    );
}

export default Alerts;
