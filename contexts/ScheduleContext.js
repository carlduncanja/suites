import React, { createContext, useReducer } from 'react';
import moment from 'moment';
import { scheduleReducer } from '../reducers/scheduleReducer';

const initialState = {
    displayFullCalendar: false,
    currentDate: moment(new Date()),
    selected: { selected:moment(), status:false},
    calendarOffset: 0,
    datePositions: [],
    scheduleOffset: 0,
    searchResultSelect: '',
    transparent: true,
    scheduleDetails: {},
    searchOpen: false,
    selectedSearchValue: '',
    searchAppointment: [],
    searchValue: '',
    showSlider: false,
    slideValue: 0,
    showDrawer: false,
    daySelected: false,
    goToToday: false,
    appointmentDates: [],
    _scrollView: null,
    _scrollAppointment: null
};

export const ScheduleContext = createContext(initialState);

export const ScheduleProvider = ({children}) => (
    <ScheduleContext.Provider value={useReducer(scheduleReducer, initialState)}>
        {children}
    </ScheduleContext.Provider>
);
