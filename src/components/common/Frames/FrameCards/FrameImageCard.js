import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import FrameTitle from '../FrameTitle'
import FrameContentImage from '../FrameContents/FrameContentImage';
import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';

function FrameImageCard({
                            frameColor,
                            frameBorderColor,
                            titleBackgroundColor,
                            icon = () => {
                            },
                            frameTitle = "",
                            cardInformation

                        }) {

    const theme = useTheme();

    const FrameImageCardWrapper = styled.View`
        width: 100%;
        margin-bottom : ${theme.space['--space-24']};
    `;
    const FrameImageCardContainer = styled.View`
        width: 100%;
    `;

    return (
        <FrameImageCardWrapper>
            <FrameImageCardContainer>
                <FrameTitle
                    color={frameColor}
                    borderColor={frameBorderColor}
                    backgroundColor={titleBackgroundColor}
                    icon={icon}
                    frameTitle={frameTitle}
                />

                {/* <ScrollView style={styles.content} bounces={false}> */}
                <FrameContentImage cardInformation={cardInformation}/>
                {/* </ScrollView> */}
            </FrameImageCardContainer>

        </FrameImageCardWrapper>
    )

}

export default FrameImageCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFB',
        borderBottomWidth: 1,
        borderColor: '#CCD6E0',
        borderTopWidth: 0,
    },
    title: {
        width: '100%'
    },
    content: {
        width: '100%',
        height: 250
    }
})
