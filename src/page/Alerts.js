import React, {useState, useEffect} from 'react';
import styled, {css} from '@emotion/native';
import {Text} from 'react-native';
import {useTheme} from 'emotion-theming';
import {useNextPaginator, usePreviousPaginator} from '../helpers/caseFilesHelpers';
import Page from '../components/common/Page/Page';
import AlertTypeComponent from '../components/Alerts/AlertTypeComponent';
import DataItem from '../components/common/List/DataItem';
import ContentDataItem from '../components/common/List/ContentDataItem';
import IconButton from '../components/common/Buttons/IconButton';
import CollapsedIcon from '../../assets/svg/closeArrow';
import ActionIcon from '../../assets/svg/dropdownIcon';
import DoneAlertsList from '../components/Alerts/DoneAlertsList';
import { getAlerts } from '../api/network';
import RecentAlertsList from '../components/Alerts/RecentAlertsList';

const NumberContainer = styled.View`
    height: 20px;
    padding: ${ ({theme}) => theme.space['--space-4']};
    padding-top:0;
    padding-bottom:0;
    border: ${ ({theme}) => `1px solid ${theme.colors['--color-gray-300']}`};
    background-color: ${ ({theme}) => theme.colors['--color-gray-100']};
    border-radius: 4px;
    align-items: center;
    justify-content: center;
`;

const TextItem = styled.Text(({theme, color = '--color-gray-800', font = '--text-sm-regular'}) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 2
}));

const Space = styled.View`
    height: 20px;
`;

function Alerts() {
    const theme = useTheme();
    const recordsPerPage = 4;

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

    const recentHeader = () => (
        <>
            <DataItem color="--color-gray-600" fontStyle="--text-base-regular" flex={1} text="Recent"/>
            <ContentDataItem
                align="flex-end"
                flex={0.5}
                content={(
                    <IconButton
                        // Icon={<ActionIcon/>}
                        Icon={isCollapsed.includes('recent') ? <ActionIcon/> : <CollapsedIcon/>}
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
                        Icon={isCollapsed.includes('done') ? <ActionIcon/> : <CollapsedIcon/>}
                        disabled={true}
                    />
                )}
            />
            <DataItem color="--color-gray-600" fontStyle="--text-base-regular" flex={2} text="Done"/>
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
        console.log("Page: ", type);
        const pages = type === 'done' ? closedTotalPages : recentTotalPages;
        const pagePosition = type === 'done' ? closedPagePosition : recentPagePosition;
        const pageMin = type === 'done' ? closedPageListMin : recentPageListMin;
        const pageMax = type === 'done' ? closedPageListMax : recentPageListMax;

        if (pagePosition < pages) {
            let {currentPage, currentListMin, currentListMax} = useNextPaginator(pagePosition, recordsPerPage, pageMin, pageMax);
            if (type === 'done') {
                setClosedPagePosition(currentPage);
                setClosedPageListMin(currentListMin);
                setClosedPageListMax(currentListMax);
                fetchAlert('closed', recordsPerPage, currentPage);
            } else {
                setRecentPagePosition(currentPage);
                setRecentPageListMin(currentListMin);
                setRecentPageListMax(currentListMax);
                fetchAlert('open', recordsPerPage, currentPage);
            }
        }
    };

    const goToPreviousPage = type => () => {
        const pages = type === 'done' ? closedTotalPages : recentTotalPages;
        const pagePosition = type === 'done' ? closedPagePosition : recentPagePosition;
        const pageMin = type === 'done' ? closedPageListMin : recentPageListMin;
        const pageMax = type === 'done' ? closedPageListMax : recentPageListMax;

        if (pagePosition > 1) {
            let {currentPage, currentListMin, currentListMax} = usePreviousPaginator(pagePosition, recordsPerPage, pageMin, pageMax);
            if (type === 'done') {
                setClosedPagePosition(currentPage);
                setClosedPageListMin(currentListMin);
                setClosedPageListMax(currentListMax);
                fetchAlert('closed', recordsPerPage, currentPage);
            } else {
                setRecentPagePosition(currentPage);
                setRecentPageListMin(currentListMin);
                setRecentPageListMax(currentListMax);
                fetchAlert('open', recordsPerPage, currentPage);
            }
        }
    };
    const pageContent = (

        <>
            <AlertTypeComponent
                alertType="Recent"
                header={recentHeader}
                onItemPress={onCollapse('recent')}
                isCollapsed={isCollapsed.includes('recent')}
                content={(
                    <RecentAlertsList
                        data={recentAlerts}
                    />
                )}
            />

            <Space/>

            <AlertTypeComponent
                alertType="Done"
                header={doneHeader}
                onItemPress={onCollapse('done')}
                isCollapsed={isCollapsed.includes('done')}
                currentPage={closedPagePosition}
                totalPages={closedTotalPages}
                goToNextPage={goToNextPage('done')}
                goToPreviousPage={goToPreviousPage('done')}
                content={(
                    <DoneAlertsList
                        data={closedAlerts}
                    />
                )}
                backgroundColor="--color-gray-100"
            />
        </>
    );

    useEffect(() => {
        setFetchingData(true);
        fetchAlert('closed', recordsPerPage, closedPagePosition);
        fetchAlert('open', recordsPerPage, recentPagePosition);

        // getAlerts('closed', recordsPerPage)
        //     .then(results => {
        //         const {data = [], totalPages = 0} = results;
        //         setClosedAlerts(data);
        //         setClosedTotalPages(totalPages);
        //         setClosedCount(data.length);
        //     })
        //     .catch(error => {
        //         console.log("Error fetching alerts: ", error);
        //     });
        // getAlerts('open', recordsPerPage)
        //     .then(results => {
        //         const {data = [], totalPages = 0} = results;
        //         setRecentAlerts(data);
        //         setRecentTotalPages(totalPages);
        //     })
        //     .catch(error => {
        //         console.log("Error fetching alerts: ", error);
        //     })
        //     .finally(_ => setFetchingData(false));
    }, []);

    const fetchAlert = (status, max, page) => {
        getAlerts(status, max, page)
            .then(results => {
                const {data = [], totalPages = 0} = results;
                if (status === 'closed') {
                    setClosedAlerts(data);
                    setClosedTotalPages(totalPages);
                    setClosedCount(data.length);
                    console.log("Page:", page, data);
                } else {
                    setRecentAlerts(data);
                    setRecentTotalPages(totalPages);
                }
            })
            .catch(error => {
                console.log("Error fetching alerts: ", error);
            })
            .finally(_ => {
                status === 'open' && setFetchingData(false);
            });
    };

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
