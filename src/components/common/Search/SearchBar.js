import React, { Component, useState, useEffect, useRef, useContext } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, TextInput, Animated, SectionList, Dimensions} from 'react-native';
import SearchInput from './SearchInput'
import { scheduleActions } from '../../../redux/reducers/scheduleReducer';
import { ScheduleContext } from '../../../contexts/ScheduleContext';
import BottomSheet from 'reanimated-bottom-sheet'
import Button from '../Button';
import moment from 'moment';
import ScheduleItem from '../../Schedule/ScheduleItem'


const SearchBar = (props) =>{
    const [state,dispatch] = useContext(ScheduleContext);
    const {changeText, closeSearch, inputText, matchesFound, onPressNextResult, onPressPreviousResult, onPressNewSerch, onPressSubmit, appointments} = props
    const [suggestionsOpen, setSuggestionsOpen] = useState(false)
    const [resultsOpen, setResultsOpen] = useState(false)
    const [selectedSuggestion, setSelectedSuggestion] = useState("")
    const resultsSeen = 5;
    const matchesFoundLength = matchesFound.length
    const [currentListMin, setCurrentListMin] = useState(0)
    const [currentListMax, setCurrentListMax] = useState(5)
    
    const searchBottomSheetRef = useRef();
    const [fall] = useState(new Animated.Value(1));

    useEffect(()=>{
        if(matchesFound.length > 0) setSuggestionsOpen(true)
    },[matchesFoundLength])

    const getSnapPoints = () => {
        // return [ dimensions.height || 500 * .5,  0]
        return [600, 100, 0]
    };

    const getSectionListData = (appointments = []) => {
        let appointmentList = [...appointments]
        let selectedResults = appointmentList.filter(appointment => appointment.title.includes(selectedSuggestion))

        return selectedResults.map(result => {
            const title = moment(result.startTime).format("dddd - MMM D");
            let appointmentForDay = [];
            let index = selectedResults.length - 1;

            while (index >= 0) {
                let selectedDay = moment(selectedResults[index].startTime);
                const isSameDay = selectedDay.isSame(moment(result.startTime), 'day');
                // console.log("Same Day? ", isSameDay)
                if (isSameDay) {
                    const day = selectedResults.splice(index, 1); // remove item found to decrease the list
                    appointmentForDay.push(day.pop());
                }
                --index
            }

            // console.log("APP FOR DAY: ", title, appointmentForDay)
            return {
                title,
                data: appointmentForDay,
            }
        })
    };

    const handleClick = () =>{}

    const renderSearchContent = () => () => {
        const DATA = selectedSuggestion !== "" ? getSectionListData(appointments) : []
        return <View style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            zIndex: 5
        }}>
            <View style={styles.sectionContainer}>
                <SectionList
                    keyExtractor={item => Math.random()}
                    sections = {DATA}
                    stickySectionHeadersEnabled={true}
                    ItemSeparatorComponent={() => <View style={styles.separatorStyle}/>}
                    renderSectionHeader={({section: {title}}) => (
                        <View style={[styles.dateLabelContainer]}>
                            <Text style={styles.dateLabel}>
                                {title}
                            </Text>
                        </View>
                    )}
                    renderItem={({item}) => {
                        return <ScheduleItem
                            startTime={item.startTime}
                            endTime={item.endTime}
                            title={item.title}
                            onScheduleClick={() => handleClick()}
                            color={item.scheduleType && item.scheduleType.color || 'gray'}
                            isInMonthOpacity = {1} 
                        />
                    }}
                /> 
            </View>
        </View>
    };

    const openSearchResult = (suggestion) => {
        setSelectedSuggestion(suggestion)
        dispatch({
            type: scheduleActions.SEARCHSELECTEDRESULT,
            newState: {
                searchSelectedResult: suggestion
            }
        })
        if (searchBottomSheetRef) searchBottomSheetRef.current.snapTo(0);
    }

    const searchClosed = () =>{
        searchBottomSheetRef.current.snapTo(2)
        setTimeout(()=>{
            closeSearch(false)
        },400)
    }

    const getNextResults = () =>{
        if (matchesFoundLength > currentListMax){
            setCurrentListMin(currentListMin + resultsSeen)
            setCurrentListMax(currentListMax + resultsSeen)
        }
    }

    const getPreviousResults = () =>{
        if (currentListMin > 0){
            setCurrentListMin(currentListMin - resultsSeen)
            setCurrentListMax(currentListMax - resultsSeen)
        }
    }

    return(
        <TouchableOpacity activeOpacity={1} style={{height:'100%'}} onPress={()=>searchClosed()}>
            <View>
                <SearchInput
                    changeText = {changeText}
                    inputText = {inputText}
                    matchesFound = {matchesFound.length}
                    onPressNextResult = {onPressNextResult}
                    onPressPreviousResult = {onPressPreviousResult}
                    onPressNewSerch = {onPressNewSerch}
                    onPressSubmit = {onPressSubmit}
                />   
                {
                    suggestionsOpen &&
                    <View style={styles.matchesFoundContainer}>
                        {matchesFound.slice(currentListMin,currentListMax).map((suggestion,index)=>{
                            return (
                                <TouchableOpacity style={styles.matchContainer} key={index} onPress={()=>openSearchResult(suggestion)}>
                                    <Text style={styles.matchText}>
                                        {(suggestion) instanceof Date ?
                                            moment(suggestion).format("MMMM D, YYYY")
                                            :
                                            suggestion
                                        }
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                        <View style={styles.buttons}>
                            {currentListMin > 0 &&
                                <View style={[styles.buttonContainer,{marginRight:10}]}>
                                    <Button
                                        title="Go Back"
                                        buttonPress={getPreviousResults}
                                        color="#0CB0E7"
                                    />
                                </View>
                            }
                            <View style={styles.buttonContainer}>
                                <Button
                                    title="More Results"
                                    buttonPress={getNextResults}
                                    color="#0CB0E7"
                                />
                            </View>
                        </View>
                        
                    </View>
                }
            </View>
            <BottomSheet
                ref={searchBottomSheetRef}
                snapPoints={getSnapPoints()}
                initialSnap={2}
                callbackNode={fall}
                borderRadius={14}
                renderContent={renderSearchContent()}
                onCloseEnd={() => setResultsOpen(false)}
                onOpenEnd={() => setResultsOpen(true)}
                renderHeader={() =>
                    <View
                        style={{
                            height: 8,
                            alignSelf: 'center',
                            width: 50,
                            backgroundColor: 'white',
                            borderRadius: 4,
                            marginBottom: 14
                        }}
                    />
                }
            />
        </TouchableOpacity>
        
    )
}
export default SearchBar

const styles=StyleSheet.create({
    matchesFoundContainer:{
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,
        backgroundColor:'#FAFAFA',
        paddingBottom:15,
        height:250
    },
    matchContainer:{
        padding:10,
        paddingLeft:18,
        paddingRight:18
    },
    matchText:{
        fontSize:16,
        color:'#4E5664'
    },
    buttons:{
        flex:1,
        flexDirection:'row',
        justifyContent:"center",
        alignItems:'flex-end'
    },
    buttonContainer:{
        height:28,
        width:97,
        borderColor:'#E3E8EF',
        borderRadius:4,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
    },
    sectionContainer: {
        // flex: 1,
        // flexDirection: 'column',
        // backgroundColor: 'rgba(247, 250, 252, 1)',
        // backgroundColor:"#FFFFFF",
        // borderWidth: 1,
        // borderColor: '#E9E9E9',
        // borderRadius: 16,
        paddingRight: 24,
        paddingLeft: 24,
    },
    separatorStyle: {
        borderBottomColor: '#CBD5E0',
        marginTop: 12,
        marginBottom: 12,
        borderBottomWidth: 1,
    },
    dateContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    dateLabelContainer: {
        // backgroundColor: 'rgba(247, 250, 252, 1)',
        backgroundColor:'#FFFFFF',
        borderBottomColor: '#718096',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 10,
        paddingTop: 24,
        height: 50,
    },
    dateLabel: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#4E5664'
    },
    
})
