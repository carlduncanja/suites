import React,{useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FrameItem from '../../common/Frames/FrameItems/FrameItem';
import SvgIcon from '../../../../assets/SvgIcon'

const RiskLevel = (props) => {
    const levels = [
        {
            "level":"low",
            "name":"Low",
        },
        {
            "level":"moderate",
            "name":"Moderate",
        },
        {
            "level":"high",
            "name":"High",
        },
        {
            "level":"veryHigh",
            "name":"Very High",
        },
    ]
    const Level = (name,backgroundColor,textColor) => {
        return(
            <View style={[styles.level,{backgroundColor:backgroundColor}]}>
                <Text style={[styles.levelTitle,{color:textColor}]}>{name}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={[styles.titleContainer,{backgroundColor:props.titleBackground, borderColor:props.borderColor, borderWidth:1}]}>
                <SvgIcon iconName = "riskLevel" fillColor={props.levelColor}/>
                <Text style={{color:props.cardColor, marginLeft:5}}>Risk Level</Text>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.levelsContainer}>
                    {
                        levels.map((level,index)=>{
                            return(
                                level.level === props.riskLevel ?
                                    <View key = {index} style={{flex:1, borderWidth:0}}>
                                        {Level(level.name, props.levelColor,"#FFFFFF")}
                                    </View>
                                    :
                                    <View key={index} style={{flex:1}}>
                                        {Level(level.name, "#FFFFFF", "#4E5664")}
                                    </View>
                            )

                        })
                    }
                </View>
                <View
                    style={{
                        backgroundColor:"#CCD6E0",
                        height:1,
                        borderRadius:2,
                        marginTop:35,
                        marginBottom:35
                    }}
                />
                <View style={styles.notesContainer}>
                    <View style={styles.notesTitleContainer}>
                        <Text style={styles.notesTitle}>Note</Text>
                    </View>
                    <View>
                        <FrameItem itemContent={props.itemContent}/>
                    </View>
                </View>
            </View>

        </View>
    );
}

export default RiskLevel;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F8FAFB',
        borderRadius:8,
    },
    titleContainer:{
        flexDirection:'row',
        padding:10,
        borderTopLeftRadius:8,
        borderTopRightRadius:8
    },
    contentContainer:{
        padding:20,
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderTopWidth:0,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8
    },
    levelsContainer:{
        flexDirection:"row",
        width:'100%',
        borderWidth:1,
        borderRightWidth:0,
        borderColor:"#CCD6E0"
    },
    level:{
        borderRightWidth:1,
        borderColor:"#CCD6E0",
        justifyContent:'center',
        padding:7,
        alignItems: 'center',
    },
    levelTitle:{
        fontSize:16
    },
    notesContainer:{
        //paddingTop:25
    },
    notesTitleContainer:{
        marginBottom:5
    },
    notesTitle:{
        color:"#718096",
        fontSize:16
    }
})
