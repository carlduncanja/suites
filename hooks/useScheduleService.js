import moment from "moment";

export const useCloseTransparent = (dispatch, scheduleActions, selectedSearchValue) => {
    dispatch({
        type: scheduleActions.CLOSETRANSPARENT,
        newState: {
            slideValue: 0,
            showSlider: false,
            showDrawer: false,
            searchOpen: false,
            transparent: false
        }
    });

    if (selectedSearchValue === "") {
        dispatch({
            type: scheduleActions.SELECTEDSEARCHVALUE,
            newState: {
                searchAppointment: [],
                searchResultSelect: ''
            }
        })
    } else {
        dispatch({
            type: scheduleActions.SEARCHSELECT,
            newState: {
                searchValue: '',
                selectedSearchValue: ''
            }
        })
    }
};

export const useStartDays = (currentDate) => {
    d = new Date(currentDate)
    d.setDate(1)
    d.setHours(-1);
    const momentDay = moment(d); /// first day

    let day = parseInt(momentDay.format("DD"));
    let days = [momentDay.format("YYYY-MM-DD")]
    const startDayNum = moment(currentDate).startOf("month").format("d")
    const dayIndex = parseInt(startDayNum) === 0 ? 7 : parseInt(startDayNum)

    if (dayIndex === 1) {
        days = []
    } else {
        for (let i = 1; i < dayIndex - 1; i++) {
            days.push(moment(`${momentDay.format("YYYY-MM")}-${day - 1}`).format("YYYY-MM-DD"));
            day--
        }
    }
    return days.reverse()
};

export const useCurrentDays = (inputMonth, inputYear) => {
    let results = [];
    let daysInMonth = moment([inputYear, inputMonth - 1]).daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
        let day;
        i < 10 ? day = `0${i}` : day = i;
        let str = `${inputYear}-${inputMonth}-${day}`;
        results.push(moment(str).format("YYYY-MM-DD"))
    }
    return results
};

export const useEndDays = (currentDate) => {
    const now = new Date(currentDate)
    now.setDate(1)
    now.setMonth(now.getMonth() + 1)
    const momentDay = moment(now)

    let day = parseInt(moment(now).format("DD"))
    let days = [momentDay.format("YYYY-MM-DD")]
    const endDayNum = moment(currentDate).endOf("month").format("d")

    if (parseInt(endDayNum) === 0) {
        days = []
    } else {
        for (i = endDayNum; i < 6; i++) {
            const dayNum = (day + 1 < 10) ? `0${day + 1}` : day + 1
            days.push(moment(`${momentDay.format("YYYY-MM")}-${dayNum}`).format("YYYY-MM-DD"))
            day++
        }
    }
    return days
}

export const useAnimateSlide = (displayFullCalendar) => {
    animateSlide = () => {
        const slideUpNum = !displayFullCalendar ? 600 : 300
        let slideUpAnimValue = new Animated.Value(0);
        Animated.timing(
            slideUpAnimValue,
            {
                toValue: slideUpNum,
                duration: 800,
                easing: Easing.cubic
            },
        ).start() && slideUpAnimValue.setValue(slideUpNum)
    }
};
