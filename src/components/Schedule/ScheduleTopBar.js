import React, { useState, useContext } from 'react';
import ScheduleSearch from './ScheduleSearch';
import {View, StyleSheet} from 'react-native';
import Button from '../common/Buttons/Button';
import moment from 'moment';
import Month from '../Calendar/Month';
import { ScheduleContext } from '../../contexts/ScheduleContext';
import { scheduleActions } from '../../redux/reducers/scheduleReducer';

export default ScheduleTopBar = (props) => {
    [searchAppointmentStatus, setSearchAppointmentStatus] = useState(true);
    [displayTodayAppointment] = useState(true);
    [calendarLayoutMeasure] = useState(700);

    const [state, dispatch] = useContext(ScheduleContext);


    const searchPress = () => {
        state.transparent ? newTrans = false : newTrans = true;
        setSearchAppointmentStatus(true);

        dispatch({
            type: scheduleActions.SEARCHPRESS,
            newState: { transparent: newTrans, searchOpen: true }
        });

        console.log('bo', state)
    };

    const undoSearchPress = () => {
        setSearchAppointmentStatus(false);

        dispatch({
            type: scheduleActions.UNDOSEARCH,
            newState: {
                selectedSearchValue: '',
                searchAppointment: [],
                searchResultSelect: ''
            }
        });
    }

    const onGoToTodayClick = () => {
        dispatch({
            type: scheduleActions.GOTOTODAY,
            newState: true
        })

        if (state._scrollView) {
            if (!state.displayFullCalendar) {
                if (moment().format("YYYY-MM-D") === state.currentDate.format("YYYY-MM-D")) {
                    state._scrollView.scrollTo({ x: state.calendarOffsetset, y: 0, animated: true })
                    state._scrollAppointment.scrollTo({ x: 0, y: state.scheduleOffset, animated: true })
                    dispatch({
                        type: scheduleActions.SELECTED,
                        newState: { selected: moment(), status: true }
                    })
                }

            } else {
                dispatch({
                    type: scheduleActions.FULLCALENDAR,
                    newState: false
                })
                state._scrollAppointment.scrollTo({ x: 0, y: state.scheduleOffset, animated: true })
            }
        }
    };

    const getMonth = (type) => {
        now = new Date(state.currentDate)
        now.setDate(1)

        if (type === "prev") {
            return setMonth(1, 1, 11, now)
        } else {
            return setMonth(12, -1, 0, now)
        }
    }

    const setMonth = (format, offset, setMonthValue, now) => {
        if (parseInt(state.currentDate.format("M")) === format) {
            now.setFullYear(now.getFullYear() - offset)
            now.setMonth(setMonthValue)
        } else {
            now.setMonth(now.getMonth() - offset)
        }
        return moment(now)
    }

    const monthChange = (type) => {
        month = getMonth(type);

        dispatch({
            type: scheduleActions.MONTHCHANGE,
            newState: {
                currentDate: month,
                datePositions: [],
                calendarOffset: 0,
                scheduleOffset: 0,
                appointmentDates: []
            }
        });
    }

    return (
        <View style={[styles.topContainer, { paddingTop: props.screenDimensions.width > props.screenDimensions.height ? 0 : '1%' }]}>
            {state.searchOpen &&
                <View style={{backgroundColor:'red', position:'absolute', top:0, width:'100%', zIndex:1}}>
                    <ScheduleSearch
                        appointmentDates={state.appointmentDates}
                        setSearchAppointmentStatus={setSearchAppointmentStatus}
                    />
                </View>
            }

            <View style={styles.contentContainer}>
                 <View style={{backgroundColor:"red"}}>
                        <Button
                            title="Search"
                            buttonPress={searchPress}
                            backgroundColor="#F7FAFC"
                            color="#4A5568"
                        />
                    {/* {searchAppointmentStatus && state.selectedSearchValue !== "" && state.searchResultSelect !== "" ?
                        <Button
                            title="Undo Search"
                            buttonPress={undoSearchPress}
                            backgroundColor="#F7FAFC"
                            color="#4A5568"
                        />
                        :
                        <Button
                            title="Search"
                            buttonPress={searchPress}
                            backgroundColor="#F7FAFC"
                            color="#4A5568"
                        />
                    } */}
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Month
                        calendarLayoutMeasure={calendarLayoutMeasure}
                        currentDate={state.currentDate}

                        prevMonthDate={getMonth}
                        nextMonthDate={getMonth}

                        decreaseMonthChange={monthChange}
                        increaseMonthChange={monthChange}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title={displayTodayAppointment ? "Go Back" : "Go to Today"}
                        buttonPress={onGoToTodayClick}

                    />
                </View>
            </View>


        </View>


    )
}


const styles = StyleSheet.create({
    topContainer: {
        paddingBottom: 20,
    },
    contentContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft: '4%',
        marginRight: '4%',
        marginTop: 18,
        backgroundColor:'yellow'
    }
})
