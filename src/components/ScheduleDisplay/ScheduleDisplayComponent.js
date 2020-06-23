import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity} from "react-native";
import moment from 'moment';
import PropTypes from 'prop-types';

function ScheduleDisplayComponent({appointments = [], date = new Date()}) {

    const timerRef = useRef(0); // using ref to keep track of timer.

    const startOfDate = moment(date).startOf('day') // set to 12:00 am
    const isToday = moment().isSame(date, 'day');
    const timelineDate = []

    const [currentTime, setCurrentTime] = useState(moment);

    useEffect(() => {
        updateTime()

        return () => {
            console.log("clearing timer", timerRef.current);
            clearTimeout(timerRef.current)
        }
    }, [])

    for (let i = 0; i < 25; i++) {
        const time = moment(startOfDate).add(i, "hours");
        timelineDate.push(time)
    }

    const updateTime = () => {
        if (!isToday) return;

        // setCurrentTime(moment())

        setCurrentTime((prevVal) => {

            const ref = setTimeout(updateTime, 60000)

            console.log("updating time", ref, prevVal)
            timerRef.current = ref;

            return moment()
        })


    }

    const getPositionOffset = (time) => {
        const HOUR_HEIGHT = 70;
        let position = 0;

        const hours = moment(time).hours();
        position += hours * HOUR_HEIGHT;

        const mins = moment(time).minutes()
        position += (HOUR_HEIGHT / 60) * mins

        return position
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.timeLineContainer}>


                {/*CURRENT TIME*/}
                {
                    isToday &&
                    <View style={{
                        position: 'relative',
                        left: 61,
                        top: getPositionOffset(currentTime),

                        zIndex: 5,
                    }}>
                        <CurrentTimeIndicator/>
                    </View>
                }


                {/* TIME LINE*/}
                {
                    timelineDate.map((item, index) => <TimeBlock key={index} time={item}/>)
                }


                {/* EVENTS */}
                <View style={styles.eventsContainer}>


                    {
                        appointments.map((item, index) => {

                            // const mm = moment(item.startTime);
                            const start = moment(item.startTime);
                            const end = moment(item.endTime);
                            const isActive = moment().isBetween(start, end);

                            return (
                                <View
                                    key={index}
                                    style={{
                                        top: getPositionOffset(item.startTime),
                                        position: "absolute"
                                    }}
                                >
                                    <Event
                                        {...item}
                                    />
                                </View>
                            )
                        })
                    }


                </View>

            </ScrollView>
        </View>
    );
}

ScheduleDisplayComponent.propTypes = {};
ScheduleDisplayComponent.defaultProps = {};

export default ScheduleDisplayComponent;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: '#E3E8EF',
        paddingStart: 48,
    },
    timeLineContainer: {
        // position: 'absolute',
        flexDirection: 'column',
        // justifyContent: 'flex-start'
    },
    eventsContainer: {
        position: 'absolute',
        flex: 1,
        marginLeft: 100,
    }
})


const CurrentTimeIndicator = () => (
    <View
        style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: "center",
        }}
    >

        <View
            style={{
                width: 22,
                height: 3,
                borderRadius: 3,
                backgroundColor: '#ED8936',
                //SHADOW
                shadowColor: "#ED8936",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.75,
                shadowRadius: 3,
                elevation: 5,
            }}
        />

        <View style={{
            backgroundColor: '#F6AD55',
            flex: 1,
            height: 1,
            shadowColor: "#F6AD55",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.75,
            shadowRadius: 3,
            elevation: 5,
        }}/>
    </View>
)

const TimeBlock = ({time}) => {

    const timeToDisplay = moment(time).format('h: mm')
    const hour = moment(time).hour();

    const isEven = (hour % 2 === 0)

    return <View style={{
        flexDirection: "row",
        justifyContent: "flex-start"
    }}>

        <View style={{
            marginRight: 15,
            width: 50,
            alignItems: "flex-end",
            alignSelf: "flex-start"
        }}>
            <Text>{timeToDisplay}</Text>
        </View>

        <View>
            <View style={{
                width: 14,
                height: 35,
                backgroundColor: isEven ? '#E3E8EF' : '#F8FAFB',
                // borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#A0AEC0'
            }}/>

            <View style={{
                width: 14,
                height: 35,
                backgroundColor: isEven ? '#E3E8EF' : '#F8FAFB',
                // borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#A0AEC0'
            }}/>
        </View>

        <View style={{
            flex: 1,
            backgroundColor: isEven ? '#F8FAFB' : '#FFFFFF',
        }}/>

    </View>
}


const EVENT_COLORS = {
    ACTIVE: "#F0FFF4",
    DEFAULT: "#EBF8FF",
    ERROR: "#FFF5F5",
    GONE: "#F8FAFB"
}

const EVENT_BORDER_COLORS = {
    ACTIVE: "#68D391",
    DEFAULT: "#63B3ED",
    ERROR: "#FC8181",
    GONE: "#CCD6E0"
}

const EVENT_TEXT_COLORS = {
    ACTIVE: "#38A169",
    DEFAULT: "#3182CE",
    ERROR: "#E53E3E",
    GONE: "#718096"
}

export const EVENT_TYPES = {
    ACTIVE: 0,
    DEFAULT: 1,
    ERROR: 2,
    GONE: 3
}

function Event({startTime, endTime, type, title, subTitle}) {

    const start = moment(startTime);
    const end = moment(endTime)

    const duration = end.diff(start, 'hours');
    const height = duration * 75;


    let bgColor = EVENT_COLORS.DEFAULT;
    let textColor = EVENT_TEXT_COLORS.DEFAULT;
    let borderColor = EVENT_BORDER_COLORS.DEFAULT;

    switch (type) {
        case EVENT_TYPES.ACTIVE:
            bgColor = EVENT_COLORS.ACTIVE;
            borderColor = EVENT_BORDER_COLORS.ACTIVE;
            break
        case EVENT_TYPES.ERROR:
            bgColor = EVENT_COLORS.ERROR;
            textColor = EVENT_TEXT_COLORS.ERROR;
            borderColor = EVENT_BORDER_COLORS.ERROR;
            break
        case EVENT_TYPES.GONE:
            bgColor = EVENT_COLORS.GONE;
            textColor = EVENT_TEXT_COLORS.GONE;
            borderColor = EVENT_BORDER_COLORS.GONE;
            break

    }


    return (
        <TouchableOpacity
            style={[
                eventStyleSheet.container,
                {
                    height,
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                }
            ]}
        >
            <View>
                <Text style={[
                    eventStyleSheet.title,
                    {color: textColor}
                ]}>{title}</Text>
            </View>


            <View>
                <Text style={[
                    eventStyleSheet.subTitle
                ]}>{start.format("h:mm A")} to {end.format("h:mm A")}</Text>

                <Text style={[
                    eventStyleSheet.subTitle,
                    {color: textColor}
                ]}>
                    {subTitle}
                </Text>
            </View>

        </TouchableOpacity>
    );
}

Event.propTypes = {};
Event.defaultProps = {};


const eventStyleSheet = StyleSheet.create({
    container: {
        // flex: 1,
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingStart: 48,
        width: 450,
        borderWidth: 1,
        borderBottomWidth: 2,
        padding: 16,
        paddingBottom: 20
    },
    title: {
        opacity: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#323843'
    },
    subTitle: {
        opacity: 1,
        fontSize: 14,
        fontWeight: '500',
        marginTop: 16,
        color: '#323843'
    }
})
