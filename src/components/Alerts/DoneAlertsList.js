import React from 'react';
import {Text} from 'react-native';
import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';
import ListData from '../common/List/ListData';
import Data from '../common/Table/Data';
import Item from '../common/Table/Item';
import DataItem from '../common/List/DataItem';
import { formatDate } from '../../utils/formatter';

const testData = [
    {
        owner: 'O.Grant',
        date: new Date(),
        description: 'Changes made to Julie Brown’s Charge Sheet'
    },
    {
        owner: 'O.Grant',
        date: new Date(),
        description: 'Changes made to Julie Brown’s Charge Sheet'
    },
    {
        owner: 'System',
        date: new Date(),
        description: 'There was a clash setting up a new procedure'
    },
    {
        owner: 'System',
        date: new Date(),
        description: 'There was a clash setting up a new procedure'
    },
];

const ItemWrapper = styled.View`
    flex: 1;
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: ${ ({theme}) => theme.colors['--color-gray-500']};
    padding-bottom: ${ ({theme}) => theme.space['--space-12']};
`;

const TextItem = styled.Text(({theme, color = '--color-gray-800', font = '--text-base-regular'}) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 2
}));

function DoneAlertsList({data = []}) {
    const theme = useTheme();

    const listItem = ({ title, closedOn, body, owner, date, description}) => (
        <ItemWrapper>
            <TextItem>
                <TextItem font={title === 'System' && '--text-base-bold'} color={title !== 'System' && '--color-blue-600'}>{title}</TextItem>
                {` ${formatDate(closedOn, 'DD/MM/YYYY')} `}
                -
                {` ${body}`}
            </TextItem>
        </ItemWrapper>
    );

    const renderItem = item => (
        <Item
            hasCheckBox={false}
            isDisabled={true}
            itemView={listItem(item)}
        />
    );

    return (
        <Data
            data={data}
            listItemFormat={renderItem}
        />
    );
}

export default DoneAlertsList;
