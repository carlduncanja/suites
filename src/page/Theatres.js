import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import Page from "../components/common/Page/Page";
import IconButton from "../components/common/Buttons/IconButton";
import ActionIcon from "../../assets/svg/ActionIcon";
import ListItem from "../components/common/List/ListItem";
import {getTheatres} from "../api/network";
import {setTheatres} from "../redux/actions/theatresActions";
import {connect} from 'react-redux'


const listHeaders = [
    {
        id: "1",
        name: "Theatre",
        alignment: "flex-start"
    },
    {
        id: "2",
        name: "Status",
        alignment: "center"
    },
    {
        id: "3",
        name: "Recovery",
        alignment: "center"
    },
    {
        id: "3",
        name: "Actions",
        alignment: "center"
    }
];


const testData = [
    {
        id: "1",
        name: "Operating Room 1",
        status: "In Use",
        available: false,
        isRecovery: true,
    },
    {
        id: "2",
        name: "Operating Room 2",
        status: "Available",
        available: true,
        isRecovery: "",
    },
    {
        id: "3",
        name: "Operating Room 3",
        status: "Available",
        available: true,
        isRecovery: "",
    },
    {
        id: "4",
        name: "Operating Room 4",
        status: "Available",
        available: true,
        isRecovery: "",
    },
    {
        id: "5",
        name: "Operating Room 5",
        status: "In Use",
        available: false,
        isRecovery: false,
    },
    {
        id: "6",
        name: "Operating Room 5",
        status: "In Use",
        available: false,
        isRecovery: false,
    },
    {
        id: "7",
        name: "Operating Room 5",
        status: "In Use",
        available: false,
        isRecovery: false,
    },

];


function Theatres(props) {

    const {
        theatres = [],
        setTheatres
    } = props;

    const pageTitle = "Theatres";

    // ##### States

    const [searchValue, setSearchValue] = useState("");
    const [isFetchingData, setFetchingData] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);


    // ##### Lifecycle Methods functions

    // on mount
    useEffect(() => {
        if (!theatres.length) fetchTheatres()
    }, []);

    // ##### Handler functions

    const onSearchChange = () => {
    };

    const onItemPress = () => {
    };

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const onRefresh = () => {
        fetchTheatres()
    };

    const onSelectAll = () => {
        const indeterminate = selectedIds.length >= 0 && selectedIds.length !== testData.length;
        if (indeterminate) {
            const selectedAllIds = [...theatres.map(caseItem => caseItem.id)];
            setSelectedIds(selectedAllIds)
        } else {
            setSelectedIds([])
        }
    };

    const onCheckBoxPress = (item) => () => {
        const {id} = item;
        let updatedCases = [...selectedIds];

        if (updatedCases.includes(id)) {
            updatedCases = updatedCases.filter(id => id !== item.id)
        } else {
            updatedCases.push(item.id);
        }

        setSelectedIds(updatedCases);
    };

    // ##### Helper functions
    const theatreItem = ({name, recoveryStatus, recoveryStatusColor, status, statusColor}, onActionPress, actionIcon = actionIcon) => <>
        <View style={[styles.item, {justifyContent: 'space-between'}]}>
            <Text style={{color: "#3182CE", fontSize: 16}}>
                {name}
            </Text>
            <View style={{
                width: 1,
                height: 24,
                backgroundColor: "#E3E8EF",
                marginRight: 20
            }}/>
        </View>
        <View style={[
            styles.item, {justifyContent: "center"}
        ]}>
            <Text style={[styles.itemText, {color: statusColor}]}>
                {status}
            </Text>
        </View>
        <View style={[
            styles.item, {justifyContent: "center"}
        ]}>
            <Text style={[styles.itemText, {color: recoveryStatusColor}]}>
                {recoveryStatus}
            </Text>
        </View>
        <View style={[styles.item, {justifyContent: "center"}]}>
            <IconButton
                Icon={<ActionIcon/>}
                onPress={onActionPress}
            />
        </View>
    </>;

    const renderItem = (item) => {
        const availableColor = "#38A169";
        const inUseColor = "#DD6B20";

        const formattedItem = {
            name: item.name,
            recoveryStatus: item.isRecovery && !item.available ? "yes" : !item.available ? 'No' : '--',
            recoveryStatusColor: item.isRecovery && !item.available ? availableColor : '#4E5664',
            status: item.available ? "Available" : "In-Use",
            statusColor: item.available ? availableColor : inUseColor
        };

        const onActionClick = () => {
        };

        const itemView = theatreItem(
            formattedItem,
            onActionClick
        );

        return <ListItem
            isChecked={selectedIds.includes(item.id)}
            onCheckBoxPress={onCheckBoxPress(item)}
            onItemPress={onItemPress(item)}
            itemView={itemView}
        />
    };

    const fetchTheatres = () => {
        setFetchingData(true);
        getTheatres()
            .then(data => {
                console.log("get theatres", data);
                setTheatres(data)
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to fetch theatres", error);
            })
            .finally(_ => {
                setFetchingData(false)
            })
    };

    return (
        <View style={styles.container}>
            <Page
                placeholderText={"Search by heading or entry below."}
                routeName={pageTitle}
                listData={theatres}
                listItemFormat={renderItem}
                inputText={searchValue}
                itemsSelected={selectedIds}
                listHeaders={listHeaders}
                changeText={onSearchInputChange}
                onRefresh={onRefresh}
                isFetchingData={isFetchingData}
                onSelectAll={onSelectAll}
            />
        </View>
    );
}

Theatres.propTypes = {};
Theatres.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
    },
    itemText: {
        fontSize: 14,
        color: "#4E5664",
    },
});

const mapStateToProps = (state) => {
    const theatres = state.theatres;

    return {
        theatres
    }
};

const mapDispatchToProps = {
    setTheatres
};

export default connect(mapStateToProps, mapDispatchToProps)(Theatres);
