import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, Text, Easing, Animated, Dimensions, TouchableOpacity} from 'react-native';
import RowCalendar from '../components/Calendar/RowCalendar';
import Calendar from '../components/Calendar/Calendar';
import ScheduleListView from '../components/Schedule/ScheduleListView';
import Month from '../components/Calendar/Month';
import Button from '../components/common/Button';
import TransparentScreen from '../components/common/TransparentScreen';
import SlideUpPanel from '../components/common/SideUpPanel';
import Divider from '../components/common/Divider';
import AppointmentCard from '../components/Schedule/AppointmentCard';
import ScrollableAppointmentCard from '../components/Schedule/ScrollableAppointmentCard';
import ExtendedCalendar from '../components/Calendar/ExtendedCalendar';
import SearchBar from '../components/common/SearchBar';
import Notification from '../components/common/Notification';
import moment from 'moment';
import ExpandCalendarDivider from '../components/common/ExpandCalendarDivider';
import RowDays from '../components/Calendar/RowDays'

export default class Schedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            _scrollView:null,
            _scrollAppointment:null,
            _scrollToAppointment:null,
            //_scrollToCalendarDay: null,
            _scrollTodaySearch:null,
            calendarOffset:0,
            scrollMeasure:0,
            scrollCalendar:0,
            scrollAppointment: false,
            datePositions:[],
            appointmentDates:[],
            calendarDayPositions:[],
            scrollAppointmentDay:null,
            scrollCalendarDay:null,
            todayY:0,
            goToToday:false,
            scrollCalenderStatus: false,
            scrollAppointmentStatus: false,
            
            displayFullCalendar:false,
            statusLastRow: false,
            showSlider: false,
            calendarLayoutMeasure:700,

            searchValue:"",
            selectedSearchValue: "",
            scheduleDetails:{},
            searchAppointment: [],
            searchDates:[],
            searchAppointmentStatus: false,
            searchOpen:false,

            scheduleButtons: false,
            deleteAppointment: false,
            completeDeleteAppointment: false,
            showDrawer: false,
            slideDraggable:true,
            
            transparent:false,

            daySelected: false,
            selected: {"selected":moment(),"status":true},
            currentDate: moment(new Date()),
            slideValue:0
        }

        this.showScheduleDetails = this.showScheduleDetails.bind(this);
        this.searchPress = this.searchPress.bind(this);
        this.undoSearchPress = this.undoSearchPress.bind(this);
        this.onSearchSelect = this.onSearchSelect.bind(this);
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
        this.getCalendarOffset = this.getCalendarOffset.bind(this);
        this.getScrollMeasure = this.getScrollMeasure.bind(this);
        this.getAppointmentScroll = this.getAppointmentScroll.bind(this);
        this.getAppointments = this.getAppointments.bind(this);
        this.getTodayY = this.getTodayY.bind(this);
        this.appointmentScroll = this.appointmentScroll.bind(this);
        this.goToAppointment = this.goToAppointment.bind(this);
        //this.setAppointmentStatus = this.setAppointmentStatus.bind(this)
        this.getPrevMonth = this.getPrevMonth.bind(this);
        this.getNextMonth = this.getNextMonth.bind(this);
        // this.getLastDay = this.getLastDay.bind(this);
                       
        this.animateSlide = this.animateSlide.bind(this);
        this.slideUpAnimValue = new Animated.Value(0);        
    }

    animateSlide=()=>{
        const slideUpNum = this.state.displayFullCalendar === false ? 600 : 300
        {this.state.slideValue === 0 ?
            Animated.timing(
                this.slideUpAnimValue,
                {
                    toValue:slideUpNum,
                    duration:500,
                    easing: Easing.cubic
                },
                
            ).start() && this.slideUpAnimValue.setValue(slideUpNum)
            : 
            Animated.timing(
                this.slideUpAnimValue,
                {
                    toValue:0,
                    duration:500,
                    easing: Easing.cubic
                },
            ).start(()=>this.setState({showSlider:false, showDrawer:false})) && this.slideUpAnimValue.setValue(0) 
        }
        
    }  
    getTodayY(event){
        this.setState({todayY: event.nativeEvent.layout.y})
    }
    
    clickToday=()=>{
        this.setState({goToToday:true, scrollAppointment:false},
            () => { this.onGoToTodayClick()}
        ) 
    }

    onGoToTodayClick = () => {
        if (this.state._scrollView ) {
            if(this.state.displayFullCalendar === false){
                this.state._scrollView.scrollTo({x:this.state.calendarOffset,y:0,animated:true})
            }else{
                this.setState({displayFullCalendar:false})
                this.state._scrollAppointment.scrollTo({x:0,y:this.state.todayY,animated:true})
            }   
        }
    };

   
    goToAppointment(){
        this.state.goToToday === true ?
            this.onGoToAppointment()
            :
            this.setState({scrollAppointment:true},
                ()=>{this.onGoToAppointment()}
            )
    }

    onGoToAppointment = () => {
        if (this.state._scrollToAppointment) {
            this.state.appointmentDates.map((date)=>{
                //console.log("Scroll Day: ",this.state.scrollAppointmentDay.format("MM D"))
                if (date.date.format("MM D") === this.state.scrollAppointmentDay.format("MM D")) {
                    if (this.state.goToToday === true && this.state.scrollAppointment === false){
                        this.state._scrollToAppointment.scrollTo({x:0,y:this.state.todayY,animated:true}) 
                        this.setState({goToToday:false})
                    }
                    else{
                        this.state._scrollToAppointment.scrollTo({x:0, y:date.event, animated:true})
                    }   
                }
                null
            })
        }
        // return true
    }

    getAppointments(obj){
        this.setState({appointmentDates: [...this.state.appointmentDates,obj]}); 
    }

    getCalendarOffset(event){
        this.setState({calendarOffset: event.nativeEvent.layout.x})
    }

    getAppointmentScroll(obj){
        this.setState({datePositions: [...this.state.datePositions, obj]});
    }
   
    getScrollMeasure(event){
        this.setState({scrollMeasure: event.nativeEvent.contentOffset.x})
        let dateArray = this.state.datePositions.sort((a,b)=>a.event - b.event);
        for (var i = 0; i < dateArray.length; i++){
            if (dateArray[i].event >= event.nativeEvent.contentOffset.x) {
                this.setState({scrollAppointmentDay: moment(dateArray[i].day)})
                return true
            }
            null
        }
    }

    appointmentScroll(event){
        this.setState({scrollCalendar: event.nativeEvent.contentOffset.y})
        const appScrollEvent = event.nativeEvent.contentOffset.y;
        let appDateArray = this.state.appointmentDates.sort((a,b)=>a.date - b.date);
        for (var i = 0; i < appDateArray.length; i++){
            if (appDateArray[i].event >= appScrollEvent){
                this.setState({scrollCalendarDay: parseInt(appDateArray[i].date.format("DD"))})
                return true;
            }
            null
        }
    }

    onPressDayToAppointment(selected, status){
        if (status === true){
            this.state.appointmentDates.map((date)=>{
                if (date.date.format("MM D") === selected.format("MM D")) {
                    this.state._scrollAppointment.scrollTo({x:0,y:date.event,animated:true})
                }
            })
        }null
    }

    searchPress(){
        t = this.state.transparent;
        t === true? newTrans = false: newTrans = true
        //this.props.setTransparent(newTrans)
        this.setState({
            transparent:newTrans,
            searchAppointmentStatus:true,
            searchOpen:true,
        });
    };
    
    undoSearchPress(){
        this.setState({searchAppointmentStatus: false, selectedSearchValue: "", searchAppointment:[]})   
    }

    searchChangeText(textInput){
        const appointmentTitles = []
        this.setState({
            searchValue:textInput
        })
        require('../assets/db.json').appointments.map((appointment)=>{
            appointmentTitles.includes(appointment.title) || appointmentTitles.includes(moment(appointment.startTime).format("MMMM DD, YYYY").toString())?
                null
                :
                appointment.title.includes(textInput) || appointment.title.toLowerCase().includes(textInput.toLowerCase()) || appointment.title.toUpperCase().includes(textInput.toUpperCase())?
                    appointmentTitles.push(appointment.title)
                    :
                    moment(appointment.startTime).format("MMMM DD, YYYY").toString().includes(textInput)?
                        appointmentTitles.push(moment(appointment.startTime).format("MMMM DD, YYYY").toString())
                    :
                    null
        })
        this.setState({searchAppointment: appointmentTitles})
    };

    onSearchSelect(selectedTitle){
        this.setState({selectedSearchValue: selectedTitle})
        this.getSearchAppointment(selectedTitle)
    }

    getSearchAppointment(select){
        let appointments = require('../assets/db.json').appointments
        for (i = 0; i < appointments.length; i++){
            if (appointments[i].title === select && moment(appointments[i].startTime).format("M") === this.state.currentDate.format("M")){
                filterDayEvent = this.state.datePositions.filter(date => moment(date.day).format("YYYY MM D") === moment(appointments[i].startTime).format("YYYY MM D"))
                this.setSearchAppointment(filterDayEvent[0].event, moment(appointments[i].startTime))
                return
            
            }else if (moment(appointments[i].startTime).format("MMMM DD, YYYY") === select){
                filterDayEvent = this.state.datePositions.filter(date => moment(date.day).format("YYYY MM D") === moment(select).format("YYYY MM D"))
                this.setSearchAppointment(filterDayEvent[0].event, moment(appointments[i].startTime))
                return
            }
        }
       
    }

    setSearchAppointment(filter, selected){
        this.setState({
            searchAppointmentStatus:false, 
            searchAppointment:[],
            selectedSearchValue:"",
            searchOpen:false, 
            selected: {'selected':selected,'status':true}
        })
        this.state._scrollView.scrollTo({x:filter,y:0,animated:true})
    }

  
    decreaseMonthChange(){
        setPrevMonth = this.getPrevMonth()
        this.setState({currentDate:setPrevMonth})
    };
    
    increaseMonthChange(){
        setNextMonth = this.getNextMonth()
        this.setState({datePositions: [],currentDate:setNextMonth})
    };

    
    getPrevMonth() {
        now = new Date(this.state.currentDate)
        now.setDate(1)
        if (parseInt(this.state.currentDate.format("M")) === 1){
            now.setFullYear(now.getFullYear() - 1)
            now.setMonth(11)
        }else{
            now.setMonth(now.getMonth()-1)
        }    
        return moment(now)
    }

    getNextMonth(){
        const now = new Date(this.state.currentDate)
        now.setDate(1)
        if (parseInt(this.state.currentDate.format("M")) === 12) {
            now.setFullYear(now.getFullYear() + 1)
            now.setMonth(0)
        }else{
            now.setMonth(now.getMonth()+1)
        }
        //console.log("Next Month: ", moment(now))
        return moment(now)
    }

    onPressDay(event,selected){
        selectedObject = {"selected":selected,"status":true};
        daySelected = true;
        
        this.onPressDayToAppointment(selectedObject.selected, daySelected)
        this.setState({selected:selectedObject, daySelected});
    };


    showScheduleDetails(appointment){
        let newObject = Object.assign({},appointment);
        this.state.showSlider === true ?
            status = false : status = true
        
        this.setState({
            slideValue: this.state.displayFullCalendar === false ? 600 : 300,
            scheduleDetails:newObject,
            transparent:status,
            showSlider:status,
            showDrawer: status,
        }, )
        //this.props.setTransparent(status)
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
        //this.props.setTransparent(false)
        this.setState({
            slideValue:0,
            transparent:false,
            searchOpen: false,
        })
        this.state.selectedSearchValue === ""  ? this.setState({searchAppointment: []}) : null
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
        //this.props.setTransparent(false)
        this.setState({
          showDrawer:false,
          transparent:false,
          showSlider:false,
          //slideValue:0
        })
    };

    restartDrag(){
        this.setState({slideDraggable:true})
    };

    stopScheduleDrag(height, bottom){
        height === Dimensions.get('window').height - 150 ? this.setState({slideDraggable:false}) : null
        height === -bottom ? this.setState({showSlider:false}) : null
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
            results.push(moment(str))
        }
        return results
    };

    getStartDays(){
        //0-Sun 1-Mon 2-Tues 3-Wed 4-Thur 5-Fri 6-Sat
        d = new Date(this.state.currentDate)
        d.setDate(1)
        d.setHours(-1)
        const momentDay = moment(d)
        
        let day = parseInt(momentDay.format("DD"))
        let days = [momentDay.format("YYYY-MM-DD")]
        const startDayNum = moment(this.state.currentDate).startOf("month").format("d")
        const dayIndex = parseInt(startDayNum) === 0 ? 7 : parseInt(startDayNum)
       
        if (dayIndex === 1) {
            //console.log("Start")
            days = []
        }
        else{
            for (i = 1; i < dayIndex-1; i++){
                const dayNum = (day-1 < 10) ? `0${day-1}` : day-1
                const dayMoment = moment(`${momentDay.format("YYYY")}-${momentDay.format("MM")}-${dayNum}`).format("YYYY-MM-DD")
                days.push(dayMoment)
                day--
            }
        }   
        return days.reverse()
        
    }

    getEndDays(){
        //get first 5 days of next onth
        const endDayNum = moment(this.state.currentDate).endOf("month").format("d")
        const now = new Date(this.state.currentDate)
        now.setDate(1)
        now.setMonth(now.getMonth()+1)
        const momentDay = moment(now)
        let day = parseInt(moment(now).format("DD"))
        let days = [momentDay.format("YYYY-MM-DD")]
        //console.log("End Num: ", endDayNum)
        if (parseInt(endDayNum) === 0){
            days = []
        }else{
            for (i = endDayNum ; i < 6 ; i++){
                const dayNum = (day+1 < 10) ? `0${day+1}` : day+1
                const dayMoment = moment(`${momentDay.format("YYYY")}-${momentDay.format("MM")}-${dayNum}`).format("YYYY-MM-DD")
                days.push(dayMoment)
                day++
            }
        }
        //console.log("Days: ", days)
        return days
    }
   
    render() {
        //console.log("Dates Pos: ", this.state.datePositions)
        //console.log("Current: ", this.state.currentDate)
        const Drawer = require("react-native-drawer-menu").default;
        const currentYear = this.state.currentDate.format("YYYY")
        const currentMonth = this.state.currentDate.format("MM")
        const currentDay = this.state.currentDate.format("DD")
        //console.log("Date: ", this.state.currentDate)

        const scheduleContent = (
            <View
                style=
                    {{
                    flex:1,
                    position:'relative',
                    marginLeft:'2%',
                    marginRight:'2%',
                    marginBottom: this.state.displayFullCalendar === false ? '15%' : '45%',
                    zIndex:1,
                    top: 0,
                    marginTop : 20,
                    }}
                >

                <ScheduleListView
                    setScrollView = { (scrollViewComponent) => {
                        this.setState({
                            _scrollAppointment: scrollViewComponent
                        })
                    }}
                    setScrollAppointment = { (scrollViewComponent) => {
                        this.setState({
                            _scrollToAppointment: scrollViewComponent
                        })
                    }}
                    setScrollTodaySearch = { (scrollViewComponent) => {
                        this.setState({
                            _scrollTodaySearch: scrollViewComponent
                        })
                    }}
                    startDays = {this.getStartDays()}
                    endDays = {this.getEndDays()}
                    currentDays = {this.getCurrentDays(this.state.currentDate.format("MM"),this.state.currentDate.format("YYYY"))}
                    scrollAppointmentDay = {this.state.scrollAppointmentDay}
                    animateSlide = {this.animateSlide}
                    getDrawerRef = {this.getDrawerRef}
                    displayTodayAppointment = {this.state.displayTodayAppointment}
                    currentDate={this.state.currentDate}
                    showSlider = {this.state.showSlider}
                    showScheduleDetails = {this.showScheduleDetails}
                    getAppointments = {this.getAppointments}
                    scrollMeasure = {this.state.scrollMeasure}
                    selected = {this.state.selected}
                    onGoToCalendarDay = {this.onGoToCalendarDay}
                    getTodayY = {this.getTodayY}
                    appointmentScroll = {this.appointmentScroll}
                    setAppointmentStatus = {this.setAppointmentStatus}
                    //searchAppointment = {this.state.searchAppointment}
                    searchAppointmentStatus = {this.state.searchAppointmentStatus}
                    goToToday = {this.state.goToToday}
                    selectedSearchValue={this.state.selectedSearchValue}
                />

            </View>
        )

        const mainContent = (
            <ScrollView scrollEnabled={false}> 
                <View style={{flex:1}}>
                    {this.props.showNotification ?
                        <View style={{flex:1, position:'absolute',zIndex: 1, right:10, top:10, width:'55%'}}>
                            <Notification
                                closeNavigation = {this.props.closeNavigation}
                            />
                        </View>
                        :
                        null
                    }
                    <View style={[styles.topContainer, {paddingTop: this.props.screenDimensions.width > this.props.screenDimensions.height ? 0: '1%'}]}>
                        <View style={styles.buttonContainer}>
                            {this.state.searchAppointmentStatus === true && this.state.selectedSearchValue!== ""?
                                <Button
                                    title="Undo Search"
                                    buttonPress={this.undoSearchPress}
                                />
                                :
                                <Button
                                    title="Search"
                                    buttonPress={this.searchPress}
                                />
                            }
                            
                        </View>
                        <View style={{alignItems:'center' }}>
                            <Month
                                calendarLayoutMeasure = {this.state.calendarLayoutMeasure}
                                currentDate={this.state.currentDate}

                                prevMonthDate={this.getPrevMonth}
                                nextMonthDate = {this.getNextMonth}

                                decreaseMonthChange = {this.decreaseMonthChange}
                                increaseMonthChange = {this.increaseMonthChange}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title= {this.state.displayTodayAppointment === true ? "Go Back" : "Go to Today"}
                                buttonPress={this.clickToday}

                            />
                        </View>
                    </View>

                    <View style={{flex:1,marginLeft: this.props.screenDimensions.width > this.props.screenDimensions.height ? '2%':0, alignSelf:"center"}}>

                            {this.state.displayFullCalendar === false ?
                                <RowCalendar
                                    {...this.props}
                                    {...this.state}
                                    currentDate = {this.state.currentDate}
                                    selected = {this.state.selected}
                                    scrollMeasure = {this.state.scrollMeasure}
                                    onPressDay = {this.onPressDay}
                                    startDays = {this.getStartDays()}
                                    endDays = {this.getEndDays()}
                                    currentDays = {this.getCurrentDays(this.state.currentDate.format("MM"),this.state.currentDate.format("YYYY"))}
                                    setScrollView = { (scrollViewComponent) => {
                                        this.setState({
                                            _scrollView: scrollViewComponent
                                        })
                                    }}
                                   
                                    getCalendarOffset = {this.getCalendarOffset}
                                    getAppointmentScroll = {this.getAppointmentScroll}
                                    getScrollMeasure = {this.getScrollMeasure}
                                    scrollCalendar = {this.state.scrollCalendar}
                                    onGoToAppointment = {this.onGoToAppointment}
                                    onGoToTodayAppointment = {this.onGoToTodayAppointment}
                                    goToAppointment = {this.goToAppointment}
                                    goToToday = {this.state.goToToday}
                                    calendarOffset = {this.state.calendarOffset}
                                />
                                :
                                this.props.screenDimensions.width > this.props.screenDimensions.height ?
                                    <ExtendedCalendar
                                        {...this.props}
                                        {...this.state}
                                        prevCurrentDate={this.getPrevMonth(currentYear, currentMonth, currentDay)}
                                        nextCurrentDate = {this.getNextMonth(currentYear, currentMonth, currentDay)}
                                        calendarLayout = {this.calendarLayout}
                                        onPressDay = {this.onPressDay}
                                        showLastCalendarRow = {this.showLastCalendarRow}

                                        currentDays = {this.getCurrentDays(this.state.currentDate.format("MM"),this.state.currentDate.format("YYYY"))}
                                        prevMonthDays = { 
                                            parseInt(this.state.currentDate.format("M")) === 1 ?
                                                this.getCurrentDays(this.state.currentDate.format("MM"), (parseInt(this.state.currentDate.format("YYYY")) -1).toString())
                                                :
                                                this.getCurrentDays((parseInt(this.state.currentDate.format("MM")) - 1).toString(), this.state.currentDate.format("YYYY"))
                                        }
                                        nextMonthDays = {
                                            parseInt(this.state.currentDate.format("M")) === 12 ?
                                            this.getCurrentDays('01', (parseInt(this.state.currentDate.format("YYYY")) +1).toString())
                                            :
                                            this.getCurrentDays((parseInt(this.state.currentDate.format("MM")) + 1).toString(), this.state.currentDate.format("YYYY"))
                                        }
                                    />
                                    :
                                    <Calendar 
                                        {...this.props} 
                                        {...this.state}
                                        currentDays = {this.getCurrentDays(this.state.currentDate.format("MM"),this.state.currentDate.format("YYYY"))}
                                        onPressDay = {this.onPressDay}
                                        showLastCalendarRow = {this.showLastCalendarRow}
                                        getStartDays = {this.getStartDays()}
                                        getEndDays = {this.getEndDays()}
                                    />
                            }

                    </View>
                </View>

                {this.state.displayFullCalendar === false ?
                    <View style={{flex:1, alignSelf: 'center', marginBottom:4}}>
                        <ExpandCalendarDivider content="Expand" pressAction = {this.showFullCalendar}/>
                    </View>
                    :
                    <View style={{flex:1, alignSelf: 'center'}}>
                        <ExpandCalendarDivider content="Collapse" pressAction = {this.showFullCalendar}/>
                    </View>
                    
                }

             
                {scheduleContent}
      
            </ScrollView>
        )

        const searchContent=(
            <View style={{borderBottomLeftRadius: 8, borderBottomRightRadius: 8}}>
                <SearchBar
                    placeholderTextColor = '#718096'
                    placeholder="Search by scheduled items or dates"
                    changeText = {this.searchChangeText}
                    inputText = {this.state.searchValue}
                    closeSearch = {this.closeTransparent}
                />
                <View style={{backgroundColor:'#FFFFFF'}}>
                    {this.state.searchAppointment.map((appointmentTitle, index)=>{
                        return(
                            <TouchableOpacity 
                                key={index} 
                                style={{paddingTop:5, paddingBottom:10, paddingLeft:25}}
                                onPress={()=>this.onSearchSelect(appointmentTitle)}
                                >
                                <Text style={{color:'#3182CE', fontSize:16}}>{appointmentTitle}</Text>
                            </TouchableOpacity>
                        )
                    })}
                    
                </View>
            </View>
            
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
                                drawerWidth={800}
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
                            {this.state.showDrawer === false ? 
                                null
                                :
                                this.drawer && this.drawer.openDrawer()                               
                            }
                            
                        </View>
                
                        :
                        this.props.screenDimensions.width < this.props.screenDimensions.height && this.state.showSlider === true ?
                            <View style={{flex:1}}>
                                {mainContent}
                                <TransparentScreen  
                                    showScheduleDetails = {this.closeTransparent} 
                                    animateSlide = {this.animateSlide}
                                />
                                <View style={{flex:1}}> 
                                    <Animated.View style={{bottom: this.slideUpAnimValue}}>
                                        <SlideUpPanel
                                            restartDrag = {this.restartDrag}
                                            displayFullCalendar = {this.state.displayFullCalendar}
                                            content={
                                                <ScrollableAppointmentCard
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
                                                    transparent = {this.state.transparent}
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
                                </View>
                                

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
                <TransparentScreen  
                    content={searchContent} 
                    showScheduleDetails = {this.closeTransparent}
                    animateSlide = {()=> null}
                    />
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
        marginLeft:'4%',
        marginRight:'4%',
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
        backgroundColor:'#E5E5E5',
    },
})
