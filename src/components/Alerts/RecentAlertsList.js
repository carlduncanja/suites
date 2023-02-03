import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from 'emotion-theming';
import { SwipeListView } from 'react-native-swipe-list-view';
import styled, { css } from '@emotion/native';
import { useModal } from 'react-native-modalfy';
import { closeAlert } from '../../api/network';
import { formatDate, transformToSentence } from '../../utils/formatter';

import ListItem from '../common/List/ListItem';
import DataItem from '../common/List/DataItem';
import ResolveIcon from '../../../assets/svg/resolveIcon';
import ConfirmationComponent from '../ConfirmationComponent';

const RenderListItemWrapper = styled.View`
    width: 100%;
    height: 96px;
    margin-bottom : ${({ theme }) => theme.space['--space-12']};
`;
const RenderListItemContainer = styled.View`
    height: 100%;
    width: 100%; 
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors['--default-shade-white']};
    border : 1px solid ${({ theme }) => theme.colors['--color-gray-400']};
    padding: ${({ theme }) => `${theme.space['--space-10']} ${theme.space['--space-12']}`};
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
    height: 96px;
`;
const RenderHiddenItemContainer = styled.View`
    flex: 1; 
    align-items: center; 
    justify-content: flex-end;
    background-color: ${({ theme }) => theme.colors['--color-blue-700']};
    flex-direction: row;
    /* padding-right: 20px; */
    border-radius: 8px;
`;
const TitleSection = styled.View`
flex-direction: row;
flex: 0.4;  
justify-content: flex-start;
`;

const HiddentAction = styled.TouchableOpacity`
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;
const Holder = styled.View`
   background-color:#F0FFF4;
   border-radius: 10;
   heigth:18;
   width:48;
`

const TextItem = styled.Text(({ theme, flex = 1, color = '--color-gray-800', font = '--text-base-regular' }) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 2,
    flex
}));

const TittleContianer = styled.View` 
    flex-direction: row;
    justify-content: space-between;
`

function RecentAlertsList({ data = [], updateAlerts = () => { } }) {
    const theme = useTheme();
    const modal = useModal();

    const onResolveItem = alertItem => {
        console.log('Alert: ', alertItem);
        const { _id } = alertItem;
        closeAlert(_id)
            .then(_ => {
                // show modal success then update
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                                updateAlerts();
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
    };
    const backgroundColorGenerator = (priority)=>{
        let colorGenerator =''
        switch(priority){
            case 'high':
                colorGenerator='#FFF5F5'
                break; 
            case 'critical':
                colorGenerator="#FFF5F5"
                break;
            case 'low':
                colorGenerator="#EBF8FF"
                break;
            case 'medium':
                colorGenerator="#FFFAF0"
                break; 
            case 'new' :
                colorGenerator="#F0FFF4"
                break;
            default:
                break;
        } 
        return colorGenerator
    } 

    const textColorGenerator = (priority)=>{
        let colorGenerator =''
        switch(priority){
            case 'high':
                colorGenerator='--color-red-500'
                break; 
            case 'critical':
                colorGenerator="--color-red-800"
                break;
            case 'low':
                colorGenerator="--color-blue-500"
                break;
            case 'medium':
                colorGenerator="--color-orange-500"
                break; 
            case 'new' :
                colorGenerator="--color-green-500"
                break;
            default:
                break;
        } 
        return colorGenerator
    }
    const listItem = item => {
        const { body = '', priority = '', createdOn = '', title = '', updatedAt = '' } = item; 
        let background=backgroundColorGenerator(priority)
        let text=textColorGenerator(priority)
        return (

            <ListItemContainer>
                <TittleContianer>
                    <TitleSection>
                        <TextItem color="--color-gray-800" flex={1}>{` ${title}`}</TextItem>
                        <View style={[styles.holder,{backgroundColor:background}]}>
                            <TextItem
                                color={text}
                                fontStyle="--text-sm-medium"
                            flex={1}
                            >
                                {transformToSentence(priority)}
                            </TextItem>
                        </View>
                    </TitleSection> 

                    <TextItem
                        color="--color-gray-500"
                        //fontStyle="--actions-title"
                        flex={0.3}
                    >  {createdOn === '' ?
                        formatDate(updatedAt, 'MMMM DD, YYYY')
                        :
                        formatDate(createdOn, 'MMMM DD, YYYY')
                            //formatDate(updatedAt, 'MMM DD, YYYY - HH:MMA')
                        }
                    </TextItem>
                </TittleContianer>
                <ItemWrapper>
                    <TextItem
                        color="--color-gray-800"
                        fontStyle="--text-base-medium"
                        flex={8}
                    >
                        {body}
                    </TextItem>


                </ItemWrapper>


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
    const renderHiddenItem = item => (

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
                        alignContent: 'center'
                    }}
                    onPress={() => onResolveItem(item?.item)}
                >
                    <ResolveIcon />
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


const styles = StyleSheet.create({
    holder: {
        borderRadius: 10,
        heigth: 18,
        width: 48,
        justifyContent:'center',
        textAlign: 'center',
        alignItems:'center'

    }
})

RecentAlertsList.propTypes = {};
RecentAlertsList.defaultProps = {};

export default RecentAlertsList;
