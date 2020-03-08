import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text, Easing, Animated, Dimensions, TouchableOpacity} from 'react-native';
import RowCalendar from '../components/Calendar/RowCalendar';
import Calendar from '../components/Calendar/Calendar';
import ScheduleListView from '../components/Schedule/ScheduleListView';
import Month from '../components/Calendar/Month';
import Button from '../components/common/Button';
import TransparentScreen from '../components/common/TransparentScreen';
import SlideUpPanel from '../components/common/SideUpPanel';
import AppointmentCard from '../components/Schedule/AppointmentCard';
import ScrollableAppointmentCard from '../components/Schedule/ScrollableAppointmentCard';
import ExtendedCalendar from '../components/Calendar/ExtendedCalendar';
import SearchBar from '../components/common/SearchBar';
import Notification from '../components/common/Notification';
import moment from 'moment';
import ExpandCalendarDivider from '../components/common/ExpandCalendarDivider';
import ScheduleTopBar from '../components/Schedule/ScheduleTopBar';
import ScheduleCalendar from '../components/Schedule/ScheduleCalendar';
import {ScheduleContext} from '../contexts/ScheduleContext';

const Schedule = (props) => {
    const [showNotification, setShowNotification] = useState(false);

    const [state, dispatch] = useContext(ScheduleContext);

    const showFullCalendar = () => {
        let status = !displayFullCalendar;
        this.setState({displayFullCalendar: status})
    };

    const restartDrag = () => {
        this.setState({slideDraggable: true})
    };

    const stopScheduleDrag = (height, bottom) => {
        height === Dimensions.get('window').height - 150 ? this.setState({slideDraggable: false}) : null
        height === -bottom ? this.setState({showSlider: false}) : null
    };

    useEffect(() => {
        console.log('on schedule update')
    });


    const drawer = require("react-native-drawer-menu").default;

    const scheduleContent = (
        <View
            style=
                {{
                    flex: 1,
                    position: 'relative',
                    marginLeft: '2%',
                    marginRight: '2%',
                    marginBottom: !state.displayFullCalendar ? '15%' : '45%',
                    zIndex: 1,
                    top: 0,
                    marginTop: 20,
                }}
        >

            {/* <ScheduleListView /> */}

        </View>
    );


    const mainContent = (
        <ScrollView scrollEnabled={false}>
            <View style={{flex: 1}}>
                {showNotification &&
                <View style={{flex: 1, position: 'absolute', zIndex: 1, right: 10, top: 10, width: '55%'}}>
                    <Notification
                        closeNavigation={setShowNotification}
                    />
                </View>
                }
                <ScheduleTopBar
                    screenDimensions={props.screenDimensions}
                />

                <ScheduleCalendar
                    screenDimensions={props.screenDimensions}
                />
            </View>

            {!state.displayFullCalendar ?
                <View style={{flex: 1, alignSelf: 'center', marginBottom: 4}}>
                    <ExpandCalendarDivider content="Expand" pressAction={this.showFullCalendar}/>
                </View>
                :
                <View style={{flex: 1, alignSelf: 'center'}}>
                    <ExpandCalendarDivider content="Collapse" pressAction={this.showFullCalendar}/>
                </View>

            }


            {scheduleContent}

        </ScrollView>
    );

    const getDrawerContent = () => {
        return Object.keys(scheduleDetails).length != 0 &&
            <ScrollableAppointmentCard
                scheduleDetails={scheduleDetails}
                // showScheduleButtons = {this.showScheduleButtons}
                //scheduleButtons={this.state.scheduleButtons}
                //deleteFloatingAction = {this.deleteFloatingAction}
                //completeDeleteFloatingAction = {this.completeDeleteFloatingAction}
                //deleteAppointment = {this.state.deleteAppointment}
                //completeDeleteAppointment = {this.state.completeDeleteAppointment}
                //exitDelete = {this.exitDelete}
                //closeActionButtons = {this.closeActionButtons}
                screenDimensions={props.screenDimensions}
                transparent={transparent}
            />
    };

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                {props.screenDimensions.width > props.screenDimensions.height ?
                    <View style={{flex: 1}}>
                        <Drawer
                            style={styles.container}
                            drawerWidth={800}
                            drawerContent={getDrawerContent()}
                            type={Drawer.types.Overlay}
                            customStyles={{drawer: styles.drawer}}
                            drawerPosition={Drawer.positions.Right}
                            ref={ref => {
                                this.drawer = ref
                            }}
                            // onDrawerClose={this.closeTransparent}
                            duration={400}
                        >
                            <View>
                                {mainContent}
                            </View>
                        </Drawer> */}
                        {showDrawer && this.drawer && this.drawer.openDrawer()}

                    </View>

                    :
                    state.showSlider ?
                        <View style={{flex: 1}}>
                            {mainContent}
                            {/* <TransparentScreen
                                    showScheduleDetails = {this.closeTransparent}
                                    animateSlide = {this.animateSlide}
                                />
                                <View style={{flex:1}}>
                                    <Animated.View style={{bottom: this.slideUpAnimValue}}>
                                        <SlideUpPanel
                                            restartDrag = {this.restartDrag}
                                            displayFullCalendar = {displayFullCalendar}
                                            content={
                                                <ScrollableAppointmentCard
                                                    scheduleDetails = {this.state.scheduleDetails}
                                                    screenDimensions = {this.props.screenDimensions}
                                                    transparent = {this.props.transparent}
                                                />
                                            }
                                            slideUpAnimValue = {this.slideUpAnimValue}
                                            slideValue = {this.state.slideValue}
                                            stopScheduleDrag = {this.stopScheduleDrag}
                                            draggable = {this.state.slideDraggable}
                                        />
                                    </Animated.View>
                                    <View style={{flex:1, position:'absolute', bottom:0, width:'100%', paddingTop: 30, paddingBottom: 20, paddingLeft:'5%', backgroundColor:"rgba(255, 255, 255, 1)"}}>
                                        <Text style={{fontSize: 12, color:'#A0AEC0'}}>Created by {this.state.scheduleDetails.createdBy}</Text>
                                    </View>
                                </View> */}


                        </View>
                        :
                        <View>
                            {mainContent}
                        </View>
                }
            </View>


        </View>

    )
};

export default Schedule

const styles = StyleSheet.create({
    searchContent: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 15,
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
})
