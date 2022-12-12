import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from '@emotion/native';
import { useTheme } from "emotion-theming";
import CardsIcon from "../../../assets/svg/CardsIcon";
import EmptyState from '../../../assets/svg/emptyState';
import { ButtonContainer } from '../common/Frames/FrameItems/FrameEditItem';
import { ModalText } from '../common/Frames/FrameItems/FrameEditItem';
const PageWrapper = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const PageContent = styled.View`
 align-items: center; 
 justify-content: center;
 padding-bottom: ${({ theme }) => theme.space['--space-72']};
`

const IconWrapper = styled.View`
   margin-bottom: ${({ theme }) => theme.space['--space-40']};
   
`


const MessageWrapper = styled.Text(({ theme }) => ({
    ...theme.font['--text-base-bold'],
    color: theme.colors['--color-gray-600'],
    fontStyle: 'bold',
    marginBottom: 20
}))

const SubMessageWrapper = styled.Text(({ theme }) => ({
    ...theme.font['--text-base-medium'],
    color: theme.colors['--color-gray-500'],
    marginBottom: 30
}))


function EmptyPaymentHistoryContainer({ headerMessage = "No Payments Registered", subMessage = "Register payments made to the supplier here." }) {
    const theme = useTheme();

    return (
        <PageWrapper theme={theme}>

            <PageContent theme={theme}>
                {/*    ICON     */}
                <IconWrapper theme={theme}>
                    <EmptyState />
                </IconWrapper>

                {/*    MESSAGE HEADER  */}
                <MessageWrapper theme={theme}>{headerMessage}</MessageWrapper>

                {/*    SUB MESSAGE  */}
                <SubMessageWrapper theme={theme}>{subMessage}</SubMessageWrapper>

                <ButtonContainer background='--color-blue-700'>
                    <ModalText theme={theme} textColor="--default-shade-white" font="--text-base-bold">Register Payment</ModalText>
                </ButtonContainer>
            </PageContent>
        </PageWrapper>
    );
}

EmptyPaymentHistoryContainer.propTypes = {};
EmptyPaymentHistoryContainer.defaultProps = {};

export default EmptyPaymentHistoryContainer;
