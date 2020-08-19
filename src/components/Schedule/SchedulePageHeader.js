import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import Button from '../common/Buttons/Button';
import MonthSelector from "../Calendar/MonthSelector";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import ScheduleButton from './ScheduleButton';
import { SuitesContext } from "../../contexts/SuitesContext";

const SchedulePageHeaderWrapper = styled.View`
    width: 100%;
    padding-left: ${ ({theme}) => theme.space['--space-32']};
    padding-top: ${ ({theme}) =>theme.space['--space-24']};
    padding-bottom: ${ ({theme}) => theme.space['--space-24']};
    padding-right: ${ ({theme}) =>theme.space['--space-32']};
`;

const ScheduleHeaderContainer = styled.View`
    display : flex;
    width : 100%;
`;

const SchedulePageHeaderContainer = styled.View`
    width : 100%;
    flex-direction: row;
    // height:40px;
    justify-content: space-between;
    // align-self: flex-start;
    // align-items:center;
    margin-bottom:15px;
    margin-top:5px;
`;

const TextView = styled.Text`
    font:${ ({theme}) => theme.font["--text-2xl-medium"]};
    color:${ ({theme}) => theme.colors["--company"]};
    // margin-right:250px;
`;

const ButtonView = styled.View`
    flex-direction:row;
    padding-top:15px;
    padding-bottom:15px;
    // padding:15px;
    borderTopWidth:1px;
    borderTopColor:${ ({theme}) => theme.colors["--color-gray-400"]};
    // background-color: yellow;
    justify-content: space-between;
`;

const GroupButtonContainer = styled.View`
    flex-direction : row;
    justify-content : space-between;
`;
const ExpandButtonWrapper = styled.View`
    height: 24px;
    margin-left:15px;
    width: 128px;
`;

const ExpandButton = styled.View`
    height: 100%;
    weight: 100%;
    background-color: ${ ({theme}) => theme.colors['--default-shade-white']};
    border-color: ${ ({theme}) => theme.colors['--color-gray-400']};
    border-radius: 4px;
    border-width: 1px;
`;


function SchedulePageHeader({
    searchButtonPress = () => { },
    gotoTodayButtonPress = () => { },
    onMonthUpdate = () => { },
    selectedMonth = new Date(),
    onExpand = () => { }
}) {
    const [state] = useContext(SuitesContext);

    const theme = useTheme();

    return (
        <SchedulePageHeaderWrapper theme = {theme}>
            <ScheduleHeaderContainer>

            <SchedulePageHeaderContainer>
                <TextView theme = {theme}>Schedule</TextView>

                <MonthSelector
                    selectedMonth={selectedMonth}
                    onMonthUpdated={onMonthUpdate}
                />
                
            </SchedulePageHeaderContainer>

            
            <ButtonView theme = {theme}>
                {/* <View style={{ marginRight: 340 }}> */}
                    <ScheduleButton
                        title="Search"
                        onButtonPress={searchButtonPress}
                    />
                {/* </View> */}


                <GroupButtonContainer>
                    <ScheduleButton
                        title="Go to Today"
                        onButtonPress={gotoTodayButtonPress}
                    />
                    <ExpandButtonWrapper>
                        <ExpandButton theme = {theme}>
                            <Button
                                title={"Expand Calendar"}
                                buttonPress={onExpand}
                                color={theme.colors['--color-gray-700']}
                            />
                        </ExpandButton>
                    </ExpandButtonWrapper>
                </GroupButtonContainer>
                


            </ButtonView> 

            </ScheduleHeaderContainer>
        </SchedulePageHeaderWrapper>
    )
}

export default SchedulePageHeader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },

    scheduleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    scheduleTop: {
        paddingLeft: 32,
        paddingRight: 32,
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    scheduleCalendar: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    scheduleContent: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        width: '100%',
        padding: 32,
        paddingTop: 24,
    },
    searchContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 5,
    },

    // Shadow
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },

    topContainer: {
        marginLeft: '4%',
        marginRight: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
        marginTop: 18
    },
    partition: {
        backgroundColor: '#CBD5E0',
        borderRadius: 8,
        height: 6,
        width: 70,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 24,

    },
    drawer: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingLeft: 49,
        paddingTop: 32,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    mask: {
        backgroundColor: '#E5E5E5',
    },
    buttonContainer: {
        height: 24,
        width: 91,
        borderColor: '#CCD6E0',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFFFFF"
    }
});
