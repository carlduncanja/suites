import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from 'emotion-theming';
import { SwipeListView } from 'react-native-swipe-list-view';
import styled, {css} from '@emotion/native';
import {formatDate, transformToSentence} from '../../utils/formatter';

import ListItem from '../common/List/ListItem';
import DataItem from '../common/List/DataItem';
import ResolveIcon from '../../../assets/svg/resolveIcon';

const RenderListItemWrapper = styled.View`
    width: 100%;
    height: 58px;
    margin-bottom : ${ ({ theme }) => theme.space['--space-12']};
`;
const RenderListItemContainer = styled.View`
    height: 100%;
    width: 100%; 
    flex-direction: row;
    background-color: ${ ({ theme }) => theme.colors['--default-shade-white']};
    border : 1px solid ${ ({ theme }) => theme.colors['--color-gray-400']};
    padding: ${ ({theme}) => `${theme.space['--space-10']} ${theme.space['--space-12']}`};
    border-radius: 8px;
`;

const ListItemContainer = styled.View`
    flex: 1;
    flex-direction: column;
`;
const ItemWrapper = styled.View`
    flex:1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* padding-bottom: 2px; */
`;

const RenderHiddenItemWrapper = styled.View`
    width: 100%;
    height: 58px;
`;
const RenderHiddenItemContainer = styled.View`
    flex: 1; 
    /* align-items: center; */
    justify-content: flex-end;
    background-color: ${ ({ theme }) => theme.colors['--color-blue-700']};
    flex-direction: row;
    /* padding-right: 20px; */
    border-radius: 8px;
`;

const HiddentAction = styled.TouchableOpacity`
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const TextItem = styled.Text(({theme, flex = 1, color = '--color-gray-800', font = '--text-base-regular'}) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 2,
    flex
}));

function RecentAlertsList({ data=[] }) {
    const theme = useTheme();

    const listItem = item => {
        const { body = '', priority = '', createdOn = '', title = ''} = item;
        return (

            <ListItemContainer>
                <ItemWrapper>
                    <TextItem
                        color="--color-gray-800"
                        fontStyle="--text-base-medium"
                        flex={5}
                    >
                        {body}
                        {
                            title !== 'System' &&
                            <TextItem color="--color-blue-600">{` ${title}`}</TextItem>
                        }
                    </TextItem>
                    <TextItem
                        color="--color-red-500"
                        fontStyle="--text-sm-medium"
                        flex={0.5}
                    >
                        {transformToSentence(priority)}
                    </TextItem>

                </ItemWrapper>
                <TextItem
                    color="--color-gray-500"
                    fontStyle="--actions-title"
                    flex={1}
                >
                    {formatDate(createdOn, 'MMM DD, YYYY - HH:MMA')}
                </TextItem>

            </ListItemContainer>
        
        );
    };

    const renderItem = item => (
        <RenderListItemWrapper theme={theme}>
            <RenderListItemContainer theme={theme}>
                {listItem(item?.item)}
            </RenderListItemContainer>
        </RenderListItemWrapper>
    );
    const renderHiddenItem = () => (

        <RenderHiddenItemWrapper theme={theme}>
            <RenderHiddenItemContainer theme={theme}>
                
                <TouchableOpacity
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 100,
                        paddingTop: 12,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <ResolveIcon/>
                    <TextItem
                        style={css`padding-top: 6px;`}
                        color="--color-gray-200"
                        font="--actions-title"
                    >
                        RESOLVE
                    </TextItem>

                </TouchableOpacity>
                
            </RenderHiddenItemContainer>
        </RenderHiddenItemWrapper>

        // <View style={{
            
        //     alignItems: 'center',
        //     justifyContent:'flex-end',
        //     backgroundColor: 'red',
        //     height: 100,
        //     flexDirection: 'row',
        //     // marginBottom:12,
        //     // paddingRight:20,
        //     // borderRadius: 8,
        // }}>
        //     <TouchableOpacity>
        //         <Text>Resolve</Text>
        //     </TouchableOpacity>
        // </View>
    );

    return (
        <SwipeListView
            data={data}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={0}
            disableRightSwipe={true}
            rightOpenValue={-100}
            previewOpenValue={-40}
            previewOpenDelay={2000}
        />
    );
}

RecentAlertsList.propTypes = {};
RecentAlertsList.defaultProps = {};

export default RecentAlertsList;
