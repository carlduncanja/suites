import React, { Component, useState, useEffect, useContext } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import Paginator from './Paginator';
import { SuitesContext } from '../../../contexts/SuitesContext';
import MultipleShadowsContainer from '../MultipleShadowContainer';
import FloatingActionButton from '../../common/FloatingAction/FloatingActionButton';

import SvgIcon from '../../../../assets/SvgIcon';

const FooterWrapper = styled.View`
  /* display: flex; */
  /* flex-direction: row; */
  /* justify-content: center; */
  /* align-items: center; */
  position:absolute;
  width:100%;
  /* height: 48px; */
  bottom: 20;
  /* padding-left:40px; */
`;

const FooterContainer = styled.View`
    display: flex;
    flex:1;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    /* padding-left: 100px; */
`;

const PaginatorContainer = styled.View`
    display: flex;
  /* padding: 10px 0; */
  /* min-width: 279px; */
  /* width:279px; */
  /* padding:10px 12px; */
    background-color:${({ theme }) => theme.colors['--default-shade-white']};
  /* box-shadow:${({ theme }) => theme.shadow['--shadow-lg']}; */
    border-radius:32px;
    margin-right: 84px;
`;



const PaginatorView = styled.View`
  flex-direction:row;
  align-items:center;
  justify-content:center;
`;

const NumberContainer = styled.View`
  background-color:${({ theme }) => theme.colors['--color-neutral-gray-100']};
  border:1px solid ${({ theme }) => theme.colors['--color-gray-400']};
  border-radius:4px;
  /* padding:6px 12px; */
  margin: 10px 0;
  width: 240px;
  height:35px;
  align-items:center;
  justify-content: center;

`;

const ArrowContainer = styled.TouchableOpacity`
    /* background-color: yellow; */
    padding: 18px 16px;
`;

const DateText = styled.Text(({theme}) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-ui-charcoal'],
    paddingTop: 2,
}));

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

const SchedulePaginator = ({
    date = new Date(),
    goToNextDay,
    goToPreviousDay,
    toggleActionButton = () => { },
    updatePhysician
}) => {
    const [state] = useContext(SuitesContext);
    const theme = useTheme();

    return (
        <FooterWrapper>
            <FooterContainer>

                <MultipleShadowsContainer shadows={shadows}>
                    <PaginatorContainer theme={theme}>
                        <PaginatorView>
                            <ArrowContainer onPress={goToPreviousDay}>
                                <SvgIcon iconName="paginationPrev" strokeColor="#104587" />
                            </ArrowContainer>

                            <NumberContainer>
                                <DateText>{date}</DateText>
                            </NumberContainer>

                            <ArrowContainer onPress={goToNextDay}>
                                <SvgIcon iconName="paginationNext" strokeColor="#104587" />
                            </ArrowContainer>
                        </PaginatorView>
                    </PaginatorContainer>
                </MultipleShadowsContainer>
                 
              { updatePhysician &&  <FloatingActionButton
                
                    isDisabled={false}
                    hasActions={true}
                    toggleActionButton={toggleActionButton}
                /> 
                }
            </FooterContainer> 
        </FooterWrapper>
               
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        position: 'absolute',
        justifyContent: 'flex-end',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 32,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    paginator: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    numbersContainer: {
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#CCD6E0',
        borderRadius: 4,
        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 2,
        paddingTop: 5,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
    },
    numbers: {
        fontSize: 19,
        color: '#313539',
    },
});

export default SchedulePaginator;
