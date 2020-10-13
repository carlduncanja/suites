import React, {useState, useEffect} from 'react';
import styled, {css} from '@emotion/native';
import {Text} from 'react-native';
import {useTheme} from 'emotion-theming';
import Page from '../components/common/Page/Page';
import AlertTypeComponent from '../components/Alerts/AlertTypeComponent';
import DataItem from '../components/common/List/DataItem';
import ContentDataItem from '../components/common/List/ContentDataItem';
import IconButton from '../components/common/Buttons/IconButton';
import CollapsedIcon from '../../assets/svg/closeArrow';
import ActionIcon from '../../assets/svg/dropdownIcon';
import DoneAlertsList from '../components/Alerts/DoneAlertsList';
import { getAlerts } from '../api/network';

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
    const [closedPageListMin, setClosedPageListMin] = useState(0);
    const [closedPageListMax, setClosedPageListMax] = useState(recordsPerPage);
    const [closedPagePosition, setClosedPagePosition] = useState(1);

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

    const pageContent = (

        <>
            <AlertTypeComponent
                alertType="Recent"
                header={recentHeader}
                onItemPress={onCollapse('recent')}
                isCollapsed={isCollapsed.includes('recent')}
                content={<Text>Recent</Text>}
            />

            <Space/>

            <AlertTypeComponent
                alertType="Done"
                header={doneHeader}
                onItemPress={onCollapse('done')}
                isCollapsed={isCollapsed.includes('done')}
                currentPage={closedPagePosition}
                totalPages={closedTotalPages}
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
        getAlerts()
            .then(results => {
                const {data = [], pages = 0} = results;
                const closedAlerts = [...data.filter(alert => alert.status === 'closed')];
                const recentAlerts = [...data.filter(alert => alert.status === 'open')];
                setClosedAlerts(closedAlerts);
                setRecentAlerts(recentAlerts);
                setClosedTotalPages(Math.ceil(closedAlerts.length / recordsPerPage));
                setClosedCount(closedAlerts.length);
                // console.log("Alerts: ", data);
            })
            .catch(error => {
                console.log("Error fetching alerts: ", error);
            })
            .finally(_ => setFetchingData(false));
    }, []);

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
