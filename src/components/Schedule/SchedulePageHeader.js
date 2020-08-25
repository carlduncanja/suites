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
    margin-bottom:15px;
    margin-top:5px;
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
    borderTopWidth:1px;
    borderTopColor:${ ({ theme }) => theme.colors["--color-gray-400"]};
    // background-color: yellow;
    justify-content: space-between;
`;

const GroupButtonContainer = styled.View`
    flex-direction : row;
    justify-content : space-between;
`;
const ExpandButtonWrapper = styled.View`
    height: 24px;
    margin-left:10px;
    margin-right:10px;
    width: 128px;
`;

const ExpandButton = styled.View`
    height: 100%;
    weight: 100%;
    background-color: ${ ({ theme, Expanded }) => Expanded ? theme.colors["--accent-button"] : theme.colors['--default-shade-white']};
    border-color: ${ ({ theme }) => theme.colors['--color-gray-400']};
    border-radius: 4px;
    border-width: 1px;
`;

const PopUp = styled.View`
width:180px;
align-self:center;
align-items:flex-start;
position:absolute;
padding:5px;
top:30px;
left:100px;
height:175px;
background-color:${({ theme }) => theme.colors["--default-shade-white"]};
z-index:10;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
border-radius:3.6px;

`

const PopupContainer = styled.View`
align-items:center;
flex-direction:row;
margin:2px;

`

const RadioContainer = styled.View`
background-color:${({ checkedButton, name, theme }) => checkedButton === name ? theme.colors["--color-blue-600"] : "white"};
border-color:${({ theme }) => theme.colors["--color-neutral-gray-300"]};
border-width:1px;
width:15px;
height:15px;
border-radius:7.5px;
margin-right:10px;
`;

const OptionContainer = styled.View`
background-color:${({ item }) => item.color};
border-radius:4.6px;
height:25px;
margin:1.8px;
align-items:center;
justify-content:center
`;


function SchedulePageHeader({
    Expanded = false,
    checkedRadioButton = "",
    onradioClick = () => { },
    searchButtonPress = () => { },
    gotoTodayButtonPress = () => { },
    onMonthUpdate = () => { },
    selectedMonth = new Date(),
    onExpand = () => { }
}) {

    const optionList = [
        {
            name: "Delivery",
            color: "#38A169"

        },
        {
            name: "Inventory Re-Stock",
            color: "#D69E2E"
        },
        {
            name: "Inventory Audit",
            color: "#D53F8C"
        },
        {
            name: "Equipment",
            color: "#3182CE"
        },
        {
            name: "Procedure",
            color: "#C53030"
        }

    ]


    const [state] = useContext(SuitesContext);
    const [showDropDown, setShowDropDown] = useState(false);


    const theme = useTheme();

    const renderDropDown = () => {
        console.log(checkedRadioButton)

        const options = [...optionList];
        return (

            <PopUp theme={theme}>

                {options.map((item, index) => {
                    return (<PopupContainer>
                        <RadioContainer theme={theme} checkedButton={checkedRadioButton} name={item.name}>
                            <RadioButton
                                value={item.name}
                                status={checkedRadioButton === item.name ? 'checked' : 'unchecked'}
                                onPress={() => onradioClick(item.name)}
                                color="blue"
                            />

                        </RadioContainer>
                        <OptionContainer key={index} item={item}>
                            <Text style={{ color: "white", fontSize: 15 }}>{item.name}</Text>
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
                            <ExpandButton theme={theme} Expanded={Expanded}>
                                <Button
                                    title={Expanded ? "Collapse Calendar" : "Expand Calendar"}
                                    buttonPress={onExpand}
                                    color={Expanded ? theme.colors["--default-shade-white"] : theme.colors['--color-gray-700']}
                                />
                            </ExpandButton>
                        </ExpandButtonWrapper>
                        <TouchableOpacity onPress={() => { setShowDropDown(!showDropDown) }}>
                            <FilterIcon />

                        </TouchableOpacity>
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
