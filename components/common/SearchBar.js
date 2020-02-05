import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import InputText from './InputText';
import Svg, { Path } from 'react-native-svg';
import SvgIcon from '../../assets/SvgIcon'

export default SearchBar = (props) => {
    [selectedAppEvents] = useState([]);
    [searchResult] = useState(1);


    nextSearchResult = () => {
        searchResult = this.state.searchResult + 1
        this.setState({ searchResult: searchResult })
        this.setSearchAppointment(this.state.selectedDayEvents[searchResult - 1].event, this.state.selectedAppEvents[searchResult - 1], this.state.selectedDayEvents[searchResult - 1].day)
    }


    prevSearchResult = () => {
        searchResult = searchResult === 1 ? searchResult : searchResult - 1
        setSearchResult(searchResult)
        this.setSearchAppointment(props.
        selectedDayEvents[searchResult - 1].event, props.selectedAppEvents[searchResult - 1], props.selectedDayEvents[searchResult - 1].day)
    }


    let currentItem = selectedAppEvents.length === 0 ? 0 : searchResult;

    return (
        <View style={styles.searchContent}>
            <InputText
                changeText={props.changeText}
                inputText={props.inputText}
                placeholderTextColor={props.placeholderTextColor}
                placeholder={props.placeholder}
            />
            <View style={{ flexDirection: 'row' }}>
                {!props.selectedSearchValue === "" &&
                    <View style={{ flexDirection: 'row', paddingRight: 15 }}>
                        <Text>{currentItem} of {props.selectedAppEvents.length}</Text>
                        <TouchableOpacity style={{ paddingRight: 15, paddingLeft: 15 }} onPress={() => this.prevSearchResult()}>
                            <SvgIcon iconName="scheduleMonthLeft" strokeColor="#718096" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingLeft: 15, paddingRight: 15 }} onPress={() => this.nextSearchResult()}>
                            <SvgIcon iconName="scheduleMonthRight" strokeColor="#718096" />
                        </TouchableOpacity>
                    </View>
                }

                <TouchableOpacity onPress={props.closeSearch}>
                    <SvgIcon iconName="searchExit" strokeColor="#718096" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContent: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 26,
        paddingBottom: 24
    },
    entry: {
        fontSize: 29,
    },
    exit: {

    }
})
