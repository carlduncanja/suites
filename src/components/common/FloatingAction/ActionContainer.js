import React, {Component, useContext, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, FlatList} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Action from './Action'
import { SuitesContext } from '../../../contexts/SuitesContext';
import { CaseFileContext } from '../../../contexts/CaseFileContext'; 
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import MultipleShadowsContainer from '../MultipleShadowContainer';

const ActionWrapper = styled.View`
    width : 223px;
`;

const ActionComponentContainer = styled.View`
    display : flex;
    border-radius : 8px;
    background-color : ${ ({theme}) => theme.colors['--default-shade-white']};
    padding : ${ ({theme}) => `${theme.space['--space-8']} ${theme.space['--space-12']}` };
`;

const ActionTitle = styled.Text( ({theme}) =>({
    ...theme.font['--actions-title'],
    color : theme.colors['--color-gray-500'],

}));

const ActionsContainer =  styled.View`
    display : flex;
    flex-direction : column;
    justify-content: space-between;
    margin-top : ${ ({theme}) => theme.space['--space-12']};
    margin-bottom : ${ ({theme}) => theme.space['--space-10']};
`;

const Separator = styled.View`
    background-color : ${ ({theme}) => theme.colors['--color-gray-300']};
    border-radius : 2px;
    height : 1px;
    margin-top : ${ ({theme}) => theme.space['--space-10']};
    margin-bottom : ${ ({theme}) => theme.space['--space-10']};
`

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 15
      },
      {
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 6
      },
]

const ActionContainer = ({title, floatingActions}) => {

    const theme = useTheme();

    const separator = () => {
        return (
            <Separator theme = {theme}/>
        )
    };

    return (
        <MultipleShadowsContainer shadows = {shadows}>
                <ActionWrapper theme = {theme}>
                    <ActionComponentContainer>

                        <ActionTitle theme = {theme}>{title}</ActionTitle>
                        <ActionsContainer theme = {theme}>
                            <FlatList
                                data={floatingActions}
                                renderItem={({item}) => item}
                                keyExtractor={(item, index) => ""+index}
                                ItemSeparatorComponent={separator}
                            />
                        </ActionsContainer>


                    </ActionComponentContainer>
                </ActionWrapper>
        </MultipleShadowsContainer>
        
        // <View style={styles.container}>
        //     <View style={styles.actionTitleContainer}>
        //         <Text style={styles.title}>{title}</Text>
        //     </View>

        //     <View style={styles.actionsContainer}>
        //         <FlatList
        //             data={floatingActions}
        //             renderItem={({item}) => item}
        //             keyExtractor={(item, index) => ""+index}
        //             ItemSeparatorComponent={separator}
        //         />
        //     </View>
        // </View>
    );
};

export default ActionContainer;

const styles = StyleSheet.create({
    container: {
        //flex:1,
        backgroundColor: '#FFFFFF',
        width: 218,
        //height: 70,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 8,
        //alignSelf:'flex-end'
    },
    actionTitleContainer: {
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 10,
        color: '#A0AEC0',
        //fontFamily: 'Metropolis',
    },
    actionsContainer: {
        //flex:1,
        justifyContent: 'space-between',
        marginTop: 12,
        marginBottom: 10,
        flexDirection: 'column',
    }
});
