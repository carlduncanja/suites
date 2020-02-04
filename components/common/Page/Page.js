import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PageTitle from './PageTitle';
import Search from '../Search';
import List from '../List/List';
import RoundedPaginator from '../Paginators/RoundedPaginator';
import FloatingActionButton from '../FloatingAction/FloatingActionButton';
import ActionContainer from '../FloatingAction/ActionContainer';

export default class Page extends Component{
    render(){
        return(
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={{marginBottom:25}}>
                        <PageTitle pageTitle={this.props.pageTitle}/>
                    </View>
                    <View style={{marginBottom:30}}>
                        <Search
                            placeholder={this.props.searchPlaceholder}
                            placeholderTextColor = "#A0AEC0"
                        />
                    </View>
                </View>

                <View style={styles.list}>
                    <List
                        data={this.props.data}
                        listHeaders = {this.props.listHeaders}
                        sliceArrayStart = {this.props.sliceArrayStart}
                        sliceArrayEnd = {this.props.sliceArrayEnd} 
                        setSelected = {this.props.setSelected}
                        toggleCheckbox = {this.props.toggleCheckbox}
                        checked = {this.props.checked}
                        selectedCaseFile = {this.props.selectedCaseFile}
                    />
                </View>

                <View style={styles.footer}>
                    <View style={{alignSelf:"center", marginRight:10}}>
                        <RoundedPaginator 
                            previousPage={this.props.previousPage}
                            nextPage={this.props.nextPage}
                            currentPage={this.props.currentPage} 
                            totalPages={this.props.totalPages}/>
                    </View>
                    {this.props.actionButtonState === false ?
                        <FloatingActionButton fillColor="#FFFFFF" backgroundColor="#4299E1" toggleActionButton={this.props.toggleActionButton}/>
                        
                        :
                        <View>
                            <FloatingActionButton fillColor="#FFFFFF" backgroundColor="#A0AEC0" toggleActionButton={this.props.toggleActionButton}/>
                            <View style={{position:'absolute', bottom:60,right:0}}>
                                <ActionContainer 
                                    actionTitle={this.props.actionTitle}
                                    actions={this.props.actions}
                                />
                            </View>
                        </View>
                        
                        
                    }
                </View>

            </View>
        )
    }
}

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

    },
    footer:{
        alignSelf:'flex-end', 
        flexDirection:'row', 
        position:'absolute', 
        bottom:0, 
        marginBottom:20, 
        right:0, 
        marginRight:30
    }
})