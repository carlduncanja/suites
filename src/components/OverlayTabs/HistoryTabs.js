import styled from '@emotion/native';
import { useTheme } from 'emotion-theming';
import React from 'react';
import { ScrollView } from 'react-native';
import { formatDate } from '../../utils/formatter';
import DataItem from '../common/List/DataItem';
import Footer from '../common/Page/Footer';
import Table from '../common/Table/Table';

const headers = [
    {
        name: 'Procedure',
        alignment: 'flex-start',
        flex:2,
    },
    {
        name: 'Recovery',
        alignment: 'flex-start',
        flex:1,
    },
    {
        name: 'Duration',
        alignment: 'flex-start',
        flex:1,
    },
    {
        name: 'Date',
        alignment: 'flex-start',
        flex:1
    }, 
];

const ItemWrapper = styled.View`
    flex-direction : row;
    height : 28px;
    border-bottom-color : ${ ({theme}) => theme.colors['--color-gray-300']};
    border-bottom-width : 1px;
    border-bottom-style : solid;
    margin-bottom: ${ ({theme}) => theme.space['--space-12']};
`

const HistoryTabs = ({ cases = testData, selectedItems = [], onSelectAll = () => {} }) => {

    const theme = useTheme();

    const listItem = ({name, isRecovery, duration, date}) => {
        let recoveryColor = isRecovery ? '--color-green-600' : '--color-orange-500';
     
        return (
            <ItemWrapper theme={theme}>
                <DataItem flex={2} color="--color-blue-600" text={name} fontStyle="--text-base-medium"/>
                <DataItem align="center" color={recoveryColor} text={isRecovery ? 'Yes' : 'No'} fontStyle="--text-base-medium"/>
                <DataItem align="center" color="--color-gray-800" text={`${parseInt(duration)} hrs`} fontStyle="--text-base-regular"/>
                <DataItem align="flex-end" color="--color-gray-800" text={formatDate(date, 'MM/DD/YYYY')} fontStyle="--text-base-regular"/>
            </ItemWrapper>
        )
    }

    return (
        <>
            <ScrollView>
                <Table
                    isCheckbox={false}
                    data={cases}
                    listItemFormat={listItem}
                    headers={headers}
                    toggleHeaderCheckbox={onSelectAll}
                    itemSelected={selectedItems}
                />
            </ScrollView>

            <Footer
                hasPaginator={false}
                hasActions={false}
            />
        </>
    );
};

export default HistoryTabs;


