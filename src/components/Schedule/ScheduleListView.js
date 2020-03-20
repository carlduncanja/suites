import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Dimensions} from 'react-native';
import DailyAppointmentCard from './DailyAppointmentCard';
import moment from 'moment';
import ActionContainer from '../common/FloatingAction/ActionContainer';
import { useStartDays, useCurrentDays, useEndDays, useAnimateSlide } from '../../hooks/useScheduleService';
import { ScheduleContext } from '../../contexts/ScheduleContext';
import { scheduleActions } from '../../reducers/scheduleReducer';


const APPS = require('../../../assets/db.json').appointments;

const getAppointments = (date) => {
    const dateAppointments = [];
    {APPS.map((app)=>{
        app.startTime.substring(0,10) === date ? dateAppointments.push(app) : null}
    )}
    return dateAppointments
}


export default ScheduleListView = (props) => {
    const [state, dispatch] = useContext(ScheduleContext);

    const startDays = useStartDays(state.currentDate);
    const currentDays = useCurrentDays(state.currentDate.format("MM"), state.currentDate.format("YYYY"));
    const endDays = useEndDays(state.currentDate)

    const getDays = () => {
        let daysInMonth = []
        startDays.map((day)=>daysInMonth.push({"day":day,"inMonth":false}))
        currentDays.map((day)=>daysInMonth.push({"day":day.format("YYYY-MM-DD"),"inMonth":true}))
        endDays.map((day)=>daysInMonth.push({"day":day,"inMonth":false}))
        return daysInMonth
    }

    // const scrollViewRef = React.createRef();

    // useEffect( () => {
    //     onScrollViewCreated(scrollViewRef.dayScrollView);

    // }, scrollViewRef.dayScrollView)

    // const onScrollViewCreated = (_scrollview) => {
    //     dispatch({
    //         type: scheduleActions.SCROLLVIEW,
    //         newState: _scrollview
    //     })
    // };

    const appointmentScroll = (event) => {
        const appScrollEvent = event.nativeEvent.contentOffset.y;
        let appDateArray = state.appointmentDates.sort((a,b)=>a.date - b.date);
        for (var i = 0; i < appDateArray.length; i++){
            if (appDateArray[i].event >= appScrollEvent){
                return true;
            }
        }
    }

    const showScheduleDetails = (appointment) => {
        let newObject = Object.assign({},appointment);

        dispatch({
            type: scheduleActions.SCHEDULEDETAILS,
            newState: {
                transparent: !state.showSlider,
                slideValue: !state.displayFullCalendar ? 600 : 300,
                scheduleDetails: newObject,
                showSlider: !state.showSlider,
                showDrawer: !state.showDrawer
            }
        })


    };


        return (
            <ScrollView
                style={[styles.container]}
                // ref = "dayScrollView"
                contentOffset={{x:0, y:state.scheduleOffset}}
                contentContainerStyle={{paddingBottom:'50%'}}
                scrollEventThrottle={6}
                bounces={false}
                >
                {
                    getDays().map((date, index)=>{
                        return (
                            <View
                                onLayout={(event) => {
                                    date.day === moment(state.selected.selected).format("YYYY-MM-DD") &&
                                        dispatch({
                                            type: scheduleActions.SCHEDULEOFFSET,
                                            newState: event.nativeEvent.layout.y
                                         });

                                    dispatch({
                                        type: scheduleActions.APPOINTMENTDATES,
                                        newState: { date: moment(date.day), event: event.nativeEvent.layout.y}
                                    })
                                }}
                                key={index}
                                >

                                <DailyAppointmentCard
                                    keyValue={index}
                                    animateSlide = {useAnimateSlide}
                                    dailyText = {`${moment(date.day).format("dddd").toString()} - ${moment(date.day).format("MMM D").toString()}`}
                                    dailyAppointments = {getAppointments(date.day)}
                                    showScheduleDetails = {showScheduleDetails}
                                    status = {date.inMonth}
                                    displayFullCalendar={state.displayFullCalendar}
                                />
                            </View>
                        )
                    }
                )}
            </ScrollView>
        )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        marginLeft:'2%',
        marginRight:'3%',
        backgroundColor:'rgba(247, 250, 252, 1)',
        borderWidth:1,
        borderColor:'#CBD5E0',
        borderRadius:16,
        paddingTop:20,
        paddingBottom:20,
        paddingRight: 24,
        paddingLeft:24,
        height:780
    },

    dateContainer:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingBottom:25,
    },

    dateLabelContainer:{
        borderBottomColor: '#718096',
        borderBottomWidth: 1,
        paddingBottom:5,
        marginBottom: 10,
    },
    dateLabel:{
        fontWeight: 'bold',
        fontSize: 12,
    },

})
