import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import InventoryGeneralTabContent from "../OverlayTabs/InventoryGeneralTabContent";
import TheatresDetailsTab from "../OverlayTabs/TheatresDetailsTab";
import {colors} from "../../styles";
import {getTheatreById} from "../../api/network";
import ProceduresEquipmentTab from "../OverlayTabs/ProceduresEquipmentTab";
import EquipmentsTab from "../OverlayTabs/EquipmentsTab";
import ScheduleDisplayComponent from "../ScheduleDisplay/ScheduleDisplayComponent";
import StorageLocationsTab from "../OverlayTabs/StorageLocationsTab";
import HistoryTabs from "../OverlayTabs/HistoryTabs";
import {formatDate} from "../../utils/formatter";
import moment from "moment";
import {forEach} from "lodash";
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import BottomSheetContainer from '../common/BottomSheetContainer';

function TheatresBottomSheetContainer({theatre = {}}) {
    const theme = useTheme();
    const currentTabs = [
        "Details",
        "History",
        "Storage",
        "Equipment",
        "Schedule",
    ];
    // ##### States
    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedTheatre, setTheatre] = useState(theatre);
    const [relevantAppointment, setrelevantApppointments] = useState([]);
    const [isFetchingAppointment, setFetchingAppointment] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isFetching, setFetching] = useState(true);
    const [fetchDate, setfetchDate] = useState(new Date());
    const [updateDate, setupdateDate] = useState("");

    // ##### Lifecycle Methods

    useEffect(() => {
        // console.log("Hello")
        setTimeout(() => {
            fetchTheatre(theatre._id)
        }, 200)

    }, []);

    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const onEditPress = () => {
        setEditMode(!isEditMode)
    }

    // //Passing this instance of the below function to retrive the date from the child component
    // const getDate = (item) => {
    //   let today = new Date();
    //   console.log("date to use to query the api:", item);
    //   if (today == item) {
    //     return;
    //   } else setfetchDate(item);
    //   setupdateDate(fetchDate);
    //   return item;
    // };

    // ##### Helper functions

    const getOverlayScreen = (selectedOverlay) => {
        switch (selectedOverlay) {
            case "Details":
                // console.log('Theatre:', selectedTheatre);
                let appointments = selectedTheatre.appointements || []
                const availableOn = appointments && appointments.length &&
                    formatDate(appointments[0].endTime, "DD/MM/YYYY @ hh:mm a")
                    || "--";

                const theatreDetails = {
                    description: selectedTheatre.description,
                    id: selectedTheatre.theatreNumber,
                    name: selectedTheatre.name,
                    status: "Available", // TODO calculate status
                    statusColor: "black",

                    physician: "--",
                    availableOn
                };


                return <TheatresDetailsTab {...theatreDetails}/>;
            case "History":
                // console.log("Cases: ", selectedTheatre.cases)
                const cases = selectedTheatre.cases.map(caseItem => {
                    let end = caseItem.endTime
                    let start = caseItem.startTime
                    let duration = moment.duration(moment(end).diff(moment(start)))
                    duration = duration.asHours()
                    return {
                        name: caseItem.title,
                        duration: duration,
                        date: caseItem.startTime,
                        isRecovery: caseItem.isRecovery || false
                    }
                });

                return <HistoryTabs cases={cases}/>;
            case "Storage":

                const storageLocations = selectedTheatre.storageLocations.map(item => {


                    let stock = 0;
                    const levels = {
                        ideal: 0,
                        max: 0,
                        low: 0,
                        min: 0,
                        critical: 0
                    };

                    // get the total stock and levels
                    item.inventoryLocations.forEach(item => {
                        stock += item.stock;

                        levels.ideal += item.levels.ideal;
                        levels.max += item.levels.max;
                        levels.low += item.levels.low;
                        levels.critical += item.levels.critical;
                    });


                    return {
                        id: item._id,
                        locationName: item.name,
                        restockDate: new Date(),

                        //TODO get this info
                        stock,
                        levels
                    }
                });
                return <StorageLocationsTab storageLocations={storageLocations}/>;
            case "Equipment":
                return <EquipmentsTab/>;
            case "Schedule":
                return <View/>;
            default :
                return <View/>
        }
    };


    const fetchTheatre = (id) => {
        setFetching(true);
        getTheatreById(id)
            .then(data => {
                setTheatre(data)
            })
            .catch(error => {
                console.log("Failed to get theatre", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setFetching(false)
            })
    };

    const {_id, name} = selectedTheatre;

    return (
        <BottomSheetContainer
            isFetching={isFetching}
            overlayId={_id}
            overlayTitle={name}
            onTabPressChange={onTabPress}
            currentTabs={currentTabs}
            selectedTab={currentTab}
            isEditMode={isEditMode}
            onEditPress={onEditPress}
            overlayContent={getOverlayScreen(currentTab)}
        />
    );
}

TheatresBottomSheetContainer.propTypes = {};
TheatresBottomSheetContainer.defaultProps = {};

export default TheatresBottomSheetContainer;
