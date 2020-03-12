import React,{ useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated, Easing,} from 'react-native';
import { ModalProvider, createModalStack } from "react-native-modalfy";
import PageTitle from './PageTitle';
import Search from '../Search';
import List from '../List/List';
import RoundedPaginator from '../Paginators/RoundedPaginator';
import FloatingActionButton from '../FloatingAction/FloatingActionButton';
import { SuitesContext } from '../../../contexts/SuitesContext';

const Page = () => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods
    const [actionAnimValue] = useState(new Animated.Value(0))

    actionAnimValue.addListener((value)=>{
        // console.log("Value:", value.value)
    })

    useEffect(()=>{
        Animated.timing(
            actionAnimValue,
            {
              toValue: 1,
              duration: 150,
              //easing:Easing.cubic
            }
          ).start();
    })

    const actionAnimStyles = {
        width: actionAnimValue.interpolate({
          inputRange: [0, 0.5, 1,1.5,2,2.5,3],
          outputRange: [0, 100, 200,300,400,500,600]
        }),
        height :actionAnimValue.interpolate({
        inputRange: [0, 0.5, 1,1.5,2,2.5,3],
          outputRange: [0, 50, 100,300,400,500,600]
        }),
    };
 
    return ( 
        <View style={{flex:1}} onLayout={(event)=> suitesMethod.getPageMeasure(event)}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{marginBottom:25}} onLayout = {(event)=> suitesMethod.getSlideTop(event)}>
                        <PageTitle />
                    </View>
                    <View style={{marginBottom:30}}>
                        <Search/>
                    </View>
                </View>

                <View style={styles.list}>
                    <List/>
                </View>
            
                <View style={styles.footer}>
                    <View style={{alignSelf:"center", marginRight:10}}>
                        <RoundedPaginator />
                    </View>

                    {suitesState.floatingActions.actionButtonState === false ?
                        <FloatingActionButton fillColor="#FFFFFF" backgroundColor="#4299E1" modalToOpen="ActionContainerModal"/>
                        :
                        <FloatingActionButton fillColor="#FFFFFF" backgroundColor="#A0AEC0"/>
                    }
                </View>
            </View>
        </View>
    );
}
 
export default Page;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        marginLeft:5,
        padding:15,
        backgroundColor:'#FAFAFA'
    },
    header:{
    },
    list:{
        flex:1,
    },
    footer:{
        flex:1,
        alignSelf:'flex-end', 
        flexDirection:'row', 
        position:'absolute', 
        bottom:0, 
        marginBottom:20, 
        right:0, 
        marginRight:30,
    },
})