import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styled from '@emotion/native';
import {useTheme} from 'emotion-theming';
import CardsIcon from '../../assets/svg/CardsIcon';

const PageWrapper = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const PageContent = styled.View`
 align-items: center; 
 justify-content: center;
 padding-bottom: ${({theme}) => theme.space['--space-72']};
`

const IconWrapper = styled.View`
   margin-bottom: ${({theme}) => theme.space['--space-40']};
   
`

const MessageWrapper = styled.Text(({theme}) => ({
    ...theme.font['--text-base-bold'],
    color: theme.colors['--color-gray-600'],
    fontStyle: 'bold',
    marginBottom: 40
}));

const SubMessageWrapper = styled.Text(({theme, color = '--color-black'}) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors[color]
}));


function DisabledSectionComponent({headerMessage = 'Nothing Yet.', subMessage = 'Some sections have been disabled. ', navigation}) {
    const theme = useTheme();

    return (
        <PageWrapper theme={theme}>

            <PageContent theme={theme}>
                {/*    ICON     */}
                <IconWrapper theme={theme}>
                    <CardsIcon/>
                </IconWrapper>

                {/*    MESSAGE HEADER  */}
                <MessageWrapper theme={theme}>{headerMessage}</MessageWrapper>

                {/*    SUB MESSAGE  */}
                <SubMessageWrapper theme={theme}>
                    {subMessage}
                    
                    <SubMessageWrapper theme={theme} color="--accent-button" onPress={() => navigation.navigate("Settings")}>
                        Click here to configure
                    </SubMessageWrapper>
                   
                </SubMessageWrapper>

            </PageContent>
        </PageWrapper>
    );
}

DisabledSectionComponent.propTypes = {};
DisabledSectionComponent.defaultProps = {};

export default DisabledSectionComponent;
