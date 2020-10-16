import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, FlatList, ActivityIndicator} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import DropDownIcon from "../../../../assets/svg/dropDown";
import { useTheme } from 'emotion-theming';
import styled, { css } from '@emotion/native';
import InputContainerComponent from '../InputContainerComponent';
import InputLabelComponent from '../InputLablel';
import InputErrorComponent from '../InputErrorComponent';
import MultipleShadowsContainer from '../MultipleShadowContainer';

const TextInputWrapper = styled.View`
    flex:1;
    
`;
const TextInputContainer = styled.View`
    height : 100%;
    width : 100%;
    min-height: 32px;
    border-width: 1px;
    padding-left : ${ ({theme}) => theme.space['--space-10'] };
    padding-right : ${ ({theme}) => theme.space['--space-10'] };
    
    border-color: ${ ({theme}) => theme.colors['--color-gray-300']};
    background-color : ${ ({theme}) => theme.colors['--default-shade-white']};
    border-radius: 4px;
`;
const SelectedValue = styled.Text( ({theme}) => ({
    ...theme.font['--text-sm-regular'],
    color : theme.colors['--color-gray-900'],
}));

const Input = styled.TouchableOpacity`
    height: 100%;
    width : 100%;
    flex-direction : row;
    align-items : center;
    justify-content : space-between;
`;

const ListView = styled.View`
    flex: 1;
    background-color: ${ ({theme}) => theme.colors['--default-shade-white']};;
    border-radius: 8px;
    padding: ${ ({theme}) => theme.space['--space-16']};
`;

const PositionView = styled.View`
    display: flex;
    position: absolute;
    top : 34;
    right: 0;
    left: -50;
    width: 292px;
    z-index:1;
`;

const OptionItem = styled.TouchableOpacity`
    width: 59px;
    height: 32px;
    align-items: center;
    justify-content: center;
    margin-bottom: ${ ({theme}) => theme.space['--space-4']};
    margin-right: ${ ({theme}) => theme.space['--space-8']};
`;

const Option = styled.Text(({theme, color = '--color-gray-800', font = '--text-base-regular'}) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 2
}));

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.06,
        shadowRadius: 4
    },
    {
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 6
    },
];

function ListOptionsField({data = [], onOptionSelected, selectedOption, text, isInfiniteScroll= false, fetchMoreData}) {
    const theme = useTheme();

    const [isDisplay, setIsDispay] = useState(false);
    const [refreshing, setIsRefreshing] = useState(false);

    const onEndReached = () => {
        if (isInfiniteScroll && !refreshing) {
            console.log("Fetch");
            fetchMoreData();
        }
    };

    const renderFooter = () => {
        if (isInfiniteScroll && refreshing) {
            return <ActivityIndicator size="small"/>;
        }
    };

    return (

        <InputContainerComponent>

            <TextInputWrapper>
                <TextInputContainer theme={theme} >

                    <Input
                        onPress={() => setIsDispay(!isDisplay)}
                    >
                        <SelectedValue>{text}</SelectedValue>
                        <DropDownIcon/>
                    </Input>

                </TextInputContainer>
            </TextInputWrapper>

            {
                isDisplay &&
                
                    <PositionView>
                        <MultipleShadowsContainer shadows={shadows}>
                            <ListView theme={theme}>
                                <FlatList
                                    data={data}
                                    renderItem={({item}) => (
                                        <OptionItem theme={theme} onPress={() => onOptionSelected(item)}>
                                            <Option
                                                theme={theme}
                                                font={selectedOption === item ? '--text-base-bold' : '--text-base-regular'}
                                                color={selectedOption === item ? '--color-blue-600' : '--color-gray-800'}
                                            >
                                                {item.text}
                                            </Option>
                                        </OptionItem>
                                    )}
                                    //Setting the number of column
                                    numColumns={4}
                                    keyExtractor={(item, index) => index}
                                    onEndReached={onEndReached}
                                    // ListFooterComponent={renderFooter}
                                    // refreshing={refreshing}
                                />
                            </ListView>
                        </MultipleShadowsContainer>
                    </PositionView>
                
            }

            {/*
            <Menu disabled={!!enabled} onSelect={oneOptionsSelected} >
                <MenuTrigger disabled={!enabled}>

                    <TextInputWrapper>
                        <TextInputContainer theme = {theme} hasError = {hasError} enabled = {enabled}>

                            <Input>
                                <SelectedValue>{text}</SelectedValue>
                                <DropDownIcon/>
                            </Input>

                        </TextInputContainer>
                    </TextInputWrapper>

                </MenuTrigger>
                {
                    menuOption
                }
            </Menu>  */}

        </InputContainerComponent>
    );
}

ListOptionsField.propTypes = {};
ListOptionsField.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
    inputWrapper: {
        alignItems: 'center',
    },
    inputField: {
        // flex: 1,
        // width: '100%',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#E3E8EF',
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        height: 32,
    },
    errorView: {
        position:'absolute',
        top:32,
        paddingTop: 3,
        paddingLeft: 15

    }
});

export default ListOptionsField;
