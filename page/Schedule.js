import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, Text, Easing, Animated} from 'react-native';
import RowCalendar from '../components/Calendar/RowCalendar';
import Calendar from '../components/Calendar/Calendar';
import ScheduleListView from '../components/Schedule/ScheduleListView';
import Month from '../components/Calendar/Month';
import Button from '../components/common/Button';
import TransparentScreen from '../components/common/TransparentScreen';
import SlideUpPanel from '../components/common/SideUpPanel';
import Divider from '../components/common/Divider';
import AppointmentCard from '../components/Schedule/AppointmentCard';
import ExtendedCalendar from '../components/Calendar/ExtendedCalendar';
import SearchBar from '../components/common/SearchBar';
import moment from 'moment';

export default class Schedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            _scrollView:null,
            displayTodayAppointment: false,
            displayFullCalendar:false,
            statusLastRow: false,
            showSlider: false,
            calendarLayoutMeasure:700,
            searchValue:"",
            scheduleDetails:{},
            scheduleButtons: false,
            deleteAppointment: false,
            completeDeleteAppointment: false,
            showDrawer: false,
            slideDraggable:true,
            searchOpen:false,
            transparent:false,
            daySelected: false,
            selected: {},
            currentDate: moment(new Date()),
            prevMonthDate: moment(`${moment(new Date()).format("YYYY")}-${(parseInt(moment(new Date()).format("MM")) - 1).toString()}-${moment(new Date()).format("DD")}`),
            nextMonthDate: moment(`${moment(new Date()).format("YYYY")}-${(parseInt(moment(new Date()).format("MM")) + 1).toString()}-${moment(new Date()).format("DD")}`),

        }

        this.showTodayAppointment = this.showTodayAppointment.bind(this);
        this.showScheduleDetails = this.showScheduleDetails.bind(this);
        this.searchPress = this.searchPress.bind(this);
        this.showFullCalendar = this.showFullCalendar.bind(this);
        this.searchChangeText = this.searchChangeText.bind(this);
        this.closeTransparent = this.closeTransparent.bind(this);
        this.showScheduleButtons = this.showScheduleButtons.bind(this);
        this.deleteFloatingAction = this.deleteFloatingAction.bind(this);
        this.completeDeleteFloatingAction = this.completeDeleteFloatingAction.bind(this);
        this.exitDelete = this.exitDelete.bind(this);
        this.closeActionButtons = this.closeActionButtons.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.restartDrag = this.restartDrag.bind(this);
        this.stopScheduleDrag = this.stopScheduleDrag.bind(this);
        this.onPressDay = this.onPressDay.bind(this);
        this.showLastCalendarRow = this.showLastCalendarRow.bind(this);
        this.calendarLayout = this.calendarLayout.bind(this);
        this.decreaseMonthChange = this.decreaseMonthChange.bind(this);
        this.increaseMonthChange = this.increaseMonthChange.bind(this);
    }
    // getDrawerRef = () => this.getDrawerRef;

    showTodayAppointment(){
        this.setState({displayTodayAppointment: !this.state.displayTodayAppointment})
    };

    onGoToTodayClick = () => {
        if (this.state._scrollView) {
            this.state._scrollView.scrollTo(0,0,true)
        }
        this.showTodayAppointment()
    };

    searchPress(){
        t = this.state.transparent;
        t === true? newTrans = false: newTrans = true
        this.setState({
            transparent:newTrans,
            searchOpen:true,
        });
    };

    searchChangeText(textInput){
        this.setState({
            searchValue:textInput
        })
    };

    decreaseMonthChange(e,date){
        current = this.state.currentDate;
        this.setState({currentDate: current.subtract(1,'month')});
    };
    
    increaseMonthChange(){
        current = this.state.currentDate;
        this.setState({currentDate: current.add(1,'month')});
    };

    onPressDay(event,selected){
        if (this.state.daySelected === true) {
            if (this.state.selected.selected === selected){
            selectedObject = {};
            daySelected = false;
            }else{
            selectedObject = {"selected":selected,"status":true};
            daySelected = true;
            }
      
        }else{
            selectedObject = {"selected":selected,"status":true};
            daySelected = true;
        }
      
        this.setState({selected:selectedObject, daySelected});
    };

    showScheduleDetails(appointment){
        let newObject = Object.assign({},appointment);
        this.state.sliderTransparent === true && this.state.showSlider === true ?
            status = false : status = true
        this.setState({
            scheduleDetails:newObject,
            //sliderTransparent:status,
            transparent:status,
            showSlider:status,
            showDrawer: true,
        })
    };

    showFullCalendar(){
        let status = !this.state.displayFullCalendar;
        this.setState({displayFullCalendar:status})
    };

    showScheduleButtons(){
        this.state.scheduleButtons === true ?
            this.setState({scheduleButtons:false}) :
            this.setState({scheduleButtons:true})
    };
    
    closeTransparent(){
        this.setState({
            transparent:false,
            searchOpen: false,
            showSlider:false,
        })
    };

    deleteFloatingAction(){
        status = !this.state.deleteAppointment;
        this.setState({deleteAppointment:status})
    };

    completeDeleteFloatingAction(){
        clearTimeout(this.timer)
        this.setState({completeDeleteAppointment: true})
    };

    exitDelete(){
        this.setState({
            completeDeleteAppointment: false, 
            scheduleButtons: false
        })
    };

    closeActionButtons(){
        this.setState({scheduleButtons:false})
    };

    closeDrawer(){
        this.setState({
          showDrawer:false,
          transparent:false,
          showSlider:false,
        })
    };

    restartDrag(){
        this.setState({slideDraggable:true})
    };

    stopScheduleDrag(height){
        let draggable;
        height === Dimensions.get('window').height - 150 ? draggable = false : null
          this.setState({slideDraggable:draggable})
    };

    showLastCalendarRow(){
        !this.state.statusLastRow === true ?
          this.setState({statusLastRow:true})
          :
          this.setState({
            displayFullCalendar:false,
            statusLastRow: false
          })
    };

    calendarLayout(event){
        let x = event.nativeEvent.contentOffset.x;
        this.setState({calendarLayoutMeasure:x})
    };

    getCurrentDays(inputMonth, inputYear){
        let results=[];
        let daysInMonth = moment([inputYear, inputMonth -1]).daysInMonth();
        for (let i =1; i<= daysInMonth; i++){
            i < 10 ?  day=`0${i}` :  day = i;
            let str = `${inputYear}-${inputMonth}-${day}`;
            let dayofWeek=moment(str).format("ddd");
            results.push({"dayOfWeek":dayofWeek,"day":i});
        }
        return results
    };

    render() {
        const Drawer = require("react-native-drawer-menu").default;

        const scheduleContent = (
            <View
                style=
                    {{
                    flex:1,
                    position:'relative',
                    zIndex:-1,
                    top: this.state.displayFullCalendar === false && this.state.statusLastRow === false ? 0
                        :
                        this.state.displayFullCalendar === true && this.state.statusLastRow === false ? -60
                            :
                            0,

                    marginTop : this.state.displayFullCalendar === true && this.state.statusLastRow === true ? 10 : 0,
                    }}
                >

                <ScheduleListView
                    getDrawerRef = {this.getDrawerRef}
                    displayTodayAppointment = {this.state.displayTodayAppointment}
                    currentDate={this.state.currentDate}
                    showSlider = {this.state.showSlider}
                    showScheduleDetails = {this.showScheduleDetails}
                />

            </View>
        )

        const mainContent = (
            <ScrollView scrollEnabled={false}> 
                <View style={{flex:1}}>
                    <View style={[styles.topContainer, {paddingTop: this.props.screenDimensions.width > this.props.screenDimensions.height ? 0: '1%'}]}>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Search"
                                buttonPress={this.searchPress}
                            />
                        </View>
                        <View style={{alignItems:'center' }}>
                            <Month
                                calendarLayoutMeasure = {this.state.calendarLayoutMeasure}
                                currentDate={this.state.currentDate}
                                prevMonthDate={this.state.prevMonthDate}
                                nextMonthDate = {this.state.nextMonthDate}
                                decreaseMonthChange = {this.decreaseMonthChange}
                                increaseMonthChange = {this.increaseMonthChange}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title= {this.state.displayTodayAppointment === true ? "Go Back" : "Go to Today"}
                                buttonPress={this.onGoToTodayClick}

                            />
                        </View>
                    </View>

                    <View style={{flex:1,marginLeft: this.props.screenDimensions.width > this.props.screenDimensions.height ? '2%':0, marginBottom: 5, alignSelf:"center"}}>

                            {this.state.displayFullCalendar === false ?
                                <RowCalendar
                                    {...this.props}
                                    {...this.state}
                                    currentDay = {this.state.currentDate}
                                    onPressDay = {this.onPressDay}
                                    currentDays = {this.getCurrentDays(this.state.currentDate.format("MM"),this.state.currentDate.format("YYYY"))}
                                    setScrollView = { (scrollViewComponent) => {
                                        this.setState({
                                            _scrollView: scrollViewComponent
                                        })
                                    }}
                                />
                                :
                                this.props.screenDimensions.width > this.props.screenDimensions.height ?
                                    <ExtendedCalendar
                                        {...this.props}
                                        {...this.state}
                                        calendarLayout = {this.calendarLayout}
                                        onPressDay = {this.onPressDay}
                                        showLastCalendarRow = {this.showLastCalendarRow}
                                        currentDays = {this.getCurrentDays(this.state.currentDate.format("MM"),this.state.currentDate.format("YYYY"))}
                                        prevMonthDays = {this.getCurrentDays((parseInt(this.state.currentDate.format("MM")) - 1).toString(), this.state.currentDate.format("YYYY"))}
                                        nextMonthDays = {this.getCurrentDays((parseInt(this.state.currentDate.format("MM")) + 1).toString(), this.state.currentDate.format("YYYY"))}
                                    />
                                    :
                                    <Calendar 
                                        {...this.props} 
                                        {...this.state}
                                        currentDays = {this.getCurrentDays(this.state.currentDate.format("MM"),this.state.currentDate.format("YYYY"))}
                                        onPressDay = {this.onPressDay}
                                        showLastCalendarRow = {this.showLastCalendarRow}
                                    />
                            }

                    </View>
                </View>

                {this.state.displayFullCalendar === false ?
                    <View style={{alignSelf: 'center', marginBottom: 20}}>
                        <Divider pressAction = {this.showFullCalendar} backgroundColor={'#CBD5E0'}/>
                    </View>

                    :
                    null
                }

                {scheduleContent}

            </ScrollView>
        )

        const searchContent=(
            <SearchBar
                placeholderTextColor = '#718096'
                placeholder="Search by scheduled items or dates"
                changeText = {this.searchChangeText}
                inputText = {this.state.searchValue}
                closeSearch = {this.closeTransparent}
            />
        )

        const getDrawerContent = () =>{
            return Object.keys(this.state.scheduleDetails).length === 0 ?
                null
                :
                <AppointmentCard
                    scheduleDetails = {this.state.scheduleDetails }
                    showScheduleButtons = {this.showScheduleButtons}
                    scheduleButtons={this.state.scheduleButtons}
                    deleteFloatingAction = {this.deleteFloatingAction}
                    completeDeleteFloatingAction = {this.completeDeleteFloatingAction}
                    deleteAppointment = {this.state.deleteAppointment}
                    completeDeleteAppointment = {this.state.completeDeleteAppointment}
                    exitDelete = {this.exitDelete}
                    closeActionButtons = {this.closeActionButtons}
                    screenDimensions = {this.props.screenDimensions}
                />
        }
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    {this.props.screenDimensions.width > this.props.screenDimensions.height ? 
                        <View style={{flex:1}}>
                            <Drawer
                                style={styles.container}
                                drawerWidth={1100}
                                drawerContent={getDrawerContent()}
                                type={Drawer.types.Overlay}
                                customStyles={{drawer: styles.drawer}}
                                drawerPosition={Drawer.positions.Right}
                                ref = {ref => {this.drawer = ref}}
                                onDrawerClose={this.closeDrawer}
                                duration = {400}
                                >
                                <View>
                                    {mainContent}
                                </View>
                            </Drawer>
                            {this.state.showDrawer === true ?
                                this.drawer.openDrawer()
                                :
                                null
                            }
                        </View>
                
                        :
                        this.props.screenDimensions.width < this.props.screenDimensions.height && this.state.showSlider === true ?
                            <View>
                                {mainContent}
                                <TransparentScreen  showScheduleDetails = {this.closeTransparent} />
                                <SlideUpPanel
                                    restartDrag = {this.restartDrag}
                                    content={
                                        <AppointmentCard
                                            scheduleDetails = {this.state.scheduleDetails}
                                            showScheduleButtons = {this.showScheduleButtons}
                                            scheduleButtons={this.state.scheduleButtons}
                                            deleteFloatingAction = {this.deleteFloatingAction}
                                            completeDeleteFloatingAction = {this.completeDeleteFloatingAction}
                                            deleteAppointment = {this.state.deleteAppointment}
                                            completeDeleteAppointment = {this.state.completeDeleteAppointment}
                                            exitDelete = {this.exitDelete}
                                            closeActionButtons = {this.closeActionButtons}
                                            screenDimensions = {this.props.screenDimensions}
                                            />
                                    }
                                    stopScheduleDrag = {this.stopScheduleDrag}
                                    draggable = {this.state.slideDraggable}
                                />
                            </View>
                            :
                            this.props.screenDimensions.width < this.props.screenDimensions.height ?
                                <View>
                                    {mainContent}
                                </View>
                                :
                                null      
                    }     
                </View>
                
            {this.state.searchOpen === true? 
                <TransparentScreen  content={searchContent} showScheduleDetails = {this.closeTransparent} />
                :
                null
            }   

            </View>

        )
    }
}

const styles=StyleSheet.create({
    searchContent:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        padding:15,
    },
    topContainer:{
        marginLeft:'2%',
        marginRight:'2%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingBottom:20,
        marginTop: 18
    },
    partition:{
        backgroundColor:'#CBD5E0',
        borderRadius: 8,
        height: 6,
        width: 70,
        alignSelf:'center',
        marginTop:15,
        marginBottom: 24,

    },
    drawer: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingLeft: 49,
        paddingTop:32,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius:16,
        borderBottomLeftRadius:16,
      },
      mask: {
          backgroundColor:'#E5E5E5'
      },
})
