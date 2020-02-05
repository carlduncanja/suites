import React, { useState } from 'react';
import {View, StyleSheet, ScrollView, Text, Easing, Animated, Dimensions, TouchableOpacity} from 'react-native';
import SearchBar from './../common/SearchBar';
import TransparentScreen from '../common/TransparentScreen';

export default ScheduleSearch = (props) => {
    [searchValue, setSearchValue] = useState('');
    [searchAppointment, setSearchAppointment] = useState([]);
    [searchResult] = useState(1);
    [selectedAppEvents, setSelectedAppEvents] = useState([]);
    [slideValue, setSlideValue] = useState(0);
    [showSlider, setShowSlider] = useState(false);
    [showDrawer, setShowDrawer] = useState(false);
    [selectedDayEvents] = useState([]);

    closeTransparent = () => {
        setSlideValue(0);
        setShowSlider(false);
        setShowDrawer(false);
        props.setSearchOpen(false);
        props.setTransparent(false)
        props.selectedSearchValue === ""  ? setSearchAppointment([]) : setSearchValue("");



    //     this.state.selectedSearchValue !== "" ? this.setState({ selectedSearchValue: "", searchValue: "" }) : null
    //     this.state.selectedSearchValue === "" ? this.setState({ searchAppointment: [], searchResultSelect: "" }) : null
    
    }

    onSearchSelect = (selectedTitle) => {
        props.setSelectedSearchValue(selectedTitle);
        setSearchValue(selectedTitle);

        // this.setState({selectedSearchValue: selectedTitle, selectedAppEvents:[], selectedDayEvents:[], searchValue: selectedTitle})
        this.getSearchAppointment(selectedTitle)
    }


    getSearchAppointment = (select) =>  {
        let appointments = require('./../../assets/db.json').appointments
        let sAppEvents = []
        let selectedDayEvents = []
        for (i = 0; i < appointments.length; i++){
            if (appointments[i].title === select && moment(appointments[i].startTime).format("M") === props.currentDate.format("M")){
                filterDayEvent = props.datePositions.filter(date => moment(date.day).format("YYYY MM D") === moment(appointments[i].startTime).format("YYYY MM D"))
                filterAppEvent = props.appointmentDates.filter(date => moment(date.date).format("YYYY MM D") === moment(appointments[i].startTime).format("YYYY MM D"))
                sAppEvents.push(filterAppEvent[0].event)
                selectedDayEvents.push({"day":moment(appointments[i].startTime), "event":filterDayEvent[0].event})            
            }
        }
        let newAppArray = [...new Set(sAppEvents)]
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
        setSelectedAppEvents(newAppArray);
        setSelectedDayEvents(newDayArray);
        if (!newDayArray.length === 0 || !newAppArray.length === 0) {
            this.setAppointmentSearch(newDayArray[0].event, newAppArray[0], newDayArray[0].day )
        }
            
 
    }

    setAppointmentSearch = (filterDay, filterApp, selected) => {
        props.setSearchAppointmentStatus(false);
        setSearchAppointment([])
        setSearchResultSelect(selected);
        setSelected()
        this.setState({
            searchAppointmentStatus:false, 
            searchAppointment:[],
            searchResultSelect:selected,
        })

        if (filterApp === null || filterDay === null){
            props._scrollView.scrollTo({x:0,y:0,animated:true})
            props._scrollAppointment.scrollTo({x:0,y:0, animated:true})
        }else{
            props._scrollView.scrollTo({x:filterDay,y:0,animated:true})
            props._scrollAppointment.scrollTo({x:0,y:filterApp, animated:true})
        }
        
    }


    

    const searchChangeText = (textInput) => {
        const appointmentTitles = []
        require('./../../assets/db.json').appointments.map((appointment)=>{
            !appointmentTitles.includes(appointment.title) || !appointmentTitles.includes(moment(appointment.startTime).format("MMMM DD, YYYY").toString())&&
                appointment.title.includes(textInput) || appointment.title.toLowerCase().includes(textInput.toLowerCase()) || appointment.title.toUpperCase().includes(textInput.toUpperCase())?
                    appointmentTitles.push(appointment.title)
                :
                    !moment(appointment.startTime).format("MMMM DD, YYYY").toString().includes(textInput)&&
                        appointmentTitles.push(moment(appointment.startTime).format("MMMM DD, YYYY").toString())
        })
        setSearchValue(textInput);
        setSearchAppointment(appointmentTitles);
    };

    return (
        <TransparentScreen closeTransparent={this.closeTransparent}>
            <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
            <SearchBar
                placeholderTextColor='#718096'
                placeholder={"Search by scheduled items"}
                changeText={searchChangeText}
                //inputText = {this.state.selectedSearchValue === "" ? this.state.searchValue: this.state.selectedSearchValue}
                inputText={searchValue}
                closeSearch={closeTransparent}
                searchAppointment={searchAppointment}
                selectedSearchValue={props.selectedSearchValue}
                // searchResult={searchResult}
                selectedAppEvents={selectedAppEvents}
                // nextSearchResult={this.nextSearchResult}
                // prevSearchResult={this.prevSearchResult}
            />
            <View style={{ backgroundColor: '#FFFFFF' }}>
                {searchAppointment.map((appointmentTitle, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={{ paddingTop: 5, paddingBottom: 10, paddingLeft: 25 }}
                            onPress={() => this.onSearchSelect(appointmentTitle)}
                        >
                            <Text style={{ color: '#3182CE', fontSize: 16 }}>{appointmentTitle}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
        </TransparentScreen>
       
    )
}