import React,{ useState } from 'react';
import {View, Text, StyleSheet} from "react-native";
import RoundedPaginator from "../Paginators/RoundedPaginator";
import FloatingActionButton from "../FloatingAction/FloatingActionButton";

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const FooterWrapper = styled.View`
    width: 100%;
    position : absolute;
    bottom : 20; 
    right: 20; 
`;
const FooterContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-self: flex-end;
`;

function Footer({
        totalPages = 0,
        currentPage = 0,
        goToNextPage = ()=>{},
        goToPreviousPage = () => {},
        toggleActionButton = () => {},
        isDisabled = false,
        hasPaginator = true,
        hasActionButton = true,
        hasActions = true,
        isNextDisabled = false,
        isPreviousDisabled = false,
    }){
        const theme = useTheme();

        
    return (
        <FooterWrapper>
            <FooterContainer>
                {
                    hasPaginator && 
                        <RoundedPaginator
                            totalPages={totalPages}
                            currentPage={currentPage}
                            goToNextPage={goToNextPage}
                            goToPreviousPage={goToPreviousPage}
                            isNextDisabled = {isNextDisabled}
                            isPreviousDisabled = {isPreviousDisabled}
                        />
                }
                {
                    hasActionButton &&                
                        <FloatingActionButton
                            isDisabled={isDisabled}
                            toggleActionButton={toggleActionButton}
                            hasActions = {hasActions}
                        />
                }
                
            </FooterContainer>
        </FooterWrapper>
        

    )
}

export default Footer

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
        right: 0,
        marginRight: 30,
    },
});

