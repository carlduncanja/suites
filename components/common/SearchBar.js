import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import InputText from './InputText';
import Svg, { Path } from 'react-native-svg';
import SvgIcon from '../../assets/SvgIcon'
import { ScheduleContext } from '../../contexts/ScheduleContext';
import { scheduleActions } from '../../reducers/scheduleReducer';
import { useCloseTransparent } from '../../hooks/useScheduleService';

export default SearchBar = (props) => {
    [searchResult, setSearchResult] = useState(1);

    const [state, dispatch] = useContext(ScheduleContext);

    searchResult  = (type) => {
        type === 'prev' ?  
            searchResult = searchResult === 1 ? searchResult : searchResult - 1 
        :
            searchResult = searchResult + 1;

        setSearchResult(searchResult)
        
        dispatch({
            type: scheduleActions.SEARCHAPPOINTMENT,
            newState: [
                props.selectedDayEvents[searchResult - 1].event, 
                props.selectedAppEvents[searchResult - 1], 
                props.selectedDayEvents[searchResult - 1].day
            ]
        })
    }


    let currentItem = props.selectedAppEvents.length === 0 ? 0 : searchResult;

    return (
        <View style={styles.searchContent}>
             <TextInput style={{backgroundColor: 'yellow', height: 20}}
                onChangeText = {props.changeText}
                placeholder={props.placeholder}
                placeholderTextColor = {props.placeholderTextColor}
                value = {props.inputText}
            />
            <View style={{ flexDirection: 'row' }}>
                {!props.selectedSearchValue === "" &&
                    <View style={{ flexDirection: 'row', paddingRight: 15 }}>
                        <Text>{currentItem} of {props.selectedAppEvents.length}</Text>
                        <TouchableOpacity style={{ paddingRight: 15, paddingLeft: 15 }} onPress={() => this.searchResult('prev')}>
                            <SvgIcon iconName="scheduleMonthLeft" strokeColor="#718096" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingLeft: 15, paddingRight: 15 }} onPress={() => this.searchResult('next')}>
                            <SvgIcon iconName="scheduleMonthRight" strokeColor="#718096" />
                        </TouchableOpacity>
                    </View>
                }

                <TouchableOpacity onPress={ () => { useCloseTransparent(props.dispatch, props.scheduleActions, props.selectedSearchValue)}}>
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
