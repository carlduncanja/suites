import React, { Component, useState, useEffect, useRef, useContext } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, TextInput, Animated, Dimensions} from 'react-native';
import SearchInput from './SearchInput'
import { scheduleActions } from '../../../redux/reducers/scheduleReducer';
import { ScheduleContext } from '../../../contexts/ScheduleContext';
import BottomSheet from 'reanimated-bottom-sheet'


const SearchBar = (props) =>{
    const [state,dispatch] = useContext(ScheduleContext);
    const {changeText, closeSearch, inputText, matchesFound, onPressNextResult, onPressPreviousResult, onPressNewSerch, onPressSubmit} = props
    const [suggestionsOpen, setSuggestionsOpen] = useState(false)
    const [resultsOpen, setResultsOpen] = useState(false)
    const [selectedSuggestion, setSelectedSuggestion] = useState("")
    
    const searchBottomSheetRef = useRef();
    const [fall] = useState(new Animated.Value(1));
    const height = Dimensions.get('screen').height

    const getSnapPoints = () => {
        // return [ dimensions.height || 500 * .5,  0]
        return [600, 100, 0]
    };

    const renderSearchContent = () => () => {
        return <View style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            zIndex: 5
        }}>
            <Text>{selectedSuggestion}</Text>
        </View>
    };

    useEffect(()=>{
        if(matchesFound.length > 0) setSuggestionsOpen(true)
    },[matchesFound.length])

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
                        {matchesFound.map((suggestion,index)=>{
                            return(
                                <TouchableOpacity style={styles.matchContainer} key={index} onPress={()=>openSearchResult(suggestion)}>
                                    <Text style={styles.matchText}>{suggestion}</Text>
                                </TouchableOpacity>
                            )
                        })}
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
        paddingBottom:15
    },
    matchContainer:{
        padding:10,
        paddingLeft:18,
        paddingRight:18
    },
    matchText:{
        fontSize:16,
        color:'#4E5664'
    }
})
