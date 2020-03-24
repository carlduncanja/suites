import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native'
import Page from '../components/common/Page/Page';
import { connect } from 'react-redux';
import {setCaseFiles} from "../redux/actions/caseFilesActions";
import {getCaseFiles} from "../api/network";
import {colors} from '../styles'
import { SuitesContext } from '../contexts/SuitesContext';
import {appActions} from '../redux/reducers/suitesAppReducer'

const listData = require('../../assets/db.json').caseFiles.caseFilesInformation.data
const listHeaders = require('../../assets/db.json').caseFiles.caseFilesInformation.headers

const CaseFiles = (props) => {
    const [textInput, setTextInput] = useState("") 
    const [isFetchingCaseFiles, setFetchingCaseFiles] = useState(false)
    const [state, dispatch] = useContext(SuitesContext)
    const changeText = (text) =>{setTextInput(text)}
    // Redux props
    const { caseFiles,setCaseFiles,navigation} = props
   
    const routeName = navigation.state.routeName
    useEffect(() => {
        if (!caseFiles.length) {
            setFetchingCaseFiles(true);
            getCaseFiles()
                .then(data => {
                    setCaseFiles(data);
                    dispatch({
                        type: appActions.SETTOTALPAGES,
                        newState: {totalPages : Math.ceil(data.length/state.paginatorValues.recordsPerPage)}
                    })
                })
                .catch(error => {
                    console.log("failed to get case files", error);
                })
                .finally(_ => {
                    setFetchingCaseFiles(false)
                })
        }
    }, []);

    return (
        isFetchingCaseFiles ?
            <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
            </View>
            :
            <Page
                pageTitle = {routeName}
                placeholderText = {"Search by any heading or entry below"}
                changeText = {changeText}
                inputText = {textInput}
                routeName = {routeName}
                listData = {caseFiles}
                listHeaders = {listHeaders}
            />
    );
}

const mapStateToProps = (state) => ({
    caseFiles: state.caseFiles
});

const mapDispatcherToProp = {
    setCaseFiles
};


export default connect(mapStateToProps, mapDispatcherToProp) (CaseFiles);
