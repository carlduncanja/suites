export const scheduleActions = {
    SEARCHPRESS: 'SEARCHPRESS',
    UNDOSEARCH: 'UNDOSEARCH',
    MONTHCHANGE: 'MONTHCHANGE',
    SELECTED: 'SELECTED',
    FULLCALENDAR: 'FULLCALENDAR',
    SEARCHSELECT: 'SEARCHSELECT',
    SETAPPOINTMENTSEARCH: 'SETAPPOINTMENTSEARCH',
    CLOSETRANSPARENT: 'CLOSETRANSPARENT',
    SELECTEDSEARCHVALUE: 'SELECTEDSEARCHVALUE',
    SEARCHAPPOINTMENT: 'SEARCHAPPOINTMENT',
    CHANGETEXT: 'CHANGETEXT',
    PRESSDAY: 'PRESSDAY',
    GOTOTODAY: 'GOTOTODAY',
    DATEPOSITONS: 'DATEPOSITIONS',
    CALENDAROFFSET: 'CALENDAROFFSET',
    SCROLLAPPOINTMENT: 'SCROLLAPPOINTMENT',
    SCHEDULEOFFSET: 'SCHEDULEOFFSET',
    APPOINTMENTDATES: 'APPOINTMENTDATES',
    SCHEDULEDETAILS: 'SCHEDULEDETAILS',
    SCROLLVIEW: 'SCROLLVIEW',
    GOTONEXTSEARCHRESULT : 'GOTONEXTSEARCHRESULT',
    GOTOPREVIOUSSEARCHRESULT : 'GOTOPREVIOUSSEARCHRESULT',
    SETNEWSEARCH : 'SETNEWSEARCH',
    GETSEARCHRESULT : 'GETSEARCHRESULT'
}

export const scheduleReducer = (state, action) => {

    const { type, newState } = action;

    switch (type) {
        case scheduleActions.SEARCHPRESS:
            state = {
                ...state,
                transparent: newState.transparent,
                searchOpen: newState.searchOpen,
            };

            console.log('state', state);
            return state

        case scheduleActions.UNDOSEARCH:
            return {
                ...state,
                searchResultSelect: newState.searchResultSelect,
                searchAppointment: newState.searchAppointment,
                selectedSearchValue: newState.selectedSearchValue
            };

        case scheduleActions.MONTHCHANGE:
            return {
                ...state,
                currentDate: newState.currentDate,
                datePositions: newState.datePositions,
                calendarOffset: newState.calendarOffset,
                scheduleOffset: newState.scheduleOffset,
                appointmentDates: newState.appointmentDates
            };

        case scheduleActions.SELECTED:
            return {
                ...state,
                selected: newState
            };

        case scheduleActions.FULLCALENDAR:
            return {
                ...state,
                displayFullCalendar: newState
            };

        case scheduleActions.SEARCHSELECT:
            return {
                ...state,
                selectedSearchValue: newState.selectedSearchValue,
                searchValue: newState.searchValue
            };

        case scheduleActions.SETAPPOINTMENTSEARCH:
            return {
                ...state,
                searchResultSelect: newState.searchResultSelect,
                searchAppointment: newState.searchAppointment,
                selected: newState.selected
            };

        case scheduleActions.CLOSETRANSPARENT:
            return {
                ...state,
                slideValue: newState.slideValue,
                showSlider: newState.showSlider,
                showDrawer: newState.showDrawer,
                searchOpen: newState.searchOpen,
                transparent: newState.transparent
            };

        case scheduleActions.SELECTEDSEARCHVALUE:
            return {
                ...state,
                searchAppointment: newState.searchAppointment,
                searchResultSelect: newState.searchResultSelect
            };

        case scheduleActions.SEARCHAPPOINTMENT:
            return {
                ...state,
                searchAppointment: newState,
            };

        case scheduleActions.CHANGETEXT:
            return {
                ...state,
                searchAppointment: newState.searchAppointment,
                searchValue: newState.searchValue
            };

        case scheduleActions.PRESSDAY:
            return {
                ...state,
                selected: newState.selected,
                daySelected: newState.daySelected
            };

        case scheduleActions.GOTOTODAY:
            return {
                ...state,
                goToToday: newState
            };

        case scheduleActions.DATEPOSITONS:
            return {
                ...state,
                datePositions: [...state.datePositions, newState]
            };

        case scheduleActions.CALENDAROFFSET:
            return {
                ...state,
                calendarOffset: newState
            };

        case scheduleActions.SCROLLAPPOINTMENT:
            return {
                ...state,
                _scrollAppointment: newState
            };

        case scheduleActions.SCHEDULEOFFSET:
            return {
                ...state,
                scheduleOffset: newState
            };

        case scheduleActions.APPOINTMENTDATES:
            return {
                ...state,
                appointmentDates: [...state.appointmentDates, newState]
            };

        case scheduleActions.SCHEDULEDETAILS:
            return {
                ...state,
                transparent: newState.transparent,
                slideValue: newState.slideValue,
                scheduleDetails: newState.scheduleDetails,
                showSlider: newState.showSlider,
                showDrawer: newState.showDrawer
            };

        case scheduleActions.SCROLLVIEW:
            return {
                ...state,
                _scrollView: newState,
            };
        
        case scheduleActions.GOTONEXTSEARCHRESULT:
            return {
                ...state,
                currentSearchPosition : newState
            }

        case scheduleActions.GOTOPREVIOUSSEARCHRESULT:
            return {
                ...state,
                currentSearchPosition : newState
            }
        
        case scheduleActions.SETNEWSEARCH:
            return {
                ...state,
                searchValue : newState.searchValue,
                searchMatchesFound : newState.searchMatchesFound
            }

        case scheduleActions.GETSEARCHRESULT:
            return {
                ...state,
                searchValue : newState
            }

        case scheduleActions.GOTONEXTSEARCHRESULT:
            return {
                ...state,
                currentSearchPosition : newState
            }

        case scheduleActions.GOTOPREVIOUSSEARCHRESULT:
            return {
                ...state,
                currentSearchPosition : newState
            }

        case scheduleActions.SETNEWSEARCH:
            return {
                ...state,
                searchValue : newState.searchValue,
                searchMatchesFound : newState.searchMatchesFound
            }

        case scheduleActions.GETSEARCHRESULT:
            return {
                ...state,
                searchValue : newState
            }

        default:
            return state
    }

}
