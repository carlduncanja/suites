import React, { Component } from 'react';
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

export default class Schedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            _scrollView:null,
            _scrollAppointment:null,
            calendarOffset:0,
            scheduleOffset:0,
            scrollMeasure:0,
           
            datePositions:[],
            appointmentDates:[],
            scrollAppointmentDay:null,
            scrollCalendarDay:null,
            todayY:0,
            goToToday:false,
           
            displayFullCalendar:false,
            showSlider: false,
            calendarLayoutMeasure:700,

            searchValue:"",
            selectedSearchValue: "",
            searchResultSelect: "",
            scheduleDetails:{},
            searchAppointment: [],
            selectedAppEvents:[],
            selectedDayEvents:[],
            searchAppointmentStatus: false,
            searchOpen:false,
            searchResult:1,

            showDrawer: false,
            slideDraggable:true,
    
            daySelected: false,
            selected: {"selected":moment(),"status":false},
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
        this.restartDrag = this.restartDrag.bind(this);
        this.stopScheduleDrag = this.stopScheduleDrag.bind(this);
        this.onPressDay = this.onPressDay.bind(this);
        this.calendarLayout = this.calendarLayout.bind(this);
        this.decreaseMonthChange = this.decreaseMonthChange.bind(this);
        this.increaseMonthChange = this.increaseMonthChange.bind(this);
        this.getCalendarOffset = this.getCalendarOffset.bind(this);
        this.getOffset = this.getOffset.bind(this)
        //this.getScrollMeasure = this.getScrollMeasure.bind(this);
        this.getAppointmentScroll = this.getAppointmentScroll.bind(this);
        this.getAppointments = this.getAppointments.bind(this);
        //this.appointmentScroll = this.appointmentScroll.bind(this);
        this.getPrevMonth = this.getPrevMonth.bind(this);
        this.getNextMonth = this.getNextMonth.bind(this);
        this.nextSearchResult = this.nextSearchResult.bind(this);
        this.prevSearchResult = this.prevSearchResult.bind(this);
                       
        this.animateSlide = this.animateSlide.bind(this);
        this.slideUpAnimValue = new Animated.Value(0);        
    }

    animateSlide=()=>{
        const slideUpNum = this.state.displayFullCalendar === false ? 600 : 300
            Animated.timing(
                this.slideUpAnimValue,
                {
                    toValue:slideUpNum,
                    duration:800,
                    easing: Easing.cubic
                },
                
            ).start() && this.slideUpAnimValue.setValue(slideUpNum)
    }  
        
    clickToday=()=>{
        //scrollAppointment:false
        this.setState({goToToday:true},
            () => { this.onGoToTodayClick()}
        ) 
    }

    onGoToTodayClick = () => {
        if (this.state._scrollView ) {
            if(this.state.displayFullCalendar === false){
                if(moment().format("YYYY-MM-D") === this.state.currentDate.format("YYYY-MM-D")){
                    this.state._scrollView.scrollTo({x:this.state.calendarOffset,y:0,animated:true})
                    this.state._scrollAppointment.scrollTo({x:0,y:this.state.scheduleOffset,animated:true})
                    this.setState({selected: {"selected":moment(), "status":true}})
                }else{
                    this.setState({currentDate:moment()})
                }

            }else{
                this.setState({displayFullCalendar:false})
                this.state._scrollAppointment.scrollTo({x:0,y:this.state.scheduleOffset,animated:true})
            }   
        }
    };

   
    // goToAppointment(){
    //     this.state.goToToday === true ?
    //         this.onGoToAppointment()
    //         :
    //         this.setState({scrollAppointment:true},
    //             ()=>{this.onGoToAppointment()}
    //         )
    // }

    // onGoToAppointment = () => {
    //     if (this.state._scrollView) {
    //         this.state.appointmentDates.map((date)=>{
    //             if (date.date.format("MM D") === this.state.scrollAppointmentDay.format("MM D")) {
    //                 if (this.state.goToToday === true && this.state.scrollAppointment === false){
    //                     this.state._scrollView.scrollTo({x:0,y:this.state.todayY,animated:true}) 
    //                     this.setState({goToToday:false})
    //                 }
    //                 else{
    //                     this.state._scrollView.scrollTo({x:0, y:date.event, animated:true})
    //                 }   
    //             }
    //             null
    //         })
    //     }
    //     // return true
    // }

    getAppointments(obj){
        this.setState({appointmentDates: [...this.state.appointmentDates,obj]}); 
    }

    getAppointmentScroll(obj){
        this.setState({datePositions: [...this.state.datePositions, obj]});
    }

    getCalendarOffset(event){
        //console.log("Calendar Offset: ", event)
        this.setState({calendarOffset: event})
    }

    getOffset(event){
        this.setState({scheduleOffset: event})
    }

    // getScrollMeasure(event){
    //     this.setState({scrollMeasure: event.nativeEvent.contentOffset.x})
    //     let dateArray = this.state.datePositions.sort((a,b)=>a.event - b.event);
    //     for (var i = 0; i < dateArray.length; i++){
    //         if (dateArray[i].event >= event.nativeEvent.contentOffset.x) {
    //             this.setState({scrollAppointmentDay: moment(dateArray[i].day)})
    //             return true
    //         }
    //         null
    //     }
    // }

    // appointmentScroll(event){
    //     //this.setState({scrollCalendar: event.nativeEvent.contentOffset.y})
    //     const appScrollEvent = event.nativeEvent.contentOffset.y;
    //     let appDateArray = this.state.appointmentDates.sort((a,b)=>a.date - b.date);
    //     for (var i = 0; i < appDateArray.length; i++){
    //         if (appDateArray[i].event >= appScrollEvent){
    //             this.setState({scrollCalendarDay: parseInt(appDateArray[i].date.format("DD"))})
    //             return true;
    //         }
    //         null
    //     }
    // }

    onPressDay(e, selected){
        selectedObject = {"selected":selected,"status":true};
        this.onPressDayToAppointment(selectedObject.selected, true)
        this.setState({selected:selectedObject, daySelected:true});
    };

    onPressDayToAppointment(selected, status){
        if (status === true){
            if (this.state.displayFullCalendar === false){
                this.state.datePositions.map((date)=>{ 
                    if (moment(date.day).format("MM D") === selected.format("MM D")){
                        //console.log("Selected: ", date)
                        this.state._scrollView.scrollTo({x:date.event,y:0,animated:true})
                    }
                })
            }
            this.state.appointmentDates.map((date)=>{
                if (date.date.format("MM D") === selected.format("MM D")) {
                    this.state._scrollAppointment.scrollTo({x:0,y:date.event,animated:true})
                }
            })
        }
    }

    searchPress(){

        t = this.state.transparent;
        t === true? newTrans = false: newTrans = true
        this.props.setTransparent(newTrans)
        this.setState({
            //transparent:newTrans,
            searchAppointmentStatus:true,
            searchOpen:true,
        });
    };
    
    undoSearchPress(){
        this.setState({searchAppointmentStatus: false, selectedSearchValue: "", searchAppointment:[], searchResultSelect:""})   
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
                // moment(appointment.startTime).format("YYYY/MM/DD") === this.state.currentDate.format("YYYY/MM/DD") ?
                    appointment.title.includes(textInput) || appointment.title.toLowerCase().includes(textInput.toLowerCase()) || appointment.title.toUpperCase().includes(textInput.toUpperCase())?
                        appointmentTitles.push(appointment.title)
                        // :
                        // null
                    :
                    moment(appointment.startTime).format("MMMM DD, YYYY").toString().includes(textInput)?
                        appointmentTitles.push(moment(appointment.startTime).format("MMMM DD, YYYY").toString())
                    :
                    null
        })
        this.setState({searchAppointment: appointmentTitles})
    };

    onSearchSelect(selectedTitle){
        //console.log("Selected: ", selectedTitle)
        this.setState({selectedSearchValue: selectedTitle, selectedAppEvents:[], selectedDayEvents:[], searchValue: selectedTitle})
        this.getSearchAppointment(selectedTitle)
    }

    getSearchAppointment(select){
        let appointments = require('../assets/db.json').appointments
        let selectedAppEvents = []
        let selectedDayEvents = []
        for (i = 0; i < appointments.length; i++){
            if (appointments[i].title === select && moment(appointments[i].startTime).format("M") === this.state.currentDate.format("M")){
                filterDayEvent = this.state.datePositions.filter(date => moment(date.day).format("YYYY MM D") === moment(appointments[i].startTime).format("YYYY MM D"))
                filterAppEvent = this.state.appointmentDates.filter(date => moment(date.date).format("YYYY MM D") === moment(appointments[i].startTime).format("YYYY MM D"))
                selectedAppEvents.push(filterAppEvent[0].event)
                selectedDayEvents.push({"day":moment(appointments[i].startTime), "event":filterDayEvent[0].event})            
            }
        }
        let newAppArray = [...new Set(selectedAppEvents)]
        let newDayArray = []
        selectedDayEvents.map((obj)=>{
            if (newDayArray.length === 0) {
                newDayArray.push(obj)
            }else {
                if((newDayArray.filter(newObj => newObj.event === obj.event)).length === 0){
                    newDayArray.push(obj)
                }
            }
        })
        this.setState({selectedAppEvents: newAppArray, selectedDayEvents:newDayArray})
        if (newDayArray.length === 0 || newAppArray.length === 0) {
            null
        }else{
            this.setSearchAppointment(newDayArray[0].event, newAppArray[0], newDayArray[0].day )
        }
            
            
            
       
    }

    nextSearchResult(){
        searchResult = this.state.searchResult + 1
        this.setState({searchResult: searchResult})
        this.setSearchAppointment(this.state.selectedDayEvents[searchResult-1].event, this.state.selectedAppEvents[searchResult-1], this.state.selectedDayEvents[searchResult-1].day )
    }

    prevSearchResult(){
        searchResult = this.state.searchResult === 1 ? this.state.searchResult : this.state.searchResult -1
        this.setState({searchResult: searchResult})
        this.setSearchAppointment(this.state.selectedDayEvents[searchResult-1].event, this.state.selectedAppEvents[searchResult-1], this.state.selectedDayEvents[searchResult-1].day )
    }

    setSearchAppointment(filterDay, filterApp, selected){
        this.setState({
            searchAppointmentStatus:false, 
            searchAppointment:[],
            //selectedSearchValue:"",
            searchResultSelect:selected,
            //calendarOffset:filterDay,
            //searchOpen:false, 
            selected: {'selected':selected,'status':true}
        })

        if (filterApp === null || filterDay === null){
            this.state._scrollView.scrollTo({x:0,y:0,animated:true})
            this.state._scrollAppointment.scrollTo({x:0,y:0, animated:true})
        }else{
            this.state._scrollView.scrollTo({x:filterDay,y:0,animated:true})
            this.state._scrollAppointment.scrollTo({x:0,y:filterApp, animated:true})
        }
        
    }

  
    decreaseMonthChange(){
        setPrevMonth = this.getPrevMonth()
        this.setState({currentDate:setPrevMonth, datePositions: [], appointmentDates: [], calendarOffset:0, scheduleOffset:0})
    };
    
    increaseMonthChange(){
        this.setState({datePositions: [], appointmentDates:[],})
        setNextMonth = this.getNextMonth()
        this.setState({
            currentDate:setNextMonth,
            calendarOffset:0, 
            scheduleOffset:0
        })
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
        return moment(now)
    }

    
    showScheduleDetails(appointment){
        let newObject = Object.assign({},appointment);
        this.props.setTransparent(!this.state.showSlider)
        this.setState({
            slideValue: this.state.displayFullCalendar === false ? 600 : 300,
            scheduleDetails:newObject,
            showSlider:!this.state.showSlider,
            showDrawer: !this.state.showSlider,
        }, )
    };

    showFullCalendar(){
        let status = !this.state.displayFullCalendar;
        this.setState({displayFullCalendar:status})
    };
    
    closeTransparent(){
        this.setState({
            slideValue:0,
            showSlider:false, 
            showDrawer:false,
            searchOpen: false,
            //transparent:false
        })
        this.props.setTransparent(false)
        this.state.selectedSearchValue !== "" ? this.setState({selectedSearchValue:"", searchValue: ""}) : null
        this.state.selectedSearchValue === ""  ? this.setState({searchAppointment: [], searchResultSelect:""}) : null
    
    };

    // closeDrawer(){
    //     this.props.setTransparent(false)
    //     this.setState({
    //       showDrawer:false,
    //       //transparent:false,
    //       showSlider:false,
    //       //slideValue:0
    //     })
    // };

    restartDrag(){
        this.setState({slideDraggable:true})
    };

    stopScheduleDrag(height, bottom){
        height === Dimensions.get('window').height - 150 ? this.setState({slideDraggable:false}) : null
        height === -bottom ? this.setState({showSlider:false}) : null
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
            days = []
        }
        else{
            for (i = 1; i < dayIndex-1; i++){
                days.push(moment(`${momentDay.format("YYYY-MM")}-${day-1}`).format("YYYY-MM-DD"))
                day--
            }
        }   
        return days.reverse()
        
    }

    getEndDays(){
        //get first 5 days of next onth
        const now = new Date(this.state.currentDate)
        now.setDate(1)
        now.setMonth(now.getMonth()+1)
        const momentDay = moment(now)

        let day = parseInt(moment(now).format("DD"))
        let days = [momentDay.format("YYYY-MM-DD")]
        const endDayNum = moment(this.state.currentDate).endOf("month").format("d")

        if (parseInt(endDayNum) === 0){
            days = []
        }else{
            for (i = endDayNum ; i < 6 ; i++){
                const dayNum = (day+1 < 10) ? `0${day+1}` : day+1
                days.push(moment(`${momentDay.format("YYYY-MM")}-${dayNum}`).format("YYYY-MM-DD"))
                day++
            }
        }
        return days
    }
   
    render() {
        const Drawer = require("react-native-drawer-menu").default;
        const currentYear = this.state.currentDate.format("YYYY")
        const currentMonth = this.state.currentDate.format("MM")
        const currentDay = this.state.currentDate.format("DD")
        

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
                    startDays = {this.getStartDays()}
                    endDays = {this.getEndDays()}
                    currentDays = {this.getCurrentDays(this.state.currentDate.format("MM"),this.state.currentDate.format("YYYY"))}
                    animateSlide = {this.animateSlide}
                    showScheduleDetails = {this.showScheduleDetails}
                    getAppointments = {this.getAppointments}
                    appointmentScroll = {this.appointmentScroll}
                    getOffset = {this.getOffset}
                    scheduleOffset = {this.state.scheduleOffset}
                    currentDate={this.state.currentDate}
                    selected = {this.state.selected}
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
                            {this.state.searchAppointmentStatus === true && this.state.selectedSearchValue!== "" && this.state.searchResultSelect !== ""?
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
                                    currentDate = {this.state.currentDate}
                                    selected = {this.state.selected}
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
                                    calendarOffset = {this.state.calendarOffset}
                                    datePositions = {this.state.datePositions}
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
                                        currentDays = {this.getCurrentDays(this.state.currentDate.format("MM"),this.state.currentDate.format("YYYY"))}
                                        onPressDay = {this.onPressDay}
                                        getStartDays = {this.getStartDays()}
                                        getEndDays = {this.getEndDays()}
                                        screenDimensions = {this.props.screenDimensions}
                                        currentDate = {this.state.currentDate}
                                        selected = {this.state.selected}
                                        daySelected = {this.state.daySelected}
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
                    placeholder={"Search by scheduled items"}
                    changeText = {this.searchChangeText}
                    //inputText = {this.state.selectedSearchValue === "" ? this.state.searchValue: this.state.selectedSearchValue}
                    inputText = {this.state.searchValue}
                    closeSearch = {this.closeTransparent}
                    searchAppointment = {this.state.searchAppointment}
                    selectedSearchValue = {this.state.selectedSearchValue}
                    searchResult = {this.state.searchResult}
                    selectedAppEvents = {this.state.selectedAppEvents}
                    nextSearchResult = {this.nextSearchResult}
                    prevSearchResult = {this.prevSearchResult}                    
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
                    // showScheduleButtons = {this.showScheduleButtons}
                    //scheduleButtons={this.state.scheduleButtons}
                    //deleteFloatingAction = {this.deleteFloatingAction}
                    //completeDeleteFloatingAction = {this.completeDeleteFloatingAction}
                    //deleteAppointment = {this.state.deleteAppointment}
                    //completeDeleteAppointment = {this.state.completeDeleteAppointment}
                    //exitDelete = {this.exitDelete}
                    //closeActionButtons = {this.closeActionButtons}
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
                                onDrawerClose={this.closeTransparent}
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
