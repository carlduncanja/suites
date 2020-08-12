import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import IconButton from "../common/Buttons/IconButton";

const CaseFileOverlayMenuWrapper = styled.View`
        flex:1;
        display:flex;
        margin-right: ${({theme}) => theme.space['--space-8']};
    `;

const CaseFileOverlayMenuContainer = styled.View`
        height: 100%;
        width: 100%;
        flex-direction : row;
        background-color: ${({theme}) => theme.colors['--default-shade-white']};
        border-radius: 32px;
        padding-left: ${({theme}) => theme.space['--space-14']};
        padding-right: ${({theme}) => theme.space['--space-14']};
        filter : ${({theme}) => theme.shadow['--drop-shadow-md']};
        box-shadow : 0px 2px 4px rgba(0, 0, 0, 0.08);
        align-items: center;
    `;

const IconGroupWrapper = styled.View`
        height: 100%;
    `;

const IconGroupContainer = styled.View`
        height: 100%;
        flex-direction: row;
        align-items: center;
    `;

const IconWrapper = styled.View`
        margin-right: ${({theme}) => theme.space['--space-12']};
    `;

const IconContainer = styled.View`
        height: 100%;
        display: flex;
       
    `;

const Divider = styled.View`
        height: 24px;
        width : 1px;
        background-color: ${({theme}) => theme.colors['--color-gray-400']};
        border-radius: 8px;
    `;

const TextContainer = styled.View`
        margin-left: 20px;
    `;

const SelectedIconText = styled.Text(({theme}) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-800'],
    marginLeft: 20
}))


const CaseFileOverlayMenu = ({selectedMenuItem, overlayMenu, handleTabPress}) => {

    // const [currentTabName, setCurrentTabName] = useState(selectedMenuItem) ;
    const theme = useTheme();


    return (
        <CaseFileOverlayMenuWrapper theme={theme}>
            <CaseFileOverlayMenuContainer theme={theme}>

                <IconGroupWrapper theme={theme}>
                    <IconGroupContainer theme={theme}>
                        {
                            overlayMenu.map((item, index) => {
                                const {selectedIcon, disabledIcon, name} = item || {};
                                const icon = selectedMenuItem === name ? selectedIcon : disabledIcon;

                                return (
                                    <IconWrapper theme={theme}>
                                        <IconContainer theme={theme}>
                                            <IconButton
                                                Icon={icon}
                                                onPress={() => {
                                                    handleTabPress(name)
                                                }}
                                            />
                                        </IconContainer>
                                    </IconWrapper>
                                )
                            })
                        }

                        <Divider/>

                    </IconGroupContainer>
                </IconGroupWrapper>

                <SelectedIconText theme={theme}>{selectedMenuItem}</SelectedIconText>

            </CaseFileOverlayMenuContainer>
        </CaseFileOverlayMenuWrapper>


    )
}

CaseFileOverlayMenu.propTypes = {};
CaseFileOverlayMenu.defaultProps = {};

export default CaseFileOverlayMenu

const styles = StyleSheet.create({
    menuBar: {
        flexDirection: "row",
        backgroundColor: '#FFFFFF',
        borderRadius: 32,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignSelf: "flex-end",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginRight: 10,
    },
    iconContainer: {
        flexDirection: "row",
        borderRightWidth: 1,
        borderRightColor: "#CCD6E0"
    },
    icon: {
        paddingRight: 20,
    },
    selectedIconContainer: {
        paddingLeft: 15,
        justifyContent: "center",
        marginRight: '10%'
    },
    selectedText: {
        fontSize: 16,
        color: '#323843'
    },
})
