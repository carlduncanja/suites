import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import Button from '../common/Buttons/Button';
import MonthSelector from "../Calendar/MonthSelector";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import ScheduleButton from './ScheduleButton';
import { SuitesContext } from "../../contexts/SuitesContext";
import FilterIcon from "../../../assets/svg/filterIcon";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';

const SchedulePageHeaderWrapper = styled.View`
    width: 100%;
    padding-left: ${ ({ theme }) => theme.space['--space-32']};
    padding-top: ${ ({ theme }) => theme.space['--space-24']};
    padding-bottom: ${ ({ theme }) => theme.space['--space-24']};
    padding-right: ${ ({ theme }) => theme.space['--space-32']};
    z-index:10;
`;

const ScheduleHeaderContainer = styled.View`
    display : flex;
    width : 100%;
`;

const SchedulePageHeaderContainer = styled.View`
    width : 102%;
    flex-direction: row;
    height:40px;
    justify-content: space-between;
    align-self: flex-start;
    align-items:center;
    margin-bottom:${({ theme }) => theme.space["--space-16"]};
    margin-top:${({ theme }) => theme.space["--space-6"]};
`;

const TextView = styled.Text`
    font:${ ({ theme }) => theme.font["--text-2xl-medium"]};
    color:${ ({ theme }) => theme.colors["--company"]};
`;

const ButtonView = styled.View`
    flex-direction:row;
    padding-top:15px;
    padding-bottom:15px;
    padding:15px;
    border-top-width:1px;
    border-top-color:${ ({ theme }) => theme.colors["--color-gray-400"]};
    /* background-color: yellow; */
    justify-content: space-between;
`;

const GroupButtonContainer = styled.View`
    flex-direction : row;
    justify-content : space-between;
`;
const ExpandButtonWrapper = styled.View`
    height: 24px;
    margin-left:${({ theme }) => theme.space["--space-10"]};
    margin-right:${({ theme }) => theme.space["--space-10"]};
    width: 140px;
   
  
`;

const ExpandButton = styled.View`
    height: 100%;
    width: 100%;
    background-color: ${ ({ theme, Expanded }) => Expanded ? theme.colors["--accent-button"] : theme.colors['--default-shade-white']};
    border-color: ${ ({ theme }) => theme.colors['--color-gray-400']};
    border-radius: 4px;
    border-width: 1px;
`;

const PopUp = styled.View`
    width:185px;
    align-self:center;
    align-items:flex-start;
    position:absolute;
    padding:12px 8px;
    top:30px;
    left:100px;
    height:185px;
    background-color:${({ theme }) => theme.colors["--default-shade-white"]};
    z-index:10;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius:3.6px;

`

const PopupContainer = styled.View`
    align-items:center;
    flex-direction:row;
    margin:${({ theme }) => theme.space["--space-2"]};

`

const RadioContainer = styled.View`
    background-color:${({ checkedButton, name, theme }) => checkedButton === name ? theme.colors["--color-blue-600"] : "white"};
    border-color:${({ theme }) => theme.colors["--color-neutral-gray-300"]};
    border-width:2px;
    width:15px;
    height:15px;
    border-radius:7.5px;
    margin-right:${({ theme }) => theme.space["--space-10"]};

`;

const OptionContainer = styled.TouchableOpacity`
    background-color:${({ item }) => item.color};
    border-radius:4.6px;
    height:25px;
    margin:${({ theme }) => theme.space["--space-2"]};
    align-items:center;
    justify-content:center;
    padding:2px 6px;
`;

const OptionText = styled.Text`
    color:${({ theme }) => theme.colors["--default-shade-white"]};
    font:${({ theme }) => theme.font["--text-sm-regular"]};
`;

const FilterContainer = styled.TouchableOpacity`
    height : 24px;
    width : 24px;
    align-items : center;
    justify-content : center;
    border : ${ ({theme, borderColor}) => `1px solid ${theme.colors[borderColor]}`};
    border-radius : 4px;
    background-color : ${ ({theme, backgroundColor}) => theme.colors[backgroundColor]};
    position : relative;
`;

const FilterIndicator = styled.View`
    height : 8px;
    width : 8px;
    position : absolute;
    background-color : ${(backgroundColor)=>backgroundColor};
    box-shadow : ${ ({shadowColor}) => `0px 1px 4px ${shadowColor}`};
    border-radius : 8px;
    top : -4;
    right : -2;
`;


function SchedulePageHeader({
    Expanded = false,
    showDropDown = false,
    showFilterMenu = () => { },
    checkedRadioButton = "",
    onradioClick = () => { },
    searchButtonPress = () => { },
    gotoTodayButtonPress = () => { },
    onMonthUpdate = () => { },
    selectedMonth = new Date(),
    onExpand = () => { }
}) {
    const theme = useTheme();

    const optionList = [
        {
            name: "Delivery",
            color: theme.colors["--color-green-600"],
            shadowColor : 'rgba(56, 161, 105, 0.45)'
        },
        {
            name: "Inventory Re-Stock",
            color: theme.colors["--color-yellow-600"],
            shadowColor : 'rgba(214, 158, 46, 0.45)'
        },
        {
            name: "Inventory Audit",
            color: theme.colors["--color-pink-600"],
            shadowColor : 'rgba(213, 63, 140, 0.45)'

        },
        {
            name: "Equipment",
            color: theme.colors["--color-blue-600"],
            shadowColor : 'rgba(249, 130, 206,  0.45)'
        },
        {
            name: "Procedure",
            color: theme.colors["--color-red-700"],
            shadowColor : 'rgba(245, 101, 101, 0.45)'
        }

    ]

    const [state] = useContext(SuitesContext);

    const renderDropDown = () => {
        console.log(checkedRadioButton)

        const options = [...optionList];
        return (

            <PopUp theme={theme}>

                {options.map((item, index) => {
                    return (<PopupContainer>
                        <RadioContainer key={index} theme={theme} checkedButton={checkedRadioButton} name={item.name}>
                            <RadioButton
                                value={item.name}
                                status={checkedRadioButton === item.name ? 'checked' : 'unchecked'}
                                onPress={() => onradioClick(item.name)}
                                color="blue"
                            />

                        </RadioContainer>
                        <OptionContainer item={item} onPress={() => onradioClick(item.name)}>
                            <OptionText theme={theme}>{item.name}</OptionText>
                        </OptionContainer>
                    </PopupContainer>




                    )

                })}</PopUp>

        )
    }

    return (
        <SchedulePageHeaderWrapper theme={theme}>
            <ScheduleHeaderContainer>

                <SchedulePageHeaderContainer>
                    <TextView theme={theme}>Schedule</TextView>

                    <MonthSelector
                        selectedMonth={selectedMonth}
                        onMonthUpdated={onMonthUpdate}
                    />
                </SchedulePageHeaderContainer>


                <ButtonView theme={theme}>

                    <ScheduleButton
                        title="Search"
                        onButtonPress={searchButtonPress}
                    />



                    <GroupButtonContainer>
                        <ScheduleButton
                            title="Go to Today"
                            onButtonPress={gotoTodayButtonPress}
                        />
                        <ExpandButtonWrapper>
                            <ExpandButton theme={theme} Expanded={Expanded}>
                                <Button
                                    title={Expanded ? "Collapse Calendar" : "Expand Calendar"}
                                    buttonPress={onExpand}
                                    color={Expanded ? theme.colors["--default-shade-white"] : theme.colors['--color-gray-700']}
                                />
                            </ExpandButton>
                        </ExpandButtonWrapper>

                        <FilterContainer 
                            theme = {theme}
                            borderColor = {checkedRadioButton ? '--color-gray-400' : '--accent-button'}
                            backgroundColor = {checkedRadioButton ? '--default-shade-white' : '--accent-button'}
                            onPress={showFilterMenu}
                        >
                            {
                                checkedRadioButton && <FilterIndicator 
                                    backgroundColor = {optionList.filter(item => item.name === checkedRadioButton)[0].color}
                                    shadowColor = {optionList.filter(item => item.name === checkedRadioButton)[0].shadowColor}
                                />
                            }
                            <FilterIcon strokeColor = {checkedRadioButton ? theme.colors['--color-gray-700'] : theme.colors['--default-shade-white'] }/>
                        </FilterContainer>

                        {showDropDown ? renderDropDown() : <View />}
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
