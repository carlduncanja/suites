import React, {Component, useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import moment from "moment";
import {getSuggestedStartTimes} from "../../api/network";
import {colors} from "../../styles";


const SuggestedTimesPopover = ({procedure, location, duration, date, numSuggestions, onTimeSelected, onClose}) => {

    const [isLoading, setLoading] = useState(true);
    const [dates, setDates] = useState([])

    useEffect(() => {
        setLoading(true);
        getSuggestedStartTimes(procedure, location, date, duration, numSuggestions)
            .then(data => {
                console.log(data);
                setDates(data);
            })
            .catch(error => {
                console.log("failed to get suggested times", error);
            })
            .finally(_ => {
                setLoading(false);
            })

    }, [])

    const handleDateSelected = (date) => {
        onTimeSelected(date);
    };

    const renderDate = ({item}) => {
        const formattedDate = new moment(item).format("DD MMMM, YYYY @  hh:mm A");


        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => handleDateSelected(item)}
            >
                {/*<View style={styles.item}>*/}
                <Text style={styles.dateText}>{formattedDate}</Text>
                {/*</View>*/}
            </TouchableOpacity>
        )
    }

    return <View style={styles.container}>
        {
            isLoading
                ?
                <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                    <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                </View>
                :
                <>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Select A Start Time</Text>
                    </View>

                    <View style={styles.divider}/>
                    <FlatList
                        data={dates}
                        renderItem={renderDate}
                        keyExtractor={(item) => item}
                        ItemSeparatorComponent={() => <View style={{margin: 10}}/>}
                    />
                </>
        }
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
    },
    content: {
        flex: 1,
        backgroundColor: 'grey',
    },
    item: {
        width: '100%',
    },
    dateText: {
        fontSize: 20,
        fontWeight: '500',
    },
    divider: {
        width: '100%',
        height: 2,
        borderBottomWidth: 1,
        borderBottomColor: "#E3E8EF",
        marginBottom: 20
    },
})

export default SuggestedTimesPopover;
