import React, {Component, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../../assets/SvgIcon';
import { SuitesContext } from '../../../contexts/SuitesContext';
import { appActions } from '../../../redux/reducers/suitesAppReducer';

const Paginator = () => {
    const [state, dispatch] = useContext(SuitesContext)
    const totalPages = Math.ceil(state.list.listData.length/state.paginatorValues.recordsPerPage)

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>dispatch({type:appActions.GOTOPREVIOUSPAGE})}>
                <SvgIcon iconName = "paginationPrev" strokeColor="#104587"/>
            </TouchableOpacity>

            <View style={styles.numbersContainer}>
                <Text style={styles.numbers}>{state.paginatorValues.currentPage} of {totalPages}</Text>
            </View>
            <TouchableOpacity onPress={()=>dispatch({type:appActions.GOTONEXTPAGE})}>
                <SvgIcon iconName = "paginationNext" strokeColor="#104587"/>
            </TouchableOpacity>
        </View>
    );
}

export default Paginator;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    numbersContainer:{
        backgroundColor:'#FAFAFA',
        borderWidth:1,
        borderColor:'#CCD6E0',
        borderRadius:4,
        paddingLeft:7,
        paddingRight:7,
        paddingBottom:2,
        paddingTop:2,
        marginLeft:10,
        marginRight:10,
        flexDirection:'row'
    },
    numbers:{
        fontSize:14,
        color:'#313539'
    }
})
