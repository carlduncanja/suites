import React, {useEffect, useState} from 'react';
import styled, {css} from '@emotion/native';
import PropTypes from 'prop-types';
import SlideHeader from "../SlideOverlay/SlideHeader";
import PageHeader from "../Page/PageHeader";
import {useTheme} from "emotion-theming";
import {Text} from "react-native";
import TabsContainer from "../Tabs/TabsContainerComponent";

const DetailsPageWrapper = styled.View`
        margin:0;
        background-color: ${({theme}) => theme.colors['--default-shade-white']};
    `;

const DetailsPageContainer = styled.View`
        height:100%;
        width:100%;
    `;

const DetailsPageContentWrapper = styled.View`
        flex:1;
        margin : 0px;
        padding-top: ${({theme}) => theme.space['--space-32']};
   
        padding-left: ${({theme}) => theme.space['--space-24']};
        padding-right: ${({theme}) => theme.space['--space-24']};
    `

const DetailsPageContentContainer = styled.View`
        display: flex;
        flex:1;
    `


function DetailsPage({
                         title = "--",
                         subTitle = "",
                         onBackPress = () => {
                         },
                         pageTabs,
                         ...props
                     }) {

    const theme = useTheme();

    useEffect(() => {
        console.log("details page reload");
    }, [])


    return (
        <DetailsPageWrapper>
            <DetailsPageContainer>
                <PageHeader
                    title={title}
                    subTitle={subTitle}
                    onBackPress={() => {
                    }}
                />

                {
                    pageTabs
                }

                <DetailsPageContentWrapper>
                    <DetailsPageContentContainer>
                        {
                            props.children
                        }
                    </DetailsPageContentContainer>
                </DetailsPageContentWrapper>

            </DetailsPageContainer>
        </DetailsPageWrapper>
    );
}

DetailsPage.propTypes = {};
DetailsPage.defaultProps = {};

export default DetailsPage;
