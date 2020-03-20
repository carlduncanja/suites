import React, {useContext} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { CaseFileContext } from '../../contexts/CaseFileContext';
import SvgIcon from "../../../assets/SvgIcon";

const width = 20
const BMIConverter = ({bmiValue, recordTitle}) => {
    // const caseStates = useContext(CaseFileContext).state
    const [state] = useContext(CaseFileContext)
    const separator = () => {
        return(
            <View style={{backgroundColor:"#E3E8EF",width:1}}/>
        )
    }
    const data = state.bmiScale
    const indicator = <SvgIcon iconName="bmiIndicator"/>

    calcIndicatorPosition = (value) =>{
        const bmiRange = data.filter(item => value>=item.startValue && value<=item.endValue)
        const getIndex = data.indexOf(bmiRange[0])
        let position = (value-bmiRange[0].startValue)*(width/(bmiRange[0].endValue - bmiRange[0].startValue))
        return (getIndex*width)+position
    }

    const BMIItem = (item, index) => {
        return (
            <View>
                {index === 0 ?
                    <View style={[styles.bmiRange,{backgroundColor:item.color, borderBottomLeftRadius:10, borderTopLeftRadius:10}]}/>
                    :
                    index === state.bmiScale.length -1 ?
                            <View style={[styles.bmiRange,{backgroundColor:item.color, borderBottomRightRadius:10, borderTopRightRadius:10}]}/>
                            :
                            <View style={[styles.bmiRange,{backgroundColor:item.color}]}/>
                }
            </View>


        )

    }
    return (
        <View>
            <Text style={{paddingBottom:4}}>{recordTitle}</Text>
            <View style={{left:calcIndicatorPosition(bmiValue)}}>
                {indicator}
            </View>
            <View>
                <FlatList
                    contentContainerStyle={styles.container}
                    renderItem={({item, index})=> BMIItem(item, index)}
                    ItemSeparatorComponent={separator}
                    data={data}
                    horizontal={true}
                    keyExtractor={(item,index) => `${index}`}
                />
            </View>

        </View>
    );
}

export default BMIConverter;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        width:'40%',
        borderRadius:30,
    },
    bmiRange:{
        width:width,
        height:5
    }
})
