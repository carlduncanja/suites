import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ListHeader from './ListHeader';
import ListData from './ListData';

export default class List extends Component{
    render(){
        return(
            <View>
                <View style={styles.header}>
                    <ListHeader listHeaders = {this.props.listHeaders}/>
                </View>
                <View style={styles.data}>
                    <ListData 
                        listDataItem={this.props.data} 
                        sliceArrayStart={this.props.sliceArrayStart}
                        sliceArrayEnd={this.props.sliceArrayEnd}
                        setSelected = {this.props.setSelected}
                        toggleCheckbox = {this.props.toggleCheckbox}
                        checked = {this.props.checked}
                        selectedCaseFile = {this.props.selectedCaseFile}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        marginBottom:25,
    },
    data:{}
})